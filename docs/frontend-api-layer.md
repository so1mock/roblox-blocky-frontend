# 프론트엔드 API 레이어 구조 가이드

> COBLOCKS-47 에서 정리한 규칙입니다. 새 API 를 추가하거나 기존 호출부를 손볼 때 이 문서를 따라주세요.

---

## 1. 왜 바꿨나

도메인마다 규칙이 달랐습니다.

- 어떤 도메인은 컴포넌트에서 api 함수를 직접 부르고, 어떤 도메인은 훅을 썼습니다
- API 경로 문자열이 함수 안에 흩어져 있어, 같은 경로가 여러 파일에 중복 정의돼 있었습니다
- 쿼리 키 형식이 세 갈래였습니다 (`["/places/me"]`, `["group", id]`, `["groups", id, "boards", page]`)

세 번째 문제는 실제 버그로 이어졌습니다. 같은 그룹 리소스인데 `group` 과 `groups` 가 섞여 있어 서로 무효화되지 않았고, 그래서 **반 이름을 수정해도 그룹 목록에는 옛 이름이 남아 있었습니다.**

---

## 2. 폴더 구조

도메인(과 서브도메인)마다 같은 모양을 갖습니다.

```
src/domain/<도메인>/
├── apis/          서버 통신 함수 (axios 호출)
├── constants/
│   ├── endpoint.ts   API 경로
│   └── queryKey.ts   쿼리 키 팩토리
├── hooks/         useQuery / useMutation 래퍼
├── components/
├── types/
└── stores/
```

서브도메인(`place/workspace`, `group/board`, `group/wall` 등)도 **자기 constants 와 hooks 를 따로 갖습니다.**

---

## 3. 규칙

### 3-1. 경로는 `constants/endpoint.ts` 에만 쓴다

고정 경로는 문자열, 경로 파라미터가 있으면 함수로 만듭니다.

```ts
export const MY_PLACE_ENDPOINT = {
  LIST: "/places/me",
  THUMBNAIL_UPLOAD_URL: (placeUuid: string) =>
    `/place/${placeUuid}/thumbnail-upload-url`,
} as const;
```

함수로 만들면 인자를 빠뜨렸을 때 **런타임 404 가 아니라 타입 에러로** 잡힙니다.

**쿼리스트링은 경로에 붙이지 말고 axios `params` 로 넘깁니다.**

```ts
// ❌
api.get(`/groups/${groupUuid}/boards?page=${page}&size=${size}`);

// ✅
api.get(BOARD_ENDPOINT.LIST(groupUuid), { params: { page, size } });
```

**경로가 여러 도메인에 걸치면 한 곳에서만 정의합니다.** 예를 들어 `/place/me/:id` 는 `myPlace`(이름 수정·삭제)와 `place/workspace`(워크스페이스 조회)가 함께 쓰므로 `place/constants/endpoint.ts` 의 `PLACE_ENDPOINT` 에 두고, 파생 경로는 그걸 조합합니다.

```ts
MY_PLACE_UPDATE_TIME: (placeId: string) =>
  `${PLACE_ENDPOINT.MY_DETAIL(placeId)}/update-time`,
```

### 3-2. 컴포넌트는 api 함수를 직접 부르지 않는다

반드시 훅을 거칩니다. **GET → `useQuery`, 나머지 → `useMutation`.**

```ts
// ❌ 컴포넌트에서
const data = await getWorkspaceDataByPlaceId(placeId);
setWorkspaceData(data);

// ✅
const { data } = useWorkspaceDataQuery(placeId);
```

로딩 상태도 직접 만들지 말고 훅이 주는 값을 씁니다.

```ts
// ❌
const [isCreating, setIsCreating] = useState(false);

// ✅
const { mutateAsync, isPending } = useCreateInviteCodeMutation();
```

> **예외 1** — `src/routes/__root.tsx` 의 `beforeLoad` 와 axios 인터셉터는 React 컴포넌트 밖이라 훅을 쓸 수 없습니다. 여기서만 api 함수를 직접 호출합니다.
>
> **예외 2** — 초대 코드 발급(`useCreateInviteCodeMutation`)은 서버가 GET 이지만 버튼을 눌렀을 때만 실행되는 명령형 호출이라 mutation 으로 다룹니다. `useQuery` + `enabled: false` + `refetch()` 는 쓰지 않습니다.

### 3-3. 훅의 반환값

