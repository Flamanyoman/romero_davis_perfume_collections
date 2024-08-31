import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import SignPage from "./pages/sign";
import Cart from "./pages/cart_products";
import RechargeAccount from "./pages/recharge";
import RechargeHistory from "./pages/rechargeHistory";
import SendReceipt from "./pages/send_receipt";
import RechargeIndex from "./pages/rechargeIndex";
import ProfilePage from "./pages/profile";
import Withdraw from "./pages/withdraw";
import WithdrawHistory from "./pages/withdrawHistory";
import Aboutus from "./pages/aboutus";
import Referer from "./pages/referer";
import ChangePassword from "./pages/changePassword";
import Income from "./pages/income";

function App() {
  return (
    <div className="restrict_mobile">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignPage isSignIn={true} />} />
        <Route path="/signup" element={<SignPage isSignIn={false} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/recharge" element={<RechargeAccount />} />
        <Route path="/recharge_history" element={<RechargeHistory />} />
        <Route path="/send_receipt" element={<SendReceipt />} />
        <Route path="/recharge_index" element={<RechargeIndex />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/withdraw_history" element={<WithdrawHistory />} />
        <Route path="/about_us" element={<Aboutus />} />
        <Route path="/referer" element={<Referer />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </div>
  );
}

export default App;
