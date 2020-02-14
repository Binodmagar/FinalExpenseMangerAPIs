const express = require('express');
const Expense = require('../models/expense');
const auth = require('../auth');

const router = express.Router();

router.route('/')
.get(auth.checkUser, function (req, res, next) {
    Expense.find({
        users: req.user._id
    })
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json(result);   
    })
    .catch(function(err){
        console.log(err);
        res.json(err);
    });
})

.post(auth.checkUser, (req, res, next) => {
    let newExpense = new Expense(req.body);
    newExpense.users = req.user._id;
    newExpense.save()
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json({status: "Expense added successfully!!"})
    })
    .catch(function(err){
        console.log(err);
        res.json(err); 
    });
});
router.route('/:days')
.get(auth.checkUser, function (req, res, next) {
    Expense.find({
        users: req.user._id,
        days: req.params.days
    })
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json(result);   
    })
    .catch(function(err){
        console.log(err);
        res.json(err);
    });
})

router.route("/:id")
    .delete(auth.checkUser, function (req, res) {
        Expense.deleteOne({
            users: req.user._id
        })
            .then(function (result) {
                res.status(200);
                res.json({ status: 200, message: "Expense deleted successfully!!" });
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    });

router.route("/:id")
    .put(auth.checkUser, function (req, res) {
        Expense.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body })
            .then(function (result) {
                if (result === 0) {
                    console.log(result);
                    res.status(500);
                    res.json({ status: 500, message: 'Cannot update expense ' });
                } else {
                    res.status(200);
                    res.json(result);
                    res.json({ status: 200, message: 'Expenses updated!!' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    });

module.exports = router;

