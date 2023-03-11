import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ManufacturerDetail() {
    const { id } = useParams();
    const [manufacturer, setManufacturer] = useState([])

    const getData = async () => {
        const response = await fetch(`http://localhost:8100/api/models/${id}/`);

        if (response.ok) {
            const data = await response.json();
            setManufacturer(data)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='container'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={manufacturer.id}>
                        <td>{manufacturer.id}</td>
                        <td>{manufacturer.name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


export default ManufacturerDetail;
