const { get_all_ranking } = require("../../../db");

module.exports = async function (ctx) {
    ctx.body = (await get_all_ranking()) || {};
};
