import { useState, useEffect } from 'react';
import { useGoBack } from '../utility/goBack';
import { format, formatDistanceToNowStrict } from 'date-fns';
import fetchUserData from '../polling/fetchUserData';

export default function RechargeHistory() {
  const [error, setError] = useState(true);
  const [rechargeRefs, setRechargeRefs] = useState([]);
  const goBack = useGoBack();

  useEffect(() => {
    const checkLocalStorage = () => {
      fetchUserData().then(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (
          userInfo &&
          userInfo.wallet &&
          userInfo.wallet.recharged &&
          userInfo.wallet.recharged.refs.length > 0
        ) {
          setRechargeRefs(userInfo.wallet.recharged.refs);
          setError(false);
        } else {
          setError(true);
        }
      });
    };

    // Initial check
    checkLocalStorage();

    // Set up polling
    const intervalId = setInterval(() => {
      checkLocalStorage();
    }, 29000); // Poll every 29 seconds

    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatDate = (date) => {
    const now = new Date();
    const diffInDays = formatDistanceToNowStrict(date, { unit: 'day' });

    if (diffInDays === '0 days') {
      return format(date, "'Today, 'h:mmaaa");
    } else if (diffInDays === '1 day') {
      return format(date, "'Yesterday, 'h:mmaaa");
    } else {
      return format(date, 'do MMMM, yyyy');
    }
  };

  return (
    <section className='w-full bg-white'>
      <div className='container text-center bg-[#302aaf] text-white font-bold rounded-b sticky top-0 bg_img flex justify-between items-center'>
        <div
          onClick={goBack}
          className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
        >
          &#8249;
        </div>
        <h1 className='py-4'>Recharge records</h1>
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
            {rechargeRefs.map((ref, index) => (
              <li
                key={index}
                className='container py-2 border-b-[0.5px] text-[0.8rem]'
              >
                <p className='mb-2'>Bank account name: {ref.accountName}</p>
                <p className='mb-2'>
                  Deposit Money: &#8358;<span>{ref.amount}</span>
                </p>
                <span className='flex items-center justify-between w-full '>
                  <span className='text-[gray] text-[0.6rem]'>
                    {formatDate(new Date(ref.createdAt))}
                  </span>
                  <span
                    className={`${
                      ref.approved ? 'text-green-500' : 'text-[#dac133]'
                    }`}
                  >
                    {ref.approved
                      ? 'Transaction approved'
                      : 'Transaction is pending'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
