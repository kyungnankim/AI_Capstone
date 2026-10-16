# AI Capstone

HTML·CSS·JavaScript로 작성한 AI Capstone 학습 웹사이트입니다. Node.js 빌드 과정은 소스 HTML을 `dist/index.html`로 복사하며 외부 패키지는 필요하지 않습니다.

## 화면

1. 전체 흐름: 사용자 질문 → HTTP 요청 → API → 분류·계획·조사·분석·작성·검증 → 최종 응답
2. RAG 흐름: 문서 준비·청킹·임베딩·색인·검색·답변
3. 목차별 공부
4. 개념 연결
5. 동기·비동기: 프린터 대기와 다른 작업을 비교하고 async·await 코드와 연결
6. FastAPI·Uvicorn: Mac 개발 환경 준비, 서버 실행 설정, 정상 요청과 구체적인 HTTP 422 오류
7. MCP: DB 장애 증상에서 Prompt·Resource·Tool 호출을 거쳐 답변이 만들어지는 12단계
8. 전체 구성·학습 지도: ADR부터 운영·평가까지 주제 관계와 실행 구조

## 로컬 실행

Node.js 20 이상에서:

```bash
npm run dev
```

`http://127.0.0.1:4173`에 접속합니다. 또는 `src/index.html`을 브라우저에서 직접 열 수 있습니다.

```bash
npm run build
```

배포할 파일은 `dist/index.html`입니다. Vercel은 이 저장소의 `vercel.json` 설정을 사용합니다.

## 검증

Node.js와 Python 3가 필요합니다. 외부 Python 패키지는 쓰지 않습니다.

```bash
npm test
```

실제 HTML의 요소 ID와 메뉴 이벤트 연결, 내부 상태 변화, API 오류 화면, 설정 화면, MCP 단계 순서를 검사합니다. 테스트는 DOM 테스트 더블을 사용하는 로직 검증이며 실제 브라우저 렌더링 테스트는 아닙니다.

## 범위

이 웹사이트는 브라우저 안에서 동작하는 학습 시뮬레이션입니다. 운영 DB, 실제 LLM, MCP 서버에 연결하거나 DB를 재시작하지 않습니다. CPU 44.9% 등의 값은 학습 예시입니다. FastAPI 메뉴의 Python 코드는 사용자가 별도의 로컬 환경에서 실행할 수 있도록 안내합니다.

## 소스 구조

- `src/index.html`: 모든 화면·스타일·상호작용을 포함한 소스
- `scripts/build.mjs`: 정적 배포 파일 생성
- `scripts/serve.mjs`: 로컬 개발 서버
- `tests/`: 실제 HTML 구조와 동작을 검사하는 테스트
- `vercel.json`: Vercel 정적 배포 설정
