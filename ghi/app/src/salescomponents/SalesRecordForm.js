// Return a form for creating a new sales person.

import React, {useEffect, useState} from 'react';

function SalesRecordForm () {
    // Store the form state; initialize fields to empty strings
    const [formData, setFormData] = useState({
        auto: "",
        salesperson: "",
        customer: "",
        price: 0.00,
    })
    // Handle when the form changes
    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    // Get the list of automobiles in inventory.
    const [inventory, setInventory] = useState([]);
    const fetchInventoryData = async () => {
        const inventoryResponse = await fetch('http://localhost:8100/api/automobiles/');

        if (inventoryResponse.ok) {
            const inventoryData = await inventoryResponse.json();
            setInventory(inventoryData.autos);
        }
    }

    // Get the list of sales people.
    const [staff, setStaff] = useState([]);
    const fetchStaffData = async () => {
        const staffRosterResponse = await fetch('http://localhost:8090/api/sales/staff/');

        if (staffRosterResponse.ok) {
            const staffRoster = await staffRosterResponse.json();
            setStaff(staffRoster.salespeople);
        }
    }

    // Get the list of customers.
    const [customers, setCustomers] = useState([]);
    const fetchCustomerData = async () => {
        const customerListResponse = await fetch('http://localhost:8090/api/sales/customers/');

        if (customerListResponse.ok) {
            const customerList = await customerListResponse.json();
            setCustomers(customerList.customers);
        }
    }

    // Handle form submissions
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send the form data to the sales server
        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        // Wait for server response when sending new sales record data
        const salesRecordResponse = await fetch(salesUrl, fetchConfig);
        if (salesRecordResponse.ok) {
            const newSalesRecord = await salesRecordResponse.json();
            setFormData({
                auto: "",
                salesperson: "",
                customer: "",
                price: 0.00,
            });
        } else {
            console.error("*******ERROR. Server response: ", salesRecordResponse);
        }
    }

    useEffect(() => {
        fetchInventoryData();
        fetchStaffData();
        fetchCustomerData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Create a New Sales Record</h2>
                    <form onSubmit={handleSubmit} id="create-salesrecord-form">
                        <div className="mb-3">
                            <select onChange={handleChange} required id="auto" name="auto" value={formData.auto} className="form-select">
                                <option value="">Choose an Automobile</option>
                                {inventory.map(auto => {
                                    return (
                                        <option key={auto.id} value={auto.vin}>
                                            {auto.year} {auto.color} {auto.model.manufacturer.name} {auto.model.name} VIN: {auto.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChange} required id="salesperson" name="salesperson" value={formData.salesperson} className="form-select">
                                <option value="">Choose a Sales Person</option>
                                {staff.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleChange} required id="customer" name="customer" value={formData.customer} className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Sales Price</label>
                            <input onChange={handleChange} required type="number" id="price" name="price" value={formData.price} className="form-control"/>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalesRecordForm;
