SYSTEM 모든 응답은 반드시 한국어로 해주세요.

# Repository Guidelines

## 프로젝트 구조 및 모듈 구성

Astro 프런트엔드는 `src/`에 있으며 라우트 컴포넌트는 `src/pages/`에, 공용 레이아웃은 `src/layouts/`에, 재사용 가능한 UI는 `src/components/`에 둡니다. Markdown·MDX 가이드는 `src/content/`에 정리하고, 시각 자산은 `src/assets/`, Tailwind 확장은 `src/styles/`에 배치합니다. 알고리즘별 자료는 `insert-interval/`, `merge-intervals/` 같은 루트 폴더에 모으고, 해당 문제용 다이어그램이나 스크립트를 동일 폴더에 유지하세요. 정적 파일은 `public/`에서 그대로 서비스되며 빌드 산출물은 `dist/`로 생성됩니다.

## 빌드·테스트·개발 명령

작업 전 `npm install`로 의존성을 설치합니다. 로컬 개발은 `npm run dev`로 시작하며 http://localhost:4321 에서 핫 리로드를 제공합니다. 정적 사이트는 `npm run build`로 생성되고 충분한 Node 메모리를 확보하도록 설정되어 있습니다. 배포 전 출력물을 검수하려면 `npm run preview`를 실행하고, 추가 진단이 필요하면 `npm run astro <command>`로 Astro CLI 도구(`npm run astro check` 등)를 호출하세요.

## 코딩 스타일 및 네이밍 규칙

`prettier`와 `prettier-plugin-astro`가 강제하는 기본 포맷을 따르며 커밋 전 TypeScript·Astro·Markdown을 포맷합니다. `src/components/`에서는 PascalCase 파일명(`ExampleCard.astro`), `src/pages/`의 라우트 폴더는 케밥 케이스를 사용합니다. 스타일은 Tailwind 유틸리티 클래스를 우선 적용하고, 맞춤 CSS는 `src/styles/`에 모읍니다. 공통 상수는 `src/consts.ts`, 헬퍼 함수는 `src/utils.ts`에 보관해 중복을 줄이세요.

## 테스트 가이드라인

공식 자동화 테스트 스위트는 아직 없으므로 변경 사항은 수동 검증이 필수입니다. 기능 수정 시 `npm run dev` 상태에서 관련 페이지를 직접 확인하고, 배포 직전에는 `npm run build`가 정상 종료되는지 확인하세요. 콘텐츠를 추가하거나 개편했다면 `npm run preview`로 정적 결과를 검수하거나 `dist/` 내부 파일을 확인해 노출 상태를 점검합니다.

## 커밋 및 PR 가이드라인

커밋 메시지는 짧은 명령형으로 작성합니다(예: `update astro-icon`) 그리고 관련 변경은 하나의 커밋으로 묶습니다. PR에는 요약, 변경 동기, 영향 범위를 포함하고 UI가 바뀌면 스크린샷이나 확인 가능한 URL을 첨부하세요. 연관 이슈가 있다면 링크하고, 리뷰 요청 전에 반드시 `npm run build`가 통과했는지 확인해 배포 가능한 상태를 보장하세요.

## 콘텐츠 작성 노트

새 알고리즘 가이드는 기존 패턴처럼 별도 디렉터리(`longest-repeating-character-replacement/` 등)를 만들고, 본문은 `src/content/`에 Markdown으로 추가합니다. 게시 목록이 자동 갱신되도록 frontmatter에 제목, 태그, 게시 날짜를 빠짐없이 채웁니다. 문제와 연계된 이미지나 보조 스크립트는 동일 디렉터리에 보관해 추적성을 높이세요.
