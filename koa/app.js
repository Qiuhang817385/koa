const KOA = require('koa');
const app = new KOA();
const static = require('koa-static');
const fs = require('fs');
const open = require('open');
app.use(static(__dirname + '/dist'));

app.use(ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./dist/index.html')
})

app.listen(3030)
open('http://127.0.0.1:3030');

console.log('app listening at http://127.0.0.1:%s', 3030);

/*
  这里的 app.listen(...) 方法只是以下方法的语法糖:
  const http = require('http');
  const Koa = require('koa');
  const app = new Koa();
  http.createServer(app.callback()).listen(3000);
 */