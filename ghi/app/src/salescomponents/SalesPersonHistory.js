// Display individual sales people's sales history.
import React from 'react';
import {useEffect, useState} from 'react';

function SalesPersonHistory() {
    const [sales, setSales] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");

    // Get the list of sales records
    const getData = async () => {
        // Get the server response
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales_records);
        }
    };

    useEffect(()=>{
        getData()
    }, []);

    const handleFilterChange = (e) => {
        setFilterTerm(e.target.value);
    };

    // Allow for the user to search using upper or lower case.
    const getSalesFiltered = () => {
        if (filterTerm === " ") {
            return sales;
        } else {
            return sales.filter((sale) =>
                sale.salesperson.name.toLowerCase().includes(filterTerm.toLowerCase())
            );
        }
    };

    return (
        <>
            <h1>Sales Person Sales History</h1>
            <hr />
            <input onChange={handleFilterChange} />
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>Customer</th>
                        <th>Auto VIN</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {getSalesFiltered().map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{ sale.salesperson.name }</td>
                            <td>{ sale.customer.name }</td>
                            <td>{ sale.auto.vin }</td>
                            <td>${ sale.price }</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default SalesPersonHistory;
