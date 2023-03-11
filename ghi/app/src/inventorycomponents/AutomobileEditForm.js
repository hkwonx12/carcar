import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AutomobileEditForm() {
    const { vin } = useParams()
    const [models, setModels] = useState([])
    const [formData, setFormData] = useState({
        model:'',
        manufacturer:'',
        color:'',
        year:'',
    })


    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setModels(data.models);
        }
      }
      useEffect(() => {
        fetchData();
      }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const AutomobileUrl = `http://localhost:8100/api/automobiles/${vin}/`;

        const fetchConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(AutomobileUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                model:'',
                manufacturer:'',
                color:'',
                year:'',
            })
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Edit automobile</h1>
                    <form onSubmit={handleSubmit} id="edit-automobile-form">
                        <div className="form-floating mb-3">
                            <select value={formData.model_id} onChange={handleChange} required name="model_id" id="model_id" className="form-select">
                            <option value="">Choose a model</option>
                            {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                {model.name}
                                </option>
                            );
                            })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select value={formData.model_id} onChange={handleChange} required name="model_id" id="model_id" className="form-select">
                            <option value="">Choose a manufacturer</option>
                            {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                {model.manufacturer.name}
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
