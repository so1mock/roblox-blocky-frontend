# 프론트엔드 에러 처리 가이드

> COBLOCKS-12 에서 정한 기준입니다. 새 화면을 만들거나 에러 처리를 손볼 때 이 문서를 따라주세요.
> API 레이어(엔드포인트·훅·쿼리 키) 규칙은 [frontend-api-layer.md](./frontend-api-layer.md) 를 참고하세요.

---

## 1. 처리할 에러의 종류

```
에러
│
├── 렌더링 예외 ─────────────── 화면을 그리다 터진 것. 일어나면 안 되는 일
│     예: user.name 인데 user 가 null
│         JSON.parse(잘못된 문자열)
│     → ErrorBoundary
│
└── API 에러 ───────────────── 서버와 통신하다 생긴 것. 일어날 수 있는 일
      │
      ├── 인증 만료 (401) ───── 액세스 토큰이 죽었다
      │     → 인터셉터가 조용히 갱신·재시도 (사용자는 모름)
      │        갱신도 실패하면 로그아웃
      │
      ├── 폼 제출 실패 ──────── 사용자가 입력한 값이 거절됨
      │     예: 비밀번호 불일치(M400), 중복된 아이디(M401)
      │     → 폼 안 인라인
      │
      ├── 조회 실패 ─────────── 화면에 뿌릴 데이터를 못 받음
      │     │
      │     ├── 화면 일부 ───── 목록·섹션 하나만 실패
      │     │     → 그 자리에 ErrorState + 다시 시도
      │     │
      │     └── 화면 전체 ───── 그 데이터 없이는 화면이 성립 안 됨
      │           → 알림 후 목록으로 돌려보내기
      │
      └── 변경 실패 ─────────── 저장·삭제·업로드가 거절됨
            → 모달 알림

(별도) 입력 형식 오류 ───────── 서버에 보내기 전에 프론트가 거름
      예: 빈 값, 변수명 규칙 위반
      → 폼 안 인라인 (요청 자체를 보내지 않음)
```

---

## 2. 유형별 처리 방식

### 2-1. 렌더링 예외 → ErrorBoundary

```tsx
import { ErrorBoundary } from "@common/components/ErrorBoundary";

<ErrorBoundary
  name="workspace-explorer"
  fallback={<div>파일 목록을 표시할 수 없습니다.</div>}
>
  <WorkspaceExplorer />
</ErrorBoundary>;
```

현재 배치:

| 위치                | 역할                                          |
| ------------------- | --------------------------------------------- |
| `routes/__root.tsx` | 어디서든 새어나온 예외를 받는 마지막 그물     |
| 워크스페이스 탐색기 | 파일 목록이 깨져도 블록 편집은 계속할 수 있게 |

**API 에러를 여기로 넘기지 마세요.** 아래 규칙대로 각자 자리에서 처리합니다.

새 경계가 필요한 기준은 **"이 영역이 죽어도 나머지는 쓸 수 있는가"** 입니다. 독립적으로 쓸 수 있는 영역이면 감싸고, 아니면 상위 경계에 맡깁니다.

### 2-2. 인증 만료 → 인터셉터가 자동 처리

작성할 코드가 없습니다. `src/domain/common/apis/axios.ts` 가 401 을 받으면 토큰을 갱신하고 원래 요청을 다시 보냅니다.

```
요청 → 401 → 토큰 갱신 → 재시도 → 성공   (사용자는 아무것도 모름)
                      ↘ 실패 → 로그아웃
```

단, **로그인·소셜로그인·로그아웃 요청은 이 흐름에서 제외**됩니다. 거기서의 401 은 "토큰 만료"가 아니라 "자격 증명이 틀렸다"는 뜻이라 갱신해봐야 소용없기 때문입니다.

### 2-3. 입력 형식 오류 → zod 스키마

도메인별 `constants/schema.ts` 에 규칙을 선언합니다.

```ts
export const loginSchema = z.object({
  username: z.string().trim().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});
export type LoginForm = z.infer<typeof loginSchema>;
```

