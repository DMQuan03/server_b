const CMT = require("../model/comment")

const UtilsController = {
    getComment : async(req , res) => {
        try {
            const {_id} = req.params
            const {limit} = req.query
            const ListComment = await CMT.find({ idRoom : _id }).limit(limit).populate("userId", "name avatar _id")
            const count = await CMT.find({ idRoom : _id }).countDocuments()
            return res.status(200).json({
                success : true,
                data : ListComment,
                count
            })
        } catch (error) {
            console.log(error);
            return res.status(403).json({
                success : false,
                message : "cant get comment"
            })
        }
    }
}

module.exports = UtilsController