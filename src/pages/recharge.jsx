import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import FooterComponent from '../components/footer/footer';
import { BsClockHistory } from 'react-icons/bs';
import { useGoBack } from '../utility/goBack';

export default function RechargeAccount() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [inputEntry, setInputEntry] = useState('');
  const [inputEntryError, setInputEntryError] = useState(null);

  const navigate = useNavigate();
  const goBack = useGoBack();

  const validateInput = (value) => {
    const amount = Number(value);
    if (!value) return 'The selected amount field is required!';
    if (amount < 2000) return 'The minimum deposit amount is 2,000.';
    if (amount % 10 !== 0) return 'The amount must be a multiple of 10.';
    if (isNaN(amount)) return 'Only numbers are allowed';
    return null;
  };

  const handleAmountChange = (num) => {
    setSelectedAmount(num);
    setInputEntry(num);
    setInputEntryError(null);
  };

  const handleInputChange = (e) => {
    setInputEntry(e.target.value);
    setInputEntryError(null);
  };

  const handleRecharge = (e) => {
    e.preventDefault();
    const error = validateInput(inputEntry);
    if (error) {
      setInputEntryError(error);
    } else {
      setInputEntryError(null);
      navigate(`/recharge_index?amount=${inputEntry}`);
    }
  };

  return (
    <section className='relative w-full h-fit'>
      <div className='bg_img bg-cover bg-left-top bg-fixed h-[40vh]'>
        <div className='container flex flex-col items-center justify-between text-white font-bold h-full pt-4 pb-2'>
          <div className='container flex items-center justify-between'>
            <div
              onClick={goBack}
              className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
            >
              &#8249;
            </div>
            <h4>Deposit</h4>
            <NavLink to='/recharge_history' className='text-2xl font-bold'>
              <BsClockHistory />
            </NavLink>
          </div>
          <div className='flex flex-col items-center'>
            <span>Deposit not reflected?</span>
            <NavLink
              to='/send_receipt'
              className='px-4 py-2 rounded bg-[#302aaf] mt-2'
            >
              Send Receipt
            </NavLink>
          </div>
          <p>
            Deposit amount: Minimum deposit is &#8358;<span>2,000</span>
          </p>
        </div>
      </div>
      <form className='container min-h-[20vh] py-4 flex flex-wrap gap-2'>
        <div className='container flex flex-wrap w-full gap-2 py-4'>
          {[2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000].map(
            (num) => (
              <label
                key={num}
                htmlFor={`amount${num}`}
                className={`block w-[5rem] p-[.5rem] relative border-2 rounded text-center cursor-pointer 
                          ${
                            selectedAmount === num
                              ? 'bg-[#302aaf] text-white'
                              : 'bg-white text-[#302aaf]'
                          }`}
              >
                <span>{num}</span>
                <input
                  type='radio'
                  id={`amount${num}`}
                  name='amount'
                  value={num}
                  className='absolute opacity-0'
                  onChange={() => handleAmountChange(num)}
                />
              </label>
            )
          )}
        </div>
        <div className='container'>
          <h3 className='mt-4 mb-3 text-[#302aaf] text-xl'>Recharge channel</h3>
          <label
            htmlFor='enterRechargeAmount'
            className='relative block w-full mt-4 h-fit before:content-["\20A6"] before:flex before:justify-center before:items-center before:h-full before:absolute before:left-0 before:text-[gray] before:pl-4 border-2 border-[#302aaf] rounded'
          >
            <input
              type='text'
              id='enterRechargeAmount'
              placeholder='Enter recharge amount'
              value={inputEntry}
              onChange={handleInputChange}
              className='block w-full p-2 indent-8 outline-[#302aaf]'
            />
          </label>
          {inputEntryError && (
            <p className='pt-1 text-red-500 text-sm font-semibold'>
              {inputEntryError}
            </p>
          )}
          <button
            onClick={handleRecharge}
            className='block w-full bg_img text-white font-bold text-lg py-3 rounded mt-4'
          >
            Recharge now
          </button>
        </div>
        <p className='container bg_img p-3 rounded text-white text-[1rem] mt-3'>
          <span className='block w-full'>
            1. The minimum recharge amount is ₦2,000. If the amount is lower
            than the minimum, it will not be credited.
          </span>
          <br />
          <span className='block w-full'>
            2. Please operate according to the recharge rules. If you fail to
            recharge in accordance with the platform rules and cause property
            damage, the company will not be held responsible.
          </span>
          <br />
          <span className='block w-full'>
            3. If your payment does not arrive for a long time, please contact
            online customer service.
          </span>
        </p>
      </form>

      <FooterComponent />
    </section>
  );
}
