import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashBoard";
import Login from "./pages/login";
import Signup from "./pages/signUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </ Routes>
    </BrowserRouter>
  );
};

export default App;
