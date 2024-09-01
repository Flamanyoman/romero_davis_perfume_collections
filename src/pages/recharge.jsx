import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import FooterComponent from '../components/footer/footer';
import { BsClockHistory } from "react-icons/bs";

export default function RechargeAccount() {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [inputEntry, setInputEntry] = useState('');
    const [inputEntryError, setInputEntryError] = useState(null);
    const navigate = useNavigate();

    const handleAmountChange = (num) => {
        setSelectedAmount(num);
        setInputEntry(num); // Update the input field with the selected amount
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputEntry(value);
        setSelectedAmount(Number(value)); // Update the selected amount based on input
    };

    const handleRecharge = (e) => {
        e.preventDefault();
        if (!inputEntry) {
            setInputEntryError("The selected amount field is required!");
            const timeout = setTimeout(function () {
                setInputEntryError(null);
                clearTimeout(timeout);
            }, 5000);
        } else {
            setInputEntryError(null);
            // do stuffs
            navigate('/recharge_index');
        }
    }

    return (
        <section className='relative w-full h-fit'>
            <div className={`bg_img bg-cover bg-left-top bg-fixed h-[40vh]`}>
                <div className="container flex flex-col items-center justify-between !text-[white] !font-bold h-full pt-4 pb-2">
                    <div className='container flex items-center justify-between'>
                        <NavLink to="/" className="-mt-2 text-4xl font-bold hover:text-[#302aaf]">&#8249;</NavLink>
                        <h4>Recharge</h4>
                        <NavLink to="/recharge_history" className='text-2xl font-bolder'>
                            <BsClockHistory />
                        </NavLink>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <span>Deposit not reflected?</span>
                        <NavLink to="/send_receipt" className="block px-4 py-2 rounded bg-[#302aaf] mt-2">Send Receipt</NavLink>
                    </div>
                    <p>Recharge amount: Minimum recharge is &#8358;<span>3,000</span></p>
                </div>
            </div>
            <form className='container min-h-[20vh] py-4 flex flex-wrap gap-2 !pb-[100px]'>
                <div className='container flex flex-wrap w-full gap-2 py-4'>
                    {[1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]
                        .map((num, index) => (
                            <label
                                key={index}
                                htmlFor={`amount${index}`}
                                className={`block w-[5rem] p-[.5rem] _relative border-2 rounded text-center cursor-pointer 
                            ${selectedAmount === num ? 'bg-[#302aaf] text-white' : 'bg-white text-[#302aaf]'}`}>
                                <span>{num}</span>
                                <input
                                    type="radio"
                                    id={`amount${index}`}
                                    name='amount'
                                    value={num}
                                    className="absolute opacity-0"
                                    onChange={() => handleAmountChange(num)}
                                />
                            </label>
                        ))}
                </div>
                <div className='container'>
                    <h3 className='mt-4 mb-3 text-[#302aaf] text-xl'>Recharge channel</h3>
                    <div className='flex flex-col items-center justify-between w-full gap-3'>
                        <button className='block w-full bg-[#302aaf] bg_img text-white font-bold text-lg py-3 rounded'>Bank transfer one</button>
                        <button className='block w-full bg-[#302aaf] bg_img text-white font-bold text-lg py-3 rounded'>Bank transfer two</button>
                    </div>
                    <label htmlFor="enterRechargeAmount" className='relative block w-full mt-4 h-fit before:content-["\20A6"] before:flex before:justify-center before:items-center before:h-full before:absolute before:left-0 before:text-[gray] before:pl-4 border-2 border-[#302aaf] rounded'>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            id='enterRechargeAmount'
                            placeholder='Enter recharge amount'
                            value={inputEntry}
                            className='block w-full p-2 indent-8 outline-[#302aaf]'
                        />
                    </label>
                    {inputEntryError && <p className='pt-1 shadow-[#302aaf] border-none rounded text-[red] text-sm font-[600]'>{inputEntryError}</p>}
                    <button onClick={handleRecharge} className='block w-full bg-[#302aaf] bg_img text-white font-bold text-lg py-3 rounded mt-4'>Recharge now</button>
                </div>
                <p className='container bg-[#302aaf] p-3 rounded text-white text-[.8rem] mt-3 bg_img'>
                    <span className='block w-full'>1. The minimum recharge amount is ₦3,000. If the amount is lower than the minimum amount, it will not be credited.</span>
                    <span className='block w-full'>2. Please check the account information carefully when transferring money to avoid payment errors.</span>
                    <span className='block w-full'>3. Please operate according to the recharge rules. If you fail to recharge in accordance with the platform rules and cause property damage, the company will not be held responsible.</span>
                    <span className='block w-full'>4. After the transfer is successful, please upload the payment voucher and wait for 20-30 minutes. If your payment does not arrive for a long time, please contact online customer service.</span>
                </p>
            </form>
            <FooterComponent />
        </section>
    )
}
