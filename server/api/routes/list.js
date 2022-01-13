const { get_all_games } = require("../../db");

module.exports = async function (ctx) {
    ctx.body =
        (await get_all_games()).map((game) => ({
            id: game.id,
            name: game.name,
            description: game.description,
        })) || {};
};
