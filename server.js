const app = require('./src/v1/app');
require('dotenv').config();
const PORT = process.env.DEV_APP_PORT || 8080;
app.listen( PORT, () => {
    console.log(`Sever is running at port ${PORT}`)
});

process.on("SIGNIN", () => {
    console.log(`Exit server express`);
})