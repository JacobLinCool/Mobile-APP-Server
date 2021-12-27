const { add_ranking_record } = require("../../../db");

module.exports = async function (ctx) {
    const { body } = ctx.request;

    if (body.id === undefined || body.id === null) {
        ctx.status = 400;
        ctx.body = { error: "game_id is required" };
        return;
    }

    await add_ranking_record(body.id, {
        team: body.team,
        name: body.name,
        time: body.time,
    });

    ctx.body = { error: 0 };
};
