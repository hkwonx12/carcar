import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([])

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/manufacturers/");

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(manufacturer => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/manufacturers/new"><button type="button" className="btn btn-primary">Add a Manufacturer</button></Link>
    </div>
  );
}


export default ManufacturerList;
