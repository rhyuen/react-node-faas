const Cookies = require("cookies");

function setCookie(req, res, name, value) {
    const cookies = new Cookies(req, res, {
        keys: [process.env.cookie_secret]
    });
    const options = {
        signed: true,
        secure: false,
        httpOnly: true,
        path: "/",
        maxAge: 3000000
    };
    cookies.set(name, value, options);
};

function getCookies(req, res, name) {
    const key = process.env.cookie_secret;
    const cookies = new Cookies(req, res, {
        keys: [key]
    });
    return cookies.get(name);
}

async function checkAuthorization(req, res) {
    //check if cookie is signed.
    //check if user is accessing data that is authorized by the cookie.
    return new Promise((resolve, reject) => {
        if (!getCookies(req, res, "email")) {
            return reject({
                blah: "fail"
            })
        } else {
            const value = getCookies(req, res, "email");
            return resolve({
                message: `message in cookies is ${value}`,
                success: "success"
            });
        }
    });
};

module.exports = {
    checkAuthorization,
    setCookie,
    getCookies
}