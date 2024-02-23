const bcrypt = require("bcrypt");

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


module.exports = encrypt;