// Display the list of sales records.
import React from 'react';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function SalesStaff() {
    const [salespeople, setSalespeople] = useState([]);
    // let sortedSalespeople = [];
    // let salespeople = [];

    // Get the list of sales people
    const getData = async () => {
        // Get the server response
        const response = await fetch("http://localhost:8090/api/sales/staff/");
        let tmpSalespeople = [];
        if (response.ok) {
            const data = await response.json();
            tmpSalespeople = data.salespeople;
        }
        console.log("Salespeople Unsorted: ", tmpSalespeople);
        tmpSalespeople.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });
        setSalespeople(tmpSalespeople);
        console.log("Salespeople Sorted: ", salespeople);
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
        <>
            <h1>Sales Staff Roster</h1>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person Name</th>
                        <th>Sales Person ID</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => {
                    return (
                        <tr key={salesperson.id}>
                            <td>
                                <Link to={`/sales/staff/${salesperson.employee_num}`}>
                                    { salesperson.name }
                                </Link>
                            </td>
                            <td>
                                { salesperson.employee_num }
                            </td>
                            {/* <td>
                                <Link to="/sales/editsalesperson"><button type="button" className="btn btn-success">Edit</button></Link>
                            </td> */}
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <Link to="/sales/newsalesperson"><button type="button" className="btn btn-primary">Add a Sales Person</button></Link>
        </>
    );
}

export default SalesStaff;