```tsx
const {
  register,
  handleSubmit,
  setError,
  formState: { errors, isSubmitting },
} = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

<input {...register("username")} />;
{
  errors.username && (
    <p className="text-sm text-red-600">{errors.username.message}</p>
  );
}
```

여기서 걸리면 **요청 자체가 나가지 않습니다.**

### 2-4. 폼 제출 실패 → `setError("root")`

서버가 거절한 경우도 폼 에러로 취급해 폼 안에 표시합니다.

```tsx
const onSubmit = async (form: LoginForm) => {
  try {
    await handleLogin(form);
  } catch (error) {
    setError("root", {
      message:
        error instanceof ApiError ? error.message : "로그인에 실패했습니다.",
    });
  }
};

{
  errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>;
}
```

### 2-5. 조회 실패 → 화면 성격에 따라

**화면 일부**(목록·섹션)라면 그 자리에 표시하고 재시도를 제공합니다.

```tsx
const { data, isLoading, isError, error, refetch } = useMyGroupsQuery();

{
  isLoading && <Spinner label="반 목록을 불러오는 중..." />;
}
{
  !isLoading && isError && (
    <ErrorState message={error.message} onRetry={() => refetch()} />
  );
}
```

**화면 전체**가 그 데이터에 의존하면 알린 뒤 목록으로 돌려보냅니다.

```tsx
useEffect(() => {
  if (!isGroupInfoError) return;
  showAlert({
    title: "반 정보 불러오기 실패",
    message: groupInfoError.message,
    type: "error",
  });
  navigate({ to: `/${role}/group` });
}, [isGroupInfoError]);

if (isGroupInfoError) return null;
if (isLoading || groupInfo === undefined)
  return <Spinner label="반 정보를 불러오는 중..." />;
```

> `useEffect` 안에서 처리하는 이유는, 렌더링 도중 `showAlert`/`navigate` 를 부르면 렌더 단계에서 상태를 바꾸게 되어 React 가 경고를 내고 무한 렌더로 이어질 수 있기 때문입니다.

### 2-6. 변경 실패 → 모달 알림

저장·삭제·업로드가 실패하면 반드시 알립니다.

```tsx
const handleDelete = async () => {
  try {
    await deleteWallMutation(wallInfo.uuid);
  } catch (error) {
    showAlert({
      title: "삭제 실패",
      message:
        error instanceof ApiError ? error.message : "삭제에 실패했습니다.",
      type: "error",
    });
  }
};
```

**`mutate` 대신 `mutateAsync` 를 쓰세요.** `mutate` 는 에러를 삼켜서 `try/catch` 로 잡을 수 없습니다.

---

## 3. ApiError — 모든 에러가 거쳐 가는 한 가지 타입

```ts
error.message; // "올바르지 않은 아이디 혹은 비밀번호입니다." — 서버가 준 한국어
error.errorCode; // "M400" — 서버 에러 코드. 응답이 없으면 null
error.status; // 401 — HTTP 상태. 서버에 닿지 못했으면 null
error.isNetworkError;
```

변환은 `axios.ts` 인터셉터 **한 곳**에서만 일어납니다. api 함수에 `try/catch` 를 쓰지 마세요.

특정 에러를 가려내야 할 때만 코드를 봅니다.

```ts
if (error.errorCode === "M400") {
  /* ... */
}
```

백엔드 에러 코드는 도메인 접두사를 씁니다 — `M`(회원·인증), `G`(그룹), `P`(플레이스), `O`(오브젝트), `B`(블록), `S`(스토리지).

---

## 4. 왜 이렇게 정했는가

### 왜 ErrorBoundary 를 렌더링 예외에만 쓰나

ErrorBoundary 로 조회 실패까지 받으면 **화면이 통째로 대체됩니다.** 반 목록을 못 불러왔다고 헤더·네비게이션까지 사라지는 건 과합니다.

또 하나, 경계는 **영역 단위로만** 구분됩니다. "이 목록은 인라인, 저 화면은 돌려보내기" 같은 세밀한 분기를 하려면 경계를 잘게 쪼개야 하는데, 그러면 오히려 코드가 늘어납니다.

