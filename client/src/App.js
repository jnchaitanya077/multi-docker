import './App.css';
import Fib from './Fib';
import OtherPage from './otherPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "0 10% 0 10%" }}>
        <Link to='/'>Home</Link> &nbsp; &nbsp;
        <Link to='/other-page'>OtherPage</Link>
        <Routes>
          <Route exact path='/' element={<Fib />} />
          <Route exact path='/other-page' element={<OtherPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
