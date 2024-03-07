export const signUpValidation = (data) => {
    console.log('1')
    return new Promise((resolve, reject) => {
        if (data.password.length < 6) {
            console.log('2')
            reject({data: {message: "Password must be at least 6 characters"}});
        } else if (data.password !== data.confirm_password) {
            console.log('3')
            reject({data: {message: "Password and Confirm Password do not match"}});
        } else if (!/^07\d{8}$/.test(data.phoneNumber)) {
            console.log('4')
            reject({
                data: {
                    message:
                        "Invalid phone number format. It should start with '07' and be 10 digits long",
                }
            });
        } else {
            console.log('5')
            const location = sessionStorage.getItem("location");
            console.log(location)
                const new_data = {...data,location:{
                        type:"Point",
                        coordinates:[location?.longitude ?? 0,location?.latitude ?? 0]
                    }};
                console.log(new_data)
                resolve(new_data);
        }
    });
};

export const forgotPassValidation = (data) => {
    return new Promise((resolve, reject) => {
        if (data.password.length < 6) {
            reject({data: {message: "Password must be at least 6 characters"}});
        } else if (data.password !== data.confirm_password) {
            reject({data: {message: "Password and Confirm Password do not match"}});
        } else {
            resolve(data);
        }
    });
};


export const signInValidation = (data) => {
    return new Promise((resolve, reject) => {
        if (data.password.length < 6) {
            reject({data: {message: "Password must be at least 6 characters"}});
        } else {
            resolve(data);
        }
    });
};

export const updateProfileValidation = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        if (data.phoneNumber && !/^07\d{8}$/.test(data.phoneNumber)) {
            reject({
                data: {
                    message:
                        "Invalid phone number format. It should start with '07' and be 10 digits long",
                }
            })
        } else if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            reject({
                data: {
                    message:
                        "Invalid Email Address format.",
                }
            })
        } else {
            resolve(data);
        }
    });
};

export const frmDta = (data, propertyImages, unitTypes) => {
    return new Promise((resolve, reject) => {
        try {
            if (!data || !unitTypes) {
                console.error('Invalid data structure:', data);
                reject(new Error('Invalid data structure'));
                return;
            }

            const formData = new FormData();
            propertyImages.forEach((image) => {
                formData.append('propertyImages', image, image.name);
            });

            unitTypes.forEach((unit) => {
                if (unit.images && Array.isArray(unit.images)) {
                    unit.images.forEach((image) => {
                        formData.append("unitImages", image, `unitImages[${unit.type}]`);
                        formData.append(unit.type, image.name);
                    });
                }
            });

            formData.append('data', JSON.stringify(data));
            resolve(formData);
        } catch (error) {
            console.error('Error in frmDta:', error);
            reject(error);
        }
    });
};



