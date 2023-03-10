import { useEffect, useState } from 'react';

function ListRentals(){
    const[rentals, setRentals] = useState([])
    const[filterTerm, setFilterTerm] = useState("");

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/rentals/')

        if(response.ok) {
            const data = await response.json();
            setRentals(data.rentals)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value);
    };

    const getRentalFiltered = () => {
        return rentals.filter((rental) =>
            rental.appointment["customer_name"].toLowerCase().includes(filterTerm.toLowerCase())
        );
    }

    function convertDate(appointment) {
        const dateTime = new Date(appointment);
        const date = dateTime.toLocaleDateString();
        return date;
    }

    return (
        <div className='container'>
            <h1>Search Rental History</h1>
            <input onChange={handleFilterChange} placeholder="Enter Customer Name"/>

            <hr />
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Start Date</th>
                            <th>Returned Date</th>
                            <th>Mileage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getRentalFiltered() && getRentalFiltered().map((rental) => {
                            return (
                                <tr key={rental.id}>
                                    <td>{rental.appointment.customer_name}</td>
                                    <td>{convertDate(rental.rental_start)}</td>
                                    <td>{convertDate(rental.rental_end)}</td>
                                    <td>{rental.mileage}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRentals;
