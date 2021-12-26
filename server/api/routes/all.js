const { get_all_games } = require("../../db");

module.exports = async function (ctx) {
    ctx.body = (await get_all_games()) || {};
};
