import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManufacturerList from './inventorycomponents/ManufacturerList';
import ManufacturerDetail from './inventorycomponents/ManufacturerDetail';
import ManufacturerForm from './inventorycomponents/ManufacturerForm';
import ManufacturerEditForm from './inventorycomponents/ManufacturerEditForm';
import AutomobileList from './inventorycomponents/AutomobileList';
import AutomobileForm from './inventorycomponents/AutomobileForm';
import ModelsList from './inventorycomponents/ModelsList';
import ModelDetails from './inventorycomponents/ModelDetails';
import ModelEdit from './inventorycomponents/ModelEdit';
import ModelForm from './inventorycomponents/ModelForm';
import AutomobileDetail from './inventorycomponents/AutomobileDetail';
import AutomobileEditForm from './inventorycomponents/AutomobileEditForm';
import TechnicianForm from './servicecomponents/TechnicianForm';
import AppointmentForm from './servicecomponents/AppointmentForm';
import ListAppointments from './servicecomponents/ListAppointments';
import AppointmentsHistory from './servicecomponents/AppointmentHistory';
import MainPage from './MainPage';
import CustomerForm from './salescomponents/CustomerForm';
import SalesRecords from './salescomponents/SalesRecords';
import SalesStaff from './salescomponents/SalesStaff';
import SalesPersonForm from './salescomponents/SalesPersonForm';
import SalesPersonDetail from './salescomponents/SalesPersonDetail';
import SalesPersonHistory from './salescomponents/SalesPersonHistory';
import SalesRecordForm from './salescomponents/SalesRecordForm';
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
            <Route path=":id" element={<ModelDetails />} />
            <Route path="edit/:id" element={<ModelEdit />} />
            <Route path="new" element={<ModelForm />} />
          </Route>

          <Route path="manufacturers" >
            <Route index element={<ManufacturerList />} />
            <Route path=":id" element={<ManufacturerDetail />} />
            <Route path="new" element={<ManufacturerForm />} />
            <Route path="edit/:id" element={<ManufacturerEditForm />} />
          </Route>

          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path=":vin" element={<AutomobileDetail/>} />
            <Route path="new" element={<AutomobileForm/>} />
            <Route path="edit/:vin" element={<AutomobileEditForm/>} />
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
            <Route index element={<SalesStaff />} />
            <Route path="salesrecords" element={<SalesRecords />} />
            <Route path="newsalesrecord" element={<SalesRecordForm />} />
            <Route path="staff" element={<SalesStaff />} />
            <Route path="staff/:id" element={<SalesPersonDetail />} />
            <Route path="salespersonhistory" element={<SalesPersonHistory />} />
            <Route path="newsalesperson" element={<SalesPersonForm />} />
            <Route path="newcustomer" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
