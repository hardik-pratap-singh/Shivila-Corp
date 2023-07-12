const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose") ; 
const status = require("../models/status");
const alert = require("alert") ; 

router.post("/orders", async (req, res) => {
	try {


		const fillStatus = async (data) => {
			await status.create({ 
				pid : req.body.pid , 
				ptitle : req.body.name , 
				price : req.body.amount ,
				orderId : data.id 
			 });
		}
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}

			fillStatus(order) ; 
			
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {

			const filter = {orderId : razorpay_order_id} ;
			
			//try it in sigle without copying 
			const update = {
				paymentId : razorpay_payment_id , 
				status : "Success"
			}
			
			let doc = await status.findOneAndUpdate(filter, update , {
				new : true 
			});

			alert("Payment verified successfully") ; 
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		alert("Internal Server Error!") ; 
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;
