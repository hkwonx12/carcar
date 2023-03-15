import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ManufacturerEditForm() {
    const { id } = useParams();
    const [manufacturer, setManufacturer] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
    });

    let data;
    const fetchManufacturerData = async () => {

        const url = `http://localhost:8100/api/manufacturers/${id}/`;
        const fetchManufacturer = {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, fetchManufacturer);
        if (response.ok) {
            data = await response.json();
            setManufacturer(data);
            formData.name = data.name;
            formData.picture_url = data.picture_url;
        } else {
            console.log("*******ERROR. Server response: ", response);
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const manufacturerUrl = `http://localhost:8100/api/manufacturers/${id}/`;

        const fetchConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                name: '',
            });
        } else {
            console.log("*******ERROR. Server response: ", response);
        };
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        fetchManufacturerData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Edit Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={formData.name} onChange={handleChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ManufacturerEditForm;
