import { Navbar, Footer, Header } from './components';
import { Box } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import CreateTrust from './components/CreateTrust';
import { Profile } from './components/Profile';

function App() {
  return (
    <Router>
        <Box className="gradient__bg">
            <Box position={'static'} minHeight={'80vh'}>
                <Navbar />
                  <Routes>
                    <Route path='/' element={<Header />} />
                    <Route path='/create' element={<CreateTrust />} />
                    <Route path='/profile' element={<Profile />} />
                  </Routes>
            </Box>
            <Footer />
        </Box>
    </Router>
  )
};

export default App;