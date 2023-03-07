import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManufacturerList from './inventorycomponents/ManufacturerList';
import ManufacturerForm from './inventorycomponents/ManufacturerForm';
import AutomobileList from './inventorycomponents/AutomobileList';
import AutomobileForm from './inventorycomponents/AutomobileForm';
import ModelsList from './inventorycomponents/ModelsList';
import ModelForm from './inventorycomponents/ModelForm';
import MainPage from './MainPage';
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