조회 실패는 **일어날 수 있는 일**이라 각 화면이 자기 맥락에 맞게 처리하는 게 맞고, 렌더링 예외는 **일어나면 안 되는 일**이라 공통 그물로 받는 게 맞습니다.

> 참고: TanStack Query 의 `useSuspenseQuery` 를 쓰면 로딩은 `Suspense`, 에러는 `ErrorBoundary` 로 자동으로 넘어갑니다. 편리하지만 **둘을 분리할 수 없습니다** — `useSuspenseQuery` 의 반환 타입에는 `isError` 가 없고 최초 실패를 던져버리기 때문입니다. 위 이유로 지금은 쓰지 않습니다.

### 왜 서버 메시지를 그대로 쓰나

백엔드가 이미 사용자용 한국어 문구를 주고 있습니다.

```json
{ "errorCode": "M400", "message": "올바르지 않은 아이디 혹은 비밀번호입니다." }
```

프론트가 코드별 문구 테이블을 따로 가지면, 백엔드에 코드가 추가될 때마다 따라가야 하고 빠뜨리면 "알 수 없는 오류"만 뜹니다. 현재 코드가 36개인데 전부 번역할 이유가 없습니다.

문구를 다듬어야 하는 경우에만 해당 `errorCode` 를 가려내 덮어씁니다.

### 왜 서버 에러까지 폼 안에 표시하나

비밀번호 오류는 기술적으로는 서버가 알려주지만, **사용자 입장에선 "내가 잘못 입력한 것"** 입니다. 입력란 바로 아래에 뜨는 게 맞습니다.

반대로 "사용자 역할을 찾지 못했습니다" 같은 건 입력과 무관하므로 모달로 보냅니다.

### 왜 자동 토스트를 만들지 않았나

`QueryCache.onError` 에 알림을 연결하면 모든 쿼리 실패가 자동으로 알려집니다. 검토했지만 **접었습니다.**

- 조회 실패는 이미 화면 안에 표시하고 있습니다. 목록이 비어 있는데 토스트만 뜨면 이유를 알 수 없으니, 화면 내 표시가 더 낫습니다. 여기에 알림을 덧씌우면 중복입니다.
- 폼 에러는 인라인으로 처리합니다.
- 남는 건 변경 실패뿐인데, 자동화할 만큼 많지 않고 호출부에서 명시적으로 쓰는 편이 읽기 쉽습니다.

실제로 폼을 인라인으로 옮기자 `useAlertModal` 사용처가 13곳에서 9곳으로 줄었습니다. **중복이 많아서가 아니라 제자리를 못 찾아서** 생긴 문제였습니다.

### 왜 api 함수에서 try/catch 를 없앴나

전부 이런 모양이었습니다.

```ts
} catch (e) {
  if (e instanceof AxiosError) { throw e; }
  throw e;   // 어느 쪽이든 같은 걸 던짐
}
```

38개가 있었지만 하는 일이 없었습니다. 일부는 `throw e.message` 로 **문자열을 던져서**, 받는 쪽에서 상태 코드도 에러 코드도 볼 수 없었습니다.

인터셉터가 모든 에러를 `ApiError` 로 바꾸므로 각 함수가 따로 감쌀 이유가 없습니다.

---

## 5. 체크리스트

- [ ] api 함수에 `try/catch` 가 없다
- [ ] 컴포넌트에서 `AxiosError` 를 import 하지 않는다 (`ApiError` 만 쓴다)
- [ ] 폼 검증 규칙이 `constants/schema.ts` 에 있다
- [ ] 변경 작업(`mutate`)이 실패했을 때 사용자가 알 수 있다
- [ ] 조회 중에 `Spinner` 가 보인다
- [ ] 조회 실패 시 화면 성격에 맞게 처리했다 (인라인 / 돌려보내기)
- [ ] `mutate` 대신 `mutateAsync` 를 썼다 (에러를 잡아야 한다면)
- [ ] 에러 문구가 서버 응답을 쓰고 있다
