import { useEffect, useState } from 'react';

function ListAppointments() {
    const [appointments, setAppointments] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const handleCancel = async (e) => {
        const url = `http://localhost:8080/api/appointments/${e.target.id}/`

        const fetchConfigs = {
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(url, fetchConfigs)

        if (response.ok) {
            getData();
        } else {
            alert("Appointment was not canceled");
        }
    };


    const handleFinish = async (e) => {
        const url = `http://localhost:8080/api/appointments/${e.target.id}/`

        const fetchConfigs = {
            method: "PUT",
            body: JSON.stringify({ finished: true }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfigs)
        const data = await response.json()

        setAppointments(appointments.filter(appointment => String(appointment.id) !== e.target.id))
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
                    {appointments.map(appointment => {
                        if (appointment.finished) {
                            return null;
                        }
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.customer_name}</td>
                                <td>{appointment.vip ? "True" : "False"}</td>
                                <td>{convertDate(appointment.appointment)}</td>
                                <td>{convertTime(appointment.appointment)}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                                <td><button onClick={handleCancel} id={appointment.id} className="btn btn-danger">Cancel</button></td>
                                <td><button onClick={handleFinish} id={appointment.id} className="btn btn-success">Finished</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default ListAppointments;
