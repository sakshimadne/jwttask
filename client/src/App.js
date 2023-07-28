import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

//components
import Home from './components/Home.js';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
   
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
