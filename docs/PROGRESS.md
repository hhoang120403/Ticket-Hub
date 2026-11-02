# TicketHub — Tiến độ học

## Hồ sơ người học (cập nhật khi thay đổi)
- Đã làm React ~1 năm
- Biết NestJS cơ bản
- Chưa dùng MikroORM
- Chưa từng deploy
- Quỹ thời gian/tuần: _chưa xác định_

## Phase hiện tại: Phase 0 — Nền móng & Setup
Bắt đầu: 2026-10-27

## Task đang làm

### Học (curriculum.md — Phase 0, theo thứ tự)
- [ ] 0.1 JS runtime: event loop, Promise, async/await 🔴 — 🏋️ 3 bài
- [ ] 0.2 TypeScript cơ bản → nâng cao 🔴 — 🏋️ type-challenges, `ApiResponse<T>`, `MyPick/MyOmit/...`, `@LogExecutionTime()`
- [ ] 0.3 HTTP & REST 🟡 — 🏋️ `curl -v`, server `node:http` + CORS
- [ ] 0.4 Git chuẩn team 🟡 — 🏋️ learngitbranching, conflict merge/rebase, `rebase -i`
- [ ] 0.5 Docker & Compose 🟡 — 🏋️ Postgres có/không volume, compose Postgres + Redis + Adminer
- [ ] 0.6 SQL & PostgreSQL cơ bản 🟡 — 🏋️ 10 query, `EXPLAIN ANALYZE` trước/sau index
- [ ] 0.7 Monorepo & công cụ chất lượng code 🟡 — 🏋️ monorepo thử `apps/a`, `apps/b`, `packages/utils`
- [ ] 0.8 ERD 🟡 — 🏋️ ERD thư viện sách

### Việc trong TicketHub (roadmap — Phase 0)
- [ ] Repo GitHub `tickethub`, bảo vệ nhánh `main` (bắt buộc PR)
- [ ] Monorepo: `apps/web`, `apps/api`, `packages/shared`, `packages/eslint-config`, `packages/tsconfig`
- [ ] ESLint (flat config), Prettier, Husky + lint-staged, commitlint
- [ ] `docker-compose.yml`: Postgres, Redis, Mailpit (+ Adminer)
- [ ] `.env.example` + README hướng dẫn chạy
- [ ] ERD TicketHub (roadmap mục 2.3)
- [ ] ADR-001: Chọn monorepo
- [ ] ADR-002: Chọn MikroORM
- [ ] GitHub Project (Kanban) với issues cho Phase 1

### Tiêu chí review Phase 0 (lỗi hay gặp)
- [ ] tsconfig base bật `strict: true`
- [ ] `.env` nằm trong `.gitignore`, chỉ commit `.env.example`
- [ ] `packages/shared` không import từ `apps/*`
- [ ] ERD có đánh dấu unique + index

### Điều kiện qua phase
- [ ] **DoD:** `pnpm install && docker compose up -d && pnpm dev` → web và api cùng chạy; commit sai format bị chặn.
- [ ] **Câu hỏi kiểm tra:** tự trả lời được bằng lời của mình (chạy `kiểm tra phase 0`):
  - `type` vs `interface` khác gì? Khi nào dùng `unknown` thay vì `any`?
  - Monorepo có nhược điểm gì?
  - Rebase và merge khác nhau thế nào, khi nào không nên rebase?
- [ ] **Review:** code chính của phase đã được review, không còn 🔴 Blocker.

## Đã hoàn thành
- _(chưa có)_

## Câu hỏi kiểm tra chưa trả lời được
<!-- Chỉ ghi câu đã được hỏi nhưng trả lời chưa đạt -->
- _(chưa có)_

## Vấn đề / nợ kỹ thuật còn mở
- _(chưa có)_

## ADR đã viết
- _(chưa có)_
