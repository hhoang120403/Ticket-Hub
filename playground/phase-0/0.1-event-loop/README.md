# 0.1 — Event loop, Promise, async/await 🔴

Đọc trước:
- https://javascript.info/event-loop
- https://javascript.info/async
- Video Philip Roberts: https://www.youtube.com/watch?v=8aGhZQkoFbQ

## Cách chạy

```bash
node 01-order.js
npx tsx 02-retry.ts
npx tsx 03-promise-combinators.ts
```

## Thứ tự làm
1. `01-order.js`: **đoán trước, chạy sau**. Gửi mentor dự đoán + lý do rồi mới làm bài 2.
2. `02-retry.ts`: `sleep` + `retry` có exponential backoff.
3. `03-promise-combinators.ts`: so sánh `all` / `allSettled` / `race` / `any`.

## Tự kiểm tra sau khi xong
- Microtask và macrotask khác nhau thế nào? Kể tên 2 loại mỗi bên.
- Sau `await`, phần code còn lại của hàm chạy ở đâu: microtask hay macrotask?
