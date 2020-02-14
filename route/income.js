const express = require('express');
const Income = require('../models/income');
const auth = require('../auth');


const router = express.Router();

router.route('/')
    .post(auth.checkUser, (req, res, next) => {
        let newIncome = new Income(req.body);
        newIncome.users = req.user._id;
        newIncome.save()
            .then((result) => {
                res.status(201);
                //res.json({status:201, message:"income added successfully!"})
                res.json(result);
            }).catch(next);
    })
    .get(auth.checkUser, function (req, res, next) {
        Income.find({
            users: req.user._id
        })
            .then(function (income) {
                res.status(201);
                res.json(income);
            })
    })
router.route("/:id")
    .delete(auth.checkUser, function (req, res) {
        Income.deleteOne({
            users: req.user._id
        })
            .then(function (result) {
                res.status(200);
                res.json({ status: 200, message: "income deleted successfully!!" });
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    });
router.route('/:days')
    .get(auth.checkUser, function (req, res, next) {
        Income.find({
            users: req.user._id,
            days: req.params.days
        })
            .then(function (result) {
                console.log(result);
                res.status(201);
                res.json(result);
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            });
    })

router.route("/:id")
    .put(auth.checkUser, function (req, res) {
        Income.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body })
            .then(function (result) {
                if (result === 0) {
                    console.log(result);
                    res.status(500);
                    //res.json({ status: 500, message: 'income cannot update ' });
                } else {
                    res.status(200);
                    res.json(result);
                    //res.json({ status: 200, message: 'income updated!!' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    });

// // router.route("/getByid/:id")
// // .get(function(req,res){
// //    const date ="2020-01-01T18:15:00.000Z";
// //    const date2 ="2020-01-08T18:15:00.000Z";
// //     console.log(req.params.id)
// //     Income.find({"date": {"$month": date}})
// //     .then(function(result){
// //         console.log(result);
// //         res.status(201);
// //         res.json(result);

// //     })
// //     .catch(function(err){
// //         console.log(err);
// //         res.send("Income cannot found")

// //     })
// // });





module.exports = router;

