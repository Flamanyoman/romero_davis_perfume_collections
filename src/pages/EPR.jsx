import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants/constants';
import { useGoBack } from '../utility/goBack';

const EPR = () => {
  const [error, setError] = useState(false);
  const [transactionRefs, setTransactionRefs] = useState([]);
  const [loading, setLoading] = useState({});
  const [more, setMore] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [skip, setSkip] = useState(0); // Track skipped items
  const [limit] = useState(50); // Set limit for pagination
  const navigate = useNavigate();

  const goBack = useGoBack;

  const formatDate = (date) => {
    const now = new Date();
    const today = now.toLocaleDateString();
    const yesterday = new Date(
      now.setDate(now.getDate() - 1)
    ).toLocaleDateString();

    if (date.toLocaleDateString() === today) {
      return `today, ${date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else if (date.toLocaleDateString() === yesterday) {
      return `yesterday, ${date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const toggleApproval = async (transactionId) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [transactionId]: true }));

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if (!userInfo?.id) {
        throw new Error('User not authenticated');
      }

      const { data } = await axios.post(`${baseUrl}/toggleApproval`, {
        transactionId,
        userId: userInfo.id,
      });

      setTransactionRefs((prevRefs) =>
        prevRefs.map((ref) =>
          ref._id === data.transaction._id ? data.transaction : ref
        )
      );
    } catch (err) {
      if (err.message === 'Network Error') {
        return;
      }
      localStorage.removeItem('userInfo');
      navigate('/signin');
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [transactionId]: false }));
    }
  };

  const loadMore = async () => {
    try {
      setMoreLoading(true);

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if (!userInfo?.id) {
        throw new Error('User not authenticated');
      }

      const { data } = await axios.post(`${baseUrl}/transactionsInfo`, {
        userId: userInfo.id,
        skip: skip + limit, // Fetch the next batch
        limit,
      });

      if (data.transactions && data.transactions.length > 0) {
        setTransactionRefs((prevRefs) => [...prevRefs, ...data.transactions]);
        setMore(data.hasMore);
        setSkip((prevSkip) => prevSkip + limit);
        setError(false);
      } else {
        setMore(false);
        setError(true);
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        return;
      }
      localStorage.removeItem('userInfo');
      navigate('/signin');
    } finally {
      setMoreLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo?.id) {
          throw new Error('User not authenticated');
        }

        const { data } = await axios.post(`${baseUrl}/transactionsInfo`, {
          userId: userInfo.id,
          skip: 0, // Start from the beginning
          limit,
        });

        if (data.transactions && data.transactions.length > 0) {
          setTransactionRefs(data.transactions);
          setMore(data.hasMore);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        if (err.message === 'Network Error') {
          return;
        }
        localStorage.removeItem('userInfo');
        navigate('/signin');
      }
    };

    fetchRecords();
  }, [navigate, limit]);

  return (
    <section className='w-full bg-white'>
      <div className='container text-center bg-[#302aaf] text-white font-bold rounded-b sticky top-0 bg_img flex justify-between items-center'>
        <div
          onClick={goBack}
          className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
        >
          &#8249;
        </div>

        <h1 className='py-4'>Records</h1>
      </div>
      <div
        className={`container flex relative h-[85vh] pt-4 overflow-x-hidden overflow-y-auto ${
          error && "!bg-[url('/imgs/no.png')] bg-no-repeat bg-contain bg-center"
        }`}
      >
        {error ? (
          <p className='text-center mt-[15rem] w-full text-[#302aaf] font-bold text-xl'>
            No data found
          </p>
        ) : (
          <div className='flex flex-col w-full items-center'>
            <ul className='container self-center block h-full w-full'>
              {transactionRefs.map((ref, index) => (
                <li
                  key={index}
                  className={`container py-2 border-b-[0.5px] text-[0.8rem] border-r-8 pr-2 mb-2 ${
                    ref.mode === 'RAND'
                      ? 'border-r-[#ebb9ab42]'
                      : 'border-r-[#47361159]'
                  }`}
                >
                  {ref.mode === 'RAND' ? (
                    <>
                      <div className='w-full flex justify-between items-center'>
                        <span>
                          <p className='mb-2'>
                            Bank account name: {ref.accountName}
                          </p>
                          <p className='mb-2'>
                            Deposit Money: &#8358;<span>{ref.amount}</span>
                          </p>
                        </span>

                        <button
                          className={`block ${
                            ref.approved ? 'bg-[#dac133]' : 'bg-green-500'
                          } text-white text-xs py-3 w-[80px] rounded mt-4`}
                          onClick={() => toggleApproval(ref._id)}
                          disabled={loading[ref._id]} // Disable button while loading
                        >
                          {loading[ref._id]
                            ? '...'
                            : ref.approved
                            ? 'Reverse'
                            : 'Approve'}
                        </button>
                      </div>

                      <span className='flex items-center justify-between w-full'>
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
                    </>
                  ) : (
                    <>
                      <div className='w-full flex justify-between items-center'>
                        <span>
                          <p className='mb-2'>
                            Deposit Money: &#8358;<span>{ref.amount}</span>
                          </p>
                        </span>

                        <button
                          className={`block ${
                            ref.approved ? 'bg-[#dac133]' : 'bg-green-500'
                          } text-white text-xs py-3 w-[80px] rounded mt-4`}
                          onClick={() => toggleApproval(ref._id)}
                          disabled={loading[ref._id]} // Disable button while loading
                        >
                          {loading[ref._id]
                            ? '...'
                            : ref.approved
                            ? 'Reverse'
                            : 'Approve'}
                        </button>
                      </div>

                      <span className='flex items-center justify-between w-full'>
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
                    </>
                  )}
                </li>
              ))}
            </ul>

            {more && (
              <button
                className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white ${
                  moreLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={loadMore}
                disabled={moreLoading}
              >
                {moreLoading ? 'Loading...' : 'Load more'}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EPR;
