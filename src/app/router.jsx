import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import VerificationRoom from "../pages/VerificationRoom";
import RefereeJoin from "../pages/RefereeJoin";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/room/:id" element={<VerificationRoom />} />
      <Route path="/referee/:id" element={<RefereeJoin />} />
    </Routes>
  );
}
