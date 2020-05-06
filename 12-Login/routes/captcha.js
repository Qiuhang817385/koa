const Router = require('koa-router');
const router = new Router();
const captcha = require('trek-captcha');
router.get('/api/captcha', async ctx => {
  // token:产生的码是什么
  // buffer,图片
  const { token, buffer } = await captcha({ size: 4 })
  // 把token存储到session当中，字段是captcha
  ctx.session.captcha = token
  ctx.body = buffer
})

module.exports = router;