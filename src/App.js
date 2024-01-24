import './App.css';
import Navbar from './components/Navbar/Navbar';
import Product from './components/Products/Product';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from './components/About/About';
import Contact from './components/About/Contact';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
