// Display the list of models and their details.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ModelsList() {
    const [models, setModels] = useState([]);

    const getData = async () => {
        const modelsUrl = "http://localhost:8100/api/models/";
        // Get the server response
        const response = await fetch(modelsUrl);

        if (response.ok) {
            // Get the list of models
            const data = await response.json();
            setModels(data.models);
        }
    }

    const handleDelete = async (event) => {
        const value = event.target.value;
        const modelUrl = `http://localhost:8100/api/models/${value}/`;

        const deleteConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(modelUrl, deleteConfig);
        const data = await response.json();

        setModels(models.filter(model => String(model.id) !== value));
    };

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
                                <td>
                                    <Link to={`/models/${model.id}/`}>
                                        {model.name}
                                    </Link>
                                </td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} width="200" /></td>
                                <td>
                                    <Link to={`/models/edit/${model.id}`}><button type="button" className="btn btn-primary">Edit Model</button></Link>
                                </td>
                                <td>
                                    <button onClick={handleDelete} value={model.id} className="btn btn-danger">Delete</button>
                                </td>
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
