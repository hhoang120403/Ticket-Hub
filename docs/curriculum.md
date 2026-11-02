# 📖 Giáo trình chi tiết theo phase — TicketHub

> File đi kèm `roadmap-middle-fullstack.md`. Roadmap nói **làm gì**, file này nói **học gì, học theo thứ tự nào, đọc/xem ở đâu và luyện ra sao**.

## Cách dùng file này

**Học theo đúng thứ tự** các chủ đề trong mỗi phase. Mỗi chủ đề có:

- **Mức độ cần nắm**
  - 🟢 **Biết**: hiểu khái niệm, biết nó tồn tại và để làm gì.
  - 🟡 **Dùng được**: tự viết được code dùng nó, không cần xem lại tutorial.
  - 🔴 **Hiểu sâu**: giải thích được cơ chế bên trong, trade-off, và debug được khi nó sai.
- 📄 **Đọc**: docs hoặc bài viết. Ưu tiên docs chính thức.
- 🎬 **Xem**: video.
- 🏋️ **Bài tập nhỏ**: làm trong thư mục `playground/` ở ngoài TicketHub, để luyện riêng khái niệm đó trước.
- 🎫 **Áp vào TicketHub**: chỗ dùng kiến thức này trong dự án chính.

**Về link video:** video cụ thể trên YouTube rất hay bị gỡ hoặc đổi link, nên phần lớn link 🎬 là **link tìm kiếm theo chủ đề**. Hãy ưu tiên các kênh sau:

| Kênh | Mạnh về |
|---|---|
| Fireship | Tổng quan nhanh ("in 100 seconds") |
| Matt Pocock | TypeScript |
| Web Dev Simplified | React, JS cơ bản |
| Jack Herrington | React, Next.js nâng cao |
| Marius Espejo | NestJS |
| Hussein Nasser | Database, backend internals |
| ByteByteGo | System design |
| CodeOpinion (Derek Comartin) | DDD, event-driven, microservices |
| TechWorld with Nana | Docker, DevOps |

**Quy tắc vàng:** đọc docs trước, xem video sau. Video giúp hiểu nhanh, còn docs mới cho độ chính xác.

---

