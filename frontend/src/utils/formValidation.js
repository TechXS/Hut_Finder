export const signUpValidation = (data) => {
    return new Promise((resolve, reject) => {
        if (data.password.length < 6) {
            reject({data: {message: "Password must be at least 6 characters"}});
        } else if (data.password !== data.confirm_password) {
            reject({data: {message: "Password and Confirm Password do not match"}});
        } else if (!/^07\d{8}$/.test(data.phoneNumber)) {
            reject({
                data: {
                    message:
                        "Invalid phone number format. It should start with '07' and be 10 digits long",
                }
            });
        } else {
            const location = JSON.parse(sessionStorage.getItem("location") ?? '')
            console.log(location)
            const new_data = {...data,location:{
                type:"Point",
                    coordinates:[location.longitude,location.latitude]
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
