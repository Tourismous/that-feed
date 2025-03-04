import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Box, ChakraProvider } from "@chakra-ui/react"
//import { system } from './theme';

// Auth pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

// main pages
import Home from './pages/main/Home';
import Notifications from './pages/main/Notifications';
import Profile from './pages/main/Profille';

// settings page
import Settings from './pages/settings/Settings';

function App() {

  function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth(); // Check if user is logged in

    if (!isAuthenticated) {
      return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    return children;
  }

  //const navigate = useNavigate();

  return (
    //<ChakraProvider value={system}>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  //</ChakraProvider>
  )
}

export default App
