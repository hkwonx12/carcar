import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AutomobileEditForm() {
    const { vin } = useParams();
    const [auto, setAuto] = useState([]);
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState({
        model: {},
        color: '',
        year: '',
    })

    // Automobile's details
    const fetchAuto = async () => {

        const url = `http://localhost:8100/api/automobiles/${vin}/`;
        const fetchAuto = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, fetchAuto);
        if (response.ok) {
            const data = await response.json();
            setAuto(data);
            formData.model = data.model;
            formData.color = data.color;
            formData.year = data.year;
        } else {
            console.log("*******ERROR. Server response: ", response);
        };
    };

    // List of models for dropdown
    const fetchModelsList = async () => {
        const url = "http://localhost:8100/api/models/";
        const fetchAuto = {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, fetchAuto);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        } else {
            console.log("*******ERROR. Server response: ", response);
        };
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
        console.log("Updating...", formData);
    }

    useEffect(() => {
        fetchModelsList();
        fetchAuto();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const AutomobileUrl = `http://localhost:8100/api/automobiles/${vin}/`;

        const submitConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(AutomobileUrl, submitConfig);
        if (response.ok) {
            setFormData({
                model: '',
                color: '',
                year: '',
            })
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Edit automobile</h1>
                    <form onSubmit={handleSubmit} id="edit-automobile-form">
                        <div className="form-floating mb-3">
                            <select onChange={handleChange} required name="model_id" id="model_id" className="form-select" value={formData.model}>
                                <option value="">Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.manufacturer.name} {model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.color} onChange={handleChange} placeholder="color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.year} onChange={handleChange} placeholder="year" required type="text" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AutomobileEditForm;
