const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

app.use(bodyParser()); // 注册koa-bodyparser中间件
app.use(router.routes()).use(router.allowedMethods()); // 注册路由中间件

const server = app.listen(3000, () => {
  console.log('Koa server listening on port 3000');
});

module.exports = server;