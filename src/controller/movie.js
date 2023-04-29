const Movie = require("../model/movie")
const Episodes = require("../model/Episode")

const MovieController = {
    createMovie : async(req ,res) => {
        try {
            const { 
                name,
                img,
                description,
                Category,
                year,
                contentMovie,
                country
            } = req.body
            const newMovie = await Movie.create(req.body)
            await newMovie.save()
            return res.status(200).json({
                success : true,
                data : newMovie
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : "create fail"
            })
        }
    },

    getMovie : async(req , res) => {
        try {
            const { page } = req.query
            const limit = process.env.LIMIT_MOVIE
            const skip = (page - 1) * limit
            const AllMovie = await Movie.find().limit(limit)
            .skip(skip)
            const count = await Movie.find().countDocuments()
            const maxPage = await Math.ceil(count / 10)

            return res.status(200).json({
                success : true,
                data : AllMovie,
                maxPage
            })
        } catch (error) {
            return res.status(404).json({
                success : false,
                message : "Not found"
            })
        }
    },

    NewUpdateFilms : async( req , res) => {
        try {
            const NewUpdateFilms = await Movie.find().sort({ updatedAt : -1 }).limit(process.env.LIMIT_MOVIE)
            return res.status(200).json({
                success : true,
                data : NewUpdateFilms
            })

        } catch (error) {
            return res.status(404).json({
                message : "Not found",
                success : false
            })
        }
    },

    getIntro : async(req , res) => {
        try {
            const {_id} = req.params
            const infoMovie = await Movie.findOne({_id : _id}).populate("Episode")
            if (infoMovie) {
                return res.status(200).json({
                    success : true,
                    data: infoMovie
                })
            }else {
                return res.status(200).json({
                    success : true,
                    data: []
                })
            }
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : "not found"
            })
        }
    },

    createEpisode : async( req , res) => {
        console.log(req.body);
        try {
            const { _id , video , Episode } = req.body
            const newEpisode = await new Episodes({
                idMovie : _id,
                Episode,
                video
            })
            await newEpisode.save()
            await Movie.findByIdAndUpdate({_id}, { $addToSet : {Episode : newEpisode._id} })

            return res.status(200).json({
                success : true
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success : false,
                message : "create video fail"
            })
        }
    },

    getVideoPage : async(req , res) => {
        try {
            const { page } = req.params
            const {_id} = req.params
            const limit = 1
            const skip = (page - 1) * limit
            const Films = await Episodes.find({ idMovie : _id }).limit(limit)
            .skip(skip)
            return res.status(200).json({
                success : true,
                data : Films
            })
        } catch (error) {
            return res.status(404).json({
                success : false,
                message : "Not found"
            })
        }
    },

    uploadView : async(req , res) => {
        try {
            const { _id } = req.params
            await Movie.findByIdAndUpdate({_id}, { $inc : { view : 1 } }, {new : true})
            return res.status(200).json({
                success : true,
            })
        } catch (error) {
            return res.status(404).json({
                success : false,
                message : "Not found"
            })
        }
    }
    
}

module.exports = MovieController