const jwt = require('jsonwebtoken');

const generateAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, 'accessToken', { expiresIn: '30s' });
    return accessToken;
};
const generateRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        ...payload
    }, 'refreshToken', { expiresIn: '365d' });
    return refreshToken;
};

const refreshToken = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("token", token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async(err, user) => {
                if(err){
                    resolve({
                        status: "ERR",
                        message: "The authemtication"
                    })
                }

                const accessToken = await generateAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                console.log("accessToken", accessToken)
                return resolve({
                    status: 'OK',
                    message: "SUCCESS",
                    accessToken
                });
            });
           
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};



module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshToken
};
