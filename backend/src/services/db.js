const {connect} = require("mongoose");

const connection = async () => {
    try {
        const data = await connect(`${process.env.MONGO_URI}`);
        console.log("Connected to DB");
    } catch (error) {
        console.log(`Failed to connect to database : ${error.message}`);
    }
};

module.exports = connection