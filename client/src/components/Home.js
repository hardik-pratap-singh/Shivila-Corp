import React, { useEffect, useState } from 'react'
import Product from './Product'
import './Home.css'

const Home = () => {

    const [products, setproducts] = useState([]);

    useEffect(() => {
        const getdata = async () => {
            const response = await fetch(`https://dummyjson.com/products`)
            const json = await response.json();
            // setproducts(json.products.slice(0,3)); 
            setproducts(json.products.slice(0, 10));
        }

        getdata();
    })
    return (
        <div>
            <br /><br />
            <h2><center><u>New Arrivals ...</u></center></h2>


            <div className="container row row-md-4 maincontainer">
                {
                    products.map((x) => {
                        return <Product pid = {x.id} img={x.images[0]} name={x.title} desc={x.description} price={x.price} key={x.id} rating=
                            {x.rating} />
                        // return <Product img = {x.images[0]} name = {x.title} author = {book.author} price = {book.price} key={book.id}/>
                    })
                }


            </div>
        </div>
    )
}

export default Home
