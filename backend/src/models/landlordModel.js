const {model, Schema} = require("mongoose");
const {compare, genSalt, hash} = require("bcrypt");

const landlordSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            match: /^07\d{8}$/,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        properties: [{type: Schema.Types.ObjectId, ref: "property"}],
        appointments: [{type: Schema.Types.ObjectId, ref: "appointment"}],
        requestMode: {
            type: Boolean,
            required: false,
        },
        publicId: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
            default: "https://res.cloudinary.com/dlhv79tzp/image/upload/v1688329957/user-images/nsn2dlabvge32pbgoxhr.jpg",
        }
    },
    {timestamps: true}
);

//Mongoose Life hooks ---- before save
landlordSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await genSalt()
        const hashed_password = await hash(this.password, salt)
        this.password = hashed_password
        next()
    } catch (e) {
        console.log("Error Hashing Password")
    }

});

//Static Method
landlordSchema.statics.login = function ({email, password}) {
    return new Promise(async (resolve, reject) => {
        try {
            const user_data = await this.findOne({email}).select("-updatedAt -createdAt -__v")
            const result = await compare(password, user_data.password)

            if (result) {
                user_data.password = null
                resolve(user_data)
            }
            reject({message: "Wrong Password"})
        } catch (e) {
            reject({message: "Email Address is not registered"});
        }
    });
};

module.exports = model("landlord", landlordSchema);
