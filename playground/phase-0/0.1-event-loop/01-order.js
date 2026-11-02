// Bài 1 — Đoán thứ tự in ra
//
// LUẬT: điền dự đoán vào bên dưới TRƯỚC khi chạy `node 01-order.js`.
//
// Dự đoán của tôi (thứ tự các số): TODO
//
// Lý do từng dòng (dòng nào vào call stack / microtask queue / macrotask queue?):
// - '1': TODO
// - '2': TODO
// - '3': TODO
// - '4': TODO
// - '5': TODO
// - '6': TODO
// - '7': TODO
//
// Kết quả thực tế sau khi chạy: TODO
// Nếu sai, mình đã hiểu sai ở đâu: TODO

console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
queueMicrotask(() => console.log('4'));
(async () => {
  console.log('5');
  await null;
  console.log('6');
})();
console.log('7');
