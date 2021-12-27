const Client = require("@replit/database");
const client = new Client();

const game_prefix = "game_";
const rank_prefix = "ranking_";

async function get_game(id) {
    return await client.get(game_prefix + id);
}

async function create_game(id, challenge) {
    await client.set(game_prefix + id, challenge);
}

async function get_all_games() {
    const list = await client.list(game_prefix);
    const games = list.map((key) => client.get(key));
    return await Promise.all(games);
}

async function get_ranking(id) {
    const data = (await client.get(rank_prefix + id)) || [];

    data.sort((a, b) => a.time - b.time);

    return data;
}

async function get_team_ranking(id) {
    const data = await get_ranking(id);

    const team_time = {},
        team_count = {};
    for (const rank of data) {
        team_time[rank.team] = (team_time[rank.team] || 0) + rank.time;
        team_count[rank.team] = (team_count[rank.team] || 0) + 1;
    }

    const team_ranking = [];
    for (const team in team_time) {
        team_ranking.push({
            team,
            time: team_time[team] / team_count[team],
            count: team_count[team],
        });
    }

    team_ranking.sort((a, b) => a.time - b.time);

    return team_ranking;
}

async function add_ranking_record(id, rank = { name: "", team: "", time: 1e9 }) {
    const data = await get_ranking(id);
    const names = new Set(data.map((record) => record.name));
    if (names.has(rank.name)) {
        const idx = data.findIndex((record) => record.name === rank.name);
        data.splice(idx, 1);
    }
    data.push(rank);
    await client.set(rank_prefix + id, data);
}

async function get_all_ranking() {
    const list = await client.list(rank_prefix);
    const ranks = list.map((key) => client.get(key));
    return await Promise.all(ranks);
}

module.exports = { get_game, create_game, get_all_games, get_ranking, get_team_ranking, add_ranking_record, get_all_ranking };
