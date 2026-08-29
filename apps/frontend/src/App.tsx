import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Register from "./pages/register";
import Login from "./pages/login";
import PageNotFound from "./pages/pageNotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />} />
       <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/room/:roomId" element={<Room />} />
       </Route>
       
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound/>} />
       
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
