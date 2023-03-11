// This function returns a form for editing a model.

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ModelEdit() {
    const { id } = useParams();
    const [model, setModel] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        picture_url: ''
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

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Submit the form data
    const handleSubmit = async (event) => {
        event.preventDefault();
        const modelUrl = `http://localhost:8100/api/models/${id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        // Wait for the server response when sending the new model data
        const modelDataResponse = await fetch(modelUrl, fetchConfig);
        if (modelDataResponse.ok) {
            setFormData({
                name: '',
                picture_url: ''
            });
        } else {
            console.log("*******ERROR. Server response: ", modelDataResponse);
        }
    };

    useEffect(() => {
        fetchModelData();
    }, []);

    // Return the JSX/HTML to be rendered on the page.
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Edit Model </h2>
                    <form onSubmit={handleSubmit} id="edit-model-form">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Model Name</label>
                            <input onChange={handleChange} type="text" placeholder={model.name} className="form-control" name="name" value={formData.name} id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="picture_url" className="form-label">Picture URL</label>
                            <input onChange={handleChange} type="text" placeholder={model.picture_url} className="form-control" name="picture_url" value={formData.picture_url} id="picture_url" />
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModelEdit;
