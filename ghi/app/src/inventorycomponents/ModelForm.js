// This function returns a form for entering a new model into
// the database.

import { useEffect, useState } from 'react';

function ModelForm() {
    const [makes, setMakes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
    });

    const fetchData = async () => {
        // Get the list of manufacturers to be displayed on the form.
        const makesListResponse = await fetch('http://localhost:8100/api/manufacturers/');
        if (makesListResponse.ok) {
            const makesData = await makesListResponse.json();
            setMakes(makesData.manufacturers);
        } else {
            console.log("*******ERROR. Server response: ", makesListResponse);
        }

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
        const modelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
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
                picture_url: '',
                manufacturer_id: '',
            });
        } else {
            console.log("*******ERROR. Server response: ", modelDataResponse);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Return the JSX/HTML to be rendered on the page.
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Create A New Model</h2>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Model Name</label>
                            <input onChange={handleChange} required type="text" className="form-control" name="name" value={formData.name} id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="picture_url" className="form-label">Picture URL</label>
                            <input onChange={handleChange} required type="text" className="form-control" name="picture_url" value={formData.picture_url} id="picture_url" />
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChange} required id="manufacturer_id" name="manufacturer_id" value={formData.manufacturer_id} className="form-select">
                                <option value="">Choose a manufacturer</option>
                                {makes.map(make => {
                                    return (
                                        <option key={make.id} value={make.id}>
                                            {make.name}
                                        </option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModelForm;
