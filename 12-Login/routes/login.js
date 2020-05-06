const Router = require("koa-router");
const router = new Router();
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const md5 = require('blueimp-md5')
const secret = 'it is a'

router.post('/login', async ctx => {
  const { body } = ctx.request
  console.log('body:', body)
  const { username, password } = body;
  // const username = .username;
  let userTable = [
    {
      username: 'admin',
      age: 16,
      sex: 0,
      password: md5('123456')
    },
    {
      username: 'user',
      age: 19,
      sex: 1,
      password: md5('123456')
    }
  ]


  // userI.find(''),查找用户,判断密码是否正确,有的话ok,没有的话用户名密码错误


  if (username == 'admin' && password == md5('123456')) {
    ctx.body = {
      code: '0',
      token: jwt.sign({
        data: { name: username },
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      }, secret),
      userInfo: { username, key: 1 },
      message: '登陆成功',
    }
  } else if (username == 'user' && password == md5('123456')) {
    ctx.body = {
      code: '0',
      token: jwt.sign({
        data: { name: username },
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      }, secret),
      userInfo: { username, key: 2 },
      message: '登陆成功',
    }
  } else {
    ctx.status = 401;
    ctx.body = { code: '1', message: "用户名或者密码错误" };
  }


})


router.post('/login_phone', async ctx => {
  const { body } = ctx.request
  const { phone } = body;

  ctx.body = {
    code: '0',
    token: jwt.sign({
      data: { phone },
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }, secret),
    userInfo: { phone, key: 1 },
    message: '登陆成功',
  }

})

module.exports = router;