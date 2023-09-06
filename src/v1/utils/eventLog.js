const { format } = require("date-fns");
const fs = require("fs").promises;
const path = require("path");
const fileName = path.join(__dirname, "../logs/log.log")

const eventLogs = async (msg) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:m:hh')}`;
    const contentLog = `${dateTime} ---- ${msg}\n`;
    try {
        fs.appendFile(fileName, contentLog)
    } catch (error) {
        console.log(error);
    }
}

module.exports = eventLogs;