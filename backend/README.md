# 1. dockwatch-backend

Dockwatch 프로젝트에서 클라이언트와 Agent간 통신 중계를 담당하는 WAS입니다. 컨테이너 제어 API에 대한 인증 및 인가를 담당하며, 클라이언트([dockwatch-frontend](https://github.com/jin7942/dockwatch/frontend))가 Agent에 직접 접근할 수 없도록 합니다.

[dockwatch-agent](https://github.com/jin7942/dockwatch-agent)와 동일한 구조로 제작 되었습니다.

TypeScript + Express 로 제작 되었으며, 코드 컨벤션은 [typescript-nodejs-convention.md](https://github.com/jin7942/dev-guide/blob/main/typescript-nodejs-convention.md)를 따릅니다.

dockwatch의 전체 실행 흐름및 기능, 데모를 보실려면 아래 링크로 방문하십시오.

전체 프로젝트 보기 [dockwatch](https://github.com/jin7942/dockwatch)

## 1.1. 기능 요약

-   클라이언트와 Agent간 통신 중계
-   컨테이너 제어 API 인증

## 1.2. 실행방법

```bash
git clone https://github.com/jin7942/dockwatch/backend
```

```bash
npm install
```

```bash
npm start
```

# 2. API 명세서

모든 HTTP/WS 엔드포인트와 요청/응답 형식은 [dockwatch-agent](https://github.com/jin7942/dockwatch-agent)와 동일하며 [DOCUMENT.md](https://github.com/jin7942/dockwatch-agent/blob/main/DOCUMENT.md)에 정리되어 있습니다.

# 3. 시스템 요구 사항

-   Node.js 18+

# 4. 라이선스

MIT
