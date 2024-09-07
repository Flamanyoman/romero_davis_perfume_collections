import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import axios from 'axios';
import { baseUrl } from '../../constants/constants';
import { IoMdCash } from 'react-icons/io';

export default function RechargeIndex() {
  const location = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');

  const [secondsRemaining, setSecondsRemaining] = useState(500);
  const [amountError, setAmountError] = useState(null);
  const [inputEntryError, setInputEntryError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputEntry, setInputEntry] = useState('');

  useEffect(() => {
    const amountValue = Number(amount);
    if (
      !amount ||
      isNaN(amountValue) ||
      amountValue <= 0 ||
      amountValue % 10 !== 0
    ) {
      setAmountError('Invalid amount specified.');
    } else {
      setAmountError(null);
    }
  }, [amount]);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timerId = setInterval(
        () => setSecondsRemaining((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timerId);
    }
  }, [secondsRemaining]);

  const handleInputChange = (e) => {
    setInputEntry(e.target.value);
    setInputEntryError(null);
  };

  const validateInputEntry = () => {
    const trimmedEntry = inputEntry.trim();

    // Check if the input is more than 2 characters
    if (trimmedEntry.length < 3) {
      setInputEntryError('Account name must be more than 2 characters.');
      return false;
    }

    // Check if the input is more than 100 characters
    if (trimmedEntry.length > 100) {
      setInputEntryError('Account name must not exceed 100 characters.');
      return false;
    }

    // Check if the input contains only numbers
    if (/^\d+$/.test(trimmedEntry)) {
      setInputEntryError('Account name cannot contain only numbers.');
      return false;
    }

    return true;
  };

  const validateAmount = () => {
    if (!amount || amount < 2000 || amount % 10 !== 0) {
      setInputEntryError(
        'The amount must be at least ₦2,000 and a multiple of 10!'
      );
      return false;
    }
    return true;
  };

  const handleRecharge = async (e) => {
    e.preventDefault();

    if (!validateInputEntry()) return;

    if (!validateAmount()) return;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo?.id;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/recharge`, {
        amount,
        userId,
        inputEntry,
      });
      if (response.status === 200) {
        const updatedBalance =
          userInfo.wallet.recharged.balance + response.data.transaction.amount;
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            ...userInfo,
            wallet: {
              ...userInfo.wallet,
              recharged: {
                ...userInfo.wallet.recharged,
                balance: updatedBalance,
              },
            },
          })
        );
        setModalOpen(true);
      } else {
        setInputEntryError('Recharge failed');
      }
    } catch (error) {
      setInputEntryError('Recharge failed');
    } finally {
      setIsSubmitting(false);
      setModalOpen(true);
    }
  };

  const handleButtonClick = (e) => {
    if (amountError) {
      navigate('/recharge');
    } else {
      handleRecharge(e);
    }
  };

  const handleContinue = () => {
    setModalOpen(false);
    navigate('/recharge_history');
  };

  const buttonText = amountError
    ? 'Go Back'
    : isSubmitting
    ? '...'
    : 'I Have Paid';

  return (
    <section className='bg-[#ebebebbf] h-screen'>
      <div className='w-full bg-transparent'>
        <div className='container relative pt-10'>
          <div className='container mt-8 h-[25vh] bg-[#302aaf] rounded-t-md flex flex-col justify-center items-center relative'>
            <span className='counter absolute top-[-2rem] right-2 text-[#302aaf] font-bold'>
              {secondsRemaining}
            </span>
            <span className='absolute w-[2.5rem] aspect-square bg-white top-[-1.25rem] rounded-[1.25rem] flex justify-center items-center scale-150 border-2 border-[#302aaf] text-[#302aaf] text-2xl'>
              <TbCurrencyNaira />
            </span>
            {amountError ? (
              <p className='amount text-red-500 font-bold text-x flex justify-center items-center'>
                <span className='text-4xl'>
                  <TbCurrencyNaira />
                </span>
                <span>{amountError}</span>
              </p>
            ) : (
              <p className='amount text-white font-bold text-3xl flex justify-center items-center'>
                <span className='text-4xl'>
                  <TbCurrencyNaira />
                </span>
                <span>{amount}</span>
              </p>
            )}
            <p className='absolute bottom-0 left-0 right-0 bg-[#1b1672] text-white flex justify-start gap-3 items-center px-4 py-2 text-sm'>
              <span>Make a transfer of</span>
              <span className='amount flex justify-start items-center'>
                <TbCurrencyNaira />
                <span>{amount}</span>
              </span>
            </p>
          </div>
          <p className='container py-4 text-sm'>
            <sup className='text-red-500'>*</sup>Make transfer to the below
            account <span className='text-red-500'>(Compulsory)</span>
          </p>
        </div>
      </div>
      <div className='bg-white shadow-md'>
        <div className='container'>
          <div className='container py-2'>
            <AccountInfo label='Account Number' value='5533477978854' />
            <AccountInfo label='Bank Name' value='9PSB Bank' />
            <AccountInfo
              label='Account Name'
              value='Premium Payment - SMART PAYS'
            />
          </div>
        </div>
      </div>
      <div className='container mt-8'>
        <div className='container'>
          <p className='text-sm text-center'>
            This transaction is automatic, your payment will be confirmed within
            10 minutes.
          </p>

          <label
            htmlFor='enterRechargeAmount'
            className='relative block w-full mt-4 h-fit before:flex before:justify-center before:items-center before:h-full before:absolute before:left-0 before:text-[gray] before:pl-4 border-2 border-[#302aaf] rounded'
          >
            <input
              type='text'
              id='enterRechargeAmount'
              placeholder='Enter your account name'
              value={inputEntry}
              onChange={handleInputChange}
              className='block w-full p-2 indent-8 outline-[#302aaf]'
            />
          </label>

          <button
            onClick={(e) => handleButtonClick(e)}
            className='block w-full py-2 bg-[#302aaf] text-white rounded mt-2 font-bold'
          >
            {buttonText}
          </button>

          {inputEntryError && (
            <p className='pt-1 text-red-500 text-sm font-semibold'>
              {inputEntryError}
            </p>
          )}
        </div>
      </div>

      {modalOpen && (
        <ForwardedModal
          ref={modalRef}
          onClose={() => setModalOpen(false)}
          onContinue={handleContinue}
          amount={amount}
        />
      )}
    </section>
  );
}

const AccountInfo = ({ label, value }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      alert(`${label} copied to clipboard!`);
    });
  };

  return (
    <span className='flex justify-between items-center text-sm my-4 w-full'>
      <span>{label}</span>
      <span className='flex justify-between items-center gap-4'>
        <span>{value}</span>
        <span
          className='block py-[0.2rem] px-2 rounded cursor-pointer bg-red-500 text-white'
          onClick={handleCopy}
        >
          copy
        </span>
      </span>
    </span>
  );
};

const Modal = ({ onClose, onContinue, amount }, ref) => (
  <div
    ref={ref}
    className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50'
    onClick={(e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }}
  >
    <div className='p-4 bg-white rounded'>
      <IoMdCash className='block text-[7rem] mx-auto' />
      <h3 className='text-xl font-bold text-center'>
        Your recharge is pending
      </h3>
      <p className='my-4 text-center'>₦{amount} will be approved shortly.</p>
      <button
        onClick={onContinue}
        className='block w-full py-2 mt-4 text-white bg-[#302aaf] rounded'
      >
        Continue
      </button>
    </div>
  </div>
);

const ForwardedModal = React.forwardRef(Modal);