| 훅 종류                 | 반환                              |
| ----------------------- | --------------------------------- |
| 쿼리 하나를 감싸는 훅   | `useQuery` 결과를 **그대로** 반환 |
| 여러 쿼리를 조합하는 훅 | 필요한 값만 **골라서** 반환       |

그대로 반환하는 이유는, 나중에 `isFetching` 이나 `refetch` 가 필요해졌을 때 훅 파일을 다시 열지 않아도 되기 때문입니다. 이름이 밋밋하면 호출부에서 바꾸면 됩니다.

```ts
const { data: blockList, isLoading } = useBlockListQuery();
```

조합 훅은 반대입니다. 쿼리 4개와 분기가 들어있는 `useWorkspaceData` 는 컴포넌트에 필요한 것만 내보냅니다.

```ts
const { workspaceData, isError } = useWorkspaceData(
  placeId,
  studentId,
  readOnly,
);
```

### 3-4. 쿼리 키는 팩토리에서만 만든다

`constants/queryKey.ts` 에 정의하고, 훅에서는 호출만 합니다. 리터럴 배열을 직접 쓰지 마세요.

```ts
export const BOARD_QUERY_KEY = {
  all: (groupUuid: string) => ["groups", groupUuid, "boards"] as const,
  list: (groupUuid: string, page: number, size: number) =>
    ["groups", groupUuid, "boards", "list", { page, size }] as const,
  detail: (groupUuid: string, boardUuid: string) =>
    ["groups", groupUuid, "boards", "detail", boardUuid] as const,
};
```

**계층은 `리소스 → 식별자 → 하위 리소스 → list/detail` 순서입니다.**

TanStack Query 는 **키 앞부분이 일치하면 무효화 대상**으로 봅니다. 그래서 계층으로 쌓으면 범위를 원하는 깊이에서 고를 수 있습니다.

```ts
BOARD_QUERY_KEY.all(groupUuid); // 그 그룹 게시판 전부 (모든 페이지 + 상세)
GROUP_QUERY_KEY.group(groupUuid); // 그 그룹의 모든 것 (게시판/담벼락/멤버/플레이스)
GROUP_QUERY_KEY.detail(groupUuid); // 그룹 상세 정보만
```

`"list"` / `"detail"` 구분자를 넣는 이유는, 없으면 `[..., "boards", boardUuid]` 와 `[..., "boards", page]` 가 같은 자리에서 헷갈리기 때문입니다.

### 3-5. mutation 은 성공 시 관련 쿼리를 무효화한다

변경 후 직접 다시 불러오지 말고, 낡았다고 표시만 합니다. 그 쿼리를 구독 중인 컴포넌트가 알아서 새로 받아옵니다.

```ts
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY.all(groupUuid) });
},
```

**무효화 범위는 넉넉하게 잡습니다.** 예전에는 `[..., "boards", 0]` 처럼 0페이지만 무효화해서, 2페이지에서 글을 지우면 화면이 갱신되지 않는 버그가 있었습니다. 목록에 글이 늘거나 줄면 페이지 구성이 통째로 밀리므로 전체를 무효화하는 게 맞습니다.

**한 화면에 여러 곳에 보이는 데이터는 모두 무효화합니다.** 반 이름은 상세 화면과 그룹 목록 양쪽에 나오므로 둘 다 무효화해야 합니다.

```ts
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.detail(id) });
  queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.myList() });
},
```

### 3-6. staleTime / retry

전역 기본값은 `src/routes/__root.tsx` 의 QueryClient 에 있습니다. 데이터 성격이 특별할 때만 훅에서 덮어씁니다.

```ts
// 블록 정의는 거의 바뀌지 않는다
staleTime: 1000 * 60 * 10,
```

### 3-7. 네이밍

| 대상       | 규칙                      | 예                       |
| ---------- | ------------------------- | ------------------------ |
| 조회 훅    | `use<대상>Query`          | `useGroupMembersQuery`   |
| 변경 훅    | `use<동작><대상>Mutation` | `useCreateBoardMutation` |
| 조합 훅    | `use<대상>`               | `useWorkspaceData`       |
| 엔드포인트 | `<도메인>_ENDPOINT`       | `BOARD_ENDPOINT`         |
| 쿼리 키    | `<도메인>_QUERY_KEY`      | `BOARD_QUERY_KEY`        |

