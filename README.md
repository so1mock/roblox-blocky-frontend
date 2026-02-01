# CoBlocks

**로블록스 코드 시각화(블록 코딩) 교육 서비스**  
게임 개발 도구인 **로블록스 스튜디오**의 코딩 과정을 시각화하여 코딩 원리를 배울 수 있는 교육 서비스입니다.

> 🏆 [2026 소프트웨어 마에스트로 우수작품 선정](https://swmaestro.ai/sw/singl/projectIntc/list.do?menuNo=200013)

---

## 목차
1. [Project Background & Purpose](#project-background--purpose)
2. [Key Features](#key-features)
3. [Demo Video](#demo-video)
4. [Architecture](#architecture)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [Getting Started](#getting-started)

---

## Project Background & Purpose <a id="project-background--purpose"></a>
전 세계적으로 인기를 끌고 있는 **로블록스 (DAU 9,800만)**는 전체 사용자의 약 1/3이 청소년입니다.  
본 프로젝트는 로블록스 스튜디오의 코딩 과정을 시각화하여 학생들이 복잡한 스크립트를 직관적으로 이해하고 학습할 수 있도록 돕는 것을 목적으로 합니다.

---

## Key Features <a id="key-features"></a>

### 1️⃣ 블록 조립 & 블록 코드 → Lua 변환
블록 조립 시 자동으로 Lua 코드로 변환되어 **코딩 원리 학습**을 직관적으로 지원합니다.  

<img width="684" height="371" alt="블록 조립 & Lua 변환" src="https://github.com/user-attachments/assets/e1f72ebe-aeaf-4ab1-b56f-96706149bfb7" />

---

### 2️⃣ 스튜디오 탐색기 구조 동기화
로블록스 스튜디오의 탐색기 구조와 프로젝트 구조를 동기화하여 **실제 스튜디오 환경 이해**를 돕습니다.  

<img width="684" height="426" alt="탐색기 구조 동기화 1" src="https://github.com/user-attachments/assets/f687f1cf-ee92-43c9-9288-0c0037fad231" />
<img width="684" height="426" alt="탐색기 구조 동기화 2" src="https://github.com/user-attachments/assets/32081826-e860-48c7-8bb2-7b39dccec872" />

---

### 3️⃣ 수업 반 기능
학생별 수업 반과 진행 상황을 관리하여 **체계적인 수업 운영**이 가능합니다.  

<img width="684" height="371" alt="수업 반 기능 1" src="https://github.com/user-attachments/assets/60896482-72bb-46ed-909f-cb04d5d5686d" />
<img width="684" height="371" alt="수업 반 기능 2" src="https://github.com/user-attachments/assets/dce0cd18-dd67-45b8-bb18-e03d48ecec4a" />

---

## Demo Video <a id="demo-video"></a>
[🎬 YouTube 시연 영상](https://www.youtube.com/watch?v=J_P8y_IJGWk)

---

## Architecture <a id="architecture"></a>
<img width="823" height="470" alt="architecture" src="https://github.com/user-attachments/assets/b9d9a9bf-5a30-42e3-bd18-8216575ce2df" />

---

## Tech Stack <a id="tech-stack"></a>

### Operating System
- Windows 22H2 (빌드 19045.6466)
- MacOS Sequoia 15.3.2 (24D81)
- Linux Ubuntu 24.04.2 LTS

### IDE / Tools
- IntelliJ IDEA 2024.3.5 (Ultimate Edition)
- Visual Studio Code 1.105.1 (Universal)
- Roblox Studio 0.698.1.6980943 (arm64)

### Web & Frontend
- HTML5 / CSS3
- Tailwind CSS 4.1.10
- JavaScript (ES2020/ES11)
- TypeScript 5.8.3
- React 19.1.0
- Google Blockly 12

### Backend & Server
- Java (OpenJDK 21.0.8)
- Spring Boot 3.3.4
- AWS SDK 2.28.25

---

## Project Structure <a id="project-structure"></a>

```plaintext
/CoBlocks
├─ /src
│  ├─ /assets          # 이미지, 아이콘, SVG 등 리소스
│  ├─ /domain          # 프로젝트 핵심 도메인 단위로 의미 있게 구분
│  │  ├─ /group        # 그룹 관련 기능 (API, components, hooks 등)
│  │  ├─ /myPlace      # MyPlace 관련 기능
│  │  ├─ /place        # Place 관련 기능
│  │  └─ /user         # 사용자 관련 기능
│  │     ├─ /apis      # 도메인 단위 API 호출 함수
│  │     ├─ /components # 도메인 단위 UI 컴포넌트
│  │     ├─ /hooks      # 도메인 단위 커스텀 React Hooks
│  │     ├─ /types      # 도메인 단위 타입 정의
│  │     └─ /utils      # 도메인 단위 유틸 함수
│  ├─ /blockly         # Google Blockly 관련 파일 모음
│  │  ├─ /blocks       # 각 기능별 블록 정의 (dynamic, static, color, logic 등)
│  │  ├─ /categories   # 블록 카테고리 정의
│  │  └─ /theme        # Blockly 테마 커스터마이징
│  ├─ /common          # 공통 모듈 (도메인에 관계없이 사용하는 범용 기능)
│  │  ├─ /apis         # 공통 API 호출 함수
│  │  ├─ /components   # 재사용 가능한 UI 컴포넌트
│  │  ├─ /hooks        # 공통 Hooks
│  │  ├─ /types        # 공통 TypeScript 타입 정의
│  │  └─ /utils        # 공통 유틸 함수
│  ├─ /routes          # React 라우팅
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css / App.css
│  └─ vite-env.d.ts
└─ .gitignore



---

## Getting Started <a id="getting-started"></a>
```bash
git clone https://github.com/username/CoBlocks.git
cd CoBlocks
pnpm install
# .env 파일 필요
pnpm run dev
