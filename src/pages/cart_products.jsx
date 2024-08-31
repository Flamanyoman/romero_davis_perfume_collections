import bgimg from '/imgs/homeimage_desktop.webp'

export default function Cart() {

    return (
        <section>
            <div className={`!bg-[url("${bgimg}")] _bg-cover _bg-center bg-fixed h-[70vh]`}></div>
            <div>
                <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatum natus, magni nulla placeat tempore temporibus rerum vitae explicabo minima animi praesentium quia labore quisquam, qui nostrum eligendi minus quae.</p>
            </div>
        </section>
    )
}