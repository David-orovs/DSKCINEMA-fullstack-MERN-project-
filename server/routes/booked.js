const express = require('express');
const router = express.Router();


const { Booked } = require("../models/Booked");
const auth = require('../middleware/auth');

router.use(auth);
// auth
router.post("/bookedNumber", auth, (req, res) => {

    Booked.find({ "movieId": req.body.movieId })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })

});


// auth
router.post("/booked", auth, (req, res) => {

    Booked.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, subcribed: result })
        })

});


// auth
router.post("/addTobooked",  (req, res) => {

    console.log(req.body)

    const booked = new Booked(req.body);

    booked.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

// auth
router.post("/removeFrombooked", auth,async (req, res) => {
console.log('hfkdsbjkusfuk')
   try {
    
   await Booked.findOneAndDelete({ movieId:req.body.movieId, userFrom: req.body.userFrom })
   return res.json({message:'Deleted successfully'})
   } catch (error) {
       console.log(error)
       res.json({message:'Why wont this fucking delete?'})
   }
});

// auth
router.post("/getbookedMovie", auth, (req, res) => {

   
    Booked.find({ 'userFrom': req.body.userFrom })
        .exec((err, booked) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, booked })
        })
});



module.exports = router;




