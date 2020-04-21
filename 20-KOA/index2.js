const KOA = require('koa');
const app = new KOA();
const mongoose = require('./model/mongoose')
const getVip = require('./middleware/get-vip')

// AOP面向切面编程
// 典型的例子,鉴权/错误处理/日志
// 实现方法,语言级别,框架级,-->vue的router路由守卫,axios的拦截器
/**
 * sleep函数
 */
const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 300);
  })
}
/**
 * 响应时间输出
 */
app.use(async (ctx, next) => {
  await next();
  let rt = ctx.response.get('XXX-time')
  console.log(`输出计时:${ctx.method} ${ctx.url}:${rt}`)
})

/**
 * 响应时间计时,应该在响应里面暂停,这样才可以,或者处理当中暂停
 * await sleep()，开始和结束的处理逻辑
 */
app.use(async (ctx, next) => {
  let start = Date.now();
  console.log('计时');
  //处理中暂停 await sleep()
  await next();
  let ms = Date.now() - start;
  ctx.set('XXX-time', `${ms}ms`)
  console.log('结束');
})

/**
 * 错误处理-AOP
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500
    ctx.body = error.message;
    //触发应用层的错误事件,如果注释掉,依然会执行,但是不会报错在控制台
    // 会触发全局错误error
    ctx.app.emit('error', error, ctx)
    console.log('中间件出错了')
  }
})


/**
 * 静态服务
 */
const static = require('koa-static');
app.use(static(__dirname + '/public'))


//... static
app.use(getVip)


const hbs = require('koa-hbs')
app.use(hbs.middleware({
  viewPath: __dirname + '/views', //视图根目录
  defaultLayout: 'layout', //默认布局页面
  partialsPath: __dirname + '/views/partials', //注册partial目录
  disableCache: true //开发阶段不缓存
}));


/**
 * 响应，响应中的逻辑
 */
// app.use(async (ctx) => {
//   //响应时暂停await sleep()
//   ctx.status = 200;
//   ctx.type = 'html';
//   ctx.body = '<h1>123</h1>'
// })

let index = require("./routers/index");
let users = require("./routers/users");
let state = require("./routers/state");
app.use(index.routes())
app.use(users.routes())
app.use(state.routes())



app.on('error', (err) => {
  console.log('app出错了')
  // 原console.error(err)

  //再向上抛
  // throw err 抛到node层 框架层抛到node层，那么会完全终止服务
})

app.listen(3030);
