const Router = require("koa-router");
const router = new Router({ prefix: '/users' });
// router.get("/", async ctx => {
//   console.log('user')
//   // ctx.body = "users list";
//   await ctx.render("users", {
//     title: "用户列表",
//     subTitle: "handlebars语法",
//     isShow: true,
//     username: "jerry",
//     htmlStr: `<h3>abc</h3>`,
//     users: [
//       { username: "tom", age: 20, birth: new Date(1999, 2, 2) },
//       { username: "jerry", age: 20, birth: new Date(1999, 3, 2) }
//     ]
//   });
// });

router.post('/login', async ctx => {
  const { body } = ctx.request
  console.log('body', body)
  // 登录逻辑

  ctx.session.userinfo = body.username

  ctx.body = {
    ok: 1,
    message: '登录成功'
  }
})

router.post('/logout', async ctx => {
  delete ctx.session.userinfo
  ctx.body = {
    ok: 1,
    message: '退出系统'
  }
})

router.get('/getUser', require('../middleware/auth'), async ctx => {
  ctx.body = {
    ok: 1,
    message: '获取成功',
    userinfo: ctx.session.userinfo
  }
})

const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const secret = 'it is a'

router.post('/login-token', async ctx => {
  const { body } = ctx.request
  console.log('body:', body)

  //  数据库验证
  const userinfo = body.username
  ctx.body = {
    message: '登陆成功',
    user: userinfo,
    token: jwt.sign({
      data: userinfo,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }, secret)
  }
})

router.get('/getUser-token', jwtAuth({ secret }), async ctx => {
  console.log('state: ', ctx.state.user)
  ctx.body = {
    message: '获取数据成功',
    userinfo: ctx.state.user.data
  }
})


// ------------------------------------------------------------------------- 
// Restful接口
// 请求所有和请求一条
const users = [{ id: 1, name: "tom" }, { id: 2, name: "jerry" }];
// get请求，请求user  ？name=tom
router.get("/", ctx => {
  console.log("GET /users", ctx.body);
  const { name } = ctx.query; // ?name=xx
  let data = users;
  // 如果请求1条数据
  if (name) {
    data = users.filter(u => u.name === name);
  }
  ctx.body = { ok: 1, data };
});

// 第二种写法
router.get("/:id", ctx => {
  console.log("GET /users/:id");
  const { id } = ctx.params; // /users/1
  const data = users.find(u => u.id == id);
  ctx.body = { ok: 1, data };
});

const bouncer = require("koa-bouncer");

const val = async (ctx, next) => {
  try {
    // 校验开始
    ctx
      .validateBody("name")
      .required("要求提供用户名")
      .isString()
      .trim()
      .isLength(6, 16, "用户名长度为6~16位")
    // 是否邮箱格式
    // .isEmail('非法的邮箱格式')
    // .eq('laowang1', "验证码填写有误")
    // 同步逻辑判断
    // .check('laowang' !== ctx.vals.name, "用户名已存在")
    // 异步逻辑判断
    //  const hasUser = () => new Promise(resolve => resolve(true))
    // .check(await hasUser(),"用户名已存在")

    // 如果走到这里校验通过
    // 校验器会用净化后的值填充 `ctx.vals` 对象
    console.log('ctx.vals', ctx.vals);
    next()
  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      ctx.body = '校验失败：' + error.message;
      return;
    }
    throw error

  }
}


//post提交添加数据

router.post("/", val, ctx => {
  // 校验器会用净化后的值填充 `ctx.vals` 对象
  console.log("POST /users");
  // const { body: user } = ctx.request; // 请求body
  // 获取数据的第二种方式
  const user = ctx.vals;
  // 设置id号是最大值+1
  user.id = users.length + 1;
  users.push(user);
  ctx.body = { ok: 1 };
});

// 编辑操作
router.put("/", ctx => {
  console.log("PUT /users");
  const { body: user } = ctx.request; // 请求body
  const idx = users.findIndex(u => u.id == user.id);
  // console.log(idx,ctx.body)
  if (idx > -1) {
    users[idx] = user;
  }
  console.log('user', users)
  ctx.body = { ok: 1 };
});
// 删除
router.delete("/:id", ctx => {
  console.log("DELETE /users/:id");
  const { id } = ctx.params; // /users/1
  const idx = users.findIndex(u => u.id == id);
  if (idx > -1) {
    users.splice(idx, 1);
  }
  ctx.body = { ok: 1 };
});

// 文件上传
const upload = require("koa-multer")({ dest: "./public/images" });
router.post("/upload", upload.single("file"), ctx => {
  console.log(ctx.req.file); // 注意数据存储在原始请求中
  console.log(ctx.req.body); // 注意数据存储在原始请求中
  ctx.body = "上传成功";
});



module.exports = router;