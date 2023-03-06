import React, {useState, useEffect } from 'react';

function AutomobileList() {
    const [autos, setAutos] = useState([])

    const getData = async () => {
    const response = await fetch("http://localhost:8100/api/automobiles/");

    if (response.ok) {
        const data = await response.json();
        setAutos(data.autos)
    }
    }

    useEffect(()=>{
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
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
  );

}

export default AutomobileList;
