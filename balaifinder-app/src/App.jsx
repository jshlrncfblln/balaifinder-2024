import React, { useState, useEffect,useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { BiMessageDetail } from 'react-icons/bi';
import Contact from './components/Contact';
import ResultSection from './components/ResultSection';
import Layout from './components/RealtorLayout';
import { AuthContext } from './context/authContext';
import About from './pages/About';
import Home from './pages/Home';
import LikeProperties from './pages/LikeProperties';
import MatchUp from './pages/MatchUp';
import Profile from './pages/ProfileSettings';
import Properties from './pages/Properties';
import ApplicationList from './realtor/Application';
import PropertyDetails from './pages/PropertyDetails';
import Register from './pages/Register';
import Dashboard from './realtor/Dashboard';
import Manage from './realtor/Manage-Property';
import Settings from './realtor/Settings';
import RealtorLogin from './realtor/RealtorLogin';
import RealtorRegister from './realtor/RealtorRegister';
import ForgotPassword from './realtor/ForgotPass'
import NotFound from './pages/404page';
import './CubeLoader.css'
import './App.css'
import UserForgotPassword from './pages/UserForgatPass';
import Test from './components/testrealtor';
import Verify from './pages/Verify';
import Orders from './pages/Orders';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Set loading to true whenever pathname changes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds
  
    return () => clearTimeout(timeout);
  }, [location.pathname]); // Run effect whenever location.pathname changes
  

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  const ProtectedRealtorRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/realtor/*"    />;
    }

    return children;
  };

  const [isOpenContactModal, setIsOpenContactModal] = useState(false);

  const toggleContactModal = () => {
    setIsOpenContactModal(!isOpenContactModal);
  };

  // Check if the current route is under the Realtor section
  const isRealtorRoute = location.pathname.startsWith('/realtor')
  const is404Page = location.pathname === '/404'
  return (
        <div>
        {loading ? (
            <div className="flex justify-center items-center h-screen bg-white flex-col">
                <div className="cube-loader">
                    <div className="cube-top"></div>
                    <div className="cube-wrapper">
                        {[...Array(4)].map((_, i) => (
                        <span key={i} className="cube-span" style={{ '--i': i }}>
                            <img src="/assets/Balaifinder.png" alt="logo" />
                        </span>
                        ))}
                    </div>
                </div>
                <div className="mt-14 font-semibold text-xl">Loading...</div>
            </div>
        ) : (
            <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<Test />} />
                <Route path='/matching' element={<MatchUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/user-registration" element={<Register />} />
                <Route path="/verify/:token" element={<Verify />} />
                <Route path="/realtor/*" element={<RealtorRoutes />} />
                <Route path="/user-forgot-password" element={<ProtectedRoute><UserForgotPassword /></ProtectedRoute>} />
                <Route path="/" element={<ResultSection />} />
                <Route path="/property-wishlists" element={<ProtectedRoute><LikeProperties /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/details/:id" element={<PropertyDetails />} />
                <Route path="/user-profile-settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />            
            </Routes>
            {!location.pathname.startsWith('/realtor') && location.pathname !== '/*' && (
            <div className="fixed bottom-4 right-4">
              <button
                onClick={toggleContactModal}
                className="flex items-center bg-sky-500 hover:bg-sky-700 text-white rounded-full py-4 px-5 shadow-lg"
              >
                <BiMessageDetail className="text-xl mr-2" />
                Contact
              </button>
            </div>
          )}
            <Contact isOpen={isOpenContactModal} onClose={() => setIsOpenContactModal(false)} />
            </div>
        )}
        </div>
  );
}

function RealtorRoutes() {
  return (
    <Routes>
        <Route path="/" element={<RealtorLogin />} />
        <Route path="/registration" element={<RealtorRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/manage-property" element={<Layout><Manage /></Layout>} />
        <Route path="/application" element={<Layout><ApplicationList /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
    </Routes>
  );
}

export default App;
