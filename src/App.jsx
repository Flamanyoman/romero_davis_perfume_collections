import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Homepage from './pages/home';
import SignPage from './pages/sign';
import Cart from './pages/cart_products';
import RechargeAccount from './pages/recharge';
import RechargeHistory from './pages/rechargeHistory';
import SendReceipt from './pages/send_receipt';
import RechargeIndex from './pages/rechargeIndex';
import ProfilePage from './pages/profile';
import Withdraw from './pages/withdraw';
import WithdrawHistory from './pages/withdrawHistory';
import Aboutus from './pages/aboutus';
import Referer from './pages/referer';
import ChangePassword from './pages/changePassword';
import Income from './pages/income';
import EPR from './pages/EPR';
import fetchUserData from './polling/fetchUserData';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Validate the phone number and userInfo existence
  if (!userInfo || ![8126401373, 9068314394].includes(userInfo.phoneNum)) {
    return <Navigate to='/' replace />;
  }

  return children;
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userInfo = localStorage.getItem('userInfo');

      if (!userInfo) {
        // Redirect to signin page if the user is not authenticated
        if (
          window.location.pathname !== '/signin' &&
          window.location.pathname !== '/signup'
        ) {
          navigate('/signin');
        }
      }
    };

    // Run authentication check on component mount
    checkAuthentication();

    // Set up an interval to fetch user data and recheck authentication every 30 seconds
    const intervalId = setInterval(() => {
      fetchUserData().then(() => {
        checkAuthentication(); // Re-check authentication after fetching user data
      });
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div className='restrict_mobile'>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/signin' element={<SignPage isSignIn={true} />} />
        <Route path='/signup' element={<SignPage isSignIn={false} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/recharge' element={<RechargeAccount />} />
        <Route path='/recharge_history' element={<RechargeHistory />} />
        <Route path='/send_receipt' element={<SendReceipt />} />
        <Route path='/recharge_index' element={<RechargeIndex />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/withdraw_history' element={<WithdrawHistory />} />
        <Route path='/about_us' element={<Aboutus />} />
        <Route path='/referer' element={<Referer />} />
        <Route path='/change_password' element={<ChangePassword />} />
        <Route path='/income' element={<Income />} />
        <Route
          path='/epr'
          element={
            <ProtectedRoute>
              <EPR />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
