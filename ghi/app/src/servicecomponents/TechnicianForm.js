import { useState } from "react";

function TechnicianForm() {
  const [formData, setFormData] = useState({
    name: '',
    employee_number: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const techUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(techUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        name: '',
        employee_number: '',
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
          <h1>Enter a technician</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input value={formData.name} onChange={handleChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.employee_number} onChange={handleChange} placeholder="employee_number" required type="number" name="employee_number" id="employee_number" className="form-control" />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TechnicianForm;
