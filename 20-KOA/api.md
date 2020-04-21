# 开始响应

## ctx.type = 'text/html;charset=utf-8'

## ctx.body = 'hello';

## ctx.status = 200;

# 响应结束

## ctx.response.get('X-Response-Time')

## ctx.set('XXX- time', `${ms}ms`)

## ctx.method

## ctx.url

# 错误处理

## ctx.app.emit('error', error, ctx)

## app.on('error', (err) => {console.log('app 出错了')})

# 静态

## ctx.render('index')

## 中间件 await next()

## Date.now()

## ctx.accepts("html") === 'html' 当有 tml 请求的时候，进行拦截操作

## ctx.state.vipCourses = await vip.find(); state koa 传值的约定

```js
// nfn
// +prom
// +then

// efn
// rqr
// anfn
// sto
// sti
```

## 错误处理，promise 是向下抛，async，try catch 是向上抛

# router 路由，其实就是 mvc 当中的控制器

# 安装

```js
yarn add koa  koa-router


```

# 静态文件服务 koa-static

意思就是，在指定下的目录，文件可以直接运行

## vue 是 mustache 语法风格，hbs 也是

## 和 freemaker 关系亲近

## 学习到的内容

```js
1.通过koa来搭建服务器，并且设置接口，但是没有必要，有easy-mock呢
2.linux免密登录

```

![image-20200421143716629](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200421143716629.png)

![image-20200421143750029](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200421143750029.png)

公钥免密登录



git也一样