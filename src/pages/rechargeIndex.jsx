import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";

export default function RechargeIndex() {
    const [secondsRemaining, setSecondsRemaining] = useState(500); // Initialize with 500 seconds
    const navigate = useNavigate();

    const havePaid = () => {
        navigate('/recharge_history');
    }

    useEffect(() => {
        if (secondsRemaining > 0) {
            const timerId = setInterval(() => {
                setSecondsRemaining(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [secondsRemaining]);

    return (
        <section className="bg-[#ebebebbf] h-screen">
            <div className="w-full _bg-[#ebebebbf] bg-transparent">
                <div className="container relative pt-10">
                    <div className="container mt-8 h-[25vh] bg-[#302aaf] rounded-t-md flex flex-col justify-center items-center relative">
                        <span className="counter absolute top-[-2rem] right-2 text-[#302aaf] font-bold">{secondsRemaining}</span>
                        <span className="absolute w-[2.5rem] aspect-square bg-white top-[-1.25rem] rounded-[1.25rem] flex justify-center items-center scale-150 border-2 border-[#302aaf] text-[#302aaf] text-2xl"><TbCurrencyNaira /></span>
                        <p className="amount text-white font-bold text-3xl flex justify-center items-center"><span className="text-4xl"><TbCurrencyNaira /></span><span>984,000,000.00</span></p>
                        <p className="absolute bottom-0 left-0 right-0 bg-[#1b1672] text-white flex justify-start gap-3 items-center px-4 py-2 text-sm"><span>Amount</span>
                            <span className="amount flex justify-start items-center"><TbCurrencyNaira /><span>984,000,000.00</span></span>
                        </p>
                    </div>
                    <p className="container py-4 text-sm"><sup className="text-[red]">*</sup>Make trasfer to the below account <span className="text-[red]">(Compulsory)</span></p>
                </div>
            </div>
            <div className="bg-white shadow-md">
                <div className="container">
                    <div className="container py-2">
                        <span className="flex justify-between items-center text-sm my-4 w-full">
                            <span>Account Number</span>
                            <span className="flex justify-between items-center gap-4">
                                <span>5533477978854</span>
                                <span className="block py-[0.2rem] px-2 rounded cursor-pointer bg-[red] text-white">copy</span>
                            </span>
                        </span>
                        <span className="flex justify-between items-center text-sm my-4 w-full">
                            <span>Bank Name</span>
                            <span className="flex justify-between items-center gap-4">
                                <span>9PSB Bank</span>
                                <span className="block py-[0.2rem] px-2 rounded cursor-pointer bg-[red] text-white">copy</span>
                            </span>
                        </span>
                        <span className="flex justify-between items-center text-sm my-4 w-full">
                            <span>Account Name</span>
                            <span className="flex justify-between items-center gap-4">
                                <span>Premium Payment - SMART PAYS</span>
                                <span className="block py-[0.2rem] px-2 rounded cursor-pointer bg-[red] text-white">copy</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="container mt-8">
                <div className="container">
                    <p className="text-sm text-center">This transaction is automatic, your payment will be confirmed within 10 minutes.</p>
                    <button onClick={havePaid} className="block w-full py-2 bg-[#302aaf] text-white rounded mt-2 font-bold">I Have Paid</button>
                </div>
            </div>
        </section>
    )
}