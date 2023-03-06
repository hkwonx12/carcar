// Display the list of models and their details.
import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function ModelsList() {
    const [models, setModels] = useState([]);

    const handleSubmit = async (event) => {
        const value = event.target.value;
        // Create Url for specific model to be deleted
        const modelUrl = `http://localhost:8090/api/models/${value}/`;

    //     // Format the delete method to send to the server to delete the hat.
    //     const deleteConfig = {
    //         method: "delete",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //    };

    //    // Send the delete method to the server with the url to the specific
    //    // model we will delete.
    //    const response = await fetch(modelUrl, deleteConfig);
    //    const data = await response.json();

    //    setModels(models.filter(model => String(model.id) !== value));
    }

    const getData = async () => {
        // Url for getting the list of hats
        const modelsUrl = "http://localhost:8100/api/models/";
        // Get the server response
        const response = await fetch(modelsUrl);

        if (response.ok) {
            // Get the list of models
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(()=>{
        getData()
    }, [])

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
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            <td>{ model.picture_url }</td>
                            {/* <td>
                                <button onClick={handleSubmit} value={model.id} className="btn btn-danger">Delete</button>
                            </td> */}
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
