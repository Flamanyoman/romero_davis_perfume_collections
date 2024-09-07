import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { SiGnuprivacyguard } from 'react-icons/si';
import { VscSignIn } from 'react-icons/vsc';
import axios from 'axios';
import { baseUrl } from '../../constants/constants';

export default function SignPage({ isSignIn }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
    invitedBy: searchParams.get('By') || '',
    verificationCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [random, setRandom] = useState(generateRandomCode());

  useEffect(() => {
    if (!isSignIn) setRandom(generateRandomCode());
  }, [isSignIn]);

  function generateRandomCode() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  const validate = () => {
    const newErrors = {};

    if (!/^0[789][01]\d{8}$/.test(formData.mobile)) {
      newErrors.mobile = 'Write 11 digit phone number';
    }

    if (!/^(?=.*\d).{4,}$/.test(formData.password)) {
      newErrors.password =
        'Password must be more than 3 characters and contain a number';
    }

    if (!isSignIn) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (formData.invitedBy && formData.invitedBy.length < 10) {
        newErrors.invitedBy = 'Type in a valid invite code';
      }

      if (parseInt(formData.verificationCode) !== random) {
        newErrors.verificationCode = 'Verification code does not match';
        setRandom(generateRandomCode());
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const endpoint = isSignIn ? '/signin' : '/signup';
      const payload = isSignIn
        ? { phoneNum: formData.mobile, password: formData.password }
        : {
            phoneNum: formData.mobile,
            password: formData.password,
            invitedBy: formData.invitedBy.replace(/^ref112/, ''),
          };

      const { data } = await axios.post(`${baseUrl}${endpoint}`, payload);

      window.localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      handleErrors(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (message) => {
    const errorMap = {
      'Phone number not found': 'mobile',
      'User already exists': 'mobile',
      'Invalid password': 'password',
      'Wrong referral code': 'invitedBy',
    };

    const field = Object.keys(errorMap).find((key) => message.includes(key));
    if (field) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorMap[field]]: field,
      }));
    } else {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section className='bg-[#0a263a] text-white h-screen flex flex-col justify-center items-center'>
      <p className='flex items-center justify-center w-full mb-4 text-3xl'>
        {isSignIn ? <VscSignIn /> : <SiGnuprivacyguard />}
      </p>
      <h1 className='flex items-center justify-center w-full mb-4 text-2xl'>
        {isSignIn ? 'SIGNIN' : 'SIGNUP'}
      </h1>
      <form className='w-2/4' onSubmit={handleSubmit}>
        <InputField
          id='mobile'
          name='mobile'
          type='number'
          placeholder='+234...'
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
        />
        <InputField
          id='password'
          name='password'
          type='password'
          placeholder='******'
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        {!isSignIn && (
          <>
            <InputField
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='******'
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <InputField
              id='invitedBy'
              name='invitedBy'
              type='text'
              placeholder='Ze4E88'
              value={formData.invitedBy}
              onChange={handleChange}
              error={errors.invitedBy}
            />
            <div className='flex flex-row items-center w-full gap-1 justify-between'>
              <InputField
                id='verificationCode'
                name='verificationCode'
                type='text'
                placeholder='????'
                value={formData.verificationCode}
                onChange={handleChange}
                error={errors.verificationCode}
              />
              <span className='w-1/4 p-1 text-center bg-white text-blue-500 rounded'>
                {random}
              </span>
            </div>
          </>
        )}
        <div className='flex flex-col items-start w-full justify-center'>
          <button
            type='submit'
            className='bg-[#1a5b82] text-black rounded w-full p-2'
            disabled={loading}
          >
            {loading ? '...' : isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
      <p className='mt-4 text-center text-sm'>
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}
        <NavLink
          to={isSignIn ? '/signup' : '/signin'}
          className='text-blue-500 font-bold ml-1'
        >
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </NavLink>
      </p>
    </section>
  );
}

const InputField = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className='flex flex-col items-start w-full justify-center'>
    <label htmlFor={id}>{placeholder}</label>
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className='block w-full p-1 mt-1 mb-3 rounded indent-4 text-black'
      value={value}
      onChange={onChange}
    />
    {error && <span className='text-red-500'>{error}</span>}
  </div>
);
