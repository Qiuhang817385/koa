// nfn
// +prom
// +then
// efn
// rqr
// 快捷键使用
const Koa = require('koa');
const app = new Koa();
const mid1 = async (ctx, next) => {
  ctx.body = 'hello';
  await next()
  ctx.body += `!!!`
}
const mid2 = async (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8'
  await next()
}
const mid3 = async (ctx, next) => {
  ctx.body += `你好`
}
app.use(mid1);
app.use(mid2);
app.use(mid3);
app.listen(3030)


