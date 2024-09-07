import { useState, useRef } from 'react';
import axios from 'axios';
import { perfData } from '../../assets/data/data';
import { baseUrl } from '../../../constants/constants';
import { FaCashRegister } from 'react-icons/fa';

export default function ProductsComponents() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state
  const [success, setSuccess] = useState(false); // Add success state
  const modalRef = useRef(null);

  const buyItem = (item) => {
    setSelectedItem({ ...item });
    setError(''); // Clear error when buying a new item
  };

  const closeModal = () => {
    setSelectedItem(null);
    setError('');
  };

  const purchase = async () => {
    setLoading(true);
    setError('');
    try {
      const { mode } = selectedItem;
      // Retrieve the userInfo from localStorage and parse it
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const userId = userInfo?.id; // Optional chaining to handle cases where userInfo might be null

      const response = await axios.post(`${baseUrl}/invest`, { mode, userId });
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || error.message); // Set error state on failure
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div className='bg-[rgba(191,198,254,.25)] p-4 !pb-[100px]'>
      <h2 className='font-serif text-3xl text-[#21165e] text-center py-8'>
        Top Fragrance Brands
      </h2>

      <div className='p-4 topBrands'>
        {perfData.map((item, index) => (
          <div key={index} className='relative rounded item'>
            <button
              onClick={() => buyItem(item)}
              className='block px-6 py-2 w-fit bg-[#302aaf] bg_img text-white rounded font-bold absolute top-1 right-1'
            >
              Buy
            </button>
            <img src={item.img} alt={item.name} />
            <div className='text-center'>
              <h6 className='font-bold'>{item.name}</h6>
              <p className='text-[.8rem]'>
                Price: &#8358; <span className='font-bold'>{item.amount}</span>
              </p>
              <p className='text-[.8rem]'>
                Matures in:{' '}
                <span className='font-bold'>{item.maturity} days</span>
              </p>
              <p className='text-[.8rem]'>
                Daily income: &#8358;
                <span className='font-bold'>{item.dailyIncome}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Item Purchase Modal */}
      {selectedItem && !success && (
        <div
          className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen blurBg'
          onClick={handleClickOutside}
        >
          <div ref={modalRef} className='p-4 bg-white rounded'>
            <h3 className='text-xl font-bold text-center'>Buy this Item</h3>
            <div className='relative text-center rounded'>
              <img
                src={selectedItem.img}
                alt={selectedItem.name}
                className='block w-[7rem] aspect-auto mx-auto'
              />
              <div className='text-center'>
                <h6 className='font-bold'>{selectedItem.name}</h6>
                <p className='text-[.8rem]'>
                  Price: &#8358;{' '}
                  <span className='font-bold'>{selectedItem.amount}</span>
                </p>
                <p className='text-[.8rem]'>
                  Maturity days:{' '}
                  <span className='font-bold'>{selectedItem.maturity}</span>
                </p>
                <p className='text-[.8rem]'>
                  Daily income: &#8358;
                  <span className='font-bold'>{selectedItem.dailyIncome}</span>
                </p>
              </div>
            </div>
            <div className='flex justify-center mt-4'>
              <button
                onClick={closeModal}
                className='px-4 py-2 mr-2 bg-gray-300 rounded'
              >
                Cancel
              </button>
              <button
                onClick={purchase}
                className='w-[75px] py-2 text-white bg-blue-500 rounded'
                disabled={loading} // Disable button while loading
              >
                {loading ? '...' : 'Confirm'}
                {/* Change button text based on loading state */}
              </button>
            </div>
            {error && (
              <p className='text-red-500 text-center mt-4'>{error}</p>
              // Display error message
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div
          className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen blurBg'
          onClick={(e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
              setSuccess(false);
            }
          }}
        >
          <div className='p-4 bg-white rounded'>
            <FaCashRegister className='block text-[3rem] aspect-auto mx-auto text-green-500' />
            <h3 className='text-xl font-bold text-center'>
              Investment Successful
            </h3>
            <div className='relative text-center rounded'>
              <div className='text-center'>
                <p className='text-[.8rem]'>
                  You will earn: &#8358;{' '}
                  <span className='font-bold'>
                    {selectedItem.dailyIncome} for {selectedItem.maturity} days
                  </span>
                </p>
                <p className='text-[.8rem]'>
                  Click on your cart to keep track of your investments
                </p>
              </div>
            </div>
            <div className='flex justify-center mt-4'>
              <button
                onClick={() => setSuccess(false)}
                className='px-4 py-2 mr-2 bg-gray-300 rounded'
              >
                Cancel
              </button>
              <button
                onClick={() => setSuccess(false)}
                className='px-4 py-2 text-white bg-blue-500 rounded'
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
