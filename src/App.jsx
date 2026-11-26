import { Route, Routes } from "react-router-dom"
import ProtectedLayout from "./pages/ProtectedLayout"
import ProviderLayout from "./pages/ProviderLayout"
import ProviderDashboard from "./components/Dashboards/ProviderDashboard"
import SysAdminLayout from "./pages/SysAdminLayout"
import SysAdminDashboard from "./components/Dashboards/SysAdminDashboard"
import InsuranceLayout from "./pages/InsuranceLayout"
import InsuranceDashboard from "./components/Dashboards/InsuranceDashboard"

function App() {
  return (
    <Routes>
      {/* these routes define where a logged in user goes once we check their assigned roles */}
      <Route element={<ProtectedLayout allowdRoles={["provider"]}/>}>
        <Route path="/provider" element={<ProviderLayout />} >
          <Route index element={<ProviderDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedLayout allowdRoles={["platform_admin"]}/>}>
        <Route path="/admin" element={<SysAdminLayout />} >
          <Route index element={<SysAdminDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedLayout allowdRoles={["insurance_admin"]}/>}>
        <Route path="/insurance" element={<InsuranceLayout />} >
          <Route index element={<InsuranceDashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App