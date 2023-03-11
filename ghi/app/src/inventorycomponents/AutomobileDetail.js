import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AutomobileDetail() {
    const { vin } = useParams();

    const [auto, setAuto] = useState({
        id: '',
        vin: '',
        model: '',
        color: '',
        year: '',
    })

    let AutomobileData;
    const fetchAutomobileData = async () => {

        const modelUrl = `http://localhost:8100/api/automobiles/${vin}/`;
        const fetchModel = {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const fetchResponse = await fetch(modelUrl, fetchModel);
        if (fetchResponse.ok) {
            AutomobileData = await fetchResponse.json();
            setAuto(AutomobileData);
        } else {
            console.log("*******ERROR. Server response: ", fetchResponse);
        };
    };

    useEffect(() => {
        fetchAutomobileData();
    }, []);


    return (
        <div className='container'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>VIN</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={auto.vin}>
                        <td>{auto.id}</td>
                        <td>{auto.vin}</td>
                        <td>{auto.model?.manufacturer?.name}</td>
                        <td>{auto.model?.name}</td>
                        <td>{auto.color}</td>
                        <td>{auto.year}</td>
                        <td><img src={auto.model?.picture_url} width="300" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


export default AutomobileDetail;
