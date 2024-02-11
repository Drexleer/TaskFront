import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home.jsx';
import Landing from './views/Landing/Landing.jsx';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
