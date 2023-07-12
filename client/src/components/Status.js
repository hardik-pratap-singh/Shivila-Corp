import React, { useEffect, useState } from 'react'
import Statuspage from './Statuspage';


const Status = () => {

  const [statusdata, setStatusdata] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/status`)
      const json = await response.json();
      // setproducts(json.products.slice(0,3)); 
      setStatusdata(json.data);
    }

    getdata();
  })

  // console.log(statusdata) ; 
  return (
    <div>
      <br /><br />
      <h4><center>Purchase Details</center>
        </h4><br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Order_ID</th>
            <th scope="col">Payment_ID</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            statusdata.map((x) => {
              return <Statuspage key={x.pid} pid={x.pid} name={x.ptitle} cost={x.price} orderid={x.orderId} paymentid={x.paymentId} status={x.status} />
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Status
