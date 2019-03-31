const
    urlc = require("./controllers/URLController");

console.log("Cron job started.");

setInterval(async () => {
    try {
        await urlc.delete();
    } catch (error) {
        console.error(error);
    }
}, 20e3);