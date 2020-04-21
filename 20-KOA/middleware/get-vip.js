const vip = require("../model/vip");
module.exports = async (ctx, next) => {
  if (ctx.accepts("html") === 'html') {
    ctx.state.vipCourses = await vip.find();
    // console.log(ctx.state)
  }
  await next();
};