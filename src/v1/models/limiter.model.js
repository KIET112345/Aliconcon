const client = require("../utils/init_redis");
const incr = key => {
    return new Promise((resolve, reject) => {
        client.incr(key, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}
module.exports = {
    incr
}