import React from 'react'

const Statuspage = ({ pid, name, cost, orderid, paymentid, status }) => {
    return (
        <tr>
            <th scope="row">{pid}</th>
            <td>{name}</td>
            <td>{cost}</td>
            <td>{orderid}</td>
            <td>{paymentid}</td>
            <td>{status}</td>
        </tr>
    )
}

export default Statuspage; 
