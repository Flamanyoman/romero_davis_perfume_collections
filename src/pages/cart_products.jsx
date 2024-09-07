import { useState, useEffect } from 'react';
import FooterComponent from '../components/footer/footer';
import { useGoBack } from '../utility/goBack';
import { perfData } from '../assets/data/data';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const goBack = useGoBack();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (
        userInfo &&
        userInfo.wallet &&
        userInfo.wallet.invested &&
        userInfo.wallet.invested.refs.length > 0
      ) {
        setTransactions(userInfo.wallet.invested.refs);
        setError(false);
      } else {
        setError(true);
      }
    };

    // Fetch immediately on page load
    fetchTransactions();

    // Fetch every 10 seconds
    const interval = setInterval(fetchTransactions, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const calculateDays = (createdAt, maturity) => {
    const currentDate = new Date();
    const creationDate = new Date(createdAt);
    const diffTime = Math.abs(currentDate - creationDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays, maturity); // Return the smaller of the two
  };

  const filterByMode = (data, mode) => {
    return data.filter((item) => item.mode.includes(mode));
  };

  return (
    <section className={`w-full bg-white`}>
      <div className='container text-center bg-[#302aaf] text-white font-bold rounded-b sticky top-0 bg_img flex justify-between items-centers'>
        <div
          onClick={goBack}
          className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
        >
          &#8249;
        </div>
        <h1 className='py-4'>Investment Cart</h1>
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
          <div className='bg-[rgba(191,198,254,.25)] min-h-full p-4 !w-full !h-fit'>
            <h2 className='font-serif text-3xl text-[#21165e] text-center py-8'>
              Your investments
            </h2>

            <div className='p-4 topBrands'>
              {/* Item List */}
              {transactions.map((item, index) => {
                const perfItem = filterByMode(perfData, item.mode)[0]; // Extract the matched item once

                return (
                  <div
                    key={index}
                    className={`relative rounded item ${
                      item.matured ? 'border-blue-600 border' : ''
                    }`}
                  >
                    {item.totalIncome - item?.withdrawn?.amount >= 500 && (
                      <button
                        className='block px-1 py-2 w-fit bg_img text-white rounded font-bold absolute top-1 right-1'
                        onClick={() => navigate('/withdraw')}
                      >
                        Withdraw
                      </button>
                    )}
                    <img src={perfItem.img} alt={perfItem.name} />
                    <div className='text-center'>
                      <h6 className='font-bold'>{perfItem.name}</h6>
                      <p className='text-[.8rem]'>
                        Price: &#8358;{' '}
                        <span className='font-bold'>{perfItem.amount}</span>
                      </p>
                      <p className='text-[.8rem]'>
                        Maturity days:{' '}
                        <span className='font-bold'>
                          {`${calculateDays(
                            item.createdAt,
                            perfItem.maturity
                          )} of ${perfItem.maturity}`}
                        </span>
                      </p>
                      <p className='text-[.8rem]'>
                        Current income: &#8358;
                        <span className='font-bold'>
                          {item.totalIncome - item?.withdrawn?.amount}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <FooterComponent />
    </section>
  );
}
