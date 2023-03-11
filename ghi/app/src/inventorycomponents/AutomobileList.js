import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AutomobileList() {
    const [autos, setAutos] = useState([])

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/automobiles/");

        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos)
        }
    }


    const handleSubmit = async (event) => {
        const value = event.target.value;
        const automobileUrl = `http://localhost:8100/api/automobiles/${value}/`;

        const deleteConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
       };


       const response = await fetch(automobileUrl, deleteConfig);
       const data = await response.json();

       setAutos(autos.filter(auto => String(auto.vin) !== value));
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='container'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                        return (
                            <tr key={auto.id}>
                                <td><Link to={`/automobiles/${auto.vin}/`}>{auto.vin}</Link></td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>
                                    <button onClick={handleSubmit} value={auto.id} className="btn btn-danger">Delete</button>
                                </td>
                                <td>
                                    <Link to={`/automobiles/edit/${auto.vin}`}><button className="btn btn-success">Edit</button></Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default AutomobileList;