## Mục lục
- [Phase 0 — Nền móng & Setup](#phase-0--nền-móng--setup)
- [Phase 1 — NestJS + MikroORM core](#phase-1--nestjs--mikroorm-core)
- [Phase 2 — Authentication & Authorization](#phase-2--authentication--authorization)
- [Phase 3 — React & Next.js App Router](#phase-3--react--nextjs-app-router)
- [Phase 4 — Clean Architecture, DDD & Design Patterns](#phase-4--clean-architecture-ddd--design-patterns)
- [Phase 5 — Concurrency, Async & Realtime](#phase-5--concurrency-async--realtime)
- [Phase 6 — Testing](#phase-6--testing)
- [Phase 7 — Microservices](#phase-7--microservices)
- [Phase 8 — DevOps & Observability](#phase-8--devops--observability)
- [Phase 9 — Tối ưu, System Design & Portfolio](#phase-9--tối-ưu-system-design--portfolio)
- [Module tùy chọn A, B, C](#module-tùy-chọn)

---

## Phase 0 — Nền móng & Setup

### 0.1 JavaScript runtime: event loop, Promise, async/await — 🔴 Hiểu sâu
- 📄 https://javascript.info/event-loop
- 📄 https://javascript.info/async (cả chương Promises, async/await)
- 📄 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- 🎬 Philip Roberts – *What the heck is the event loop anyway?*: https://www.youtube.com/watch?v=8aGhZQkoFbQ
- 🎬 https://www.youtube.com/results?search_query=lydia+hallie+javascript+event+loop+visualized
- 🏋️ Bài tập:
  1. Viết đoạn code trộn `setTimeout`, `Promise.resolve().then`, `queueMicrotask`, `console.log`. **Đoán thứ tự in ra trước**, rồi mới chạy.
  2. Viết hàm `sleep(ms)` trả về Promise, rồi `retry(fn, times, delayMs)` có exponential backoff.
  3. So sánh `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any` bằng ví dụ có 1 promise bị reject.
- 🎫 Hiểu chủ đề này là nền tảng cho queue, retry và webhook ở Phase 5.

### 0.2 TypeScript cơ bản → nâng cao — 🔴 Hiểu sâu
Học theo thứ tự: types cơ bản → narrowing → generics → utility types → conditional/mapped types → decorators.
- 📄 Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- 📄 Narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- 📄 Generics: https://www.typescriptlang.org/docs/handbook/2/generics.html
- 📄 Utility types: https://www.typescriptlang.org/docs/handbook/utility-types.html
- 📄 Conditional types: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
- 📄 Mapped types: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
- 📄 Decorators: https://www.typescriptlang.org/docs/handbook/decorators.html
- 📄 Total TypeScript (bài miễn phí): https://www.totaltypescript.com/tutorials
- 🎬 https://www.youtube.com/results?search_query=matt+pocock+typescript+generics
- 🎬 https://www.youtube.com/results?search_query=typescript+discriminated+unions+explained
- 🏋️ Bài tập:
  1. Làm 20 bài đầu ở **type-challenges** (mức easy và vài bài medium): https://github.com/type-challenges/type-challenges
  2. Định nghĩa type `ApiResponse<T>` là discriminated union `{ ok: true; data: T } | { ok: false; error: string }`, rồi viết hàm xử lý có narrowing đúng.
  3. Tự viết lại `MyPick`, `MyOmit`, `MyPartial`, `MyReadonly`.
  4. Viết một method decorator `@LogExecutionTime()` in ra thời gian chạy của method.
- 🎫 Dùng ở mọi nơi. Riêng decorators là nền cho NestJS và MikroORM.

### 0.3 HTTP & REST — 🟡 Dùng được
- 📄 https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
- 📄 Status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- 📄 Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- 📄 CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- 📄 Caching: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
- 🎬 https://www.youtube.com/results?search_query=http+crash+course
- 🎬 https://www.youtube.com/results?search_query=cors+explained+fireship
- 🏋️ Bài tập:
  1. Dùng `curl -v` gọi 3 API public, đọc request/response headers và giải thích từng header.
  2. Viết server Node thuần (`node:http`, không framework) có 2 endpoint GET/POST, trả status code đúng, set cookie, rồi gọi từ một trang HTML khác port để **thấy lỗi CORS** và tự sửa.
- 🎫 Thiết kế API ở Phase 1, cookie ở Phase 2.

### 0.4 Git chuẩn team — 🟡 Dùng được
- 📄 Pro Git (chương 1–3, 7.6 Rewriting History): https://git-scm.com/book/en/v2
- 📄 Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- 📄 Học bằng game: https://learngitbranching.js.org
- 🎬 https://www.youtube.com/results?search_query=git+rebase+vs+merge
- 🏋️ Bài tập:
  1. Hoàn thành learngitbranching (Main + Remote).
  2. Tạo repo thử, cố tình tạo conflict giữa 2 nhánh và giải quyết bằng cả `merge` lẫn `rebase`.
  3. Dùng `git rebase -i` để squash 5 commit thành 1 và sửa message theo Conventional Commits.
- 🎫 Mọi PR của TicketHub.

### 0.5 Docker & Docker Compose — 🟡 Dùng được
- 📄 https://docs.docker.com/get-started/
- 📄 https://docs.docker.com/compose/
- 🎬 https://www.youtube.com/results?search_query=techworld+with+nana+docker+tutorial
- 🎬 https://www.youtube.com/results?search_query=docker+compose+tutorial
- 🏋️ Bài tập:
  1. Chạy Postgres bằng `docker run`, kết nối bằng `psql`, rồi xóa container: dữ liệu mất. Thêm volume và làm lại: dữ liệu còn.
  2. Viết `docker-compose.yml` gồm Postgres, Redis, Adminer. Vào Adminer xem DB.
  3. Thêm **RustFS** (S3-compatible storage) vào compose, mở console của nó, tạo bucket và upload thử một file. Docs: https://docs.rustfs.com
- 🎫 `docker-compose.yml` của TicketHub.

### 0.6 SQL & PostgreSQL cơ bản — 🟡 Dùng được
(Transaction, lock và isolation học sâu ở Phase 5.)
- 📄 https://www.postgresqltutorial.com (Section 1–8)
- 📄 Index cho developer: https://use-the-index-luke.com
- 🎬 https://www.youtube.com/results?search_query=postgresql+tutorial+for+beginners
- 🏋️ Bài tập:
  1. Tạo 3 bảng `users`, `events`, `orders`, insert dữ liệu mẫu, viết 10 query: JOIN, GROUP BY, HAVING, subquery, window function (`ROW_NUMBER`).
  2. Insert 100k dòng bằng `generate_series`, chạy `EXPLAIN ANALYZE` trước và sau khi thêm index.
  3. Tạo cột `metadata jsonb`, lưu vài object có cấu trúc khác nhau, truy vấn bằng `->`, `->>`, `@>`. Docs: https://www.postgresql.org/docs/current/datatype-json.html
- 🎫 Vẽ ERD TicketHub.

### 0.7 Monorepo & công cụ chất lượng code — 🟡 Dùng được
- 📄 pnpm workspaces: https://pnpm.io/workspaces
- 📄 Turborepo: https://turborepo.com/docs
- 📄 ESLint flat config: https://eslint.org/docs/latest/use/configure/configuration-files
- 📄 Prettier: https://prettier.io/docs/
- 📄 Husky: https://typicode.github.io/husky/
- 📄 lint-staged: https://github.com/lint-staged/lint-staged
- 📄 commitlint: https://commitlint.js.org
- 🎬 https://www.youtube.com/results?search_query=turborepo+pnpm+monorepo+tutorial
- 🏋️ Bài tập: tạo monorepo thử có `apps/a`, `apps/b`, `packages/utils`. App `a` import hàm từ `utils`. Chạy `turbo run build` và quan sát cache khi chạy lần 2.
- 🎫 Setup repo TicketHub.

### 0.8 Mô hình hóa dữ liệu (ERD) — 🟡 Dùng được
- 📄 https://dbdiagram.io (công cụ) và https://dbml.dbdiagram.io/docs/
- 📄 Database normalization: https://www.postgresqltutorial.com (tìm "normalization") hoặc https://en.wikipedia.org/wiki/Database_normalization
- 🎬 https://www.youtube.com/results?search_query=database+design+course+normalization
- 🏋️ Bài tập: vẽ ERD cho một thư viện sách (Book, Author, Member, Loan), xác định quan hệ 1-n, n-n, unique và index.
- 🎫 ERD TicketHub (roadmap mục 2.3).

### 0.9 SQL vs NoSQL — 🟢 Biết
- 📄 MongoDB – Data modeling (để hiểu tư duy document): https://www.mongodb.com/docs/manual/data-modeling/
- 📄 Redis – các kiểu dữ liệu (Redis cũng là NoSQL): https://redis.io/docs/latest/develop/data-types/
- 📄 *Designing Data-Intensive Applications*, chương 2 (Data Models and Query Languages)
- 🎬 https://www.youtube.com/results?search_query=sql+vs+nosql+when+to+use
- 🏋️ Bài tập: viết bảng so sánh 4 nhóm NoSQL (key-value, document, wide-column, graph), mỗi nhóm một ví dụ sản phẩm và một use case. Sau đó trả lời: *dữ liệu nào của TicketHub hợp Postgres, dữ liệu nào hợp Redis, và có chỗ nào thật sự cần document DB không?*
- 🎫 Roadmap mục 3.7: Postgres là DB chính, Redis cho cache/seat hold/queue, MongoDB chỉ là module tùy chọn.

---

## Phase 1 — NestJS + MikroORM core

### 1.1 Kiến trúc NestJS: Module, Controller, Provider, DI — 🔴 Hiểu sâu
- 📄 https://docs.nestjs.com/first-steps
- 📄 https://docs.nestjs.com/controllers
- 📄 https://docs.nestjs.com/providers
- 📄 https://docs.nestjs.com/modules
- 📄 Injection scopes: https://docs.nestjs.com/fundamentals/injection-scopes
- 📄 Custom providers: https://docs.nestjs.com/fundamentals/custom-providers
- 🎬 https://www.youtube.com/results?search_query=nestjs+crash+course
- 🎬 https://www.youtube.com/results?search_query=dependency+injection+explained
- 🏋️ Bài tập:
  1. **Trước khi dùng Nest:** tự viết một DI container mini khoảng 50 dòng, có `register(token, factory)` và `resolve(token)`, để hiểu DI hoạt động thế nào.
  2. Tạo app Nest `playground` với 2 module `CatsModule` và `OwnersModule`, trong đó Owners dùng service của Cats. Thử quên `exports` để thấy lỗi.
  3. Dùng `useFactory` và `useValue` để inject một config object.
- 🎫 Khung `apps/api`.

### 1.2 Request lifecycle: Middleware → Guard → Interceptor → Pipe → Filter — 🔴 Hiểu sâu
- 📄 https://docs.nestjs.com/faq/request-lifecycle
- 📄 https://docs.nestjs.com/middleware
- 📄 https://docs.nestjs.com/guards
- 📄 https://docs.nestjs.com/interceptors
- 📄 https://docs.nestjs.com/pipes
- 📄 https://docs.nestjs.com/exception-filters
- 📄 Custom decorators: https://docs.nestjs.com/custom-decorators
- 🎬 https://www.youtube.com/results?search_query=nestjs+request+lifecycle+guards+interceptors+pipes
- 🏋️ Bài tập: tạo **mỗi loại một cái**, mỗi cái `console.log` tên của nó, gắn vào một route, gọi thử và **vẽ lại thứ tự bằng tay**. Sau đó ném lỗi ở từng chỗ để xem filter bắt ra sao.
- 🎫 `LoggingInterceptor`, `TransformInterceptor`, global `ExceptionFilter`.

### 1.3 Validation & DTO — 🟡 Dùng được
- 📄 https://docs.nestjs.com/techniques/validation
- 📄 class-validator: https://github.com/typestack/class-validator
- 📄 class-transformer: https://github.com/typestack/class-transformer
- 📄 (Phương án khác) Zod: https://zod.dev và nestjs-zod: https://github.com/BenLorantfy/nestjs-zod
- 🏋️ Bài tập: DTO tạo "sản phẩm" có nested object, mảng, enum, số dương, ngày tương lai. Bật `whitelist` và `forbidNonWhitelisted` rồi gửi field lạ để xem kết quả.
- 🎫 DTO cho Event và TicketType.

### 1.4 Configuration & Logging — 🟡 Dùng được
- 📄 https://docs.nestjs.com/techniques/configuration
- 📄 https://docs.nestjs.com/techniques/logger
- 📄 nestjs-pino: https://github.com/iamolegga/nestjs-pino
- 📄 Pino redaction (che dữ liệu nhạy cảm trong log): https://getpino.io/#/docs/redaction
- 📄 OWASP Logging Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- 📄 The Twelve-Factor App, mục III. Config: https://12factor.net/config
- 🏋️ Bài tập:
  1. Validate env bằng Zod hoặc Joi. Thiếu `DATABASE_URL` thì app phải **crash ngay khi khởi động** với thông báo rõ ràng.
  2. Thêm correlation id vào mọi dòng log (lấy từ header `x-request-id` nếu có, không thì tự sinh).
  3. Cấu hình `redact` cho `req.headers.authorization`, `req.headers.cookie`, `*.password`, `*.token`. Gửi request login và chứng minh log không lộ mật khẩu.
  4. Đặt mức log theo môi trường: `debug` ở local, `info` ở production; local dùng `pino-pretty` cho dễ đọc.
- 🎫 `config/` của TicketHub.

### 1.5 MikroORM — Khái niệm cốt lõi — 🔴 Hiểu sâu ⭐ (quan trọng nhất phase)
Học theo thứ tự: EntityManager → Unit of Work → Identity Map → RequestContext/fork.
- 📄 Getting started guide (đọc hết, có làm theo): https://mikro-orm.io/docs/guide
- 📄 https://mikro-orm.io/docs/entity-manager
- 📄 https://mikro-orm.io/docs/unit-of-work
- 📄 https://mikro-orm.io/docs/identity-map
- 📄 Bài của tác giả về Unit of Work (tìm "Unit of Work" trên blog): https://medium.com/@b4nan
- 🎬 https://www.youtube.com/results?search_query=mikro-orm+tutorial
- 🎬 https://www.youtube.com/results?search_query=unit+of+work+pattern+explained
- 🏋️ Bài tập (script Node thuần với MikroORM + SQLite/Postgres, **chưa dùng Nest**):
  1. `persist()` 3 entity rồi **không** gọi `flush()`: kiểm tra DB. Gọi `flush()` và xem log SQL (bật `debug: true`).
  2. Gọi `em.findOne(User, 1)` hai lần: đếm số query SQL được chạy và giải thích bằng Identity Map.
  3. Load một entity, sửa 1 field, `flush()`: xem SQL chỉ `UPDATE` đúng field đó (change set).
  4. Dùng `em.fork()` tạo 2 EM, load cùng entity: kiểm tra 2 object có `===` nhau không và giải thích.
  5. Viết 1 đoạn giải thích (nộp cho mentor): *vì sao dùng chung một EM global giữa các request là nguy hiểm?*
- 🎫 Toàn bộ tầng dữ liệu TicketHub.

### 1.6 MikroORM — Entity, Relations, Populate — 🟡 Dùng được
- 📄 https://mikro-orm.io/docs/defining-entities
- 📄 https://mikro-orm.io/docs/relationships
- 📄 https://mikro-orm.io/docs/collections
- 📄 https://mikro-orm.io/docs/populating-relations
- 📄 Type-safe relations (`Ref`, `Reference`): https://mikro-orm.io/docs/type-safe-relations
- 📄 https://mikro-orm.io/docs/embeddables
- 🎬 https://www.youtube.com/results?search_query=n%2B1+query+problem+explained
- 🏋️ Bài tập:
  1. Mô hình Author 1-n Book, Book n-n Tag. Load 10 author rồi in tên sách **không** populate: đếm query (N+1). Sửa bằng `populate`, rồi so sánh `strategy: 'joined'` và `'select-in'`.
  2. Tạo `@Embeddable Money { amount: number (integer); currency: string }`, dùng trong `Product`, xem cột được tạo trong DB.
- 🎫 Entity User, Organization, Event, TicketType, `Money`.

### 1.7 MikroORM — Migrations & Seeding — 🟡 Dùng được
- 📄 https://mikro-orm.io/docs/migrations
- 📄 https://mikro-orm.io/docs/seeding
- 📄 Schema generator (để hiểu vì sao **không** dùng nó trên production): https://mikro-orm.io/docs/schema-generator
- 🏋️ Bài tập: tạo migration đầu tiên, thêm 1 cột, tạo migration thứ 2, `migration:down` rồi `up` lại. Viết seeder dùng Factory sinh 50 bản ghi bằng `@faker-js/faker`.
- 🎫 `database/migrations`, `database/seeders`.

### 1.8 MikroORM + NestJS — 🟡 Dùng được
- 📄 https://mikro-orm.io/docs/usage-with-nestjs
- 📄 https://docs.nestjs.com/recipes/mikroorm
- 📄 Custom repository: https://mikro-orm.io/docs/repositories
- 📄 Serialization: https://mikro-orm.io/docs/serializing
- 📄 Filters (dùng cho soft delete): https://mikro-orm.io/docs/filters
- 🏋️ Bài tập: trong app Nest playground, tạo `ProductRepository extends EntityRepository<Product>` với method `findActiveByCategory()`. Đánh dấu `passwordHash` là `hidden: true` và kiểm tra JSON trả về.
- 🎫 Module `events` của TicketHub.

### 1.9 Thiết kế REST API, phân trang, OpenAPI — 🟡 Dùng được
- 📄 Microsoft REST API Guidelines: https://github.com/microsoft/api-guidelines
- 📄 Zalando RESTful API Guidelines: https://opensource.zalando.com/restful-api-guidelines/
- 📄 https://docs.nestjs.com/openapi/introduction
- 📄 Problem Details (RFC 9457) – tham khảo cho error format: https://www.rfc-editor.org/rfc/rfc9457
- 🎬 https://www.youtube.com/results?search_query=rest+api+design+best+practices
- 🏋️ Bài tập: thiết kế (chỉ trên giấy) API cho hệ thống thư viện: liệt kê endpoint, method, status code, query param phân trang và lọc. Nhờ mentor review.
- 🎫 API Event, TicketType và Swagger.

### 1.10 Health check — 🟢 Biết
- 📄 https://docs.nestjs.com/recipes/terminus
- 📄 Liveness vs readiness (khái niệm từ Kubernetes, áp dụng được cho mọi nơi): https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
- 🏋️ Bài tập: tách `/health/live` (process còn sống) và `/health/ready` (kết nối được DB, Redis). Tắt Redis và xem endpoint nào đổi trạng thái.
- 🎫 `/health/live`, `/health/ready` của TicketHub; sau này Uptime Kuma (Phase 8) sẽ ping `/health/ready`.

---

## Phase 2 — Authentication & Authorization

### 2.1 Lưu mật khẩu an toàn — 🔴 Hiểu sâu
- 📄 OWASP Password Storage: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- 📄 argon2 (Node): https://github.com/ranisalt/node-argon2
- 🎬 https://www.youtube.com/results?search_query=password+hashing+salt+explained
- 🏋️ Bài tập: hash cùng một mật khẩu 2 lần, so sánh 2 hash và giải thích vì sao khác nhau. Đo thời gian hash với các tham số cost khác nhau.

### 2.2 Authentication: session vs JWT — 🔴 Hiểu sâu
- 📄 https://jwt.io/introduction
- 📄 OWASP Authentication: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- 📄 OWASP Session Management: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- 📄 https://docs.nestjs.com/security/authentication
- 🎬 https://www.youtube.com/results?search_query=session+vs+jwt+authentication
- 🎬 https://www.youtube.com/results?search_query=nestjs+jwt+authentication+refresh+token
- 🏋️ Bài tập:
  1. Decode một JWT bằng tay (base64) và giải thích header, payload, signature.
  2. Sửa 1 ký tự trong payload rồi verify: thấy lỗi.
  3. Viết bảng so sánh session và JWT (bảo mật, thu hồi, scale).

### 2.3 Refresh token rotation & cookie — 🔴 Hiểu sâu
- 📄 Auth0 – Refresh Token Rotation: https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation
- 📄 Cookie attributes (`HttpOnly`, `Secure`, `SameSite`): https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
- 📄 OWASP CSRF Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- 🎬 https://www.youtube.com/results?search_query=refresh+token+rotation+explained
- 🏋️ Bài tập: vẽ sequence diagram cho các luồng login → gọi API → access token hết hạn → refresh → **kẻ gian dùng lại refresh token cũ** → hệ thống thu hồi cả "family". Nhờ mentor review **trước khi code**.
- 🎫 Module `auth` của TicketHub.

### 2.4 Authorization: RBAC, ABAC, CASL — 🟡 Dùng được
- 📄 https://docs.nestjs.com/security/authorization
- 📄 CASL guide: https://casl.js.org/v6/en/guide/intro
- 📄 OWASP Authorization: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- 🎬 https://www.youtube.com/results?search_query=rbac+vs+abac
- 🎬 https://www.youtube.com/results?search_query=nestjs+casl+authorization
- 🏋️ Bài tập: trong playground, định nghĩa quyền "User đọc được mọi bài viết, chỉ sửa được bài của mình, Admin sửa được tất cả" bằng CASL. Viết test cho từng trường hợp.
- 🎫 Organizer chỉ sửa Event của tổ chức mình.

### 2.5 Bảo mật web cơ bản — 🟡 Dùng được
- 📄 OWASP Top 10: https://owasp.org/www-project-top-ten/
- 📄 https://docs.nestjs.com/security/helmet
- 📄 https://docs.nestjs.com/security/cors
- 📄 https://docs.nestjs.com/security/rate-limiting
- 🎬 https://www.youtube.com/results?search_query=owasp+top+10+explained
- 🏋️ Bài tập: với mỗi mục trong OWASP Top 10, ghi 1 dòng: *TicketHub có thể bị lỗi này ở đâu, và chặn bằng cách nào?*
- 🎫 Rate limit `/auth/login`, helmet, CORS.

---

## Phase 3 — React & Next.js App Router

### 3.1 React nền tảng — 🔴 Hiểu sâu
- 📄 https://react.dev/learn (đọc hết phần Learn)
- 📄 https://react.dev/learn/thinking-in-react
- 📄 https://react.dev/learn/render-and-commit
- 📄 https://react.dev/learn/you-might-not-need-an-effect ⭐
- 📄 https://react.dev/learn/reusing-logic-with-custom-hooks
- 🎬 https://www.youtube.com/results?search_query=web+dev+simplified+react+hooks
- 🎬 https://www.youtube.com/results?search_query=react+rendering+explained+re-render
- 🏋️ Bài tập:
  1. Làm lại ví dụ "Thinking in React" mà **không xem code mẫu**.
  2. Viết `useCountdown(targetDate)` và `useDebounce(value, ms)`.
  3. Dùng React DevTools Profiler tìm một re-render thừa và giải thích nguyên nhân.

### 3.2 Next.js App Router: routing & layout — 🟡 Dùng được
- 📄 Khóa học chính thức (làm hết): https://nextjs.org/learn
- 📄 https://nextjs.org/docs/app (phần Getting Started: layouts, pages, linking, loading, error)
- 🎬 https://www.youtube.com/results?search_query=nextjs+app+router+tutorial
- 🏋️ Bài tập: hoàn thành dự án Dashboard trong khóa Next.js Learn.

### 3.3 Server Components vs Client Components — 🔴 Hiểu sâu ⭐
- 📄 https://react.dev/reference/rsc/server-components
- 📄 https://react.dev/reference/rsc/use-client
- 📄 Next.js docs: mục *Server and Client Components* trong https://nextjs.org/docs/app
- 🎬 https://www.youtube.com/results?search_query=react+server+components+explained
- 🎬 https://www.youtube.com/results?search_query=jack+herrington+server+components
- 🏋️ Bài tập:
  1. Tạo trang có Server Component fetch dữ liệu và truyền xuống Client Component có `useState`.
  2. Cố tình import một thư viện chỉ chạy trên server vào Client Component để xem lỗi.
  3. Cố tình tạo hydration error bằng `new Date()`, rồi sửa.
- 🎫 Trang danh sách và chi tiết sự kiện.

### 3.4 Data fetching, caching, revalidation, Server Actions — 🔴 Hiểu sâu
- 📄 Next.js docs: các mục *Fetching Data*, *Caching and Revalidating*, *Updating Data (Server Actions)* trong https://nextjs.org/docs/app
- 📄 https://react.dev/reference/rsc/server-functions
- 🎬 https://www.youtube.com/results?search_query=nextjs+caching+explained
- 🎬 https://www.youtube.com/results?search_query=nextjs+server+actions+tutorial
- 🏋️ Bài tập: trang hiển thị danh sách note từ API, có form thêm note bằng Server Action rồi `revalidatePath`. Thử bỏ `revalidatePath` để thấy dữ liệu cũ.
- ⚠️ Cơ chế caching của Next.js thay đổi qua các phiên bản. Luôn đọc docs **đúng phiên bản bạn cài**.
- 🎫 ISR trang sự kiện, form tạo sự kiện.

### 3.5 SEO & Metadata — 🟢 Biết
- 📄 Next.js docs: mục *Metadata* (`generateMetadata`, OG image)
- 📄 https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- 🎫 `generateMetadata` cho `/events/[slug]`.

### 3.6 TanStack Query — 🟡 Dùng được
- 📄 https://tanstack.com/query/latest/docs/framework/react/overview
- 📄 Blog TkDodo (người maintain), đọc series *Practical React Query*: https://tkdodo.eu/blog/practical-react-query
- 🎬 https://www.youtube.com/results?search_query=tanstack+query+tutorial
- 🏋️ Bài tập: danh sách có phân trang, mutation thêm item với **optimistic update** và rollback khi lỗi.
- 🎫 Dashboard Organizer, "Vé của tôi".

### 3.7 Form: React Hook Form + Zod — 🟡 Dùng được
- 📄 https://react-hook-form.com/get-started
- 📄 https://zod.dev
- 📄 resolvers: https://github.com/react-hook-form/resolvers
- 🎬 https://www.youtube.com/results?search_query=react+hook+form+zod+tutorial
- 🏋️ Bài tập: form đăng ký nhiều bước, có field phụ thuộc nhau (xác nhận mật khẩu), hiển thị lỗi từ server dưới đúng field.
- 🎫 Form tạo sự kiện nhiều bước; dùng chung Zod schema trong `packages/shared`.

### 3.8 State management: Zustand — 🟢 Biết → 🟡 Dùng được
- 📄 https://zustand.docs.pmnd.rs
- 🎬 https://www.youtube.com/results?search_query=zustand+tutorial
- 🏋️ Bài tập: giỏ hàng có add, remove, update quantity và persist vào localStorage.
- 🎫 Giỏ vé.

### 3.9 Styling & UI: Tailwind, shadcn/ui, accessibility — 🟡 Dùng được
- 📄 https://tailwindcss.com/docs
- 📄 https://ui.shadcn.com/docs
- 📄 Accessibility cơ bản: https://web.dev/learn/accessibility
- 🎬 https://www.youtube.com/results?search_query=tailwind+css+crash+course
- 🏋️ Bài tập: dựng lại một trang landing bất kỳ bằng Tailwind, đạt Lighthouse Accessibility ≥ 95, dùng được hoàn toàn bằng bàn phím.

### 3.10 Auth phía Frontend & Middleware — 🟡 Dùng được
- 📄 Next.js docs: mục *Authentication* và *Middleware*
- 🏋️ Bài tập: bảo vệ route `/dashboard`, tự động gọi refresh khi nhận 401 rồi retry request ban đầu đúng 1 lần.
- 🎫 Tích hợp auth TicketHub.

### 3.11 Upload file với presigned URL lên S3-compatible storage — 🟡 Dùng được
- 📄 AWS S3 presigned URL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html
- 📄 AWS SDK for JavaScript v3, S3 client: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
- 📄 `@aws-sdk/s3-request-presigner`: https://www.npmjs.com/package/@aws-sdk/s3-request-presigner
- 📄 CORS cho bucket: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html
- 📄 RustFS (S3-compatible, chạy local): https://docs.rustfs.com · https://github.com/rustfs/rustfs
- ⚠️ Không dùng MinIO cho dự án mới: bản Community Edition đã vào chế độ bảo trì từ 12/2025.
- 🏋️ Bài tập:
  1. Tạo `S3Client` đọc `S3_ENDPOINT`, `S3_REGION`, `S3_FORCE_PATH_STYLE`, access key, secret key từ env. Local trỏ tới RustFS (`forcePathStyle: true`).
  2. Endpoint `POST /uploads/presign` trả về presigned PUT URL (hết hạn 5 phút, giới hạn `Content-Type` là ảnh). Trình duyệt upload thẳng lên storage bằng URL đó.
  3. **Gặp lỗi có chủ đích:** API gọi storage qua `http://rustfs:9000` (tên container), nhưng trình duyệt không mở được URL ký bằng tên đó. Sửa bằng cách ký URL với endpoint public (`S3_PUBLIC_ENDPOINT`). Sau đó gặp lỗi CORS và cấu hình CORS cho bucket.
- 🎫 Upload ảnh sự kiện. Phase 8 chỉ đổi biến môi trường để chạy trên AWS S3.

---

## Phase 4 — Clean Architecture, DDD & Design Patterns

### 4.1 SOLID & Code smells — 🔴 Hiểu sâu
- 📄 https://refactoring.guru/refactoring/smells
- 📄 https://refactoring.guru/refactoring/techniques
- 📄 SOLID với ví dụ TypeScript: https://khalilstemmler.com (tìm "SOLID")
- 🎬 https://www.youtube.com/results?search_query=solid+principles+typescript
- 🏋️ Bài tập: làm **Gilded Rose kata** bằng TypeScript: https://github.com/emilybache/GildedRose-Refactoring-Kata. Viết test trước, refactor sau.
- 🎫 Tìm 5 code smell trong TicketHub Phase 1–3 và ghi lại trước khi refactor.

### 4.2 Design patterns cốt lõi — 🟡 Dùng được
Học theo thứ tự: Strategy → Factory Method → Adapter → Decorator → Observer → State → Facade → Builder.
- 📄 https://refactoring.guru/design-patterns/catalog (có ví dụ TypeScript)
- 📄 Specification pattern: https://en.wikipedia.org/wiki/Specification_pattern
- 🎬 https://www.youtube.com/results?search_query=design+patterns+typescript
- 🏋️ Bài tập (mỗi pattern 1 bài nhỏ trong `playground/patterns/`):
  - **Strategy:** tính phí ship theo nhiều hãng vận chuyển.
  - **Factory + Adapter:** bọc 2 "SDK gửi SMS" giả có interface khác nhau về chung 1 interface.
  - **State:** đèn giao thông, hoặc trạng thái đơn hàng với các chuyển trạng thái hợp lệ.
  - **Observer:** event bus mini với `on`, `emit`, `off`.
  - **Specification:** `isAdult.and(hasVerifiedEmail).or(isAdmin)`.
- 🎫 Coupon (Strategy, Specification), Payment (Adapter, Factory), Order (State), Storage (port `FileStorage` + adapter `S3FileStorage`).

### 4.3 Layered, Clean & Hexagonal Architecture — 🔴 Hiểu sâu
- 📄 Uncle Bob – The Clean Architecture: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- 📄 Alistair Cockburn – Hexagonal Architecture: https://alistair.cockburn.us/hexagonal-architecture/
- 📄 Herberto Graça – DDD, Hexagonal, Onion, Clean, CQRS… How I put it all together: https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/
- 🎬 https://www.youtube.com/results?search_query=clean+architecture+explained
- 🎬 https://www.youtube.com/results?search_query=codeopinion+clean+architecture
- 🏋️ Bài tập: tự vẽ sơ đồ các layer và chiều phụ thuộc. Viết 1 use case `TransferMoney` theo Hexagonal: port `AccountRepository`, 2 adapter (in-memory và MikroORM). Đổi adapter mà không sửa use case.
- 🎫 Cấu trúc `domain/ application/ infrastructure/ presentation/`.

### 4.4 DDD Strategic: Bounded Context, Ubiquitous Language — 🟡 Dùng được
- 📄 https://martinfowler.com/bliki/BoundedContext.html
- 📄 https://martinfowler.com/bliki/UbiquitousLanguage.html
- 📄 Sách *Domain-Driven Design Distilled* – Vaughn Vernon (chương 1–4)
- 🎬 https://www.youtube.com/results?search_query=bounded+context+explained
- 🏋️ Bài tập: làm **Event Storming** cho TicketHub trên giấy hoặc Miro. Dán sticky "domain event" màu cam theo dòng thời gian, rồi nhóm thành bounded context. Tham khảo: https://www.eventstorming.com
- 🎫 Chia module `identity`, `catalog`, `ordering`, `payment`, `promotion`, `notification`.

### 4.5 DDD Tactical: Entity, Value Object, Aggregate, Domain Event — 🔴 Hiểu sâu
- 📄 https://martinfowler.com/bliki/ValueObject.html
- 📄 https://martinfowler.com/bliki/DDD_Aggregate.html
- 📄 https://martinfowler.com/bliki/AnemicDomainModel.html ⭐
- 📄 Vaughn Vernon – *Effective Aggregate Design* (3 phần, PDF): https://www.dddcommunity.org/library/vernon_2011/
- 📄 Ví dụ DDD với TypeScript: https://khalilstemmler.com (tìm "aggregate", "value object", "domain events")
- 🎬 https://www.youtube.com/results?search_query=codeopinion+aggregate+design
- 🏋️ Bài tập: viết aggregate `ShoppingCart` có invariant "tối đa 10 sản phẩm, tổng không vượt 50 triệu". Mọi thay đổi phải qua method của aggregate. Viết unit test **không cần DB**.
- 🎫 `Order` aggregate root, `Money`, `order.markAsPaid()`, `OrderPaid` event.

### 4.6 Modular Monolith & ranh giới module — 🟡 Dùng được
- 📄 Kamil Grzybek – Modular Monolith (series + repo mẫu .NET, đọc để học ý tưởng): https://www.kamilgrzybek.com/blog/series/modular-monolith
- 📄 dependency-cruiser: https://github.com/sverweij/dependency-cruiser
- 📄 Event emitter trong Nest: https://docs.nestjs.com/techniques/events
- 🎬 https://www.youtube.com/results?search_query=modular+monolith+explained
- 🏋️ Bài tập: cấu hình dependency-cruiser chặn `modules/ordering` import trực tiếp từ `modules/catalog/domain`. Cố tình vi phạm để thấy CI báo lỗi.
- 🎫 Refactor TicketHub.

---

## Phase 5 — Concurrency, Async & Realtime

### 5.1 Transaction & Isolation level — 🔴 Hiểu sâu
- 📄 https://www.postgresql.org/docs/current/tutorial-transactions.html
- 📄 https://www.postgresql.org/docs/current/transaction-iso.html ⭐
- 📄 MikroORM transactions: https://mikro-orm.io/docs/transactions
- 📄 Sách *Designing Data-Intensive Applications*, chương 7 (Transactions)
- 🎬 https://www.youtube.com/results?search_query=hussein+nasser+transaction+isolation+levels
- 🏋️ Bài tập: mở **2 terminal `psql`** cùng lúc, tái hiện bằng tay: dirty read (không xảy ra trên Postgres, giải thích vì sao), non-repeatable read, lost update. Đổi isolation level và quan sát.

### 5.2 Locking: Optimistic vs Pessimistic — 🔴 Hiểu sâu ⭐
- 📄 https://www.postgresql.org/docs/current/explicit-locking.html
- 📄 MikroORM locking (mục *Locking* trong https://mikro-orm.io/docs/transactions)
- 🎬 https://www.youtube.com/results?search_query=optimistic+vs+pessimistic+locking
- 🏋️ Bài tập: bảng `accounts(balance)`. Viết script chạy 100 request đồng thời "rút 10k". Quan sát số dư sai, rồi sửa bằng 3 cách: `version` column, `SELECT ... FOR UPDATE`, `UPDATE ... WHERE balance >= 10000`. So sánh kết quả và tốc độ.
- 🎫 Chống overselling vé (ADR-005).

### 5.3 Load testing — 🟡 Dùng được
- 📄 k6: https://grafana.com/docs/k6/latest/
- 📄 autocannon: https://github.com/mcollina/autocannon
- 🎬 https://www.youtube.com/results?search_query=k6+load+testing+tutorial
- 🏋️ Bài tập: viết script k6 cho bài 5.2, xuất kết quả p95 latency.
- 🎫 Load test 1000 request mua vé.

### 5.4 Redis: TTL, atomic ops, distributed lock — 🟡 Dùng được
- 📄 https://redis.io/docs/latest/ (Data types, Expiration, Transactions, Lua scripting)
- 📄 Martin Kleppmann – How to do distributed locking: https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html
- 📄 ioredis: https://github.com/redis/ioredis
- 🎬 https://www.youtube.com/results?search_query=redis+crash+course
- 🏋️ Bài tập: "giữ chỗ" bằng `SET key value NX EX 600`. Viết Lua script giảm số lượng có điều kiện một cách atomic.
- 🎫 Seat hold 10 phút.

### 5.5 Message queue với BullMQ — 🟡 Dùng được
- 📄 https://docs.bullmq.io (Guide: Queues, Workers, Jobs, Retrying failing jobs, Delayed jobs)
- 📄 https://docs.nestjs.com/techniques/queues
- 🎬 https://www.youtube.com/results?search_query=bullmq+nestjs+tutorial
- 🏋️ Bài tập: queue "gửi email" có job lỗi ngẫu nhiên 50%, retry 3 lần với exponential backoff. Job thất bại hẳn thì vào danh sách failed. Thêm delayed job chạy sau 1 phút.
- 🎫 Hủy đơn hết hạn, gửi email vé.

### 5.6 Idempotency & Webhook — 🔴 Hiểu sâu
- 📄 Stripe – Idempotent requests: https://docs.stripe.com/api/idempotent_requests
- 📄 Stripe – Webhooks: https://docs.stripe.com/webhooks
- 📄 Stripe – Testing: https://docs.stripe.com/testing
- 📄 Stripe CLI (forward webhook về local): https://docs.stripe.com/stripe-cli
- 🎬 https://www.youtube.com/results?search_query=idempotency+api+design
- 🏋️ Bài tập: endpoint `POST /payments` nhận header `Idempotency-Key`. Gọi 5 lần cùng key thì chỉ tạo 1 bản ghi và trả cùng response. Endpoint webhook verify chữ ký HMAC tự làm.
- 🎫 `POST /orders`, webhook thanh toán.

### 5.7 Transactional Outbox — 🔴 Hiểu sâu ⭐
- 📄 https://microservices.io/patterns/data/transactional-outbox.html
- 📄 https://microservices.io/patterns/data/polling-publisher.html
- 🎬 https://www.youtube.com/results?search_query=transactional+outbox+pattern
- 🎬 https://www.youtube.com/results?search_query=codeopinion+outbox+pattern
- 🏋️ Bài tập: kịch bản "lưu đơn xong rồi push queue". Cố tình `throw` giữa 2 bước và thấy mất event. Sửa bằng bảng outbox cùng transaction, cộng thêm worker polling.
- 🎫 `OutboxMessage` của TicketHub.

### 5.8 WebSocket & Realtime — 🟡 Dùng được
- 📄 https://socket.io/docs/v4/
- 📄 Rooms: https://socket.io/docs/v4/rooms/
- 📄 Redis adapter: https://socket.io/docs/v4/redis-adapter/
- 📄 https://docs.nestjs.com/websockets/gateways
- 🎬 https://www.youtube.com/results?search_query=websocket+vs+polling+vs+sse
- 🏋️ Bài tập: chat room mini với Nest Gateway. Chạy 2 instance server và thấy tin nhắn không tới nhau, rồi thêm Redis adapter để sửa.
- 🎫 Sơ đồ ghế realtime.

### 5.9 Caching — 🟡 Dùng được
- 📄 https://docs.nestjs.com/techniques/caching
- 📄 Cache-aside và các chiến lược khác: https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside
- 🎬 https://www.youtube.com/results?search_query=bytebytego+caching+strategies
- 🏋️ Bài tập: cache-aside cho API danh sách, invalidate khi có update. Đo latency trước và sau.
- 🎫 Cache danh sách sự kiện.

### 5.10 Observability cho hệ bất đồng bộ: tracing & metrics — 🟡 Dùng được
Học theo thứ tự: 3 trụ cột (log, metric, trace) → OpenTelemetry → Prometheus metric → metric nghiệp vụ.
- 📄 OpenTelemetry concepts (signals, trace, span, context propagation): https://opentelemetry.io/docs/concepts/
- 📄 OpenTelemetry Node.js: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
- 📄 `grafana/otel-lgtm` (Grafana + Loki + Tempo + Prometheus + OTel collector trong một container): https://github.com/grafana/docker-otel-lgtm
- 📄 prom-client: https://github.com/siimon/prom-client · NestJS: https://github.com/willsoto/nestjs-prometheus
- 📄 Prometheus – các loại metric (counter, gauge, histogram): https://prometheus.io/docs/concepts/metric_types/
- 📄 BullMQ – mục Metrics trong https://docs.bullmq.io
- 🎬 https://www.youtube.com/results?search_query=opentelemetry+explained
- 🎬 https://www.youtube.com/results?search_query=logs+metrics+traces+observability+explained
- 🏋️ Bài tập:
  1. Chạy `grafana/otel-lgtm` bằng Docker, gắn auto-instrumentation cho app Nest playground, gọi vài request và tìm trace trong Grafana (Tempo).
  2. Cho trace đi xuyên qua queue: truyền trace context vào data của job BullMQ, để thấy span của worker nằm cùng trace với request gốc.
  3. Expose `/metrics`, tạo 1 counter, 1 gauge, 1 histogram. Giải thích vì sao latency phải dùng histogram chứ không dùng trung bình.
  4. Viết danh sách metric nghiệp vụ cho TicketHub và với mỗi metric, ghi rõ ngưỡng nào thì cần alert.
- 🎫 Trace `POST /orders` → job gửi email; metric `tickets_sold_total`, `optimistic_lock_conflicts_total`, `outbox_pending`, `tickets_oversold_total` (luôn bằng 0).

---

## Phase 6 — Testing

### 6.1 Triết lý testing — 🔴 Hiểu sâu
- 📄 Martin Fowler – The Practical Test Pyramid: https://martinfowler.com/articles/practical-test-pyramid.html
- 📄 Kent C. Dodds – The Testing Trophy: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
- 📄 Kent C. Dodds – Testing Implementation Details: https://kentcdodds.com/blog/testing-implementation-details
- 🎬 https://www.youtube.com/results?search_query=unit+vs+integration+vs+e2e+testing
- 🏋️ Bài tập: viết 1 trang giải thích *"chiến lược test cho TicketHub"*: loại test nào, ở đâu, vì sao.

### 6.2 Unit test với Jest/Vitest — 🟡 Dùng được
- 📄 https://jestjs.io/docs/getting-started
- 📄 https://vitest.dev/guide/
- 📄 https://docs.nestjs.com/fundamentals/testing
- 🏋️ Bài tập: TDD kata **String Calculator**: https://osherove.com/tdd-kata-1. Viết test trước, code sau.
- 🎫 Unit test domain: Order, Coupon, Money.

### 6.3 Integration test với Testcontainers — 🟡 Dùng được
- 📄 https://node.testcontainers.org
- 📄 Postgres module: https://node.testcontainers.org/modules/postgresql/
- 🎬 https://www.youtube.com/results?search_query=testcontainers+node+tutorial
- 🏋️ Bài tập: test repository chạy với Postgres thật trong container, mỗi test có DB sạch (truncate hoặc transaction rollback).
- 🎫 Test lock chống overselling.

### 6.4 E2E API test — 🟡 Dùng được
- 📄 Supertest: https://github.com/ladjs/supertest
- 📄 Nest e2e: https://docs.nestjs.com/fundamentals/testing#end-to-end-testing
- 🎫 Luồng register → mua vé → webhook → nhận vé.

### 6.5 Frontend test — 🟡 Dùng được
- 📄 React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- 📄 Query priority: https://testing-library.com/docs/queries/about/#priority
- 📄 MSW (mock API): https://mswjs.io/docs/
- 📄 Playwright: https://playwright.dev/docs/intro
- 🎬 https://www.youtube.com/results?search_query=playwright+tutorial
- 🏋️ Bài tập: test form đăng ký bằng RTL + MSW (thành công và lỗi server). Viết 1 test Playwright đăng nhập và tạo dữ liệu.
- 🎫 E2E luồng mua vé trên FE.

### 6.6 Test data: Factory & Builder — 🟢 Biết
- 📄 MikroORM Seeding/Factories: https://mikro-orm.io/docs/seeding
- 📄 Faker: https://fakerjs.dev
- 🎫 Builder `anOrder().withItems(2).paid().build()`.

---

## Phase 7 — Microservices

### 7.1 Khi nào (không) dùng microservices — 🔴 Hiểu sâu ⭐
- 📄 https://martinfowler.com/articles/microservices.html
- 📄 https://martinfowler.com/bliki/MonolithFirst.html
- 📄 https://martinfowler.com/bliki/MicroservicePrerequisites.html
- 📄 https://microservices.io/patterns/microservices.html
- 🎬 https://www.youtube.com/results?search_query=microservices+vs+monolith
- 🎬 https://www.youtube.com/results?search_query=distributed+monolith+anti+pattern
- 🏋️ Bài tập: viết ADR "Có nên tách TicketHub thành microservices không?" và **phản biện chính nó**.

### 7.2 Strangler Fig & cách tách service — 🟡 Dùng được
- 📄 https://martinfowler.com/bliki/StranglerFigApplication.html
- 📄 https://microservices.io/patterns/decomposition/decompose-by-subdomain.html
- 📄 https://microservices.io/patterns/data/database-per-service.html
- 🎫 Tách Notification trước, Payment sau.

### 7.3 Giao tiếp giữa service & message broker — 🟡 Dùng được
- 📄 https://docs.nestjs.com/microservices/basics
- 📄 https://docs.nestjs.com/microservices/nats
- 📄 https://docs.nestjs.com/microservices/rabbitmq
- 📄 NATS: https://docs.nats.io
- 📄 RabbitMQ tutorials: https://www.rabbitmq.com/tutorials
- 📄 (Tìm hiểu) Kafka: https://kafka.apache.org/intro
- 🎬 https://www.youtube.com/results?search_query=rabbitmq+vs+kafka
- 🎬 https://www.youtube.com/results?search_query=nestjs+microservices+tutorial
- 🏋️ Bài tập: 2 service Nest, trong đó `orders` phát event `OrderCreated` và `mailer` lắng nghe. Thử cả request–response (`@MessagePattern`) và event (`@EventPattern`). Tắt `mailer` khi đang phát event để xem chuyện gì xảy ra với từng broker.
- 🎫 Notification Service (muốn thử MongoDB cho service này thì xem Module B).

### 7.4 Saga & eventual consistency — 🔴 Hiểu sâu ⭐
- 📄 https://microservices.io/patterns/data/saga.html
- 📄 Chris Richardson – sách *Microservices Patterns*, chương 4
- 📄 *Designing Data-Intensive Applications*, chương 9 (Consistency) và chương 11 (Stream processing)
- 🎬 https://www.youtube.com/results?search_query=saga+pattern+orchestration+vs+choreography
- 🎬 https://www.youtube.com/results?search_query=codeopinion+saga
- 🏋️ Bài tập: vẽ sequence diagram saga "đặt tour du lịch" (vé máy bay → khách sạn → thanh toán) với compensating action khi bước 3 lỗi. Code bản mini với 3 service giả.
- 🎫 Saga đặt vé TicketHub.

### 7.5 API Gateway & BFF — 🟡 Dùng được
- 📄 https://microservices.io/patterns/apigateway.html
- 📄 https://samnewman.io/patterns/architectural/bff/
- 📄 (Phương án khác) Traefik: https://doc.traefik.io/traefik/ và Kong: https://docs.konghq.com
- 🎫 `apps/gateway`.

### 7.6 Resilience: timeout, retry, circuit breaker — 🟡 Dùng được
- 📄 https://microservices.io/patterns/reliability/circuit-breaker.html
- 📄 https://learn.microsoft.com/en-us/azure/architecture/patterns/retry
- 📄 opossum: https://nodeshift.dev/opossum/
- 🎬 https://www.youtube.com/results?search_query=circuit+breaker+pattern+explained
- 🏋️ Bài tập: service A gọi service B (cố tình chậm hoặc lỗi 50%). Thêm timeout, retry có jitter, circuit breaker, rồi quan sát trạng thái open → half-open → closed.
- 🎫 Gọi Payment Service.

### 7.7 Distributed tracing với OpenTelemetry — 🟡 Dùng được
- 📄 https://opentelemetry.io/docs/concepts/
- 📄 https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
- 📄 Jaeger: https://www.jaegertracing.io/docs/latest/getting-started/
- 🎬 https://www.youtube.com/results?search_query=opentelemetry+nodejs+tutorial
- 🏋️ Bài tập: gắn auto-instrumentation cho 2 service ở bài 7.3 và xem 1 trace xuyên 2 service trên Jaeger.
- 🎫 Trace luồng mua vé.

### 7.8 Contract testing — 🟢 Biết
- 📄 https://docs.pact.io
- 📄 https://martinfowler.com/bliki/ContractTest.html

---

## Phase 8 — DevOps & Observability

### 8.1 Dockerfile production — 🟡 Dùng được
- 📄 Multi-stage build: https://docs.docker.com/build/building/multi-stage/
- 📄 Best practices: https://docs.docker.com/build/building/best-practices/
- 📄 Next.js standalone output: tìm `output: 'standalone'` trong https://nextjs.org/docs
- 🎬 https://www.youtube.com/results?search_query=dockerfile+best+practices+nodejs
- 🏋️ Bài tập: Dockerize app Nest playground. Giảm kích thước image từ khoảng 1GB xuống dưới 200MB, chạy user non-root, ghi lại kích thước sau mỗi lần tối ưu.

### 8.2 CI/CD với GitHub Actions — 🟡 Dùng được
- 📄 https://docs.github.com/en/actions
- 📄 Cache pnpm: https://pnpm.io/continuous-integration#github-actions
- 📄 Turborepo trong CI: https://turborepo.com/docs (mục CI)
- 🎬 https://www.youtube.com/results?search_query=github+actions+tutorial
- 🏋️ Bài tập: workflow chạy lint, typecheck và test trên mỗi PR. Build và push image lên GitHub Container Registry khi merge `main`.

### 8.3 Deploy: VPS hoặc PaaS — 🟡 Dùng được
- 📄 Nginx reverse proxy: https://nginx.org/en/docs/
- 📄 Certbot (Let's Encrypt): https://certbot.eff.org
- 📄 Vercel (Next.js): https://vercel.com/docs
- 📄 Railway: https://docs.railway.com ; Fly.io: https://fly.io/docs/
- 📄 DigitalOcean tutorials (rất chi tiết cho VPS Ubuntu): https://www.digitalocean.com/community/tutorials
- 🎬 https://www.youtube.com/results?search_query=deploy+docker+compose+vps+nginx+ssl
- 🏋️ Bài tập: deploy app playground lên 1 VPS rẻ với Docker Compose, Nginx và HTTPS.

### 8.4 AWS cơ bản: IAM, S3, chi phí — 🟡 Dùng được
- 📄 IAM best practices (quyền tối thiểu): https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
- 📄 S3 user guide: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
- 📄 AWS Budgets (đặt cảnh báo chi phí **trước tiên**): https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html
- 📄 RDS là gì: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html
- 🎬 https://www.youtube.com/results?search_query=aws+s3+iam+tutorial+for+beginners
- 🏋️ Bài tập:
  1. Tạo tài khoản AWS free tier, bật MFA cho root, đặt budget alert 5 USD.
  2. Tạo bucket S3 và một IAM user chỉ có quyền `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject` trên đúng bucket đó. Cấu hình CORS.
  3. Đổi biến môi trường của app playground từ RustFS sang S3: bỏ `S3_ENDPOINT`, tắt `forcePathStyle`. Chạy lại bài 3.11 **không sửa dòng code nào**.
- 🎫 Chuyển storage của TicketHub sang AWS S3; viết ADR về việc tự chạy Postgres hay dùng RDS.

### 8.5 Database migration an toàn khi deploy — 🔴 Hiểu sâu
- 📄 Expand–Contract (Parallel Change): https://martinfowler.com/bliki/ParallelChange.html
- 📄 https://www.postgresql.org/docs/current/backup.html
- 🏋️ Bài tập: đổi tên cột `name` thành `title` **không downtime** qua 3 lần deploy. Backup DB rồi restore vào DB mới và kiểm tra.

### 8.6 Observability: log, metric, error tracking, alert — 🟡 Dùng được
- 📄 Sentry Next.js: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- 📄 Sentry NestJS: https://docs.sentry.io/platforms/javascript/guides/nestjs/
- 📄 Prometheus: https://prometheus.io/docs/introduction/overview/
- 📄 Grafana: https://grafana.com/docs/grafana/latest/getting-started/
- 📄 Google SRE book – Monitoring Distributed Systems (4 golden signals): https://sre.google/sre-book/monitoring-distributed-systems/
- 📄 Loki: https://grafana.com/docs/loki/latest/ · Grafana Alloy (đẩy log/metric/trace): https://grafana.com/docs/alloy/latest/
- 📄 Tempo: https://grafana.com/docs/tempo/latest/
- 📄 Grafana Alerting: https://grafana.com/docs/grafana/latest/alerting/
- 📄 Uptime Kuma: https://github.com/louislam/uptime-kuma
- 🎬 https://www.youtube.com/results?search_query=prometheus+grafana+nodejs
- 🎬 https://www.youtube.com/results?search_query=grafana+loki+tutorial
- 🏋️ Bài tập:
  1. Dựng Loki + Prometheus + Tempo + Grafana trên VPS (hoặc dùng gói miễn phí của Grafana Cloud). Log từ container được đẩy vào Loki; từ một dòng log lỗi nhảy được sang trace tương ứng nhờ `traceId`.
  2. Dashboard 4 golden signals + metric nghiệp vụ từ bài 5.10.
  3. Alert: error rate > 5%, p95 > 1s, queue tồn > 1000 job, `tickets_oversold_total` > 0. Gửi qua Telegram hoặc email.
  4. Uptime Kuma ping `/health/ready` mỗi phút; tắt DB và xác nhận nhận được cảnh báo.
  5. Đặt thời gian lưu log (retention) và ước lượng dung lượng ổ đĩa cần cho 30 ngày.

### 8.7 Kubernetes cơ bản — 🟢 Biết
- 📄 https://kubernetes.io/docs/tutorials/kubernetes-basics/
- 🎬 https://www.youtube.com/results?search_query=techworld+with+nana+kubernetes+tutorial
- 🏋️ Bài tập (tùy chọn): chạy app playground trên `kind` hoặc `minikube` với Deployment và Service.

---

## Phase 9 — Tối ưu, System Design & Portfolio

### 9.1 Tối ưu database — 🔴 Hiểu sâu
- 📄 https://www.postgresql.org/docs/current/using-explain.html
- 📄 https://use-the-index-luke.com (đọc kỹ chương về composite index và pagination)
- 📄 Cursor pagination: https://use-the-index-luke.com/no-offset
- 🎬 https://www.youtube.com/results?search_query=hussein+nasser+database+indexing
- 🏋️ Bài tập: với 1 triệu bản ghi, so sánh `OFFSET 900000` và cursor pagination bằng `EXPLAIN ANALYZE`.
- 🎫 Tối ưu API danh sách sự kiện và dashboard.

### 9.2 Search với PostgreSQL full-text search — 🟡 Dùng được
- 📄 Full Text Search: https://www.postgresql.org/docs/current/textsearch.html
- 📄 `unaccent` (bỏ dấu): https://www.postgresql.org/docs/current/unaccent.html
- 📄 `pg_trgm` (tìm gần đúng, chịu lỗi chính tả): https://www.postgresql.org/docs/current/pgtrgm.html
- 📄 GIN index: https://www.postgresql.org/docs/current/gin.html
- 🎬 https://www.youtube.com/results?search_query=postgres+full+text+search+tutorial
- 🏋️ Bài tập:
  1. Tạo 100k sự kiện giả có tên tiếng Việt. Đo `ILIKE '%nhac rock%'` bằng `EXPLAIN ANALYZE`.
  2. Tạo hàm immutable bọc `unaccent` (để dùng được trong index), thêm cột `tsvector` dạng generated column và GIN index. Tìm "nhac rock ha noi" ra "Đêm nhạc Rock Hà Nội".
  3. Thêm index `gin_trgm_ops` và dùng `similarity()` để "nhạc rok" vẫn ra kết quả. So sánh tốc độ cả ba cách.
  4. Sắp xếp kết quả theo `ts_rank`, giải thích vì sao kết quả trùng tiêu đề nên xếp trên kết quả trùng mô tả (gợi ý: `setweight`).
- 🎫 API tìm kiếm sự kiện của TicketHub. Khi nào cần nâng cấp lên search engine riêng: xem Module A.

### 9.3 Tối ưu frontend — 🟡 Dùng được
- 📄 Core Web Vitals: https://web.dev/articles/vitals
- 📄 https://web.dev/learn/performance
- 📄 @next/bundle-analyzer: https://www.npmjs.com/package/@next/bundle-analyzer
- 🏋️ Bài tập: chạy bundle analyzer cho TicketHub, tìm 3 thứ làm bundle phình và xử lý.

### 9.4 CQRS & read model — 🟡 Dùng được
- 📄 https://martinfowler.com/bliki/CQRS.html
- 📄 https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
- 📄 Materialized view: https://www.postgresql.org/docs/current/rules-materializedviews.html
- 🎬 https://www.youtube.com/results?search_query=codeopinion+cqrs
- 🎫 Dashboard doanh thu Organizer.

### 9.5 Tài liệu kiến trúc — 🟡 Dùng được
- 📄 C4 model: https://c4model.com
- 📄 ADR: https://adr.github.io
- 📄 Mermaid (sequence diagram trong markdown): https://mermaid.js.org
- 🏋️ Bài tập: vẽ C4 Level 1–3 cho TicketHub và sequence diagram luồng mua vé bằng Mermaid.

### 9.6 System Design — 🟡 Dùng được
- 📄 System Design Primer: https://github.com/donnemartin/system-design-primer
- 📄 ByteByteGo System Design 101: https://github.com/ByteByteGoHq/system-design-101
- 📄 Sách *Designing Data-Intensive Applications* (đọc lại các chương đã đọc và đọc hết)
- 🎬 https://www.youtube.com/results?search_query=bytebytego+system+design
- 🎬 https://www.youtube.com/results?search_query=design+ticketmaster+system+design+interview ⭐ (đúng bài toán của bạn)
- 🏋️ Bài tập: tự thiết kế "TicketHub cho 1 triệu người cùng giành vé concert" trong 45 phút, rồi so với video ở trên.

### 9.7 Portfolio, tiếng Anh & phỏng vấn — 🟡 Dùng được
- 📄 Viết README tốt: https://www.makeareadme.com
- 📄 Viblo (blog kỹ thuật tiếng Việt, nơi đăng bài): https://viblo.asia
- 📄 Câu hỏi phỏng vấn Node/Backend: https://github.com/goldbergyoni/nodebestpractices (đọc như checklist)
- 🏋️ Bài tập:
  1. Viết 2–3 bài blog từ ADR của bạn.
  2. Ghi âm bản thân trình bày TicketHub trong 5 phút, nghe lại và sửa.
  3. Gõ `phỏng vấn thử` với AI mentor (xem AGENTS.md).
  4. Đọc 10–20 JD mới nhất trên ITviec/TopDev, cập nhật bảng ở roadmap mục 12.1 và đánh dấu khoảng trống còn lại.
  5. Trình bày TicketHub 5 phút **bằng tiếng Anh**; README và ADR viết bằng tiếng Anh.
- 🎫 Roadmap mục 12: thời điểm nộp đơn, CV, 3 câu chuyện kỹ thuật.

---

## Module tùy chọn

Làm khi đã xong phase tương ứng và còn thời gian (roadmap mục 13).

### Module A — Search engine riêng (sau Phase 9.2) — 🟡 Dùng được
Học theo thứ tự: inverted index → analyzer → mapping → query & relevance → đồng bộ dữ liệu.
- 📄 Elasticsearch: https://www.elastic.co/docs · OpenSearch (fork mã nguồn mở): https://docs.opensearch.org
- 📄 Meilisearch: https://www.meilisearch.com/docs · Typesense: https://typesense.org/docs/
- 📄 *Designing Data-Intensive Applications*, chương 3 (phần về index) và chương 11 (đồng bộ dữ liệu giữa các hệ thống)
- 🎬 https://www.youtube.com/results?search_query=elasticsearch+inverted+index+explained
- 🏋️ Bài tập:
  1. Chạy Meilisearch hoặc OpenSearch bằng Docker, index 100k sự kiện từ bài 9.2, so sánh chất lượng kết quả với Postgres full-text search.
  2. Với OpenSearch/Elasticsearch: tạo analyzer có `asciifolding` (hoặc ICU) để tìm không dấu.
  3. Đồng bộ qua outbox: sửa tên sự kiện → event `EventUpdated` → worker cập nhật index. Tắt worker 1 phút, sửa vài sự kiện, bật lại và kiểm tra index đuổi kịp.
  4. Viết lệnh reindex toàn bộ không downtime (index mới + alias).
- 🎫 Search sự kiện có facet theo thành phố, khoảng giá; Postgres vẫn là nguồn dữ liệu chính.

### Module B — MongoDB cho Notification Service (trong Phase 7) — 🟢 Biết → 🟡 Dùng được
- 📄 MongoDB manual: https://www.mongodb.com/docs/manual/
- 📄 Data modeling (embed hay reference): https://www.mongodb.com/docs/manual/data-modeling/
- 📄 MikroORM với MongoDB: https://mikro-orm.io/docs/usage-with-mongo · Mongoose: https://mongoosejs.com/docs/
- 🎬 https://www.youtube.com/results?search_query=mongodb+schema+design+best+practices
- 🏋️ Bài tập:
  1. Thiết kế collection `notifications` (kênh, trạng thái, số lần retry, payload) và `templates`. Quyết định embed hay reference và giải thích.
  2. Tạo index cho truy vấn "50 thông báo mới nhất của user X". Kiểm tra bằng `explain()`.
  3. Viết ADR-007: vì sao Notification Service dùng MongoDB còn Ordering dùng Postgres.
- 🎫 Notification Service của TicketHub.

### Module C — AWS ngoài S3 (sau Phase 8) — 🟢 Biết
- 📄 LocalStack (giả lập AWS ở local): https://docs.localstack.cloud
- 📄 SQS: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- 📄 Secrets Manager: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
- 🏋️ Bài tập:
  1. Chạy LocalStack, chuyển queue gửi email từ BullMQ sang SQS (dùng AWS SDK v3). So sánh: retry, delay, dead-letter queue, cách giám sát.
  2. Đưa secret (DB password, JWT secret) vào Secrets Manager hoặc SSM Parameter Store thay cho file `.env` trên server.
- 🎫 Ghi kết quả so sánh BullMQ và SQS vào ADR.

---

## Phụ lục — Tài liệu xuyên suốt

| Loại | Tài liệu |
|---|---|
| Node best practices | https://github.com/goldbergyoni/nodebestpractices |
| Patterns | https://refactoring.guru/design-patterns |
| Microservices patterns | https://microservices.io/patterns/ |
| Kiến trúc (Microsoft) | https://learn.microsoft.com/en-us/azure/architecture/patterns/ |
| Bảo mật | https://cheatsheetseries.owasp.org |
| Observability | https://opentelemetry.io/docs/ · https://grafana.com/docs/ |
| AWS | https://docs.aws.amazon.com |
| Sách nền tảng | *Designing Data-Intensive Applications* · *Refactoring* · *DDD Distilled* · *Building Microservices* |

> Gặp link hỏng thì tìm theo tên bài hoặc tên mục trên trang chủ của docs đó (docs hay đổi đường dẫn khi lên phiên bản mới), và báo mentor để cập nhật file này.
