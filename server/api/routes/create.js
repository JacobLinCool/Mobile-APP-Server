const { create_game } = require("../../db");
const { rand_string } = require("../../utils");

function validate_gps_location(location) {
    // 123.456, 123.456
    const [lat, lng] = location.split(",").map((x) => parseFloat(x.trim()));
    if (isNaN(lat) || isNaN(lng)) {
        return false;
    }
    if (lat < -90 || lat > 90) {
        return false;
    }
    if (lng < -180 || lng > 180) {
        return false;
    }
    return true;
}

function validate_data(game) {
    try {
        if (game.name.length === 0 || game.name.length > 30) {
            console.log(1);
            return false;
        }
        if (game.description.length === 0 || game.description.length > 1000) {
            console.log(2);
            return false;
        }
        if (game.challenges.length === 0 || game.challenges.length > 100) {
            console.log(3);
            return false;
        }

        for (const challenge of game.challenges) {
            if (challenge.name.length === 0 || challenge.name.length > 30) {
                console.log(4);
                return false;
            }
            if (challenge.description.length === 0 || challenge.description.length > 1000) {
                console.log(5);
                return false;
            }
            if (challenge.points < 0 || challenge.points > 1e9) {
                console.log(6);
                return false;
            }
            if (challenge.mode < 0 || challenge.mode >= 2) {
                console.log(7);
                return false;
            }
            if (challenge.mode === 0) {
                if (!validate_gps_location(challenge.gps)) {
                    console.log(8);
                    return false;
                }
            }
            if (challenge.mode === 1) {
                if (challenge.secret.length === 0) {
                    console.log(9);
                    return false;
                }
            }
        }

        for (const team of game.teams) {
            if (team.length === 0 || team.length > 30) {
                return false;
            }
        }

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = async function (ctx) {
    const { body } = ctx.request;

    if (validate_data(body)) {
        const id = rand_string(6);
        await create_game(id, body);
        ctx.body = { error: 0, id };
    } else {
        ctx.body = { error: 1, msg: "Invalid data" };
    }
};
