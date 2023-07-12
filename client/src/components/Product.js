import React from 'react'
import "./Product.css"
import axios from 'axios'


const Product = ({ pid, img, name, desc, price }) => {

	const initPayment = (data) => {
		const options = {
			key: process.env.REACT_APP_KEY,
			amount: price,
			currency: data.currency,
			name: name,
			description: "Test Transaction",
			image: img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = `${process.env.REACT_APP_BASE_URL}/api/payment/verify`;
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const priceStyle =  {
		fontSize: "16px" , 
		fontWeight: "500",
		margin: "5px 0",
		textAlign: "center",
		color : "green",
		fontSize : "20px "
	}

	const handlePayment = async () => {
		try {
			const orderUrl = `${process.env.REACT_APP_BASE_URL}/api/payment/orders`;
			const { data } = await axios.post(orderUrl, { amount: price, img, name, desc, pid });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};


	return (
		// <div className="book_container">
		//     <img src={img} alt="book_img" className="book_img" />
		//     <p className="book_name">{name}</p>
		//     <p className="book_author">{desc}</p>
		//     <p className="book_price">
		//         Price : <span>&#x20B9; {price}</span>
		//     </p>
		//     <button onClick={handlePayment} className="buy_btn">
		//         buy now
		//     </button>
		// </div>
		<div className="card my-3 mx-3 col-md-4" style={{ width: "18rem" }}>
			{/* <Update ref = {modalref} /> */}
			<img src={`${img}`} className="card-img-top my-3" alt="Profile" style={{ width: "70%", height: "70%", margin: "auto", borderRadius: "50%" }} />
			<div className="card-body" style={{ backgroundColor: "white" }}>
				{/* <h6 className="card-title">{note._id}</h6> */}
				{/* isi id ko delete and update karna hai  */}
				<h5 className="card-title" style={{ textDecoration: "underline" , fontSize : "20px"}}>{name}</h5>
				<h6 className="card-subtitle mb-2 text-muted">{desc}</h6>
				<p style={priceStyle}>
		        Price : <span>&#x20B9; {price}</span>
		     </p>
				<button onClick={handlePayment} className="buy_btn">Buy Now
				</button>
			</div>
		</div>
	)
}

export default Product
