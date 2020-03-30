const express = require('express');
const router = express.Router();
const { Comment }  = require("../models/Comment");
const auth = require('../middleware/auth');

router.use(auth);
router
   .route("/") 
   .post((req, res) =>{
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        console.log(err)
        if (err) return res.json("comment failed")

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })    
    })
// auth for this
router.route("/getComments").post(auth, (req, res) =>{
        Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
    }
    )
   




module.exports = router;
