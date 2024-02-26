const {model, Schema} = require("mongoose");
const {genSalt, hash, compare} = require("bcrypt");

const clientSchema = new Schema(
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
        wishlist: [{
            type: Schema.Types.ObjectId,
            ref: "property",
        }],
        preferences: {
            amenities: [{
                type: Schema.Types.ObjectId,
                ref: "amenity",
            }],
            prices: {
                type: Number,
                ref: "price",
            },
            location: {
                type: String,
                ref: "location",
            },
        },
        publicId: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
            default: "https://res.cloudinary.com/dlhv79tzp/image/upload/v1688329957/user-images/nsn2dlabvge32pbgoxhr.jpg",
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            },
            //index: "2dsphere"
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: "review",
        }]
    },
    {timestamps: true}
);
//  method to the clientSchema for adding a property to the wishlist
clientSchema.methods.addToWishList = async function (propertyId) {
    try {
      // Check if the propertyId is already in the wishlist
      if (!this.wishlist.includes(propertyId)) {
        this.wishlist.push(propertyId);
        await this.save();
        return { success: true, message: 'Property added to wishlist.' };
      } else {
        return { success: false, message: 'Property is already in the wishlist.' };
      }
    } catch (error) {
      console.error('Error adding property to wishlist:', error);
      return { success: false, message: 'Failed to add property to wishlist.' };
    }
  };

// Mongoose Life hooks ---- before save
clientSchema.pre("save", async function (next) {
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

// Static Method
clientSchema.statics.login = function ({email, password}) {
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


module.exports = model("client", clientSchema);
