# ssxkeun-blog

박성근의 블로그. [Framer 원본](https://relaxed-rule-439735.framer.app/)을 Astro로 옮긴 사이트입니다.
글은 **마크다운(md) 파일**로 쓰고, GitHub에 올리면(push) 자동으로 배포됩니다.

- 디자인: [ssxekun-designsystem](https://github.com/opensmartyouth-art/ssxekun-designsystem) 토큰(`src/styles/tokens.css`)을 그대로 사용
- 스택: Astro 5 · 마크다운 · KaTeX(수식) · GitHub Pages
- 반응형: 모바일 우선(560px 이하 / 1025px 이상 기준), 인터랙션은 아래 표 참고

---

## 1. 구축 가이드 (처음 한 번)

### 1-1. 내 컴퓨터에서 실행

```bash
git clone https://github.com/opensmartyouth-art/ssxkeun-blog.git
cd ssxkeun-blog
npm install
npm run dev        # http://localhost:4321/ssxkeun-blog/
```

Node 22 이상이 필요합니다. 글을 저장하면 브라우저가 바로 새로고침됩니다.

### 1-2. GitHub Pages 배포 켜기 (한 번만)

1. 레포 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 선택
2. `main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 빌드·배포합니다 (1~2분)
3. 주소: `https://opensmartyouth-art.github.io/ssxkeun-blog/`

### 1-3. 주소(도메인)를 바꿀 때

`astro.config.mjs` 의 `site` 와 `base` 를 수정합니다.

| 상황 | site | base |
| --- | --- | --- |
| 지금 (레포 이름 아래) | `https://opensmartyouth-art.github.io` | `/ssxkeun-blog` |
| 내 도메인 / Vercel | `https://내도메인.com` | 줄 삭제 |

### 1-4. 폴더 구조

```
src/
  content/
    posts/      ← Index 에 나오는 글 (Side Project, Project)
    notes/      ← Note 탭의 짧은 글
    archive/    ← Archive 탭의 작업물 카드(영상·이미지)
  pages/        ← 화면 (index, archive, note, blog/[slug])
  layouts/Base.astro   ← 헤더·푸터·인터랙션 스크립트
  styles/       ← tokens.css(디자인시스템) + global.css
  site.ts       ← 이력서·링크드인 주소
public/media/   ← 이미지·영상 파일
scripts/new-post.mjs   ← 새 글 뼈대 만들기
```

### 1-5. 반영된 인터랙션

| 동작 | 내용 |
| --- | --- |
| 스크롤 등장 | 섹션·목록 행이 아래에서 부드럽게 떠오름 (`reveal`) |
| 목록 호버 | 마우스를 올린 행만 진하게, 나머지는 흐려짐 |
| 헤더 | 스크롤해도 상단에 고정 (반투명 + 블러 배경) |
| 내비 | 현재 페이지는 검정, 나머지는 회색, 호버 시 검정 |
| Archive 카드 | 호버 시 살짝 확대, 영상은 화면에 보일 때만 재생 |
| 페이지 이동 | 새로고침 없는 전환 (Astro View Transitions) |
| 접근성 | 시스템의 "동작 줄이기" 설정이면 애니메이션 끔 |

---

## 2. 글 작성법 (자주 하는 일)

### 2-1. 새 글 만들기

```bash
npm run new -- "글 제목"            # Project 에 들어가는 글
npm run new -- "글 제목" side       # Side Project 에 들어가는 글
npm run new -- "짧은 메모" note     # Note 탭
```

`src/content/posts/글-제목.md` 가 만들어집니다. 직접 파일을 만들어도 됩니다. 파일 이름이 곧 주소입니다(`/blog/파일이름`).

### 2-2. 맨 위 설정(frontmatter)

```md
---
title: 디자인시스템의 수학적 연관관계   # 필수. 제목
date: 2026-10-10                        # 필수. 글 날짜
endDate: 2026-11-02                     # 선택. 기간이 있는 프로젝트면 끝 날짜
section: side                           # side(Side Project) 또는 project(Project). 기본 project
order: 3                                # 선택. 목록 순서. 작을수록 위. 같으면 최신 글이 위
tag: New                                # 선택. 제목 옆에 "· New" 로 표시
summary: 한 줄 소개                      # 선택. 검색·공유 미리보기 문구
draft: true                             # 선택. true 면 사이트에 안 나옴(작성 중)
---
```

> `draft: true` 인 글은 사이트에 노출되지 않습니다. 다 쓰면 그 줄을 지우세요.

### 2-3. 본문 문법

````md
## 큰 제목          ← 본문 안에서는 ## 부터 쓰세요 (# 는 글 제목용)
### 작은 제목

문단은 빈 줄로 나눕니다. **굵게**, [링크](https://example.com)

- 목록
- 목록

1. 번호 목록

> 인용문

| 이름 | 값 |
| --- | --- |
| 표 | 이렇게 |

`코드 한 줄`

```js
코드 블록
```

수식은 달러 기호로: 문장 속 $x^2$ 또는 블록
$$
S = \frac{C}{1 - |2L - 1|}
$$
````

### 2-4. 이미지·영상 넣기

1. 파일을 `public/media/` 에 넣습니다 (예: `public/media/my-shot.png`)
2. 본문에서 이렇게 씁니다.

```md
![설명 글](/ssxkeun-blog/media/my-shot.png)
```

주소 앞의 `/ssxkeun-blog` 는 `astro.config.mjs` 의 `base` 값입니다. 도메인을 바꿔 `base` 를 지웠다면 `/media/my-shot.png` 로 씁니다.
용량이 큰 이미지는 가로 2000px 이하·1MB 안쪽으로 줄여 올리면 빠릅니다. 영상은 mp4 를 권장합니다.

### 2-5. Archive 에 작업물 카드 추가

`src/content/archive/이름.md` 를 만듭니다.

```md
---
title: Parents Day
tools: Gemini · Claude · Antigravity · Toss Design System   # 오른쪽에 나오는 도구 목록
order: 1                                                    # 작을수록 위
media: /media/parents-day.mp4                               # public 기준 경로
mediaType: video                                            # video 또는 image
link: /blog/parents-day                                     # 선택. 클릭하면 이동할 글
---
```

### 2-6. 올리기 (배포)

```bash
git add .
git commit -m "글: 글 제목"
git push
```

push 하면 1~2분 뒤 사이트에 반영됩니다. 진행 상황은 레포의 **Actions** 탭에서 볼 수 있습니다.
GitHub 웹에서 `src/content/posts/` 에 파일을 직접 만들고 커밋해도 똑같이 배포됩니다(내 컴퓨터 없이 가능).

### 2-7. 자주 막히는 곳

| 증상 | 원인·해결 |
| --- | --- |
| 글이 안 보임 | `draft: true` 가 남아 있거나 frontmatter 의 `---` 줄이 빠짐 |
| 빌드 실패 | `title`/`date` 누락, 또는 `section` 에 side·project 외의 값 |
| 이미지가 깨짐 | 경로 앞에 `base`(`/ssxkeun-blog`)를 안 붙임 |
| 수식이 그대로 보임 | `$$` 앞뒤에 빈 줄이 없음 |
| 표가 안 그려짐 | 제목 줄 아래의 `\| --- \|` 구분 줄이 없음 |

---

## 3. 현재 상태 메모

- Index 의 글 중 `Smartyouth` 외 프로젝트 글 대부분은 원본 Framer 사이트도 템플릿 문구/빈 페이지였습니다. 제목·기간만 옮기고 본문은 "작성 중입니다." 로 두었으니 하나씩 채우면 됩니다.
- 로고 글꼴(원본 Ogg)과 디자인시스템의 Financier Display 는 상용 폰트라 비슷한 무료 서체(Cormorant Garamond)로 대체했습니다. 라이선스 폰트가 있으면 `src/styles/global.css` 의 `--font-logo` 만 바꾸면 됩니다.
- `src/site.ts` 의 `linkedin` 은 비어 있습니다(원본도 링크 없음).
