// This function returns a form for entering a new hat into
// the database.

import React, { useEffect, useState } from 'react';

function ModelForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an empty JSON object
        const data = {};

        // Assign the form data to the JSON object
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = make;

        // Send the data to the server to save the new model
        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            // turn the data into a JSON string
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        // Wait for the server response when sending the new model data
        const modelDataResponse = await fetch(modelUrl, fetchConfig);
        if (modelDataResponse.ok) {
            // If the response was okay, reset the form
            const newModel = await modelDataResponse.json();
            setName('');
            setPictureUrl('');
            setMake('');
        } else {
            console.log("*******ERROR. Server response: ", modelDataResponse);
        }
    }

    // Via useState, create a variable to hold our list of manufacturers.
    // Set the initial value to an empty string.
    const [makes, setMakes] = useState([]);

    // Set the useState hooks to store the form's values with a default
    // initial value of an empty string.
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [make, setMake] = useState('');

    // Create the methods to take what the user inputs
    // into the form and store it in the appropriate state variable.
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }
    const handleMakeChange = (event) => {
        const value = event.target.value;
        setMake(value);
    }

    const fetchData = async () => {
        // Get the list of locations to be displayed on the form for
        // the user to choose from.
        const makesListResponse = await fetch('http://localhost:8100/api/manufacturers/');

        if (makesListResponse.ok) {
            const makesData = await makesListResponse.json();
            setMakes(makesData.manufacturers);
        } else {
            console.log("*******ERROR. Server response: ", makesListResponse);
        }

    }

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
                            <label htmlFor="fabric">Name</label>
                            <input onChange={handleNameChange} required type="text" name="name" value={name} id="name" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pictureurl" className="form-label">Picture URL</label>
                            <input onChange={handlePictureUrlChange} type="text" className="form-control" name="pictureurl" value={pictureUrl} id="pictureurl" />
                        </div>
                        <div className="mb-3">
                            <select onChange={handleMakeChange} required id="make" name="make" value={make} className="form-select">
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
