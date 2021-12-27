const Client = require("@replit/database");
const client = new Client();

(async () => {
    const list = await client.list();
    list.map((key) => client.delete(key));
})();
