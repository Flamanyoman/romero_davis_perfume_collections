import { NavLink } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { BsClockHistory } from "react-icons/bs";
// import { MdAccountBalanceWallet } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
// import { MdOutlineRule } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GoCrossReference } from "react-icons/go";
import { FcAbout } from "react-icons/fc";
import { MdOutlinePassword } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";

export default function ProfilePage() {
  return (
    <section className="_min-h-screen">
      <div
        className={`!bg-[url('/imgs/pexels-rameshkambattan-16025659.jpg')] bg-cover bg-left-top bg-fixed h-[40vh]`}
      >
        <div className="container flex flex-col items-center justify-between !text-[white] !font-bold h-full pt-4 pb-2">
          <div className="container flex items-center justify-between">
            <NavLink
              to="/"
              className="-mt-2 text-4xl font-bold hover:text-[#302aaf]"
            >
              &#8249;
            </NavLink>
            <h4>Profile</h4>
            <NavLink to="/recharge_history" className="text-2xl font-bolder">
              <BsClockHistory />
            </NavLink>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>09063698598</span>
            <NavLink
              to="/send_receipt"
              className="block px-4 py-2 rounded bg-[#302aaf] mt-2"
            >
              Signout
            </NavLink>
          </div>
          <p className="container flex items-center justify-between text-[0.8rem]">
            <span>
              Account balance: &#8358;<span>3,000</span>
            </span>{" "}
            <span>
              Total Balance: &#8358;<span>3,000</span>
            </span>{" "}
            <span>
              Income: &#8358;<span>32,000</span>
            </span>
          </p>
        </div>
      </div>
      <div className="container min-h-[50vh] !pb-[100px]">
        <div className="container flex flex-wrap items-center h-full gap-12 pt-4 justify-evenly">
          <NavLink
            to="/withdraw"
            className="flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img"
          >
            <span className="flex items-center justify-center w-full h-8">
              <BiMoneyWithdraw />
            </span>
            <p className="text-[0.7rem] !block w-full h-fit">Withdraw</p>
          </NavLink>
          <NavLink
            to="/withdraw_history"
            className="flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img"
          >
            <span className="flex items-center justify-center w-full h-8">
              <BsClockHistory />
            </span>
            <p className="text-[0.7rem] !block w-full h-fit">
              Withdraw Records
            </p>
          </NavLink>
          <NavLink
            to="#"
            className="flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img"
          >
            <span className="flex items-center justify-center w-full h-8">
              <GoCrossReference />
            </span>
            <p className="text-[0.7rem] !block w-full h-fit">ID:<span>3453423wdfsdf3r</span></p>
          </NavLink>
          <NavLink
            to="/change_password"
            className="flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img"
          >
            <span className="flex items-center justify-center w-full h-8">
              <MdOutlinePassword />
            </span>
            <p className="text-[0.7rem] !block w-full h-fit">Change password</p>
          </NavLink>
          <NavLink
            to="#"
            className="flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img"
          >
            <span className="flex items-center justify-center w-full h-8">
              <FaInfoCircle />
            </span>
            <p className="text-[0.7rem] !block w-full h-fit">Manager</p>
          </NavLink>
          <NavLink
            to="/income"
            className="flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img"
          >
            <span className="flex items-center justify-center w-full h-8">
              <FcStatistics />
            </span>
            <p className="text-[0.7rem] !block w-full h-fit">Income</p>
          </NavLink>
          <NavLink
            to="/about_us"
            className="flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img"
          >
            <span className="flex items-center justify-center w-full h-8">
              <FcAbout />
            </span>
            <p className="text-[0.7rem] !block w-full h-fit">About us</p>
          </NavLink>
        </div>
      </div>
      <FooterComponent />
    </section>
  );
}
