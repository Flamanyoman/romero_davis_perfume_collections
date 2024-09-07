import { NavLink } from 'react-router-dom';
import FooterComponent from '../components/footer/footer';
import { BsClockHistory } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { GoCrossReference } from 'react-icons/go';
import { FcAbout } from 'react-icons/fc';
import { MdOutlinePassword } from 'react-icons/md';
import { useGoBack } from '../utility/goBack';

function calculateInvestmentResult(invested, totalWithdrawn) {
  let incomeArray = invested?.refs?.map((ref) => ref.totalIncome) || [];
  let totalIncome = incomeArray.reduce(
    (sum, income) => sum + (Number(income) || 0),
    0
  );

  let result = totalIncome - totalWithdrawn;

  // Check if result is less than 500
  return result < 500 ? 0 : result;
}

function handleCopyInviteLink(userInfo) {
  // Create a new URL object based on the current URL
  const baseUrl = new URL(window.location.href).origin;
  console.log(baseUrl); // Logs the base URL

  const inviteUrl = `${baseUrl}/signup?By=${`ref112${userInfo.id}`}`;

  navigator.clipboard
    .writeText(inviteUrl)
    .then(() => {
      alert('Invite link copied to clipboard!');
    })
    .catch((err) => {
      console.error('Failed to copy the link: ', err);
    });
}

export default function ProfilePage() {
  const goBack = useGoBack();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const withdrawableAmount = calculateInvestmentResult(
    userInfo?.wallet?.invested,
    userInfo?.wallet?.withDrawn?.balance || 0
  );

  return (
    <section className='_min-h-screen'>
      <div className='bg_img bg-cover bg-left-top bg-fixed h-[40vh]'>
        <div className='container flex flex-col items-center justify-between !text-[white] !font-bold h-full pt-4 pb-2'>
          <div className='container flex items-center justify-between'>
            <div
              onClick={goBack}
              className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
            >
              &#8249;
            </div>

            <h4>Profile</h4>
            <NavLink to='/recharge_history' className='text-2xl font-bolder'>
              <BsClockHistory />
            </NavLink>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span>{`0${userInfo?.phoneNum}`}</span>
            <NavLink
              to='/signin'
              className='block px-4 py-2 rounded bg-[#302aaf] mt-2'
              onClick={() => {
                localStorage.removeItem('userInfo');
              }}
            >
              Signout
            </NavLink>
          </div>
          <p className='container flex items-center justify-between text-[0.8rem]'>
            <span>
              Recharged: &#8358;
              <span>{userInfo?.wallet?.recharged?.balance}</span>
            </span>
            <span>
              Withdrawable: &#8358;<span>{withdrawableAmount}</span>
            </span>
            <span>
              Invested: &#8358;
              <span>{userInfo?.wallet?.invested?.balance}</span>
            </span>
          </p>
        </div>
      </div>
      <div className='container min-h-[50vh] !pb-[100px]'>
        <div className='container flex flex-wrap items-center h-full gap-12 pt-4 justify-evenly'>
          <NavLink
            to='/withdraw'
            className='flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img'
          >
            <span className='flex items-center justify-center w-full h-8'>
              <BiMoneyWithdraw />
            </span>
            <p className='text-[0.7rem] !block w-full h-fit'>Withdraw</p>
          </NavLink>
          <NavLink
            to='/withdraw_history'
            className='flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img'
          >
            <span className='flex items-center justify-center w-full h-8'>
              <BsClockHistory />
            </span>
            <p className='text-[0.7rem] !block w-full h-fit'>
              Withdraw Records
            </p>
          </NavLink>
          <NavLink
            onClick={() => handleCopyInviteLink(userInfo)}
            className='flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img'
          >
            <span className='flex items-center justify-center w-full h-8'>
              <GoCrossReference />
            </span>
            <p className='text-[0.7rem] !block w-full h-fit text-ellipsis'>
              Invite: <span>Code</span>
            </p>
          </NavLink>
          <NavLink
            to='/change_password'
            className='flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img'
          >
            <span className='flex items-center justify-center w-full h-8'>
              <MdOutlinePassword />
            </span>
            <p className='text-[0.7rem] !block w-full h-fit'>Change password</p>
          </NavLink>
          <NavLink
            to='#'
            className='flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img'
          >
            <span className='flex items-center justify-center w-full h-8'>
              <FaInfoCircle />
            </span>
            <p className='text-[0.7rem] !block w-full h-fit'>Manager</p>
          </NavLink>
          {/* <NavLink
            to='/income'
            className='flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img'
          >
            <span className='flex items-center justify-center w-full h-8'>
              <FcStatistics />
            </span>
            <p className='text-[0.7rem] !block w-full h-fit'>Income</p>
          </NavLink> */}
          <NavLink
            to='/about_us'
            className='flex flex-col justify-around items-center px-1 py-1 text-center text-4xl text-white rounded w-[7rem] h-[6rem] bg_img'
          >
            <span className='flex items-center justify-center w-full h-8'>
              <FcAbout />
            </span>
            <p className='text-[0.7rem] !block w-full h-fit'>About us</p>
          </NavLink>
        </div>
      </div>
      <FooterComponent />
    </section>
  );
}
