const Landlord = require("../models/landlordModel");
const {
    createLandlordToken,
    maxAge,
    createClientToken,
    resetPassToken,
} = require("../middlewares/jwt");
const Client = require("../models/clientModel");
const Token = require("../models/tokenModel");
const {sendResetLink} = require("../middlewares/mail");
const jwt = require("jsonwebtoken");
const encrypt = require("../middlewares/encryptPassword");
const {genSalt, hash, compare} = require("bcrypt");
const {sendMail} = require("../services/mail");
const {randomBytes} = require("node:crypto");

const signUpLandlord = async (req, res) => {
    const {data} = req.body;
    try {
        const result = await Landlord.create(data);
        result.password = null;
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({
            message: "Failed to create new Landlord",
            error: e.message,
        });
    }
};

const signInLandlord = async (req, res) => {
    const {data} = req.body;
    try {
        const result = await Landlord.login(data);
        const token = createLandlordToken(result._id, result.email);
        res.json({result, token});
    } catch (e) {
        res.status(404).json({
            message: e.message,
            error: e.message,
        });
    }
};

const signInClient = async (req, res) => {
    const {data} = req.body;
    try {
        const result = await Client.login(data);
        const token = createClientToken(result._id, result.email);
        res.json({result, token});
    } catch (e) {
        res.status(404).json({
            message: e.message,
            error: e.message,
        });
    }
};

const signUpClient = async (req, res) => {
    const {data} = req.body;
    try {
        const result = await Client.create(data);
        result.password = null;
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({
            message: "Failed to create new client",
            error: e.message,
        });
    }
};

const logout = (req, res) => {
    const {data} = req.body;
    console.log(data);
    try {
        if (data.role === "landlord") {
            res.clearCookie("landlordToken").json("Logged Out Landlord");
        } else if (data.role === "client") {
            res.clearCookie("clientToken").json("Logged Out client");
        }
    } catch (e) {
        res.status(400).json({
            message: "Failed to logout user",
            error: e.message,
        });
    }
};
const forgotPassword = async (req, res) => {
    const {data} = req.body;
    const {email} = data;
    let user = {};

    try {
        user = await Landlord.findOne({email});
        user.role = "landlord"; //to be removed after modifying the models
        if (!user) {
            user = await Client.findOne({email});
            user.role = "client";
        }

        if (!user) throw new Error("User does not exist");
        let token = await Token.findOne({user: user._id});
        if (token) await token.deleteOne();
        const resetToken = (await randomBytes(32)).toString("hex");
        const salt = await genSalt();
        const hash_token = await hash(resetToken, salt);

        await Token.create({
            user: user._id,
            token: hash_token,
            createdAt: Date.now(),
            role: user.role,
        });

        const link = `${process.env.CLIENT_URL}/auth/signin/resetpassword?token=${resetToken}&id=${user._id}&role=${user.role}`;
        const cancelLink = `${process.env.CLIENT_URL}/auth/signin/cancelresetpassword?id=${user._id}`;

        const mailDetails = {
            from: process.env.GMAIL_USERNAME,
            to: user.email,
            subject: "RESET PASSWORD",
            html: `
<p>Hello ${user.name},</p>
<p>You requested to reset your password.</p>
<p>Please, click the link below to reset your password</p>
<a href="${link}" style="display: block">Reset Password</a>
  <p>If you did not initiate this request, you can <a href="${cancelLink}" style="display: block">Cancel The Password Reset</a>.</p>
`,
        };

        const response = await sendMail(mailDetails);
        res
            .status(200)
            .json({message: `Reset Link has been sent to ${user.email}`});
    } catch (e) {
        res.status(401).json({error: e.message});
    }
};

const resetPassword = async (req, res) => {
    const {data, token} = req.body;
    const {email, password, id} = data;
    let user = {};

    try {
        let passwordResetToken = await Token.findOne({user: id});
        if (!passwordResetToken) {
            throw new Error("Invalid or expired password reset token");
        }
        const isValid = await compare(token, passwordResetToken.token);
        if (!isValid) {
            throw new Error("Invalid or expired password reset token");
        }
        const salt = await genSalt();
        const hash_password = await hash(password, salt);

        if (passwordResetToken.role === "client") {
            await Client.updateOne(
                {_id: id},
                {$set: {password: hash_password}},
                {new: true}
            );
            user = await Client.findById({_id: id});
        } else if (passwordResetToken.role === "landlord") {
            await Landlord.updateOne(
                {_id: id},
                {$set: {password: hash_password}},
                {new: true}
            );
            user = await Landlord.findById({_id: id});
        }

        const mailDetails = {
            from: process.env.GMAIL_USERNAME,
            to: user.email,
            subject: "SUCCESSFUL PASSWORD RESET",
            html: `
<p>Hello ${user.name},</p>
<p>You have successfully reset your password.
<p>Thank you.</p>`,
        };

        await sendMail(mailDetails);
        await passwordResetToken.deleteOne();
        res.status(200).json({message: `Successfully reset password`});
    } catch (e) {
        res.status(401).json({error: e.message});
    }
};

const cancelPasswordReset = async (req, res) => {
    try {
        const {id} = req.query;

        const passwordResetToken = await Token.findOneAndDelete({user: id});

        if (!passwordResetToken) {
            throw new Error("No password reset token found for the user");
        }
        res.status(200).json({message: "Password reset canceled successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    signUpLandlord,
    signInLandlord,
    signInClient,
    signUpClient,
    logout,
    forgotPassword,
    resetPassword,
    cancelPasswordReset,
};
