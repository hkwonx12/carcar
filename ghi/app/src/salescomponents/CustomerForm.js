// Return a form for creating a new sales person.

import React, {useEffect, useState} from 'react';

function CustomerForm () {
    // Store the form state; initialize fields to empty strings
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
    })
    // Handle when the form changes
    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send the form data to the sales server
        const salesUrl = 'http://localhost:8090/api/sales/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        // Wait for server response when sending new sales person data
        const customerDataResponse = await fetch(salesUrl, fetchConfig);
        if (customerDataResponse.ok) {
            const newCustomer = await customerDataResponse.json();
            setFormData({
                name: "",
                address: "",
                phone: ""
            });
        } else {
            console.error("*******ERROR. Server response: ", customerDataResponse);
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Enter a New Customer</h2>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input onChange={handleChange} required type="text" name="name" value={formData.name} id="name" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="style">Address</label>
                            <input onChange={handleChange} required type="text" id="address" name="address" value={formData.address} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="style">Phone Number</label>
                            <input onChange={handleChange} required type="text" id="phone" name="phone" value={formData.phone} className="form-control"/>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm;
