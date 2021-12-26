const Client = require("@replit/database");
const games = new Client();

async function get_game(id) {
    return await games.get(id);
}

async function create_game(id, challenge) {
    await games.set(id, challenge);
}

async function get_all_games() {
    return await games.getAll();
}

module.exports = { get_game, create_game, get_all_games };
