// Display the list of sales records.
import React from 'react';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function SalesStaff() {
    const [salespeople, setSalespeople] = useState([]);

    // Get the list of sales people
    const getData = async () => {
        // Get the server response
        const response = await fetch("http://localhost:8090/api/sales/staff/");
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        };
    };

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
};

export default SalesStaff;
