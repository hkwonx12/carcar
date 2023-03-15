// Display the details of the requested salesperson.
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SalesPersonDetail () {
    const { id } = useParams();
    const [salesPerson, setSalesPerson] = useState([]);
    const [sales, setSales] = useState([]);

    // Get the details for the requested salesperson.
    let salesPersonData;
    const fetchSalesPersonData = async() => {

        const salesPersonUrl = `http://localhost:8090/api/sales/staff/${id}/`;
        const fetchSalesPerson = {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        };

        const salesPersonResponse = await fetch(salesPersonUrl, fetchSalesPerson);
        if (salesPersonResponse.ok) {
            salesPersonData = await salesPersonResponse.json();
            setSalesPerson(salesPersonData.salesperson);
        } else {
            console.error("*******ERROR: failed data fetch", salesPersonResponse);
        };
    };

    useEffect(() => {
        fetchSalesPersonData();
    }, []);

    // Get and filter the list of sales records.
    const fetchSalesRecords = async() => {
            const salesUrl = "http://localhost:8090/api/sales/";
            const salesRecordsResponse = await fetch(salesUrl);
            if (salesRecordsResponse.ok) {
                const salesRecordsFiltered = [];
                const salesRecords = await salesRecordsResponse.json();
                for (const record of salesRecords.sales_records) {
                    if (record.salesperson.employee_num === salesPersonData.salesperson.employee_num) {
                        salesRecordsFiltered.push(record);
                    };
                };
                setSales(salesRecordsFiltered);
            } else {
                console.error("*******ERROR: failed sales records fetch", salesRecordsResponse);
            };
        };

    useEffect(() => {
        fetchSalesRecords();
    }, []);

    return (
        <>
            <h2>{ salesPerson.name }</h2>
            <h3>Employee ID: { salesPerson.employee_num }</h3>
            <hr />
            <h1>Sales Records</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Buyer</th>
                        <th>Auto VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => {
                    return (
                        <tr key={sale.id}>
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

export default SalesPersonDetail;
