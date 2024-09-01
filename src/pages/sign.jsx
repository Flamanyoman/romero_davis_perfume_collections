/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SiGnuprivacyguard } from 'react-icons/si';
import { VscSignIn } from 'react-icons/vsc';

export default function SignPage({ isSignIn }) {
  const [random, setRandom] = useState(0);
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    verificationCode: '',
  });

  const [errors, setErrors] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    verificationCode: '',
  });

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  useEffect(() => {
    if (isSignIn) setRandom(getRandomArbitrary(1000, 9999));
  }, [isSignIn]);

  const validate = () => {
    const newErrors = {};

    // Mobile number validation
    const mobileRegex = /^0[789][01]\d{8}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Write 11 digit phone number';
    }

    // Password validation
    const passwordRegex = /^(?=.*\d).{4,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be more than 3 characters and contain a number';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Invitation code validation
    if (formData.inviteCode && formData.inviteCode.length !== 6) {
      newErrors.inviteCode = 'Type in a valid invite code';
    }

    // Verification code validation
    if (parseInt(formData.verificationCode) !== random) {
      newErrors.verificationCode = 'Verification code does not match';
      setRandom(getRandomArbitrary(1000, 9999)); // Change the random number if it doesn't match
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error for the field being edited
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Form submission logic here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <section className='bg-[#302aaf] text-white h-screen flex flex-col justify-center items-center'>
      <p className='flex items-center justify-center w-full mb-4 text-3xl'>
        {isSignIn ? <VscSignIn /> : <SiGnuprivacyguard />}
      </p>
      <h1 className='flex items-center justify-center w-full mb-4 text-2xl'>
        {isSignIn ? 'SIGNIN' : 'SIGNUP'}
      </h1>
      <form action='#' className='w-2/4' onSubmit={handleSubmit}>
        <div className='flex flex-col items-start w-full justify-center'>
          <label htmlFor='mobile'>Mobile</label>
          <input
            type='number'
            name='mobile'
            id='mobile'
            placeholder='+234...'
            className='block w-full p-1 mt-1 mb-3 rounded indent-4'
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && (
            <span className='text-red-500'>{errors.mobile}</span>
          )}
        </div>

        <div className='flex flex-col items-start w-full justify-center'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='******'
            className='block w-full p-1 mt-1 mb-3 rounded indent-4'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className='text-red-500'>{errors.password}</span>
          )}
        </div>

        {!isSignIn && (
          <>
            <div className='flex flex-col items-start w-full justify-center'>
              <label htmlFor='confirmPassword'>Confirm password</label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                placeholder='******'
                className='block w-full p-1 mt-1 mb-3 rounded indent-4'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className='text-red-500'>{errors.confirmPassword}</span>
              )}
            </div>

            <div className='flex flex-col items-start w-full justify-center'>
              <label htmlFor='inviteCode'>Invitation code (optional)</label>
              <input
                type='text'
                name='inviteCode'
                id='inviteCode'
                placeholder='Ze4E88'
                className='block w-full p-1 mt-1 mb-3 rounded indent-4'
                value={formData.inviteCode}
                onChange={handleChange}
              />
              {errors.inviteCode && (
                <span className='text-red-500'>{errors.inviteCode}</span>
              )}
            </div>

            <div className='flex flex-row items-start w-full gap-1 justify-between'>
              <div className='flex flex-col items-start w-3/4 justify-center'>
                <label htmlFor='verificationCode'>Verification code</label>
                <input
                  type='text'
                  name='verificationCode'
                  id='verificationCode'
                  placeholder='????'
                  className='block w-full p-1 mt-1 mb-3 rounded indent-4'
                  value={formData.verificationCode}
                  onChange={handleChange}
                />
                {errors.verificationCode && (
                  <span className='text-red-500'>
                    {errors.verificationCode}
                  </span>
                )}
              </div>
              <p className='self-end h-full w-1/4 text-center font-bold px-1 py-1 mt-1 mb-3 bg-white rounded text-[#302aaf]'>
                {random !== 0 ? random : '????'}
              </p>
            </div>
          </>
        )}

        <button className='block px-4 py-1 my-2 bg-white rounded text-[#302aaf] font-bold'>
          Sign
        </button>
        <p>
          {isSignIn ? "Don't" : 'Already'} have an account,{' '}
          <NavLink to={isSignIn ? '/signup' : '/signin'} className='underline'>
            {isSignIn ? 'Signup' : 'Signin'}
          </NavLink>
          .
        </p>
      </form>
    </section>
  );
}
