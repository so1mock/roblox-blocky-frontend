# Roblox Blocky Frontend - 기술 구조 보고서

## 📋 목차
1. [개요](#개요)
2. [시스템 아키텍처](#시스템-아키텍처)
3. [컴포넌트 구조](#컴포넌트-구조)
4. [데이터 플로우](#데이터-플로우)
5. [API 설계](#api-설계)
6. [블록 시스템](#블록-시스템)
7. [상태 관리](#상태-관리)
8. [기술적 특징](#기술적-특징)

## 개요

Roblox Blocky Frontend는 React + TypeScript 기반의 비주얼 프로그래밍 인터페이스입니다. 본 보고서는 `useServer: true` 모드를 기준으로 한 시스템 구조를 다룹니다.

### 핵심 기술 스택
- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Tailwind CSS
- **Block Engine**: Blockly (Google)
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Routing**: TanStack Router

## 시스템 아키텍처

### 전체 아키텍처 개요

```
┌─────────────────── Frontend Application ───────────────────┐
│                                                             │
│  ┌─── UI Layer ───┐  ┌─── Business Logic ───┐  ┌─── API ───┐  │
│  │ • ProjectPage  │  │ • useBlocklyUI       │  │ • axios   │  │
│  │ • Explorer     │  │ • State Management   │  │ • types   │  │
│  │ • Components   │  │ • Hooks              │  │ • apis    │  │
│  └────────────────┘  └─────────────────────┘  └───────────┘  │
│                                                             │
│  ┌───────────────── Blockly Integration ─────────────────┐   │
│  │ • Server Blocks Definition                           │   │
│  │ • Custom Toolbox Configuration                       │   │
│  │ • Theme & Styling                                    │   │
│  │ • Workspace Management                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────── Backend Services ──────────────────────┐
│ • Workspace API (/place/{placeId})                        │
│ • Block Management API (/test/block/list)                 │
│ • Block Script API (/block-script/{uuid})                 │
│ • Authentication API                                      │
└───────────────────────────────────────────────────────────┘
```

### 레이어별 책임

| 레이어 | 책임 | 주요 구성요소 |
|--------|------|---------------|
| UI Layer | 사용자 인터페이스 렌더링 | ProjectPage, WorkspaceExplorer, Components |
| Business Logic | 비즈니스 로직 처리 | useBlocklyUI, Custom Hooks |
| API Layer | 백엔드 통신 | axios 기반 API 클라이언트 |
| Blockly Integration | 블록 에디터 통합 | Server Block Definitions, Toolbox |

## 컴포넌트 구조

### 컴포넌트 계층도

```
App
└── MainLayout
    └── ProjectPage (메인 컨테이너)
        ├── WorkspaceExplorer (좌측 사이드바)
        │   └── WorkspaceTreeItem (트리 아이템)
        │       ├── Script Toggle
        │       └── Block Script Status
        ├── Blockly Workspace (중앙 에디터)
        │   └── useBlocklyUI Hook
        │       ├── Server Block Definitions
        │       ├── Toolbox Configuration
        │       └── Workspace Manager
        └── Toolbar (상단 툴바)
            ├── Save Button
            ├── Status Indicator
            └── Response Toast
```

### 주요 컴포넌트 상세

#### 1. ProjectPage.tsx
```typescript
// 주요 상태
const [selectedScript, setSelectedScript] = useState<WorkspaceObject | null>(null);
const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
const [responseToast, setResponseToast] = useState<{content: string, show: boolean}>();

// 핵심 기능
- 스크립트 선택 및 로딩
- 블록 스크립트 저장
- 상태 관리 및 UI 통합
```

#### 2. useBlocklyUI Hook
```typescript
// 서버 모드 초기화 로직
if (options?.useServer === true) {
  // 1. 서버에서 블록 리스트 가져오기
  blockListByCategory = await getBlockList();
  
  // 2. 카테고리별 블록 정의
  defineControlBlocks(blockListByCategory[0].blocks);
  defineMathBlocks(blockListByCategory[1].blocks);
  defineLogicBlocks(blockListByCategory[2].blocks);
  defineLoopBlocks(blockListByCategory[3].blocks);
  
  // 3. Blockly 워크스페이스 생성
  const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
    toolbox: toolboxFromServer(blockListByCategory),
    theme: customTheme,
  });
}
```

## 데이터 플로우

### 1. 초기화 플로우 (useServer: true)

```
사용자 페이지 접근
    ↓
ProjectPage 마운트
    ↓
WorkspaceExplorer 초기화 → getWorkspaceData(placeId) API 호출
    ↓
useBlocklyUI 초기화 → getBlockList() API 호출
    ↓
서버 블록 정의 → defineXXXBlocks() 실행
    ↓
Blockly 워크스페이스 생성 → toolboxFromServer() 생성
    ↓
편집기 준비 완료
```

### 2. 스크립트 편집 플로우

```
사용자 스크립트 선택
    ↓
WorkspaceExplorer.handleSelectScript()
    ↓
ProjectPage.handleSelectScript()
    ↓
기존 블록 스크립트 파싱 및 로드
    ↓
Blockly 워크스페이스에 블록 표시
    ↓
사용자 블록 편집
```

### 3. 저장 플로우

```
사용자 저장 버튼 클릭
    ↓
ProjectPage.handleSave()
    ↓
Blockly.serialization.workspaces.save() → 워크스페이스 직렬화
    ↓
saveBlockScript(uuid, jsonString) API 호출
    ↓
서버 응답 처리 → 상태 업데이트
    ↓
사용자 피드백 표시 (토스트)
```

## API 설계

### API 엔드포인트 맵핑

| Frontend API 함수 | HTTP Method | Backend Endpoint | 용도 |
|-------------------|-------------|------------------|------|
| `getWorkspaceData()` | GET | `/place/{placeId}` | 워크스페이스 구조 조회 |
| `getBlockList()` | GET | `/test/block/list` | 서버 블록 정의 조회 |
| `saveBlockScript()` | PUT | `/block-script/{uuid}` | 블록 스크립트 저장 |
| `toggleBlockScriptStatus()` | PUT | `/block-script/activation/{uuid}` | 블록 스크립트 활성화 토글 |
| `parseBlocks()` | POST | `/test/block/parse` | 블록 구조 파싱 |

### 데이터 타입 정의

```typescript
// 워크스페이스 객체
interface WorkspaceObject {
  uuid: string;
  name: string;
  type: string;
  children: WorkspaceObject[];
  isBlockScriptEnabled?: boolean;
  blockScript?: string;
}

// 블록 리스트 응답
interface BlockListResponse {
  categoryName: string;
  blocks: BlockDefinition[];
}

// 워크스페이스 데이터
interface WorkspaceData {
  placeSummary: PlaceSummary;
  objects: WorkspaceObject[];
}
```

## 블록 시스템

### 서버 기반 블록 시스템 아키텍처

```
서버 블록 파이프라인:
getBlockList() API
    ↓
BlockListResponse[] (카테고리별 분류)
    ↓
카테고리별 블록 정의 함수들
├── defineControlBlocks()
├── defineMathBlocks()
├── defineLogicBlocks()
└── defineLoopBlocks()
    ↓
toolboxFromServer() → 통합 툴박스 생성
    ↓
Blockly.inject() → 워크스페이스 생성
```

### 블록 카테고리 구성

1. **수식 (Math Category)**
   - 서버에서 정의된 수학 연산 블록들
   - 기본 사칙연산, 고급 수학 함수 등

2. **논리 (Logic Category)**
   - 조건문, 비교 연산자
   - Boolean 값 처리 블록들

3. **제어 (Control Category)**
   - 프로그램 흐름 제어
   - if-else, switch 문 등

4. **반복 (Loop Category)**
   - 다양한 반복문 구조
   - for, while, repeat 등

5. **변수 (Variable Category)**
   - 로컬에서 정의 (서버 독립적)
   - 타입별 변수 생성 지원

### 변수 시스템 특징

```typescript
// 타입별 변수 생성 함수
const createTypedVariable = (workspace: Blockly.WorkspaceSvg) => {
  const typeMap = {
    "1": "String",
    "2": "Number", 
    "3": "Boolean",
    "4": "Array",
    "5": "Object"
  };
  
  // 사용자 선택에 따른 타입 지정
  const variable = workspace.createVariable(variableName, selectedType);
  (variable as any).blocklyType = selectedType;
};
```

## 상태 관리

### 상태 구조 및 흐름

```typescript
// ProjectPage 상태
{
  selectedScript: WorkspaceObject | null,
  saveStatus: 'idle' | 'saving' | 'success' | 'error',
  responseToast: { content: string, show: boolean }
}

// WorkspaceExplorer 상태  
{
  workspaceData: WorkspaceData | null,
  selectedScriptId: string,
  isLoading: boolean,
  error: string | null
}

// useBlocklyUI 상태
{
  workspaceRef: React.RefObject<Blockly.WorkspaceSvg>
}
```

### 상태 동기화 메커니즘

1. **Top-down 데이터 플로우**: Props를 통한 데이터 전달
2. **Callback 기반 상태 업데이트**: 자식 컴포넌트에서 부모로의 상태 변경
3. **Ref 기반 직접 접근**: Blockly 워크스페이스 조작

## 기술적 특징

### 1. 서버 중심 아키텍처
- **동적 블록 정의**: 런타임에 서버에서 블록 구조를 받아와 정의
- **확장성**: 새로운 블록 타입을 서버에서 쉽게 추가 가능
- **일관성**: 모든 클라이언트가 동일한 블록 세트 사용

### 2. 타입 안전성
- **TypeScript 활용**: 컴파일 타임 에러 검출
- **API 타입 정의**: 백엔드 통신 시 타입 안전성 보장
- **인터페이스 기반 설계**: 명확한 컴포넌트 간 계약

### 3. 성능 최적화
- **지연 로딩**: 필요한 시점에만 블록 스크립트 로드
- **상태 분리**: 각 컴포넌트별 독립적인 상태 관리
- **메모이제이션**: 불필요한 리렌더링 방지

### 4. 사용자 경험
- **실시간 피드백**: 저장 상태 실시간 표시
- **에러 핸들링**: 친화적인 에러 메시지 및 복구 메커니즘
- **직관적 UI**: 토글, 드래그 앤 드롭 등 직관적 인터랙션

### 5. 확장성 및 유지보수성
- **모듈화된 구조**: 기능별 분리된 파일 구조
- **재사용 가능한 컴포넌트**: 공통 컴포넌트 추상화
- **설정 기반 초기화**: `useServer` 플래그를 통한 유연한 모드 전환

## 결론

Roblox Blocky Frontend는 서버 중심의 블록 정의 시스템을 통해 높은 확장성과 일관성을 제공하며, React의 선언적 UI와 TypeScript의 타입 안전성을 활용하여 안정적이고 유지보수하기 쉬운 아키텍처를 구축했습니다. `useServer: true` 모드는 특히 엔터프라이즈 환경에서 중앙 집중식 블록 관리와 일관된 사용자 경험을 제공하는 데 최적화되어 있습니다.
