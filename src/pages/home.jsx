import React, { useRef } from 'react';
import HeaderComponent from '../components/header/header';
import FooterComponent from '../components/footer/footer';
import ProductsComponents from '../components/products/items';
import stars from '/imgs/stars_rating_black.svg';
import safesecure from '/imgs/safesecure.svg';
import trusted from '/imgs/trusted.svg';
import fastfreeshipping from '/imgs/fastfreeshipping.svg';

export default function Homepage() {
  // Create a ref for the ProductsComponents section
  const productsRef = useRef(null);

  

  return (
    <section className='h-screen bg-slate-400'>
      <HeaderComponent />
      <main className='w-full'>
        <p className='flex items-center justify-center w-full p-3 bg-white'>
          <img src={stars} alt={stars} className='mr-3' /> OVER 20 THOUSAND
          CUSTOMERS
        </p>

        <div className='banner h-[50vh]'>
          <div className='w-full h-full bg-black bg-opacity-25 flex flex-col justify-center items-center'>
            <h1 className='font-sans text-3xl font-bold'>Shop Summer Deals</h1>
            <p className='w-3/4 mt-6 text-white text-[1.1rem]'>
              At FragranceX.com, our mission is to provide you with the largest
              selection of perfumes and colognes at the lowest prices.
            </p>
          </div>
        </div>

        <div className='w-full pt-8 bg-white'>
          <button className='block container bg-[#302aaf] bg_img text-white text-lg font-bold py-4 rounded'>
            SHOP ALL PERFUMES{' '}
          </button>
          <div className='w-full bg-[#302aaf] bg_img'>
            <marquee className='block full mx-auto mt-8 px-12  text-white text-lg font-bold py-4'>
              0815*****297, 0803*****146, 0907*****485, 0701*****173,
              0907*****827, 0813*****453, 0813*****042, 0815*****384,
              0807*****264, 0902*****169, 0810*****427, 0705*****656
              0813*****243, 0705*****639, 0813*****656, 0808*****835,
              0816*****811, 0803*****947, 0816*****618, 0706*****017,
              0901*****537, 0705*****790, 0816*****339, 0708*****768,
              0902*****167, 0706*****940, 0906*****299, 0810*****257,
              0703*****985, 0814*****767
            </marquee>
          </div>
        </div>
        <div className='flex items-center justify-between bg-[#f5f5f5] py-8'>
          <div className='flex flex-col items-center justify-between'>
            <img
              src={safesecure}
              alt={safesecure}
              className='block w-[50px] aspect-auto'
            />
            <p className='font-[500] text-black w-3/4 mx-auto mt-2 text-center'>
              Safe & Secure Checkout
            </p>
          </div>
          <div className='flex flex-col items-center justify-between'>
            <img
              src={trusted}
              alt={trusted}
              className='block w-[50px] aspect-auto'
            />
            <p className='font-[500] text-black w-3/4 mx-auto mt-2 text-center'>
              100% Authentic Fragrances
            </p>
          </div>
          <div className='flex flex-col items-center justify-between'>
            <img
              src={fastfreeshipping}
              alt={fastfreeshipping}
              className='block w-[50px] aspect-auto'
            />
            <p className='font-[500] text-black w-3/4 mx-auto mt-2 text-center'>
              Items Ship Same Day
            </p>
          </div>
        </div>
        {/* Pass the ref to ProductsComponents */}
        <div ref={productsRef}>
          <ProductsComponents />
        </div>
      </main>
      <FooterComponent />
    </section>
  );
}