**파일명은 export 이름과 정확히 같게 합니다.** 한 파일에 훅 하나입니다.

> 파일 이름을 대소문자만 바꿀 때는 주의하세요. Windows 는 대소문자를 구분하지 않아 `git mv` 가 무시됩니다. 임시 이름을 거쳐 두 번에 나눠 옮겨야 git 에 기록되고, 안 그러면 리눅스 CI 에서 "파일 없음" 으로 터집니다.
>
> ```bash
> git mv useBlocklyUi.ts useBlocklyUI.tmp
> git mv useBlocklyUI.tmp useBlocklyUI.ts
> ```

---

## 4. 새 API 추가하는 법

서버에 `GET /groups/{uuid}/notices` 가 생겼다고 해봅시다.

**1) 경로를 추가합니다** — `group/constants/endpoint.ts`

```ts
export const GROUP_ENDPOINT = {
  // ...
  NOTICES: (groupUuid: string) => `/groups/${groupUuid}/notices`,
} as const;
```

**2) api 함수를 작성합니다** — `group/apis/group.ts`

```ts
export const getGroupNotices = async (groupUuid: string): Promise<Notice[]> => {
  const response = await api.get(GROUP_ENDPOINT.NOTICES(groupUuid));
  return response.data.notices;
};
```

**3) 쿼리 키를 추가합니다** — `group/constants/queryKey.ts`

```ts
export const GROUP_QUERY_KEY = {
  // ...
  notices: (groupUuid: string) => ["groups", groupUuid, "notices"] as const,
};
```

**4) 훅을 만듭니다** — `group/hooks/useGroupNoticesQuery.ts`

```ts
import { useQuery } from "@tanstack/react-query";
import { getGroupNotices } from "../apis/group";
import { GROUP_QUERY_KEY } from "../constants/queryKey";

export const useGroupNoticesQuery = (groupUuid: string) => {
  return useQuery({
    queryKey: GROUP_QUERY_KEY.notices(groupUuid),
    queryFn: () => getGroupNotices(groupUuid),
    enabled: !!groupUuid,
  });
};
```

**5) 컴포넌트에서 씁니다**

```ts
const { data: notices, isLoading } = useGroupNoticesQuery(groupUuid);
```

공지를 만드는 mutation 을 추가한다면 `onSuccess` 에서 `GROUP_QUERY_KEY.notices(groupUuid)` 를 무효화하면 됩니다.

---

## 5. 참고: 폴링이 필요한 경우

블록 편집기는 다른 사람의 수정을 반영해야 해서 5초마다 서버를 확인합니다. 워크스페이스 전체 데이터는 무거우므로, **가벼운 "최종 수정 시각" 엔드포인트만 폴링**합니다.

```ts
// 가벼운 쪽: 주기적으로 확인
refetchInterval: WORKSPACE_POLLING_INTERVAL,
```

그리고 받아온 시각을 **무거운 쿼리의 키에 포함**시킵니다.

```ts
queryKey: WORKSPACE_QUERY_KEY.myDetail(placeId, lastUpdatedTime),
```

키가 같으면 캐시를 재사용하고, 서버에서 수정이 일어나 시각이 바뀌면 키가 달라져 자동으로 다시 받아옵니다. **"내 데이터가 최신인가" 를 직접 비교할 필요가 없어집니다.**

> 이 구조를 쓸 때 주의점: 쿼리는 브라우저 탭에 다시 돌아오면 자동으로 재조회합니다. 재조회 결과로 effect 가 다시 실행되면 안 되는 작업(예: `Blockly.inject`)이 있다면 가드를 두세요.
>
> ```ts
> if (workspaceRef.current) return; // 이미 주입됨
> ```

---

## 6. 체크리스트

PR 올리기 전에 확인해주세요.

- [ ] api 파일에 경로 문자열 리터럴이 없다 (전부 `*_ENDPOINT` 경유)
- [ ] 훅에 쿼리 키 리터럴 배열이 없다 (전부 `*_QUERY_KEY` 경유)
- [ ] 컴포넌트에서 api 함수를 직접 부르지 않는다
- [ ] 로딩·에러 상태를 `useState` 로 따로 만들지 않았다
- [ ] mutation 이 관련 쿼리를 빠짐없이 무효화한다 (여러 화면에 보이는 데이터 포함)
- [ ] 파일명과 export 이름이 같다
- [ ] `pnpm build` 통과
