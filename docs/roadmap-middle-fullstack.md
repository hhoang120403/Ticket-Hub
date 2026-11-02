# 🎯 Roadmap: Junior → Middle Fullstack Engineer
### Stack: Next.js (React) · NestJS · MikroORM · PostgreSQL · Redis · S3-compatible storage (RustFS → AWS S3)
### Học qua MỘT dự án thực tế duy nhất: **TicketHub** – nền tảng bán vé sự kiện

> Viết bởi "mentor" cho mentee. Đọc hết phần 0–3 trước khi code dòng nào.
>
> 📖 **Giáo trình chi tiết** cho từng phase (thứ tự học, mức độ cần nắm, link docs/video, bài tập nhỏ) nằm ở `curriculum.md`. Mục 📚 Học trong mỗi phase dưới đây chỉ là tóm tắt.

---

## Mục lục
0. [Tư duy trước khi bắt đầu](#0-tư-duy-trước-khi-bắt-đầu)
1. [Middle Fullstack khác Junior ở đâu](#1-middle-fullstack-khác-junior-ở-đâu)
2. [Dự án: TicketHub](#2-dự-án-tickethub)
3. [Bản đồ kiến thức cần học](#3-bản-đồ-kiến-thức-cần-học)
4. [Lộ trình theo giai đoạn (Phase 0 → 9)](#4-lộ-trình-theo-giai-đoạn)
5. [Quy tắc code & quy trình làm việc](#5-quy-tắc-code--quy-trình-làm-việc)
6. [Design patterns áp dụng ở đâu trong dự án](#6-design-patterns-áp-dụng-ở-đâu)
7. [Cấu trúc thư mục tham khảo](#7-cấu-trúc-thư-mục-tham-khảo)
8. [Template: ADR, PR checklist, README](#8-templates)
9. [Lịch học hằng tuần & cách tự review](#9-lịch-học-hằng-tuần)
10. [Checklist tự đánh giá "đã lên Middle chưa"](#10-checklist-tự-đánh-giá)
11. [Tài liệu tham khảo](#11-tài-liệu-tham-khảo)
12. [Sẵn sàng đi xin việc](#12-sẵn-sàng-đi-xin-việc)
13. [Module tùy chọn](#13-module-tùy-chọn)

---

## 0. Tư duy trước khi bắt đầu

1. **Một dự án, nhiều vòng refactor.** Bạn sẽ viết code "chạy được" trước, rồi refactor dần sang kiến trúc tốt hơn. Chính việc *đau khi refactor* mới dạy bạn vì sao pattern tồn tại.
2. **Monolith trước, microservices sau.** 90% công ty không cần microservices. Bạn học microservices để *hiểu trade-off*, không phải vì nó "xịn".
3. **Mỗi quyết định kỹ thuật phải viết lại lý do** (ADR – xem mục 8). Middle khác Junior ở chỗ giải thích được *tại sao*.
4. **Không copy-paste mù.** Mỗi thư viện mới: đọc docs chính thức trước, xem tutorial sau.
5. **Thời lượng gợi ý:** 12–15 giờ/tuần → khoảng **7–8 tháng**. Đi chậm hơn không sao, bỏ qua phần nền thì có sao.

---

## 1. Middle Fullstack khác Junior ở đâu

| Khía cạnh | Junior | Middle |
|---|---|---|
| Task | Làm theo ticket đã chia nhỏ | Tự chia nhỏ feature, ước lượng, phát hiện edge case |
| Code | Chạy được | Chạy đúng, dễ đọc, dễ test, dễ thay đổi |
| Database | CRUD | Thiết kế schema, index, transaction, xử lý race condition |
| Kiến trúc | Theo cấu trúc có sẵn | Hiểu layer, boundaries, chọn pattern phù hợp |
| Lỗi | Fix triệu chứng | Tìm root cause, viết test chặn tái phát |
| Production | Chưa từng chạm | Biết deploy, đọc log, có monitoring |
| Giao tiếp | Hỏi "làm sao" | Đề xuất 2–3 phương án kèm trade-off |

---

## 2. Dự án: TicketHub

### 2.1 Tại sao chọn bán vé sự kiện?
So với todo-app hay blog, bài toán bán vé có đủ "độ khó thật":
- **Concurrency:** 1000 người cùng giành 100 ghế → học locking, transaction, Redis.
- **Nhiều vai trò:** Admin, Organizer (ban tổ chức), Attendee (người mua), Staff (soát vé) → RBAC/ABAC.
- **Thanh toán:** webhook, idempotency, trạng thái đơn hàng phức tạp → state machine, saga.
- **Bất đồng bộ:** gửi email vé, QR code, nhắc lịch → queue, outbox pattern.
- **Realtime:** sơ đồ ghế cập nhật trực tiếp → WebSocket.
- **SEO:** trang sự kiện public → SSR/ISR của Next.js.
- **Tách service tự nhiên:** Notification, Payment, Catalog, Order → microservices có lý do rõ ràng.

### 2.2 Tính năng

**MVP (Phase 1–3)**
- Đăng ký / đăng nhập (email + password), refresh token
- Organizer tạo sự kiện: tên, mô tả, ảnh, địa điểm, thời gian, các hạng vé (VIP, Standard…) với số lượng và giá
- Attendee xem danh sách sự kiện (tìm kiếm, lọc, phân trang), xem chi tiết
- Mua vé (giai đoạn đầu: thanh toán giả lập)
- Trang "Vé của tôi"

**Nâng cao (Phase 4–6)**
- Giữ chỗ tạm thời 10 phút khi checkout (seat hold)
- Thanh toán qua sandbox (Stripe test mode hoặc VNPay/MoMo sandbox) + webhook
- Email xác nhận kèm QR code (qua queue)
- Sơ đồ ghế realtime (ghế nào đang được giữ/đã bán)
- Staff quét QR check-in
- Dashboard Organizer: doanh thu, số vé bán theo ngày
- Mã giảm giá (coupon) – nơi thực hành Strategy/Specification pattern
- Tìm kiếm sự kiện không dấu, chịu lỗi chính tả ("nhac rock ha noi" ra "Đêm nhạc Rock Hà Nội")

**Phân tán (Phase 7)**
- Tách Notification Service, Payment Service
- API Gateway, message broker, saga cho luồng đặt vé

### 2.3 Domain model ban đầu (bản phác)

```
User (id, email, passwordHash, role, createdAt)
Organization (id, name, ownerId)           -- organizer thuộc 1 org
Event (id, orgId, title, slug, description, venue, startsAt, endsAt, status: DRAFT|PUBLISHED|CANCELLED)
TicketType (id, eventId, name, price: Money, quantity, sold, version)
Order (id, userId, status: PENDING|PAID|EXPIRED|CANCELLED|REFUNDED, total: Money, expiresAt)
OrderItem (id, orderId, ticketTypeId, quantity, unitPrice)
Ticket (id, orderItemId, code, qrPayload, checkedInAt)
Payment (id, orderId, provider, providerRef, status, rawPayload)
Coupon (id, eventId, code, type: PERCENT|FIXED, value, maxUses, used, validUntil)
OutboxMessage (id, type, payload, createdAt, processedAt)   -- Phase 5
```

> Bài tập đầu tiên: vẽ ERD này bằng dbdiagram.io hoặc draw.io, tự hỏi: *quan hệ nào 1-n, n-n? field nào cần unique? index nào?*

---

## 3. Bản đồ kiến thức cần học

### 3.1 Nền tảng (bắt buộc)
- **TypeScript nâng cao:** generics, utility types (`Partial`, `Pick`, `Omit`, `Record`), conditional types, `infer`, discriminated unions, type narrowing, `satisfies`, decorators (Nest & MikroORM dùng rất nhiều)
- **JavaScript runtime:** event loop, Promise, async/await, microtask vs macrotask, error handling
- **HTTP:** method, status code, header, cookie, CORS, caching header, REST conventions
- **Git:** branch, rebase vs merge, interactive rebase, conventional commits, giải quyết conflict
- **SQL & PostgreSQL:** JOIN, GROUP BY, index (B-tree), `EXPLAIN ANALYZE`, transaction, isolation levels, `SELECT ... FOR UPDATE`
- **Docker:** image, container, volume, network, docker compose
- **SQL vs NoSQL:** khi nào chọn cái nào; cột `jsonb` của Postgres cho dữ liệu không cố định schema; Redis chính là một NoSQL kiểu key-value

### 3.2 Backend – NestJS
- Module, Controller, Provider, Dependency Injection, scope (singleton/request)
- Request lifecycle: Middleware → Guard → Interceptor (before) → Pipe → Handler → Interceptor (after) → Exception Filter
- Validation: `class-validator` + `class-transformer` (hoặc Zod với `nestjs-zod`)
- Config: `@nestjs/config` + validate env bằng schema
- Logging: `nestjs-pino`, correlation id
- OpenAPI/Swagger: `@nestjs/swagger`
- Auth: Passport/JWT, Guards, custom decorator `@CurrentUser()`, `@Roles()`
- Queue: `@nestjs/bullmq`; Schedule: `@nestjs/schedule`
- WebSocket: `@nestjs/websockets` (Socket.IO)
- Microservices: `@nestjs/microservices` (NATS / RabbitMQ / Kafka)
- Testing: `@nestjs/testing`, Jest

### 3.3 ORM – MikroORM (phần nhiều bạn bỏ qua nhất)
- Khái niệm cốt lõi: **Unit of Work**, **Identity Map**, **EntityManager**, `flush()` vs `persist()`
- `RequestContext` & `em.fork()` – vì sao mỗi request cần EM riêng (MikroOrmModule đã tự làm qua middleware, nhưng phải hiểu)
- Entity definition: decorators (`@Entity`, `@Property`, `@ManyToOne`, `@OneToMany`, `Collection`) hoặc `defineEntity`
- `Ref<T>` / `Reference`, lazy loading, `populate`, tránh N+1
- `@Embeddable` cho Value Object (ví dụ `Money`, `Address`)
- Migrations (`mikro-orm migration:create/up/down`), Seeder
- Transaction: `em.transactional()`, `@Transactional()` decorator (có từ v6; hiện MikroORM đã có v7, luôn đọc docs đúng phiên bản bạn cài)
- **Optimistic locking:** `@Property({ version: true })` + `OptimisticLockError`
- **Pessimistic locking:** `em.findOne(..., { lockMode: LockMode.PESSIMISTIC_WRITE })`
- Filters (soft delete, multi-tenant), lifecycle hooks / event subscribers
- QueryBuilder (`em.createQueryBuilder`) và raw query khi cần
- Serialization: `wrap(entity).toObject()`, `serialize()`, tránh lộ field nhạy cảm
- Custom Repository (`EntityRepository<T>`)

### 3.4 Frontend – React / Next.js (App Router)
- React: hooks, re-render, `memo`/`useMemo`/`useCallback` (khi nào *không* cần), composition, custom hooks, error boundary, Suspense
- Next.js: Server Components vs Client Components, Server Actions, Route Handlers, `layout`/`loading`/`error`, Middleware, caching & revalidation (`revalidatePath`, `revalidateTag`), SSG/SSR/ISR, `generateMetadata` (SEO), Image/Font optimization
- Data fetching phía client: **TanStack Query** (cache, invalidate, optimistic update)
- Form: **React Hook Form + Zod** (dùng chung schema với backend nếu có thể)
- State: local state trước, **Zustand** khi cần global (giỏ hàng)
- UI: Tailwind CSS + shadcn/ui; accessibility cơ bản (label, focus, keyboard)
- Auth phía FE: httpOnly cookie, refresh token flow, bảo vệ route
- Testing: Vitest + React Testing Library, Playwright (e2e)

### 3.5 Kiến trúc & Design
- SOLID, DRY/KISS/YAGNI (và khi nào vi phạm DRY là đúng)
- Layered / Clean / Hexagonal architecture
- DDD tactical: Entity, Value Object, Aggregate, Domain Event, Repository, Domain Service
- Modular monolith
- CQRS (bản nhẹ), Event-driven
- Microservices: data ownership, sync vs async communication, API Gateway, Saga (choreography vs orchestration), Outbox, idempotency, eventual consistency
- GoF patterns hay dùng (xem mục 6)

### 3.6 DevOps & Production
- Dockerfile multi-stage, docker compose cho dev
- CI/CD với GitHub Actions (lint → test → build → deploy)
- Deploy lên VPS (Nginx reverse proxy + SSL) hoặc Railway/Fly.io/Render
- Observability: structured log có redact, health check (liveness/readiness), Sentry, OpenTelemetry tracing, Prometheus + Grafana, Loki, alert, metric nghiệp vụ
- Object storage S3-compatible: RustFS ở local, AWS S3 khi lên cloud, presigned URL, CORS bucket
- Bảo mật: OWASP Top 10, rate limit, helmet, secret management

### 3.7 Quyết định công nghệ phụ trợ (đã chốt)

| Nhu cầu | Dùng gì | Đưa vào ở | Vì sao |
|---|---|---|---|
| Database chính | **PostgreSQL** | Phase 0 | Dữ liệu quan hệ rõ, bài toán chống overselling cần transaction và lock |
| NoSQL | **Redis** (cache, seat hold, queue) · `jsonb` của Postgres · MongoDB tùy chọn | Phase 5, 7 | Không dùng NoSQL làm DB chính. MongoDB chỉ ở Notification Service, nơi có lý do thật (xem mục 13) |
| Object storage | **RustFS** ở local → **AWS S3** khi deploy | Phase 3, 8 | Cùng S3 API: code bằng AWS SDK v3, chỉ đổi biến môi trường. MinIO Community Edition đã vào chế độ bảo trì từ 12/2025 nên không chọn |
| Log | **Pino** (`nestjs-pino`), log JSON có `traceId`, `redact` dữ liệu nhạy cảm | Phase 1 | Nhanh, chuẩn trong hệ Node |
| Gom log | **Loki** + Grafana | Phase 8 | Nhẹ hơn ELK rất nhiều, chạy được trên VPS nhỏ |
| Error tracking | **Sentry** (FE + BE) | Mốc MVP (cuối Phase 3) | Có gói miễn phí, thấy lỗi thật của người dùng ngay khi deploy |
| Metrics | **Prometheus** + **Grafana** (`prom-client`) | Phase 5 (local), Phase 8 (prod) | 4 golden signals, metric BullMQ, metric nghiệp vụ |
| Tracing | **OpenTelemetry** → **Tempo** hoặc Jaeger | Phase 5, mở rộng ở Phase 7 | Trace xuyên API → queue → worker, sau đó xuyên các service |
| Môi trường observability local | Image **`grafana/otel-lgtm`** (Grafana, Loki, Tempo, Prometheus, OTel collector trong một container) | Phase 5 | Một dòng trong docker compose là có đủ bộ để học |
| Uptime | **Uptime Kuma** (tự host) hoặc Better Stack | Phase 8 | Ping `/health`, báo qua Telegram/email |
| Search | **PostgreSQL full-text search** + `unaccent` + `pg_trgm` | Phase 1 (bản `ILIKE`), Phase 9 (bản đầy đủ) | Đủ cho vài trăm nghìn sự kiện, không phải vận hành thêm hệ thống. Elasticsearch/OpenSearch là module tùy chọn |

**Không dùng (chỉ cần biết tên):** ELK/OpenSearch để lưu log (quá nặng cho VPS), Datadog/New Relic (tốt nhưng tốn tiền), Kubernetes (Docker Compose là đủ).

---

## 4. Lộ trình theo giai đoạn

> Mỗi phase có: 🎯 Mục tiêu · 📚 Học · 🛠 Việc trong TicketHub · ✅ Definition of Done · ❓ Câu hỏi tự kiểm tra.
> **Quy tắc:** chưa trả lời được câu hỏi tự kiểm tra thì chưa sang phase sau.

---

### Phase 0 — Nền móng & Setup (Tuần 1–2)

🎯 Có một monorepo sạch, chạy được bằng 1 lệnh, chuẩn hóa từ đầu.

📚 Học
- TypeScript nâng cao (generics, utility types, discriminated union, decorators)
- pnpm workspaces + Turborepo
- ESLint (flat config), Prettier, Husky + lint-staged, commitlint (Conventional Commits)
- Docker compose: PostgreSQL, Redis, pgAdmin/Adminer, Mailpit (bắt email local), RustFS (S3-compatible storage)

🛠 Việc
- [ ] Tạo repo GitHub `tickethub`, bảo vệ nhánh `main` (bắt buộc PR)
- [ ] Monorepo: `apps/web` (Next.js), `apps/api` (NestJS), `packages/shared` (types, zod schemas), `packages/eslint-config`, `packages/tsconfig`
- [ ] `docker-compose.yml` cho Postgres, Redis, Mailpit, RustFS (tạo sẵn bucket `tickethub-media`)
- [ ] `.env.example`, README hướng dẫn chạy
- [ ] Vẽ ERD (mục 2.3) và viết **ADR-001: Chọn monorepo**, **ADR-002: Chọn MikroORM**
- [ ] Tạo GitHub Project (Kanban) với issues cho Phase 1

✅ DoD: `pnpm install && docker compose up -d && pnpm dev` → cả web và api chạy; commit sai format bị chặn.

❓ Tự kiểm tra
- `type` vs `interface` khác gì? Khi nào dùng `unknown` thay vì `any`?
- Monorepo có nhược điểm gì?
- Rebase và merge khác nhau thế nào, khi nào không nên rebase?

---

### Phase 1 — Backend Core: NestJS + MikroORM (Tuần 3–6)

🎯 API CRUD hoàn chỉnh cho Event & TicketType, hiểu sâu MikroORM.

📚 Học
- NestJS fundamentals + request lifecycle (vẽ lại sơ đồ bằng tay)
- MikroORM: Unit of Work, Identity Map, `persist`/`flush`, `RequestContext`, relations, `populate`, migrations, seeders, `@Embeddable`
- REST API design: naming, status code, phân trang (offset trước, cursor sau), filter, sort
- Chuẩn hóa response & error format

🛠 Việc
- **Tuần 3:** Setup `MikroOrmModule.forRootAsync` + config validate env; entity `User`, `Organization`, `Event`; migration đầu tiên; seeder dữ liệu mẫu
- **Tuần 4:** Module `events`: Controller → Service → Repository (custom `EntityRepository`); DTO + validation; Swagger
- **Tuần 5:** `TicketType` với Value Object `Money` (`@Embeddable`: `amount` lưu số nguyên theo đơn vị nhỏ nhất, `currency`); tìm kiếm/lọc/phân trang sự kiện (bản đầu dùng `ILIKE`, Phase 9 nâng cấp); slug unique
- **Tuần 6:** Global `ExceptionFilter` chuẩn hóa lỗi; logging bằng `nestjs-pino` (log JSON, correlation id, `redact` các field `password`, `token`, `authorization`, `cookie`); `TransformInterceptor`; health check (`@nestjs/terminus`) tách `/health/live` và `/health/ready` (ready kiểm tra DB, Redis)
- Bonus: Soft delete bằng MikroORM Filter

✅ DoD
- Swagger đầy đủ cho mọi endpoint
- Không có N+1 query (bật `debug: true` và kiểm tra log SQL)
- Migration chạy được từ DB trống
- Lỗi trả về format thống nhất: `{ statusCode, code, message, details?, traceId }`
- Log là JSON, mỗi dòng có `traceId`; gửi thử request login và kiểm tra log **không** chứa mật khẩu hay token

❓ Tự kiểm tra
- `em.persist()` có ghi xuống DB ngay không? `flush()` làm gì?
- Tại sao dùng chung một EntityManager global giữa các request là nguy hiểm?
- Vì sao không lưu tiền bằng `float`?
- Guard và Interceptor khác nhau ở điểm nào? Pipe chạy trước hay sau Guard?

---

### Phase 2 — Authentication & Authorization (Tuần 7–8)

🎯 Auth an toàn kiểu production, phân quyền theo vai trò và theo sở hữu.

📚 Học
- Hash mật khẩu (argon2/bcrypt), JWT (access ngắn hạn + refresh dài hạn)
- **Refresh token rotation** + phát hiện tái sử dụng token, lưu hash refresh token trong DB/Redis
- httpOnly + Secure + SameSite cookie vs lưu localStorage (và vì sao không nên)
- RBAC vs ABAC; thư viện **CASL**
- OWASP Top 10, rate limiting (`@nestjs/throttler`), helmet, CORS

🛠 Việc
- [ ] Module `auth`: register, login, refresh, logout, logout-all-devices
- [ ] `JwtAuthGuard`, decorator `@CurrentUser()`, `@Public()`, `@Roles()`
- [ ] Policy bằng CASL: Organizer chỉ sửa được Event của Organization mình
- [ ] Rate limit cho `/auth/login`
- [ ] Email verification (gửi đồng bộ trước, Phase 5 sẽ chuyển sang queue)
- [ ] Viết **ADR-003: Chiến lược lưu token**

✅ DoD: Không thể sửa Event của người khác (có test chứng minh); refresh token cũ dùng lại → toàn bộ session bị thu hồi.

❓ Tự kiểm tra
- Authentication vs Authorization?
- JWT bị lộ thì làm sao thu hồi?
- CSRF xảy ra khi nào nếu dùng cookie? SameSite giải quyết đến đâu?

---

### Phase 3 — Frontend: Next.js App Router (Tuần 9–12)

🎯 Giao diện hoàn chỉnh cho MVP, hiểu rõ ranh giới Server/Client.

📚 Học
- Server Components, Client Components, khi nào dùng `"use client"`
- Data fetching trong RSC, caching & revalidation, Server Actions
- TanStack Query cho phần tương tác phía client
- React Hook Form + Zod, Zustand, Tailwind + shadcn/ui
- SEO: `generateMetadata`, ISR cho trang sự kiện
- Accessibility cơ bản

🛠 Việc
- **Tuần 9:** Layout, design tokens, component library cơ bản (Button, Input, Card, Dialog); trang danh sách sự kiện (RSC, phân trang, filter qua search params)
- **Tuần 10:** Trang chi tiết sự kiện (ISR + `generateMetadata`); auth pages; middleware bảo vệ route; tự động refresh token
- **Tuần 11:** Dashboard Organizer: CRUD sự kiện, form nhiều bước, upload ảnh bằng presigned URL tới RustFS. Code bằng AWS SDK v3 (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`); `S3_ENDPOINT`, `S3_FORCE_PATH_STYLE`, `S3_PUBLIC_ENDPOINT` lấy từ env để sau này đổi sang AWS S3 không phải sửa code. Cấu hình CORS cho bucket
- **Tuần 12:** Luồng mua vé (giỏ hàng bằng Zustand → checkout → "Vé của tôi"); loading/error/empty states; tạo **API client có type** (generate từ OpenAPI bằng `openapi-typescript` hoặc dùng chung types từ `packages/shared`)

✅ DoD
- Lighthouse ≥ 90 (Performance, Accessibility, SEO) cho trang sự kiện public
- Không có `any` trong code FE
- Mọi form có validation client + hiển thị lỗi từ server

❓ Tự kiểm tra
- Vì sao không thể dùng `useState` trong Server Component?
- Server Action khác Route Handler thế nào? Khi nào dùng cái nào?
- Khi nào cần TanStack Query nếu đã có RSC fetch?
- Hydration error đến từ đâu?

> 🏁 **Mốc 1 (~3 tháng):** MVP chạy end-to-end. **Gắn Sentry cho cả Next.js và NestJS trước khi deploy**, rồi deploy thử bản đầu (xem Phase 8 phần deploy tối thiểu). Viết bài blog/README tổng kết. Đây cũng là lúc **có thể bắt đầu nộp đơn Junior** (xem mục 12).

---

### Phase 4 — Refactor: Clean Architecture, DDD & Design Patterns (Tuần 13–15)

🎯 Biến code "service béo" thành **modular monolith** có domain rõ ràng.

📚 Học
- SOLID với ví dụ thực tế
- Clean/Hexagonal architecture: Domain → Application → Infrastructure → Presentation; Dependency Rule
- DDD tactical: Aggregate (Order là aggregate root của OrderItem), Value Object, Domain Event, Invariant
- State machine cho `Order` (có thể dùng XState hoặc tự viết)
- Patterns: xem mục 6

🛠 Việc
- [ ] Chia module theo **bounded context**: `identity`, `catalog` (Event, TicketType), `ordering` (Order, Ticket), `payment`, `promotion` (Coupon), `notification`
- [ ] Mỗi module có cấu trúc `domain/ application/ infrastructure/ presentation/` (mục 7)
- [ ] Đưa business rule vào entity: `order.markAsPaid()`, `ticketType.reserve(qty)` ném lỗi domain nếu hết vé
- [ ] Use case class: `PlaceOrderUseCase`, `CancelOrderUseCase`
- [ ] Module giao tiếp qua **public interface** hoặc domain event (`@nestjs/event-emitter`), **cấm import entity của module khác**
- [ ] Coupon bằng **Strategy** (PercentDiscount, FixedDiscount) + **Specification** (còn hạn, còn lượt, đúng sự kiện)
- [ ] Payment provider bằng **Adapter** + **Factory** (`MockPaymentAdapter`, `StripeAdapter`)
- [ ] Storage sau một port `FileStorage` (`getUploadUrl`, `getDownloadUrl`, `delete`) với adapter `S3FileStorage`. Use case không biết đang chạy RustFS hay AWS
- [ ] Rule ESLint `import/no-restricted-paths` hoặc `dependency-cruiser` để chặn vi phạm ranh giới module
- [ ] **ADR-004: Modular monolith thay vì microservices ngay**

✅ DoD: Domain layer không import NestJS/MikroORM decorator nào ngoài phần mapping (hoặc chấp nhận có — nhưng phải ghi rõ trade-off trong ADR); unit test domain chạy không cần DB.

❓ Tự kiểm tra
- Aggregate là gì? Vì sao chỉ nên sửa OrderItem thông qua Order?
- Khi nào Clean Architecture là over-engineering?
- Domain Event khác Integration Event thế nào?

> 💡 Mentor note: Với MikroORM, entity vừa là domain model vừa là persistence model là **chấp nhận được** (pragmatic DDD). Đừng tách 2 lớp model chỉ để "đúng sách" nếu bạn không thấy lợi ích.

---

### Phase 5 — Concurrency, Async & Realtime (Tuần 16–19)

🎯 Giải quyết bài toán khó nhất: **không bán quá số vé** và xử lý bất đồng bộ đáng tin cậy.

📚 Học
- Race condition, transaction isolation (Read Committed vs Repeatable Read vs Serializable)
- Optimistic vs Pessimistic locking trong MikroORM
- Redis: TTL, `SET NX`, atomic ops, Lua script cơ bản, distributed lock (và giới hạn của nó)
- BullMQ: queue, worker, retry, backoff, dead-letter, idempotent job
- **Idempotency key**, **Transactional Outbox**
- Webhook: verify chữ ký, xử lý trùng lặp, thứ tự không đảm bảo
- WebSocket (Socket.IO), Redis adapter khi chạy nhiều instance
- Observability cho hệ bất đồng bộ: OpenTelemetry tracing xuyên API → queue → worker, metric BullMQ, metric nghiệp vụ

🛠 Việc
- **Tuần 16 – Chống overselling:**
  - Viết script load test (k6 hoặc autocannon) 500 request mua cùng lúc 50 vé → **quan sát bug** với code hiện tại
  - Fix bằng 3 cách và so sánh: (1) Optimistic lock `version`, (2) `PESSIMISTIC_WRITE`, (3) atomic `UPDATE ... SET sold = sold + ? WHERE sold + ? <= quantity`
  - Ghi kết quả benchmark vào **ADR-005**
- **Tuần 17 – Seat hold & hết hạn đơn:**
  - Order `PENDING` có `expiresAt` 10 phút; giữ chỗ trong Redis có TTL
  - Job BullMQ (delayed) hủy đơn hết hạn và trả vé
  - Header `Idempotency-Key` cho `POST /orders`
- **Tuần 18 – Thanh toán & Outbox:**
  - Tích hợp Stripe test mode (hoặc VNPay sandbox), webhook endpoint có verify signature, xử lý event trùng
  - Bảng `OutboxMessage` ghi cùng transaction với Order; worker đọc outbox → đẩy vào queue
  - Email vé + QR code qua queue (Mailpit ở local, Resend/SES ở prod)
- **Tuần 19 – Realtime:**
  - Gateway WebSocket: phòng theo `eventId`, phát sự kiện số vé còn lại/ghế được giữ
  - FE cập nhật realtime; Staff check-in bằng quét QR (camera trên web)
  - Caching: Redis cache cho trang danh sách sự kiện + chiến lược invalidate
- **Xuyên suốt Phase 5 – Observability:**
  - Thêm `grafana/otel-lgtm` vào docker compose; gắn OpenTelemetry SDK cho API và worker, xem được một trace từ `POST /orders` tới job gửi email
  - Expose `/metrics` (`prom-client`): latency, error rate, độ dài queue, số job failed
  - Metric nghiệp vụ: `tickets_sold_total`, `orders_expired_total`, `optimistic_lock_conflicts_total`, `webhook_duplicates_total`, `outbox_pending` (tuổi của message cũ nhất), và **`tickets_oversold_total` luôn phải bằng 0**

✅ DoD: Load test 1000 request đồng thời → số vé bán **không bao giờ** vượt quantity; webhook gửi lặp 5 lần → chỉ 1 lần xử lý; tắt worker rồi bật lại → không mất email; mở Grafana thấy được trace của một lần mua vé và dashboard metric nghiệp vụ.

❓ Tự kiểm tra
- Vì sao "kiểm tra còn vé rồi mới trừ" trong code lại sai khi có concurrency?
- Outbox giải quyết vấn đề gì mà "lưu DB xong rồi push queue" không giải quyết được?
- At-least-once delivery nghĩa là consumer phải làm gì?

---

### Phase 6 — Testing nghiêm túc (Tuần 20–21, và áp dụng xuyên suốt)

🎯 Tự tin refactor nhờ test; hiểu test pyramid.

📚 Học
- Unit vs Integration vs E2E; test pyramid / testing trophy
- Jest/Vitest, mocking (chỉ mock ranh giới, đừng mock mọi thứ)
- **Testcontainers** (Postgres/Redis thật trong test)
- Supertest cho API e2e; Playwright cho FE e2e
- Test data builders / factories (MikroORM có `Factory` trong seeder)
- Coverage có ý nghĩa vs coverage cho đẹp

🛠 Việc
- [ ] Unit test toàn bộ domain: Order state machine, coupon strategies, Money
- [ ] Integration test repository + transaction + lock với Testcontainers
- [ ] E2E API: luồng register → login → tạo event → mua vé → webhook → nhận vé
- [ ] Playwright: luồng người mua trên FE
- [ ] Test cho bug overselling (Phase 5) để chặn tái phát
- [ ] Đưa tất cả vào CI

✅ DoD: CI xanh; coverage domain ≥ 90%, toàn dự án ≥ 70%; e2e chạy < 5 phút.

❓ Tự kiểm tra
- Vì sao test với SQLite thay Postgres có thể đánh lừa bạn?
- Test nào nên viết nhiều nhất trong dự án này, vì sao?

---

### Phase 7 — Microservices (Tuần 22–26)

🎯 Tách dần monolith, trải nghiệm thật các khó khăn của hệ phân tán.

> ⚠️ Mentor note: Đọc kỹ "Monolith First" (Martin Fowler) trước. Mục tiêu là *hiểu*, và biết nói với sếp khi nào **không** nên dùng microservices.

📚 Học
- Khi nào tách service: theo bounded context, theo khả năng scale, theo team
- Giao tiếp: REST/gRPC (đồng bộ) vs message broker (bất đồng bộ)
- Broker: **NATS** hoặc **RabbitMQ** (dễ bắt đầu), Kafka (tìm hiểu khái niệm)
- `@nestjs/microservices`: `@MessagePattern`, `@EventPattern`, `ClientProxy`
- API Gateway (NestJS gateway tự viết, hoặc Kong/Traefik)
- **Saga:** choreography vs orchestration; compensating transaction
- Database per service, eventual consistency, duplicate data có chủ đích
- SQL vs NoSQL khi mỗi service tự chọn database (MongoDB cho Notification Service là tùy chọn, xem mục 13)
- Distributed tracing: **OpenTelemetry** + Jaeger/Tempo
- Service-to-service auth, timeout, retry, circuit breaker
- Contract testing (Pact) – mức tìm hiểu

🛠 Việc (Strangler Fig pattern – tách từng phần)
- **Tuần 22:** Tách **Notification Service** (dễ nhất, chỉ nhận event): consume `OrderPaid` → gửi email; DB riêng để lưu lịch sử gửi và template (Postgres, hoặc MongoDB nếu làm module tùy chọn)
- **Tuần 23:** Tách **Payment Service**: sở hữu bảng Payment, nhận webhook, phát `PaymentSucceeded`/`PaymentFailed`
- **Tuần 24:** **Saga đặt vé** (orchestration trong Ordering): `OrderCreated` → reserve tickets → request payment → success: confirm & phát hành vé / fail: release tickets & cancel order. Vẽ sequence diagram.
- **Tuần 25:** API Gateway: route request, xác thực JWT tập trung, rate limit; FE chỉ gọi gateway
- **Tuần 26:** OpenTelemetry tracing xuyên service; xử lý lỗi mạng (timeout, retry với backoff, circuit breaker bằng `opossum`); thử tắt Payment Service khi đang mua vé → hệ thống phải xuống cấp an toàn
- **ADR-006: Ranh giới service & broker được chọn**

✅ DoD: Một request mua vé xem được trace đầy đủ qua các service; tắt bất kỳ service phụ nào không làm sập hệ thống; không có service nào đọc trực tiếp DB của service khác.

❓ Tự kiểm tra
- Vì sao không dùng distributed transaction (2PC)?
- Choreography và orchestration – ưu nhược điểm?
- Microservices làm cái gì khó hơn monolith? (Liệt kê ít nhất 5 điều.)

---

### Phase 8 — DevOps, Deploy & Observability (Tuần 27–29)

🎯 Đưa TicketHub lên production thật, có CI/CD và giám sát.

📚 Học
- Dockerfile multi-stage, image nhỏ, chạy non-root
- GitHub Actions: matrix, cache pnpm, Turborepo remote cache, chỉ build app bị thay đổi
- Deploy: VPS (Ubuntu + Docker Compose + Nginx + Let's Encrypt) **hoặc** PaaS (Railway/Fly.io/Render) + Vercel cho Next.js
- Chạy migration an toàn khi deploy (expand–contract cho thay đổi schema)
- Quản lý secrets, môi trường staging vs production
- Observability trên production: Loki (log), Prometheus (metric), Tempo (trace), Grafana (dashboard + alert), Sentry (lỗi), Uptime Kuma (uptime). Thời gian lưu log, mức log theo môi trường
- AWS cơ bản: IAM user/role với quyền tối thiểu, S3 (bucket policy, CORS), biết RDS là gì và khi nào nên dùng thay vì tự chạy Postgres
- Backup Postgres định kỳ và **thử restore**
- (Tìm hiểu) Kubernetes cơ bản: Pod, Deployment, Service, Ingress

🛠 Việc
- [ ] Dockerfile cho từng app; `docker-compose.prod.yml`
- [ ] Pipeline: PR → lint, typecheck, test; merge `main` → build image → deploy staging; tag → production
- [ ] Domain thật + HTTPS
- [ ] Chuyển storage sang **AWS S3** (free tier): tạo bucket, IAM user chỉ có quyền trên bucket đó, CORS; đổi biến môi trường, **không sửa code**
- [ ] (Tùy chọn) Chuyển DB sang AWS RDS, hoặc viết ADR giải thích vì sao vẫn tự chạy Postgres
- [ ] Dựng Loki + Prometheus + Tempo + Grafana trên server (hoặc dùng gói miễn phí của Grafana Cloud); dashboard: request rate, error rate, latency p95, queue length, metric nghiệp vụ từ Phase 5
- [ ] Alert: error rate > 5%, latency p95 > 1s, queue tồn > 1000 job, có job vào dead-letter, `tickets_oversold_total` > 0, outbox ứ đọng quá 5 phút
- [ ] Uptime Kuma ping `/health/ready` mỗi phút, báo qua Telegram hoặc email
- [ ] Runbook: "Làm gì khi payment webhook lỗi", "Rollback deploy thế nào"

✅ DoD: Push code → lên staging tự động trong < 15 phút; có thể rollback trong 5 phút; nhìn dashboard biết hệ thống khỏe hay không.

---

### Phase 9 — Tối ưu, hoàn thiện & sẵn sàng phỏng vấn (Tuần 30–32)

🎯 Đánh bóng dự án thành portfolio, củng cố kiến thức để phỏng vấn Middle.

🛠 Việc
- [ ] Performance BE: phân tích `EXPLAIN ANALYZE`, thêm index đúng chỗ, cursor pagination, tránh over-fetch
- [ ] Search sự kiện bằng PostgreSQL full-text search: cột `tsvector` (generated column) + GIN index, `unaccent` để tìm không dấu, `pg_trgm` để chịu lỗi chính tả; so sánh tốc độ với bản `ILIKE` bằng `EXPLAIN ANALYZE`
- [ ] Performance FE: bundle analyzer, lazy load, giảm client components, Core Web Vitals
- [ ] Dashboard Organizer: báo cáo doanh thu (thử **CQRS**: read model riêng/materialized view)
- [ ] Viết tài liệu kiến trúc: C4 diagram (Context, Container, Component), sequence diagram luồng đặt vé
- [ ] README chuyên nghiệp: demo link, ảnh, kiến trúc, cách chạy, các quyết định kỹ thuật (link ADR)
- [ ] Viết 2–3 bài blog: "Chống overselling vé với MikroORM", "Outbox pattern trong NestJS", "Từ monolith sang microservices: những gì tôi học được"
- [ ] Ôn system design: thiết kế lại TicketHub cho 1 triệu người dùng – điều gì thay đổi?
- [ ] Mock interview: giải thích dự án trong 5 phút, trả lời các câu ❓ ở mọi phase

> 🏁 **Mốc cuối:** Một dự án bạn có thể nói chuyện 1 tiếng với interviewer mà không bí.

---

## 5. Quy tắc code & quy trình làm việc

### 5.1 Naming
- File: `kebab-case` (`place-order.use-case.ts`, `ticket-type.entity.ts`)
- Class: `PascalCase`; biến/hàm: `camelCase`; hằng số: `UPPER_SNAKE_CASE`
- Boolean: `isPaid`, `hasExpired`, `canCheckIn`
- Hàm bắt đầu bằng động từ: `calculateTotal`, `reserveTickets`
- Tránh tên chung chung: `data`, `info`, `handle`, `manager`, `utils.ts` khổng lồ

### 5.2 Nguyên tắc chung
- Hàm ngắn, làm một việc; tối đa ~3 tham số (nhiều hơn → dùng object)
- Early return thay vì if lồng nhau
- Không "magic number/string" → dùng enum/const
- Lỗi nghiệp vụ dùng class lỗi riêng (`InsufficientTicketsError`), map sang HTTP ở presentation layer
- Không để business logic trong Controller hoặc React component
- Comment giải thích **tại sao**, không giải thích **cái gì**
- `strict: true` trong tsconfig, cấm `any` (ESLint `no-explicit-any`)

### 5.3 Git workflow
- Nhánh: `feat/order-expiration`, `fix/oversell-race`, `refactor/catalog-module`, `chore/ci-cache`
- Commit theo Conventional Commits: `feat(ordering): add order expiration job`
- PR nhỏ (< 400 dòng thay đổi), mô tả rõ: bối cảnh, thay đổi, cách test, ảnh chụp (nếu FE)
- Tự review PR của mình trước khi merge (đọc diff như đọc code người khác)
- Squash merge vào `main`

### 5.4 API conventions
- Danh từ số nhiều: `/events`, `/events/:id/ticket-types`
- Hành động không thuần CRUD: `POST /orders/:id/cancel`
- Phân trang: `?page=1&limit=20` hoặc `?cursor=...&limit=20`; trả `meta`
- Version: `/api/v1`
- Thời gian luôn ISO 8601 UTC; FE tự hiển thị theo múi giờ

---

## 6. Design patterns áp dụng ở đâu

| Pattern | Ở đâu trong TicketHub | Phase |
|---|---|---|
| **Repository** | Custom `EntityRepository` cho Event, Order | 1 |
| **Unit of Work / Identity Map** | Có sẵn trong MikroORM – hiểu và tận dụng | 1 |
| **Dependency Injection** | Toàn bộ NestJS | 1 |
| **Decorator** | `@CurrentUser`, `@Roles`, interceptor logging/caching | 1–2 |
| **Chain of Responsibility** | Middleware/Guard/Interceptor pipeline | 1–2 |
| **Value Object** | `Money`, `Email`, `DateRange` | 1, 4 |
| **Strategy** | Cách tính giảm giá của Coupon; chiến lược gửi thông báo (email/SMS) | 4 |
| **Specification** | Điều kiện áp dụng coupon, điều kiện được hoàn tiền | 4 |
| **Factory** | Tạo payment adapter theo provider; tạo Ticket + mã QR | 4 |
| **Adapter** | Bọc Stripe/VNPay, bọc dịch vụ email, `FileStorage` → `S3FileStorage` (RustFS/AWS) | 4 |
| **State** | Vòng đời `Order` (PENDING → PAID → REFUNDED…) | 4 |
| **Observer / Domain Events** | `OrderPaid` → phát hành vé, gửi email | 4–5 |
| **Facade** | Module public API giữa các bounded context | 4 |
| **Builder** | Test data builders; query builder lọc sự kiện | 6 |
| **Outbox** | Đảm bảo phát event sau khi commit DB | 5 |
| **Saga** | Luồng đặt vé phân tán | 7 |
| **Circuit Breaker / Retry** | Gọi Payment Service | 7 |
| **API Gateway / BFF** | Gateway cho FE | 7 |
| **Strangler Fig** | Cách tách monolith | 7 |
| **CQRS** | Dashboard báo cáo doanh thu | 9 |
| FE: **Compound Components** | `Tabs`, `Stepper` của checkout | 3 |
| FE: **Custom Hook** | `useCart`, `useCountdown` (thời gian giữ vé) | 3 |
| FE: **Container/Presentational** (bản RSC) | Server Component fetch → Client Component hiển thị | 3 |

> Quy tắc vàng: **không dùng pattern vì muốn dùng pattern.** Viết code đơn giản trước, khi thấy đau (if-else dài, khó test, khó mở rộng) mới đưa pattern vào — và ghi lại lý do.

---

## 7. Cấu trúc thư mục tham khảo

### 7.1 Monorepo
```
tickethub/
├── apps/
│   ├── web/                    # Next.js
│   ├── api/                    # NestJS (modular monolith)
│   ├── gateway/                # Phase 7
│   ├── payment-service/        # Phase 7
│   └── notification-service/   # Phase 7
├── packages/
│   ├── shared/                 # zod schemas, types, constants dùng chung
│   ├── contracts/              # định nghĩa message/event giữa services (Phase 7)
│   ├── eslint-config/
│   └── tsconfig/
├── infra/
│   ├── docker/
│   ├── nginx/
│   ├── rustfs/                 # script tạo bucket, cấu hình CORS
│   └── observability/          # cấu hình Grafana, Prometheus, Loki, alert rules
├── docs/
│   ├── adr/
│   ├── diagrams/
│   └── runbooks/
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

### 7.2 Backend module (sau Phase 4)
```
apps/api/src/
├── main.ts
├── app.module.ts
├── config/                     # env schema, mikro-orm.config.ts
├── common/                     # filters, interceptors, guards, decorators dùng chung
│   └── storage/                # port FileStorage + adapter S3FileStorage (Phase 4)
├── database/
│   ├── migrations/
│   └── seeders/
└── modules/
    └── ordering/
        ├── domain/
        │   ├── order.entity.ts
        │   ├── order-item.entity.ts
        │   ├── order-status.enum.ts
        │   ├── events/order-paid.event.ts
        │   └── errors/insufficient-tickets.error.ts
        ├── application/
        │   ├── use-cases/place-order.use-case.ts
        │   ├── use-cases/cancel-order.use-case.ts
        │   └── ports/payment-gateway.port.ts
        ├── infrastructure/
        │   ├── order.repository.ts
        │   ├── jobs/expire-order.processor.ts
        │   └── adapters/
        ├── presentation/
        │   ├── orders.controller.ts
        │   └── dto/
        ├── ordering.module.ts
        └── index.ts            # public API của module
```

### 7.3 Frontend (Next.js)
```
apps/web/src/
├── app/
│   ├── (public)/events/[slug]/page.tsx
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/organizer/events/...
│   ├── layout.tsx
│   └── api/                    # route handlers (nếu cần)
├── features/                   # tổ chức theo tính năng
│   ├── events/  (components, hooks, api, schemas)
│   ├── checkout/
│   └── auth/
├── components/ui/              # shadcn/ui, component thuần hiển thị
├── lib/                        # api-client, utils, query-client
└── stores/                     # zustand
```

---

## 8. Templates

### 8.1 ADR (Architecture Decision Record) – `docs/adr/NNN-title.md`
```md
# ADR-005: Chiến lược chống overselling

- Trạng thái: Accepted
- Ngày: 2026-xx-xx

## Bối cảnh
Nhiều người mua cùng lúc gây bán vượt số vé...

## Các phương án
1. Optimistic locking – ưu: ..., nhược: ...
2. Pessimistic locking – ...
3. Atomic conditional UPDATE – ...

## Quyết định
Chọn phương án 3 vì ...

## Hệ quả
- Tích cực: ...
- Tiêu cực / rủi ro: ...
- Số liệu benchmark: ...
```

### 8.2 PR checklist
```md
## Mô tả
Tại sao cần thay đổi này? Liên kết issue: #

## Thay đổi chính
-

## Cách test
-

## Checklist
- [ ] Đã tự review diff
- [ ] Có test cho logic mới / bug fix
- [ ] Không có console.log, code thừa, TODO vô chủ
- [ ] Đã cập nhật migration (nếu đổi schema) và Swagger
- [ ] Đã xử lý loading / error / empty state (FE)
- [ ] Không lộ dữ liệu nhạy cảm trong response/log
- [ ] Đã cân nhắc concurrency, transaction, idempotency (nếu liên quan)
```

### 8.3 Cấu trúc README dự án
1. Giới thiệu ngắn + demo link + ảnh
2. Tính năng chính
3. Kiến trúc (sơ đồ C4) + link ADR
4. Tech stack và lý do chọn
5. Chạy local (3 lệnh)
6. Testing
7. Những bài toán kỹ thuật thú vị đã giải quyết
8. Roadmap / hạn chế còn tồn tại

---

## 9. Lịch học hằng tuần

Gợi ý cho 12–15 giờ/tuần:

| Ngày | Việc | Thời lượng |
|---|---|---|
| T2, T4 | Học lý thuyết: docs chính thức, sách, video | 1.5h/buổi |
| T3, T5 | Code tính năng trong TicketHub | 2h/buổi |
| T7 | Code "phiên dài": tính năng lớn / refactor | 4h |
| CN | **Review tuần**: đọc lại code tuần qua, viết nhật ký học, viết ADR, lập kế hoạch tuần sau | 1–2h |

### Nhật ký học (`docs/journal/week-XX.md`)
```md
## Tuần XX
- Đã học:
- Đã làm (link PR):
- Bug khó nhất & cách giải:
- Điều chưa hiểu, cần tìm hiểu thêm:
- Nếu làm lại, tôi sẽ:
```

### Cách tự review như senior
- Đọc code sau 2–3 ngày, khi đã "quên" nó
- Hỏi: *người mới vào đọc có hiểu không? Đổi yêu cầu X thì phải sửa bao nhiêu file? Test chỗ này khó không, vì sao?*
- Dùng AI để review, nhưng **bắt nó giải thích**, và tự quyết định có làm theo hay không

---

## 10. Checklist tự đánh giá

**Backend**
- [ ] Giải thích được request lifecycle của NestJS
- [ ] Giải thích được Unit of Work, Identity Map, `RequestContext` của MikroORM
- [ ] Thiết kế schema có index hợp lý, đọc được `EXPLAIN ANALYZE`
- [ ] Xử lý được race condition bằng ít nhất 2 cách
- [ ] Triển khai được auth với refresh token rotation
- [ ] Dùng queue, hiểu retry/idempotency/outbox

**Frontend**
- [ ] Biết khi nào dùng Server vs Client Component
- [ ] Hiểu caching & revalidation của Next.js
- [ ] Quản lý server state bằng TanStack Query, form bằng RHF + Zod
- [ ] Debug được hydration error, re-render thừa

**Kiến trúc**
- [ ] Áp dụng SOLID và giải thích bằng ví dụ trong dự án
- [ ] Giải thích được modular monolith vs microservices, khi nào chọn cái nào
- [ ] Triển khai được saga và hiểu compensating action
- [ ] Viết được ADR có trade-off rõ ràng

**Production**
- [ ] Tự viết Dockerfile, CI/CD
- [ ] Deploy được, rollback được
- [ ] Có log, metric, tracing, alert; biết đọc chúng khi có sự cố
- [ ] Có metric nghiệp vụ và giải thích được vì sao từng metric quan trọng
- [ ] Đổi storage từ RustFS sang AWS S3 chỉ bằng biến môi trường
- [ ] Trả lời được "SQL hay NoSQL, vì sao" bằng ví dụ trong TicketHub

**Kỹ năng mềm**
- [ ] Tự chia một feature lớn thành task nhỏ và ước lượng
- [ ] Viết PR description và tài liệu rõ ràng
- [ ] Trình bày dự án trong 5 phút, đi sâu 1 tiếng (cả bằng tiếng Việt lẫn tiếng Anh)

---

## 11. Tài liệu tham khảo

**Docs chính thức (ưu tiên số 1)**
- NestJS: https://docs.nestjs.com
- MikroORM: https://mikro-orm.io/docs
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TanStack Query: https://tanstack.com/query
- BullMQ: https://docs.bullmq.io
- PostgreSQL: https://www.postgresql.org/docs
- RustFS: https://docs.rustfs.com
- AWS SDK for JavaScript v3 (S3): https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
- OpenTelemetry JS: https://opentelemetry.io/docs/languages/js/
- Grafana (Loki, Tempo, Prometheus): https://grafana.com/docs/

**Sách**
- *Clean Code* – Robert C. Martin (đọc có chọn lọc)
- *Refactoring* (2nd ed.) – Martin Fowler
- *Designing Data-Intensive Applications* – Martin Kleppmann (rất quan trọng cho Phase 5, 7)
- *Domain-Driven Design Distilled* – Vaughn Vernon (ngắn, dễ vào hơn sách xanh của Evans)
- *Building Microservices* (2nd ed.) – Sam Newman
- *Head First Design Patterns* hoặc https://refactoring.guru/design-patterns

**Bài viết nên đọc**
- Martin Fowler – *MonolithFirst*, *StranglerFigApplication*, *CQRS*
- microservices.io (Chris Richardson) – Saga, Transactional Outbox, API Gateway
- The Twelve-Factor App – https://12factor.net
- OWASP Top 10 – https://owasp.org/www-project-top-ten

**Repo tham khảo** (đọc để học cấu trúc, đừng copy)
- Tìm trên GitHub: `nestjs clean architecture`, `nestjs ddd`, `mikro-orm realworld example`, `nextjs app router saas starter`

---

## 12. Sẵn sàng đi xin việc

> Dựa trên các JD Fullstack (NestJS/Next.js/Node/React) trên ITviec, tháng 11/2026. Thị trường thay đổi nhanh: trước khi nộp, hãy đọc lại 10–20 JD mới nhất và cập nhật mục này.

### 12.1 JD thường yêu cầu gì

| Yêu cầu hay gặp | TicketHub | Ghi chú |
|---|---|---|
| NestJS, React/Next.js, TypeScript | ✅ Phase 1–3 | Khớp gần như hoàn toàn |
| SQL (PostgreSQL/MySQL) | ✅ Sâu: index, transaction, lock | Vượt mức Junior |
| REST API, WebSocket | ✅ Phase 1, 5 | |
| Design pattern, kiến trúc | ✅ Phase 4 | |
| Docker, CI/CD | ✅ Phase 8 | |
| Testing (Jest, Cypress/Playwright) | ✅ Phase 6 | |
| Microservices (điểm cộng) | ✅ Phase 7 | |
| NoSQL (MongoDB) | ⚠️ Redis + module tùy chọn MongoDB | Xuất hiện ở nhiều JD |
| Cloud AWS/GCP (S3, RDS, Lambda, SQS) | ⚠️ S3 thật ở Phase 8, phần còn lại là module tùy chọn | JD Middle gần như luôn có |
| Tiếng Anh | ❌ Ngoài phạm vi code | Có trong hầu hết JD |
| Số năm kinh nghiệm | ❌ Dự án cá nhân không thay được | Junior thường 1–2 năm, Middle 2–3+ năm |

### 12.2 Khi nào nộp đơn

- **Sau Mốc 1 (cuối Phase 3, MVP đã deploy, có Sentry):** nộp các vị trí **Junior / Fresher+**.
- **Sau Phase 5 (chống overselling, queue, outbox, có observability):** nộp **Junior+ hoặc Junior/Middle**. Đây là phần làm bạn nổi bật hẳn so với ứng viên cùng cấp.
- **Không đợi xong Phase 9.** Vừa đi làm vừa hoàn thiện TicketHub là bình thường. Kinh nghiệm làm việc thật cộng với dự án sâu là con đường nhanh nhất lên Middle.
- Với vị trí "đầu Middle" khi chưa có năm kinh nghiệm nào: TicketHub đủ để qua vòng phỏng vấn kỹ thuật, nhưng nhiều nơi lọc CV theo số năm. Hãy nhắm các JD ghi "Junior/Middle" và dùng dự án để đàm phán mức lương cao hơn.

### 12.3 Bù các khoảng trống

- **Tiếng Anh (ít tốn công, tác động lớn):** viết README, ADR, commit message và PR description bằng tiếng Anh từ Phase 0. Luyện trình bày TicketHub trong 5 phút bằng tiếng Anh.
- **AWS:** S3 thật ở Phase 8; nếu còn thời gian làm Module C (mục 13).
- **NoSQL:** chuẩn bị câu trả lời "SQL hay NoSQL" bằng ví dụ thật: Postgres cho đơn hàng vì cần transaction, Redis cho seat hold vì cần TTL, MongoDB (nếu làm Module B) cho lịch sử thông báo.
- **Dùng AI khi code:** nhiều nơi hỏi bạn dùng AI thế nào. Kể quy trình học với AI mentor (AGENTS.md): AI gợi ý và review, bạn tự quyết định và tự viết.

### 12.4 CV và cách kể dự án

- CV một trang. Mục dự án ghi **bài toán và kết quả đo được**, không liệt kê công nghệ suông. Ví dụ: "Chống bán vượt vé khi 1000 request đồng thời: so sánh 3 chiến lược lock, chọn atomic conditional UPDATE (ADR-005), p95 giảm từ X ms xuống Y ms".
- Link GitHub (README tốt, có sơ đồ kiến trúc, link ADR) và link demo đang chạy.
- Chuẩn bị 3 câu chuyện kỹ thuật kể được trong 2–3 phút mỗi câu: chống overselling, outbox và idempotency, một lần debug khó nhờ log/trace.
- Gõ `phỏng vấn thử` với AI mentor trước mỗi buổi phỏng vấn thật.

---

## 13. Module tùy chọn

Làm khi đã xong phase tương ứng và còn thời gian. Không bắt buộc để đạt mục tiêu của roadmap.

### Module A — Search engine riêng (sau Phase 5, ưu tiên sau Phase 9)
- **Khi nào cần:** Postgres full-text search (Phase 9) không còn đáp ứng: cần xếp hạng độ liên quan tốt hơn, facet (đếm kết quả theo bộ lọc), autocomplete, dữ liệu rất lớn.
- **Chọn gì:** Elasticsearch hoặc OpenSearch (mạnh, hay có trong JD, nhưng nặng) hoặc Meilisearch/Typesense (nhẹ, chịu lỗi chính tả tốt ngay từ đầu).
- **Bài học chính là đồng bộ dữ liệu:** domain event `EventPublished`/`EventUpdated` → outbox → worker cập nhật index; xử lý eventual consistency, reindex toàn bộ, phát hiện index lệch so với DB. Search index **không bao giờ** là nguồn dữ liệu chính.
- Khái niệm cần nắm: inverted index, analyzer (tiếng Việt cần bỏ dấu bằng `asciifolding` hoặc ICU), mapping, relevance score.
- ✅ DoD: tìm "nhac rock ha noi" ra đúng sự kiện; sửa tên sự kiện thì sau vài giây kết quả search cập nhật; có lệnh reindex.

### Module B — MongoDB cho Notification Service (trong Phase 7)
- Lưu lịch sử thông báo đã gửi (kênh, trạng thái, số lần retry, payload) và template email: dữ liệu dạng document, ghi nhiều, ít quan hệ.
- Dùng Mongoose hoặc MikroORM (MikroORM có driver MongoDB). Thiết kế index cho truy vấn "lịch sử thông báo của user X".
- Viết **ADR-007: Vì sao Notification Service dùng MongoDB còn Ordering dùng Postgres**.

### Module C — AWS ngoài S3 (sau Phase 8)
- **LocalStack** để giả lập AWS ở local; thử SQS thay cho một queue BullMQ (ví dụ queue gửi email) và so sánh.
- RDS cho Postgres; Secrets Manager hoặc SSM Parameter Store cho secret.
- Ghi chú chi phí: luôn đặt budget alert trên AWS trước khi tạo tài nguyên.

---

### Lời nhắn từ mentor
Bạn sẽ có những tuần bí, code xấu, muốn đập đi làm lại. Bình thường. Điều quan trọng là **commit mỗi tuần, ghi nhật ký mỗi tuần, và không bỏ dự án giữa chừng để chạy theo dự án mới**. Một dự án được làm sâu đến production có giá trị hơn mười dự án tutorial.

Khi xong mỗi phase, hãy mang code và câu trả lời phần ❓ đến để "mentor" review. 💪
