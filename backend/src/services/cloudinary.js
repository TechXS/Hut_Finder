const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadToCloudinary = (path, folder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const upload = await cloudinary.v2.uploader.upload(path, {folder})
            resolve(upload)
        } catch (e) {
            reject(e)
        }
    })
}

const removeFromCloudinary = async (public_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await cloudinary.v2.uploader.destroy(public_id)
            resolve(response)
        } catch (e) {
            reject(e)
        }
    })
}