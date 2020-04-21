const Router = require('koa-router');
const router = new Router();
router.get('/', async (ctx) => {
  // ctx.body = '首页'
  await ctx.render('index')
}
)
module.exports = router