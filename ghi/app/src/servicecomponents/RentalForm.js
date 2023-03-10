import { useState, useEffect } from "react";

function RentalForm() {
    const [appointments, setAppointments] = useState([])
    const [formData, setFormData] = useState({
        mileage: '',
        rental_start: '',
        rental_end: '',
        appointment: '',
    })

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const rentalUrl = "http://localhost:8080/api/rentals/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(rentalUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                mileage: '',
                rental_start: '',
                rental_end: '',
                appointment: '',
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
                    <h1>Enter Rental</h1>
                    <form onSubmit={handleSubmit} id="create-rental-form">
                        <div className="form-floating mb-3">
                            <select value={formData.appointment} onChange={handleChange} placeholder="appointment" required name="appointment" id="appointment" className="form-control">
                            <option value="">Choose a Customer</option>
                            {appointments.map(appointment => {
                                return (
                                    <option key={appointment.id} value={appointment.id}>
                                        {appointment.customer_name}
                                    </option>
                                );
                            })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.rental_start} onChange={handleChange} placeholder="name" required type="datetime-local" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Start Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.rental_end} onChange={handleChange} placeholder="name" required type="datetime-local" name="name" id="name" className="form-control" />
                            <label htmlFor="name">End Date</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RentalForm;
