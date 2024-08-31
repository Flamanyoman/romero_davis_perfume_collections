import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import item1 from '/imgs/74036m.webp';
import item2 from '/imgs/67930w.webp';
import item3 from '/imgs/61100w.webp';
import item4 from '/imgs/884w.webp';

export default function ProductsComponents() {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    const buyItem = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const goToRecharge = () => {
        navigate("/recharge");
    }

    return (
        <div className='bg-[rgba(191,198,254,.25)] p-4 !pb-[100px]'>
            <h2 className='font-serif text-3xl text-[#21165e] text-center py-8'>Top Fragrance Brands</h2>

            <div className='p-4 topBrands'>
                {/* Item List */}
                {[{ name: "Armaf", price: 40000, maturityDay: 41, dailyIn: 5000, totalRev: 745000, img: item1 },
                { name: "fragrance1", price: 2000, maturityDay: 41, dailyIn: 5000, totalRev: 745000, img: item2 },
                { name: "fragrance2", price: 2000, maturityDay: 41, dailyIn: 5000, totalRev: 745000, img: item3 },
                { name: "fragrance3", price: 2000, maturityDay: 41, dailyIn: 5000, totalRev: 745000, img: item4 }]
                    .map((item, index) => (
                        <div key={index} className="relative rounded item">
                            <button
                                onClick={() => buyItem(item)}
                                className='block px-2 py-1 w-fit bg-[#302aaf] bg_img text-white rounded font-bold absolute top-1 right-1'>
                                Buy
                            </button>
                            <img src={item.img} alt={item.name} />
                            <div className="text-center">
                                <h6 className='font-bold'>{item.name}</h6>
                                <p className='text-[.8rem]'>Price: &#8358; <span className='font-bold'>{item.price}</span></p>
                                <p className='text-[.8rem]'>Maturity days: <span className='font-bold'>{item.maturityDay}</span></p>
                                <p className='text-[.8rem]'>Daily income: &#8358;<span className='font-bold'>{item.dailyIn}</span></p>
                                <p className='text-[.8rem]'>Total revenue: &#8358;<span className='font-bold'>{item.totalRev}</span></p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Modal */}
            {selectedItem && (
                <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen blurBg'>
                    <div className='p-4 bg-white rounded'>
                        <h3 className='text-xl font-bold text-center'>Buy this Item</h3>
                        <div className="relative text-center rounded">
                            <img src={selectedItem.img} alt={selectedItem.name} className='block w-[7rem] aspect-auto mx-auto' />
                            <div className="text-center">
                                <h6 className='font-bold'>{selectedItem.name}</h6>
                                <p className='text-[.8rem]'>Price: &#8358; <span className='font-bold'>{selectedItem.price}</span></p>
                                <p className='text-[.8rem]'>Maturity days: <span className='font-bold'>{selectedItem.maturityDay}</span></p>
                                <p className='text-[.8rem]'>Daily income: &#8358;<span className='font-bold'>{selectedItem.dailyIn}</span></p>
                                <p className='text-[.8rem]'>Total revenue: &#8358;<span className='font-bold'>{selectedItem.totalRev}</span></p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button onClick={closeModal} className='px-4 py-2 mr-2 bg-gray-300 rounded'>Cancel</button>
                            <button onClick={goToRecharge} className='px-4 py-2 text-white bg-blue-500 rounded'>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
