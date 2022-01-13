const Koa = require("koa");
const KoaBody = require("koa-body");
const Router = require("koa-router");

const api_router = new Router();

api_router.post("/create", require("./routes/create"));
api_router.get("/get", require("./routes/get"));
api_router.get("/all", require("./routes/all"));
api_router.get("/list", require("./routes/list"));
api_router.options("/create", async (ctx) => {
    ctx.status = 200;
});

api_router.get("/ranking/get", require("./routes/ranking/get"));
api_router.get("/ranking/personal", require("./routes/ranking/personal"));
api_router.get("/ranking/all", require("./routes/ranking/all"));
api_router.post("/ranking/add", require("./routes/ranking/add"));
api_router.options("/ranking/add", async (ctx) => {
    ctx.status = 200;
});

const app = new Koa();
app.use(async (ctx, next) => {
    await next();
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "*");
    ctx.set("Access-Control-Allow-Methods", "*");
});
app.use(KoaBody());
app.use(api_router.routes());

module.exports = app;
