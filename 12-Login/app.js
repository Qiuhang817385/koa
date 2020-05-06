const Koa = require('koa');
const app = new Koa();

var cors = require('koa2-cors');
app.use(cors());

// 签名key keys作用 用来对cookie进行签名
app.keys = ['some secret'];
const session = require('koa-session')
// 注册
const SESS_CONFIG = {
  key: 'ses:saaa', // cookie键名
  // maxAge: 86400000, // 有效期，默认一天
  // httpOnly: true, // 仅服务器修改
  // signed: true, // 签名cookie
};
app.use(session(SESS_CONFIG, app));

const bouncer = require("koa-bouncer");
app.use(bouncer.middleware());

const bodyparser = require('koa-bodyparser')
app.use(bodyparser())

const login = require('./routes/login');
const captcha = require('./routes/captcha')
const sms = require('./routes/sms')
app.use(login.routes());
app.use(captcha.routes());
app.use(sms.routes());

app.listen(3030);