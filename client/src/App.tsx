import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import useLoginState from './stores/login';

function App() {
  const { isLogin, signOut } = useLoginState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/signin');
      signOut();
    }
  }, [isLogin, navigate]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
