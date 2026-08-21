import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
       
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
