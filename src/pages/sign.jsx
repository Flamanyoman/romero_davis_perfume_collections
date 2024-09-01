/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import { VscSignIn } from "react-icons/vsc";

export default function SignPage({ isSignIn }) {
    const [random, setRandom] = useState(0);

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    if (random !== 0) console.log(random)

    useEffect(function () {
        setRandom(Math.round(getRandomArbitrary(1000, 9999)))
    }, [isSignIn])

    return (
        <section className="bg-[#0a263a] text-white h-screen flex flex-col justify-center items-center">
            <p className="flex items-center justify-center w-full mb-4 text-3xl">{isSignIn ? <VscSignIn /> : <SiGnuprivacyguard />}</p>
            <h1 className="flex items-center justify-center w-full mb-4 text-2xl">{isSignIn ? "SIGNIN" : "SIGNUP"}</h1>
            <form action="#" className="w-2/4">
                <div className="flex flex-col items-start w-full justiy-center">
                    <label htmlFor="Mobile">Mobile</label>
                    <input type="number" name="Mobile" id="Mobile" placeholder="+234..." className="block w-full p-1 mt-1 mb-3 rounded indent-4 text-black error" />
                </div>
                <div className="flex flex-col items-start w-full justiy-center">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="Password" id="Password" placeholder="******" className="block w-full p-1 mt-1 mb-3 rounded indent-4 text-black" />
                </div>
                {!isSignIn && <>
                    <div className="flex flex-col items-start w-full justiy-center">
                        <label htmlFor="Confirmpassword">Confirm password</label>
                        <input type="password" name="Confirmpassword" id="Confirmpassword" placeholder="******" className="block w-full p-1 mt-1 mb-3 rounded indent-4 text-black" />
                    </div>
                    <div className="flex flex-col items-start w-full justiy-center">
                        <label htmlFor="Invitation_code">Invitation code (option)</label>
                        <input type="text" name="Invitation_code" id="Invitation_code" placeholder="Ze4E88" className="block w-full p-1 mt-1 mb-3 rounded indent-4 text-black" />
                    </div>
                    <div className="flex flex-row items-start w-full gap-1 justiy-between">
                        <div className="flex flex-col items-start w-3/4 justiy-center">
                            <label htmlFor="Verifiaion_code">Verifiaion code</label>
                            <input type="text" name="Verifiaion_code" id="Verifiaion_code" placeholder="????" className="block w-full p-1 mt-1 mb-3 rounded indent-4 text-black" />
                        </div>
                        <p className="self-end h-full w-1/4 text-center font-bold px-1 py-1 mt-1 mb-3 bg-white rounded text-[#302aaf]">{random !== 0 ? random : "????"}</p>
                    </div>
                </>}
                <button className="block px-4 py-1 my-2 bg-white rounded text-[#302aaf] font-bold">Sign</button>
                <p>{isSignIn ? "Don't" : "Already"} have an account, <NavLink to={isSignIn ? "/signup" : "/signin"} className="underline">{isSignIn ? "Signup" : "Signin"}</NavLink>.</p>
            </form>
        </section>
    );
}