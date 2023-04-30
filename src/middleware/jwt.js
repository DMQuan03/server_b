const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const MiddlewareJwt = {

    verifyToken : async(req , res, next) => {
        try {
           const authorizationHeader = await req.headers.authorization
           const token = await authorizationHeader.split(" ")[1]
           if (!token) return res.status(403).json({
                success : false,
                message : "bạn không có quyền truy cập"
           })
           jwt.verify(token , process.env.MY_ACCESS_TOKEN , (err , user) => {
            if (err) return res.status(404).json({
                success : false,
                message : "token exp"
                })
            req.user = user
            next()
           })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                success : false,
                message : "Token is'nt valid"
            })
        }
    }

}

module.exports = MiddlewareJwt