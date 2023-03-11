import { useEffect, useState } from 'react';
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

  const handleSubmit = async (event) => {
    const value = event.target.value;
    const manufacturerUrl = `http://localhost:8100/api/manufacturers/${value}/`;

    const deleteConfig = {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        }
   };


   const response = await fetch(manufacturerUrl, deleteConfig);
   const data = await response.json();

   setManufacturers(manufacturers.filter(manufacturer => String(manufacturer.id) !== value));
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
                <td><Link to={`/manufacturers/${manufacturer.id}`}>{manufacturer.name}</Link></td>
                <td>
                  <button onClick={handleSubmit} value={manufacturer.id} className="btn btn-danger">Delete</button>
                </td>
                <td>
                  <Link to={`/manufacturers/edit/${manufacturer.id}`}><button className="btn btn-success">Edit</button></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


export default ManufacturerList;
