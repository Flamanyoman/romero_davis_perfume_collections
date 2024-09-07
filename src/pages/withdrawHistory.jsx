import { useState } from 'react';
import { useGoBack } from '../utility/goBack';
// import noList from "/imgs/no.png";

export default function WithdrawHistory() {
  const [error] = useState(true);
  const goBack = useGoBack();

  return (
    <section className='w-full bg-white'>
      <div className='container text-center bg-[#302aaf] text-white font-bold rounded-b sticky top-0 bg_img'>
        <div
          onClick={goBack}
          className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
        >
          &#8249;
        </div>
        <h1 className='py-4'>Withdraw records</h1>
      </div>
      <div
        className={`container flex relative h-[85vh] pt-4 overflow-x-hidden overflow-y-auto ${
          error && "!bg-[url('/imgs/no.png')] bg-no-repeat bg-contain bg-center"
        }`}
      >
        {error ? (
          <p className='text-center mt-[15rem] w-full text-[#302aaf] font-bold text-xl justify-self-center self-center'>
            No data found
          </p>
        ) : (
          <ul className='container self-center block h-full justify-self-start'>
            <li className='container py-2 border-b-[0.5px] text-[0.8rem]'>
              <p className='mb-2'>T202408231236281236</p>
              <p className='mb-2'>
                Withdrawed Money: &#8358;<span>850,000</span>
              </p>
              <span className='flex items-center justify-between w-full '>
                <span className='text-[gray] text-[0.6rem]'>
                  Aug 23 2024 12:36
                </span>
                <span className='text-[#dac133]'>Withdraw in progress</span>
              </span>
            </li>
            <li className='container py-2 border-b-[0.5px] text-[0.8rem]'>
              <p className='mb-2'>T202408231236281236</p>
              <p className='mb-2'>
                Withdrawed Money: &#8358;<span>850,000</span>
              </p>
              <span className='flex items-center justify-between w-full '>
                <span className='text-[gray] text-[0.6rem]'>
                  Aug 23 2024 12:36
                </span>
                <span className='text-[#dac133]'>Withdraw in progress</span>
              </span>
            </li>
            <li className='container py-2 border-b-[0.5px] text-[0.8rem]'>
              <p className='mb-2'>T202408231236281236</p>
              <p className='mb-2'>
                Withdrawed Money: &#8358;<span>850,000</span>
              </p>
              <span className='flex items-center justify-between w-full '>
                <span className='text-[gray] text-[0.6rem]'>
                  Aug 23 2024 12:36
                </span>
                <span className='text-[#dac133]'>Withdraw in progress</span>
              </span>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
