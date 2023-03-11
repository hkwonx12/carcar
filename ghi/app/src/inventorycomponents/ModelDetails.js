import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ModelDetails() {
    const { id } = useParams();
    const [model, setModel] = useState({
        name: "Loading",
        manufacturer: { name: "Loading" },
        picture_url: ""
    });

    let modelData;
    const fetchModelData = async () => {

        const modelUrl = `http://localhost:8100/api/models/${id}/`;
        const fetchModel = {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const fetchModelResponse = await fetch(modelUrl, fetchModel);
        if (fetchModelResponse.ok) {
            modelData = await fetchModelResponse.json();
            setModel(modelData);
        } else {
            console.log("*******ERROR. Server response: ", fetchModelResponse);
        };
    };

    useEffect(() => {
        fetchModelData();
    }, []);

    return (
        <>
            <h1>{model.name} Details</h1>
            <hr />
            <h2>Manufacturer: {model.manufacturer.name}</h2>
            <p>
                <img src={model.picture_url} width="300" />
            </p>
            <Link to={`/models/edit/${model.id}`}><button type="button" className="btn btn-primary">Edit Model</button></Link>
        </>
    );
};

export default ModelDetails;
