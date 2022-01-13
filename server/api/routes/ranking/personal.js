const { get_ranking } = require("../../../db");

module.exports = async function (ctx) {
    ctx.body = (await get_ranking(ctx.request.query.id)) || [];
};
