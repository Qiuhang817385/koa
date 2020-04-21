const Router = require('koa-router');
const router = new Router();
router.get('/state', async (ctx) => {
  // 定义一个接口，通过和数据库做链接
  ctx.body = ctx.state.vipCourses
}
)
module.exports = router
// await ctx.render('index')