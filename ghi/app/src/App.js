import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManufacturerList from './inventorycomponents/ManufacturerList';
import ManufacturerForm from './inventorycomponents/ManufacturerForm';
import AutomobileList from './inventorycomponents/AutomobileList';
import AutomobileForm from './inventorycomponents/AutomobileForm';
import ModelsList from './inventorycomponents/ModelsList';
import ModelForm from './inventorycomponents/ModelForm';
import MainPage from './MainPage';
import SalesPersonForm from './salescomponents/SalesPersonForm';
import CustomerForm from './salescomponents/CustomerForm';
import SalesList from './salescomponents/SalesList';
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
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="manufacturers" >
            <Route index element={<ManufacturerList />}/>
            <Route path="new" element={<ManufacturerForm />}/>
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />}/>
            <Route path="new" element={<AutomobileForm />}/>
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />}/>
            <Route path="newsalesperson" element={<SalesPersonForm />}/>
            <Route path="newcustomer" element={<CustomerForm />}/>
            <Route path="newsalesrecord" element={<SalesRecordForm />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
