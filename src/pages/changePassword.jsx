import { useState } from "react";
import { NavLink } from "react-router-dom";
// import noList from "/imgs/no.png";

export default function ChangePassword() {
  const [error] = useState(true);
  const [inputEntry, setInputEntry] = useState("");
  const [inputEntry2, setInputEntry2] = useState("");
  const [inputEntry3, setInputEntry3] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputEntry(value);
  };
  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setInputEntry2(value);
  };
  const handleInputChange3 = (e) => {
    const value = e.target.value;
    setInputEntry3(value);
  };

  return (
    <section className="w-full bg-white">
      <div className="container text-center bg-[#302aaf] text-white font-bold rounded-b sticky top-0 bg_img">
        <NavLink
          to="/profile"
          className="-mt-2 text-4xl font-bold _hover:text-[#302aaf] absolute left-4 top-2"
        >
          &#8249;
        </NavLink>
        <h1 className="py-4">Change password</h1>
      </div>
      <div
        className={`container flex relative h-[85vh] pt-4 overflow-x-hidden overflow-y-auto ${
          error && ""
        }`}
      >
        <form className="w-full pt-8">
          <div>
            <p className="text-xl font-bold text-center text-[#302aaf]">Current Password</p>
            <label
              htmlFor="enterRechargeAmount"
              className='relative block w-full mt-4 h-fit before:flex before:justify-center before:items-center before:h-full before:absolute before:left-0 before:text-[gray] before:pl-4 border-[1px] border-[gray] rounded'
            >
              <input
                type="text"
                onChange={handleInputChange}
                id="enterRechargeAmount"
                placeholder="Enter recharge amount"
                value={inputEntry}
                className="block w-full p-2 indent-8 outline-[#302aaf]"
              />
            </label>
          </div>
          <div>
          <p className="text-xl font-bold text-center text-[#302aaf]">Password</p>
            <label
              htmlFor="enterRechargeAmount"
              className='relative block w-full mt-4 h-fit before:flex before:justify-center before:items-center before:h-full before:absolute before:left-0 before:text-[gray] before:pl-4 border-[1px] border-[gray] rounded'
            >
              <input
                type="text"
                onChange={handleInputChange2}
                id="enterRechargeAmount"
                placeholder="Enter recharge amount"
                value={inputEntry2}
                className="block w-full p-2 indent-8 outline-[#302aaf]"
              />
            </label>
          </div>
          <div>
          <p className="text-xl font-bold text-center text-[#302aaf]">Confirm Password</p>
            <label
              htmlFor="enterRechargeAmount"
              className='relative block w-full mt-4 h-fit before:flex before:justify-center before:items-center before:h-full before:absolute before:left-0 before:text-[gray] before:pl-4 border-[1px] border-[gray] rounded'
            >
              <input
                type="text"
                onChange={handleInputChange3}
                id="enterRechargeAmount"
                placeholder="Enter recharge amount"
                value={inputEntry3}
                className="block w-full p-2 indent-8 outline-[#302aaf]"
              />
            </label>
          </div>

          <button className='block w-full bg-[#302aaf] text-white font-bold text-lg py-3 rounded mt-4 bg_img'>Submit</button>

        </form>
      </div>
    </section>
  );
}
