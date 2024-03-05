const jwt = require("jsonwebtoken");

const maxAge = 60 * 60;
const createLandlordToken = (id, email) => {
    const date = new Date();
    return jwt.sign({id, email, date}, `${process.env.SECRET_LANDLORD_KEY}`, {
        expiresIn: "12h",
    });
};
const createClientToken = (id, email) => {
    const date = new Date();
    return jwt.sign({id, email, date}, `${process.env.SECRET_CLIENT_KEY}`, {
        expiresIn: "12h",
    });
};

const createForgotPassToken = (email, id, password) => {
    const secret = `${process.env.SECRET_FORGOT_PASSWORD_KEY}` + password;
    return jwt.sign({email, id}, secret, {
        expiresIn: "5m",
    });
};
const resetPassToken = (data) => {
    return jwt.sign({data}, `${process.env.SECRET_FORGOT_PASSWORD_KEY}`, {
        expiresIn: "15m",
    });
};

const authCode = (res, next, token, secretKey) => {
    try {
        if (token) {
            jwt.verify(token, `${secretKey}`, (err, decodedToken) => {
                if (err) {
                    res.status(403).json({
                        error: "Access Expired",
                        message: "Error : Your access has expired, try login again"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(403).json({error: "Access Forbidden", message: "Error : You do not have access"});
        }
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

const requireLandlordAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    authCode(res, next, token, process.env.SECRET_LANDLORD_KEY);
};
const requireClientAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    authCode(res, next, token, process.env.SECRET_CLIENT_KEY);
};

const requireResetPassAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    authCode(res, next, token, process.env.SECRET_FORGOT_PASSWORD_KEY);
};

module.exports = {
    createLandlordToken,
    createClientToken,
    maxAge,
    requireLandlordAuth,
    requireClientAuth,
    requireResetPassAuth,
    createForgotPassToken,
    resetPassToken,
};
