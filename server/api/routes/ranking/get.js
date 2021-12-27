const { get_team_ranking } = require("../../../db");

module.exports = async function (ctx) {
    ctx.body = (await get_team_ranking(ctx.request.query.id)) || {};
};
