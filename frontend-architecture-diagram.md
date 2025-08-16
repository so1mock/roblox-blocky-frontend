# Roblox Blocky Frontend 아키텍처 구조도

## 전체 시스템 아키텍처

```mermaid
graph TB
    subgraph FE ["Frontend (React + TypeScript)"]
        subgraph UI ["UI Layer"]
            A[ProjectPage.tsx]
            B[WorkspaceExplorer.tsx]
            C[Header.tsx]
            D[Banner.tsx]
        end
        
        subgraph HL ["Hook Layer"]
            E[useBlocklyUI.ts]
            F[useUser.ts]
            G[useTheme.tsx]
        end
        
        subgraph AL ["API Layer"]
            H[workspace.ts]
            I[block.ts]
            J[blockScript.ts]
            K[user.ts]
        end
        
        subgraph BI ["Blockly Integration"]
            L[Server Blocks]
            M[Local Blocks]
            N[Custom Theme]
            O[Toolbox]
        end
    end
    
    subgraph BE ["Backend Services"]
        P[Workspace API]
        Q[Block Management API]
        R[Block Script API]
        S[User Authentication API]
    end
    
    A --> E 
    A --> B
    B --> H
    E --> I
    E --> L
    E --> M
    E --> N
    E --> O
    A --> J
    
    H --> P
    I --> Q
    J --> R
    K --> S
    
    style A fill:#e1f5fe
    style E fill:#f3e5f5
    style L fill:#fff3e0
    style P fill:#e8f5e8
```

## 컴포넌트 계층 구조

```mermaid
graph TD
    A[App.tsx] --> B[MainLayout]
    B --> C[ProjectPage.tsx]
    
    C --> D[WorkspaceExplorer]
    C --> E[Blockly Workspace]
    C --> F[Toolbar]
    
    D --> G[WorkspaceTreeItem]
    G --> H[Toggle Buttons]
    G --> I[Script Items]
    
    E --> J[useBlocklyUI Hook]
    J --> K[Server Blocks]
    J --> L[Local Blocks]
    J --> M[Custom Toolbox]
    
    F --> N[Save Button]
    F --> O[Status Indicator]
    
    style C fill:#e3f2fd
    style D fill:#f1f8e9
    style E fill:#fff8e1
    style J fill:#fce4ec
```

## 데이터 흐름도 (useServer: true 기준)

```mermaid
sequenceDiagram
    participant U as User
    participant PP as ProjectPage
    participant WE as WorkspaceExplorer
    participant UB as useBlocklyUI
    participant API as Backend APIs
    participant BS as Blockly System
    
    Note over U,BS: 초기 로딩 플로우
    U->>PP: 페이지 접근
    PP->>WE: placeId 전달
    WE->>API: getWorkspaceData(placeId)
    API-->>WE: workspace 데이터 반환
    
    PP->>UB: useServer: true로 초기화
    UB->>API: getBlockList() 호출
    API-->>UB: 서버 블록 리스트 반환
    UB->>UB: 서버 블록들 정의
    UB->>BS: Blockly 워크스페이스 생성
    
    Note over U,BS: 스크립트 선택 및 편집 플로우
    U->>WE: 스크립트 선택
    WE->>PP: handleSelectScript 호출
    PP->>BS: 기존 블록 스크립트 로드
    U->>BS: 블록 편집
    
    Note over U,BS: 저장 플로우
    U->>PP: 저장 버튼 클릭
    PP->>BS: 워크스페이스 상태 직렬화
    PP->>API: saveBlockScript() 호출
    API-->>PP: 저장 결과 반환
    PP->>WE: 블록 스크립트 상태 업데이트
```

## 상태 관리 구조

```mermaid
graph TB
    subgraph PS ["ProjectPage State"]
        A[selectedScript]
        B[saveStatus]
        C[responseToast]
    end
    
    subgraph WS ["WorkspaceExplorer State"]
        D[workspaceData]
        E[selectedScriptId]
        F[isLoading]
        G[error]
    end
    
    subgraph US ["useBlocklyUI State"]
        H[workspaceRef]
        I[blockListByCategory]
    end
    
    subgraph BIS ["Blockly Internal State"]
        J[workspace.blocks]
        K[workspace.variables]
        L[workspace.serialization]
    end
    
    A --> D
    B --> C
    H --> J
    H --> K
    H --> L
    
    style A fill:#ffebee
    style H fill:#f3e5f5
    style J fill:#e8f5e8
```

## API 통신 구조 (useServer: true)

```mermaid
graph LR
    subgraph FAC ["Frontend API Calls"]
        A[getWorkspaceData]
        B[getBlockList]
        C[saveBlockScript]
        D[toggleBlockScriptStatus]
    end
    
    subgraph BE ["Backend Endpoints"]
        E["GET /place/{placeId}"]
        F["GET /test/block/list"]
        G["PUT /block-script/{uuid}"]
        H["PUT /block-script/activation/{uuid}"]
    end
    
    A --> E
    B --> F
    C --> G
    D --> H
    
    style A fill:#e3f2fd
    style E fill:#e8f5e8
```

## 블록 시스템 아키텍처 (Server Mode)

```mermaid
graph TB
    subgraph BDF ["Block Definition Flow"]
        A[getBlockList API] --> B[BlockListResponse]
        B --> C[defineControlBlocks]
        B --> D[defineMathBlocks]
        B --> E[defineLogicBlocks]
        B --> F[defineLoopBlocks]
        G[defineVariableBlocks] --> H[Local Variable Blocks]
    end
    
    subgraph TG ["Toolbox Generation"]
        C --> I[Control Contents]
        D --> J[Math Contents]
        E --> K[Logic Contents]
        F --> L[Loop Contents]
        H --> M[Variable Contents]
        
        I --> N[toolboxFromServer]
        J --> N
        K --> N
        L --> N
        M --> N
    end
    
    subgraph BI ["Blockly Integration"]
        N --> O[Blockly.inject]
        O --> P[Workspace Instance]
        P --> Q[Block Editor]
    end
    
    style A fill:#fff3e0
    style N fill:#f3e5f5
    style P fill:#e8f5e8
```

## 주요 기능별 컴포넌트 매핑

| 기능 | 주요 컴포넌트 | 역할 |
|------|---------------|------|
| 워크스페이스 탐색 | WorkspaceExplorer.tsx | 프로젝트 구조 표시, 스크립트 선택 |
| 블록 편집기 | useBlocklyUI.ts | Blockly 워크스페이스 초기화 및 관리 |
| 블록 정의 | server/block/*.ts | 서버에서 받은 블록 데이터로 블록 정의 |
| 툴박스 구성 | server/toolbox.ts | 서버 블록 기반 툴박스 생성 |
| 스크립트 저장 | ProjectPage.tsx | 블록 상태 직렬화 및 서버 전송 |
| API 통신 | apis/*.ts | 백엔드와의 데이터 교환 |

## 핵심 특징 (useServer: true 모드)

1. **서버 중심 블록 시스템**: 블록 정의를 서버에서 동적으로 받아와 구성
2. **실시간 동기화**: 블록 스크립트 변경사항을 실시간으로 서버에 저장
3. **타입 안전성**: TypeScript를 통한 강타입 시스템 구축
4. **모듈화된 구조**: 도메인별로 분리된 컴포넌트 및 API 구조
5. **상태 관리**: React hooks를 통한 효율적인 상태 관리
