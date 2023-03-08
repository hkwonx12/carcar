// Display the list of models and their details.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ModelsList() {
    const [models, setModels] = useState([]);

    const getData = async () => {
        // Url for getting the list of models
        const modelsUrl = "http://localhost:8100/api/models/";
        // Get the server response
        const response = await fetch(modelsUrl);

        if (response.ok) {
            // Get the list of models
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <h1>Available Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} width="200" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Link to="/models/new"><button type="button" className="btn btn-primary">Add a Model</button></Link>
        </>
    );
}

export default ModelsList;
