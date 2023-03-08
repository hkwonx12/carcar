// Return a form for creating a new sales person.

import React, {useState} from 'react';

function SalesPersonForm () {
    // Store the form state; initialize fields to empty strings
    const [formData, setFormData] = useState({
        name: "",
        employee_num: "",
    })
    // Handle when the form changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send the form data to the sales server
        const salesUrl = 'http://localhost:8090/api/sales/staff/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        // Wait for server response when sending new sales person data
        const salesDataResponse = await fetch(salesUrl, fetchConfig);
        if (salesDataResponse.ok) {
            setFormData({
                name: "",
                employee_num: ""
            });
        } else {
            console.error("*******ERROR. Server response: ", salesDataResponse);
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Enter a New Salesperson</h2>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input onChange={handleChange} required type="text" name="name" value={formData.name} id="name" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="style">Employee #</label>
                            <input onChange={handleChange} required type="text" id="employee_num" name="employee_num" value={formData.employee_num} className="form-control"/>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalesPersonForm;
