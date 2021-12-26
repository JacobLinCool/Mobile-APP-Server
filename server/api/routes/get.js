const { get_game } = require("../../db");

module.exports = async function (ctx) {
    ctx.body = (await get_game(ctx.request.query.id)) || {};
};
