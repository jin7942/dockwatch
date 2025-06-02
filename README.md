# Dockwatch

[ver: 0.9.0](https://github.com/jin7942/dockwatch)

Dockwatch는 컨테이너 및 서버 모니터링 시스템으로, 실시간 리소스 사용 현황, 실시간 로그 등을 한눈에 확인할 수 있는 솔루션입니다. 사용자가 컨테이너 및 서버의 상태를 시각적으로 관리하고 확인할 수 있도록 도와줍니다.

Dockwatch 프로젝트는 백엔드, 프론트, 에이전트로 구성되어 있으며, 에이전트는 별도 리포지토리로 관리하고 있습니다. 자세한 내용은 다음 링크를 방문 하십시오. [dockwatch-agent](https://github.com/jin7942/dockwatch-agent)

해당 프로젝트는 TypeScript + Express 로 제작 되었으며, 코드 컨벤션은 [typescript-nodejs-convention.md](https://github.com/jin7942/dev-guide/blob/main/typescript-nodejs-convention.md)를 따릅니다.

## 주요 기능

-   서버 리소스 모니터링(CPU, Memory, Network 등)
-   컨테이너별 실시간 로그 제공
-   Client <-> WAS <-> Agent 아키텍처로 보안성 강화
-   컨테이너 정보 및 배포상태 제공

## 기술스택

-   백엔드: Node.js, Express(REST API, WebSocket)
-   프론트엔드: React, Vite, Mui
-   운영환경: Ubuntu

## 실행 방법

```bash
git clone https://github.com/jin7942/dockwatch
cd backend # or frontend
npm install
npm run start
```

# API 명세

모든 HTTP/WS 엔드포인트와 요청/응답 형식은 별도 문서인 [DOCUMENT.md](https://github.com/jin7942/dockwatch-agent/DOCUMENT.md)에 정리되어 있습니다.

# 프로젝트 구조

전체 계층 구조 설명

## 실행 흐름

TODO: 다이어그램 삽입

### 백엔드

### Agent

## 디렉터리 구조

**백엔드**

```bash
src/
├── app.ts
├── index.ts
├── common
│   ├── _config
│   │   └── constants.ts
│   ├── error
│   │   ├── custom-error.ts
│   │   └── error-handler.ts
│   ├── middleware
│   │   ├── agent-api.ts
│   │   ├── async-handler.ts
│   │   └── verify-control-key.ts
│   ├── types
│   │   ├── http-status.enum.ts
│   │   ├── response.vo.ts
│   │   └── ws.vo.ts
│   └── utils
│       ├── create-util.ts
│       ├── parser-util.ts
│       └── ws-util.ts
├── container
│   ├── controller
│   │   ├── container-http.controller.ts
│   │   └── container-ws.controller.ts
│   ├── dto
│   │   ├── container-http.dto.ts
│   │   └── container-http.vo.ts
│   ├── route
│   │   ├── container-http.route.ts
│   │   └── container-ws.route.ts
│   └── service
│       └── container-http.service.ts
├── dashboard
│   ├── controller/
│   ├── dto/
│   ├── route/
│   └── service/
├── log
│   ├── controller/
│   ├── dto/
│   ├── route/
│   └── service/
├── server
│   ├── controller/
│   ├── dto/
│   ├── route/
│   └── service/
└── ws
    └── socket.ts
```

**프론트엔드**

```bash
src/
├── App.tsx
├── common
│   ├── _config
│   │   └── constants.ts
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   ├── hooks
│   │   └── useWs.ts
│   └── lib
│       ├── axios.ts
│       └── ws.ts
├── domains
│   ├── container
│   │   ├── pages
│   │   │   ├── ContainerDetailPage.tsx
│   │   │   └── ContainerPage.tsx
│   ├── dashboard
│   │   ├── pages/
│   ├── log
│   │   ├── pages/
│   └── server
│       ├── pages/
├── layouts
│   └── Layout.tsx
├── main.tsx
├── router
│   └── index.tsx
└── theme
    └── index.ts

```

# 기여 방법

# 시스템 요구 사항

# 라이선스

MIT
