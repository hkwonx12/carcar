import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManufacturerList from './inventorycomponents/ManufacturerList';
import ManufacturerForm from './inventorycomponents/ManufacturerForm';
import AutomobileList from './inventorycomponents/AutomobileList';
import AutomobileForm from './inventorycomponents/AutomobileForm';
import ModelsList from './inventorycomponents/ModelsList';
import ModelForm from './inventorycomponents/ModelForm';
import TechnicianForm from './servicecomponents/TechnicianForm';
import AppointmentForm from './servicecomponents/AppointmentForm';
import ListAppointments from './servicecomponents/ListAppointments';
import AppointmentsHistory from './servicecomponents/AppointmentHistory';
import MainPage from './MainPage';
import SalesPersonForm from './salescomponents/SalesPersonForm';
import CustomerForm from './salescomponents/CustomerForm';
import SalesList from './salescomponents/SalesList';
import SalesPersonHistory from './salescomponents/SalesPersonHistory';
import SalesRecordForm from './salescomponents/SalesRecordForm';
import ListRentals from './servicecomponents/ListRentals';
import RentalForm from './servicecomponents/RentalForm';
import Nav from './Nav';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="models">
            <Route index element={<ModelsList />} />
            <Route path="new" element={<ModelForm />} />
          </Route>

          <Route path="manufacturers" >
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>

          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>

          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>

          <Route path="appointments">
            <Route index element={<ListAppointments />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentsHistory />} />
          </Route>

          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="salespersonhistory" element={<SalesPersonHistory />} />
            <Route path="newsalesperson" element={<SalesPersonForm />} />
            <Route path="newcustomer" element={<CustomerForm />} />
            <Route path="newsalesrecord" element={<SalesRecordForm />} />
          </Route>

          <Route path="rentals">
            <Route index element={<ListRentals/>} />
            <Route path="new" element={<RentalForm/>} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
