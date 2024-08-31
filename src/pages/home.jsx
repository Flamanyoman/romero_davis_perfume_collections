import HeaderComponent from '../components/header/header'
import FooterComponent from '../components/footer/footer'
import ProductsComponents from '../components/products/items'
import stars from '/imgs/stars_rating_black.svg'
import safesecure from '/imgs/safesecure.svg'
import trusted from '/imgs/trusted.svg'
import fastfreeshipping from '/imgs/fastfreeshipping.svg'

export default function Homepage() {

    return (
        <section className="h-screen bg-slate-400">
            <HeaderComponent />
            <main className="w-full">
                <p className='flex items-center justify-center w-full p-3 bg-white'><img src={stars} alt={stars} className="mr-3" /> OVER 20 MILLION CUSTOMERS</p>
                <div className="banner h-[70vh] flex flex-col justify-start align-center pt-10">
                    <h1 className="mx-auto font-sans text-3xl font-bold w-fit">Shop Summer Deals</h1>
                    <p className="w-3/4 mx-auto mt-6 _text-gray-600 text-[1.1rem]">At FragranceX.com, our mission is to provide you with the largest selection of perfumes and colognes at the lowest prices.</p>
                </div>
                <div className='w-full my-8 bg-white'>
                    <button className='block container bg-[#302aaf] bg_img text-white text-lg font-bold py-4 rounded'>SHOP ALL PERFUMES </button>
                    <div className='w-full bg-[#302aaf] bg_img'>
                        <marquee className='block w-3/4 mx-auto mt-8 px-12  text-white text-lg font-bold py-4'>Free Shipping Over $35</marquee>
                    </div>
                </div>
                <div className='flex items-center justify-between bg-[#f5f5f5] py-8'>
                    <div className='flex flex-col items-center justify-between'>
                        <img src={safesecure} alt={safesecure}
                            className='block w-[50px] aspect-auto' />
                        <p className='font-[500] text-black w-3/4 mx-auto mt-2 text-center'>Safe & Secure
                            Checkout</p>
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <img src={trusted} alt={trusted}
                            className='block w-[50px] aspect-auto' />
                        <p className='font-[500] text-black w-3/4 mx-auto mt-2 text-center'>100% Authentic
                            Fragrances</p>
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <img src={fastfreeshipping} alt={fastfreeshipping}
                            className='block w-[50px] aspect-auto' />
                        <p className='font-[500] text-black w-3/4 mx-auto mt-2 text-center'>Items Ship
                            Same Day</p>
                    </div>
                </div>
                <ProductsComponents />
            </main>
            <FooterComponent />
        </section>
    );
}