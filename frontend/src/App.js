import './App.css';
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/chats' element={<ChatPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
