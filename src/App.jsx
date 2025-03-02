import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Box, ChakraProvider } from "@chakra-ui/react"
//import { system } from './theme';

// Auth pages
//import SignUp from './pages/auth/Signup'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'

// Main App Pages
import Home from './pages/main/Home'


function App() {

  const ProtectedRoute = () => {

  }

  const OnboardingRoute = () => {

  }
  //const navigate = useNavigate();

  return (
    //<ChakraProvider value={system}>
      <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/home" element={<Home />} />

      </Routes>
      </BrowserRouter>
    //</ChakraProvider>
  )
}

export default App
