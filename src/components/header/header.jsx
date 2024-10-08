import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '/imgs/logo.png';
import search_icon from '/imgs/search.svg';

export default function HeaderComponent() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const hasInvestments = userInfo?.wallet?.invested?.refs?.length > 0;

  return (
    <header className='flex flex-col items-center justify-between py-2 header bg-[#302aaf] bg_img'>
      <div className='container flex items-center justify-between topHeader'>
        <div className='flex items-center justify-between gap-6'>
          <div className='menu clk'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <img src={logo} alt='Logo' className='block logo w-[3.5rem] mt-4' />

        <NavLink
          to='/cart'
          className={`text-2xl cart clk ${
            hasInvestments ? 'text-green-500' : 'text-white'
          }`}
        >
          <FaShoppingCart />
        </NavLink>
      </div>
      <div className='container search'>
        <label
          htmlFor='inputSearchWrapper'
          className='relative flex items-center justify-between inputSearchWrapper'
        >
          <input
            type='text'
            name='inputSearchWrapper'
            id='inputSearchWrapper'
            className='block w-full indent-[1rem] p-2 mt-2 border-0 rounded font-semibold text-lg'
            placeholder='Search 10,000+ brands'
          />
          <img
            src={search_icon}
            alt='Search Icon'
            className='block w-[25px] aspect-square absolute left-auto right-0 mt-2 mr-2'
          />
        </label>
      </div>
      <div className='container flex justify-between items-center my-2 !text-white'>
        <span className='flex gap-3 w-fit'>
          <span>Womens</span>
          <span>Mens</span>
        </span>

        <span className='block w-fit'>Free Shipping</span>
      </div>
    </header>
  );
}
