import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Inventory
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" to="/models/new">New Model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models">Model List</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers/new">New Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturer List</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/new">New Automobile</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles">Automobile List</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Service
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" to="/technicians/new">Enter a technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/new">Enter a service appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/history">Service Appointment History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Sales
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" to="/sales/salespersonhistory">Sales Person History</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/newsalesperson">New SalesPerson</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/newcustomer">New Customer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales">Sales Records</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/newsalesrecord">New Sales Record</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
