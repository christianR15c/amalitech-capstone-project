import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
