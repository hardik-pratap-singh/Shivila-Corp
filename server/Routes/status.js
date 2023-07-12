const router = require("express").Router();
const mongoose = require("mongoose") ; 
const status = require("../models/status");


router.get("/" , async (req , res) => {
    try {
        const data = await status.find(); 
        res.json({"success" : true , data}) ; 
    } catch (error) {
        res.json({"error" : error.msg})  ; 
    }
})

module.exports = router;
