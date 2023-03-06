import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManufacturerList from './inventorycomponents/Manufacturerlist';
import ManufacturerForm from './inventorycomponents/ManufacturerForm';
import AutomobileList from './inventorycomponents/AutomobileList';
import MainPage from './MainPage';
import Nav from './Nav';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" >
            <Route index element={<ManufacturerList />}/>
            <Route path="new" element={<ManufacturerForm />}/>
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
