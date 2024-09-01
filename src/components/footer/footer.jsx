import { NavLink } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
// import { MdAccountBalance } from "react-icons/md";
import { MdAccountBalanceWallet } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
// import { FaShoppingCart } from "react-icons/fa";
import { BiMoneyWithdraw } from 'react-icons/bi';

export default function FooterComponent() {
  return (
    <footer className='bg-[#302aaf] bg_img fixed !top-auto !bottom-0 !left-0 !right-0'>
      <nav className='flex items-center pt-3 justify-evenly'>
        <NavLink
          to='/'
          className='text-3xl text-[white] flex flex-col justify-evenly items-center w-fit p-0'
        >
          <IoMdHome />
          <span className='block w-fit text-[.7rem]'>Home</span>
        </NavLink>
        <NavLink
          to='/recharge'
          className='text-3xl text-[white] flex flex-col justify-evenly items-center w-fit p-0'
        >
          <MdAccountBalanceWallet />
          <span className='block w-fit text-[.7rem]'>Recharge</span>
        </NavLink>
        <NavLink
          to='/withdraw'
          className='text-3xl text-[white] flex flex-col justify-evenly items-center w-fit p-0'
        >
          <BiMoneyWithdraw />
          <span className='block w-fit text-[.7rem]'>Withdraw</span>
        </NavLink>
        <NavLink
          to='/profile'
          className='text-3xl text-[white] flex flex-col justify-evenly items-center w-fit p-0'
        >
          <CgProfile />
          <span className='block w-fit text-[.7rem]'>Profile</span>
        </NavLink>
      </nav>
    </footer>
  );
}
