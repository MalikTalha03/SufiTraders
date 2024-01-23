import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Card from './components/Products/Card';
import Product from './components/Products/Product';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
