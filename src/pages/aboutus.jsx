import { useState } from 'react';
import { useGoBack } from '../utility/goBack';
// import noList from "/imgs/no.png";

export default function Aboutus() {
  const [error] = useState(false);

  const goBack = useGoBack();

  return (
    <section className='w-full bg-white'>
      <div className='container text-center bg-[#302aaf] text-white font-bold rounded-b sticky top-0 bg_img flex justify-between items-center'>
        <div
          onClick={goBack}
          className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
        >
          &#8249;
        </div>
        <h1 className='py-4'>About Us</h1>
      </div>
      <div
        className={`container flex relative h-[85vh] pt-4 overflow-x-hidden overflow-y-auto ${
          error && "!bg-[url('/imgs/no.png')] bg-no-repeat bg-contain bg-center"
        }`}
      >
        <p className='container'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
          nesciunt commodi accusamus dicta velit sed aliquam laudantium
          necessitatibus ipsa, molestiae, pariatur dolores aperiam hic,
          repellendus fugiat soluta minima labore eveniet ex? Error id
          cupiditate quibusdam saepe molestiae sint blanditiis nostrum accusamus
          expedita doloribus fugiat est, deleniti aut excepturi et cum rerum in
          non optio ab molestias totam nobis commodi placeat. Vel veniam tempora
          consectetur dicta corrupti dolores porro ratione aut accusantium
          molestias explicabo ut nesciunt obcaecati omnis ipsam dolore
          perferendis, suscipit officiis dignissimos. Corporis voluptatibus
          quisquam veniam mollitia commodi, amet ipsa numquam exercitationem
          iusto tenetur repellendus libero eius ullam cumque tempora omnis modi
          vero. Eaque, ipsa repellat. Magnam fuga quas iusto laudantium
          necessitatibus atque? Quidem, possimus quo. Sunt incidunt quas nihil
          porro similique ipsum maiores dolorum optio, itaque numquam
          cupiditate! Magnam incidunt libero voluptates illo minima ipsam
          laboriosam dolore dolor ipsa omnis! Voluptatem natus aut culpa
          assumenda! Sint, quos neque! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consequuntur tempore quod officiis fuga doloremque
          laudantium quis nostrum soluta delectus aspernatur vel, corporis
          impedit! Similique id vel animi labore ratione possimus provident
          expedita odit dolor, dolore distinctio. Quae ad deleniti debitis alias
          earum fuga aperiam quam? Deleniti rerum quod error unde.
        </p>
      </div>
    </section>
  );
}
