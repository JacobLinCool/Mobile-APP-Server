const Koa = require("koa");
const KoaRT = require("koa-response-time");
const KoaMount = require("koa-mount");
const KoaStatic = require("koa-static");

// const app = new Koa()
//     .use(KoaRT())
//     .use(KoaMount("/api", require("./api")))
//     .use(KoaMount(new Koa().use(KoaStatic(__dirname + "/front/build"))))
//     .listen(3000);

require("./api").listen(3000);
