import { useEffect, useState } from 'react';

function AppointmentsHistory() {
    const [appointments, setAppointments] = useState([])
    const [filterTerm, setFilterTerm] = useState("");


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/history/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    };


    useEffect(() => {
        getData()
    }, []);


    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value);
    };


    const getAppointmentFiltered = () => {
        return appointments.filter((appointment) =>
            appointment["vin"].toLowerCase().includes(filterTerm.toLowerCase())
        );
    }


    function convertDate(appointment) {
        const dateTime = new Date(appointment);
        const date = dateTime.toLocaleDateString();
        return date;
    }


    function convertTime(appointment) {
        const dateTime = new Date(appointment);
        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return time;
    }


    return (
        <div>
            <h1>Search Service Appointment</h1>
            <input onChange={handleFilterChange} placeholder="Enter VIN" />

            <hr />
            <div className='container'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Customer Name</th>
                            <th>VIP</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAppointmentFiltered() && getAppointmentFiltered().map((appointment) => {
                            return (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer_name}</td>
                                    <td>{appointment.vip ? "True" : "False"}</td>
                                    <td>{convertDate(appointment.appointment)}</td>
                                    <td>{convertTime(appointment.appointment)}</td>
                                    <td>{appointment.technician.name}</td>
                                    <td>{appointment.reason}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default AppointmentsHistory;
