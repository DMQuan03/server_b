const User = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserController = {
    register : async(req , res) => {
        try {
            const { email , password } = req.body
            const user = await User.findOne({ email })
            if (user) return res.status(300).json({
                success : true,
                message : "tài khoản đã tồn tại"
            })
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password , salt)
            const newUser = await new User({
                email,
                password : hashed
            })
            await newUser.save()
            return res.status(200).json({
                email,
                password
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success : false,
                message : "register fail"
            })
        }
    },

    login : async(req , res) => {
        try {
            const {email , password} = req.body
            const user = await User.findOne({email})
            if (!user) return res.status(404).json({
                success : false,
                message : "tài khoản chưa đăng ký"
            })

            const isPass = await bcrypt.compare(
                password,
                user.password
            )
            if (!isPass) return res.status(403).json({
                success : false,
                message : "sai mật khẩu"
            })

            if (user && isPass) {
                const accessToken = await jwt.sign({
                    id : user._id,
                    name : user.name,
                    avatar : user.avatar
                },
                    process.env.MY_ACCESS_TOKEN,
                    {expiresIn : "1d"}
                )

                const { password , ...rest } = user._doc
                return res.status(200).json({...rest , accessToken})
            }
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                success : false,
                message : "Không tìm thấy tài khoản"
            })
        }
    },
    currentUser : async(req , res) => {
        try {
            const user = await User.findOne({ _id : req.user.id })
            const { password , ...other} = user
            return res.status(200).json({
                success : true,
                data : user
            })
        } catch (error) {
            return res.status(404).json({
                success : false,
            })
        }
    },

    editUser : async(req , res) => {
        try {
            const { name , avatar } = req.body
            const user = await User.findOne({ _id : req.user.id })
            if (!name) req.body.name = user.name
            if (!avatar) req.body.avatar = user.avatar
            await User.findByIdAndUpdate({ _id : req.user.id }, req.body , {new : true})
            return res.status(200).json({
                success : true,
                data : req.body
            })
        } catch (error) {
            return res.status(403).json({
                success : false,
                message : "edit user fail"
            })
        }
    }
}

module.exports = UserController