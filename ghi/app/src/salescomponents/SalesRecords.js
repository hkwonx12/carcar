// Display the list of sales records.
import React from 'react';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function SalesRecords() {
    const [sales, setSales] = useState([]);

    // Get the list of sales records
    const getData = async () => {
        // Get the server response
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales_records);
        };
    };

    useEffect(()=>{
        getData();
    }, []);

    return (
        <>
            <h1>Sales Records</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person Name</th>
                        <th>Sales Person ID</th>
                        <th>Buyer</th>
                        <th>Auto VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{ sale.salesperson.name }</td>
                            <td>{ sale.salesperson.employee_num }</td>
                            <td>
                                { sale.customer.name } { sale.customer.customer_num }
                            </td>
                            <td>{ sale.auto.vin }</td>
                            <td>${ sale.price }</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <Link to="/sales/newsalesrecord"><button type="button" className="btn btn-primary">Add a Sales Record</button></Link>
        </>
    );
};

export default SalesRecords;
