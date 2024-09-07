import FooterComponent from '../components/footer/footer';
import { NavLink } from 'react-router-dom';
import { BsTelegram } from 'react-icons/bs';
import { BsWhatsapp } from 'react-icons/bs';
import { useGoBack } from '../utility/goBack';

export default function SendReceipt() {
  const goBack = useGoBack();
  return (
    <section className='relative w-full min-h-screen'>
      <div className={`bg_img bg-cover bg-left-top bg-fixed h-[40vh]`}>
        <div className='container flex flex-col items-center justify-between !text-[white] !font-bold h-full pt-4 pb-2'>
          <div className='container flex items-center justify-between'>
            <div
              onClick={goBack}
              className='text-4xl font-bold hover:text-[#302aaf] cursor-pointer'
            >
              &#8249;
            </div>

            <h4>Customer service</h4>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-4xl'>09:00-18:00</span>
            <p to='/send_receipt' className='block px-4 py-2 mt-2 rounded'>
              Customer service time online
            </p>
          </div>
          <p className='container'>
            Send complains, questions and bank transaction reciepts to private
            support chats only so you can be attended to
          </p>
        </div>
      </div>
      <div className='container min-h-[20vh] py-4 flex flex-wrap gap-2 !pb-[100px]'>
        <nav className='container flex flex-col items-center justify-between w-full gap-2'>
          <NavLink
            className='flex justify-between items-center w-full bg_img text-white p-4 rounded'
            onClick={() => window.open('https://t.me/+2349127658161', '_blank')}
          >
            <span className='text-2xl'>
              <BsTelegram />
            </span>
            <span>Telegram Support</span>
            <span className='-mt-2 text-xl font-bold text-white scale-150'>
              &#8250;
            </span>
          </NavLink>

          <NavLink
            className='flex justify-between items-center w-full bg_img text-white p-4 rounded'
            onClick={() => window.open('https://wa.me/2349127658161', '_blank')}
          >
            <span className='text-2xl'>
              <BsWhatsapp />
            </span>
            <span>WhatsApp Support</span>
            <span className='-mt-2 text-xl font-bold text-white scale-150'>
              &#8250;
            </span>
          </NavLink>

          <NavLink
            className='flex justify-between items-center w-full bg_img text-white p-4 rounded'
            onClick={() =>
              window.open('https://t.me/+GZXVlPl4YoM4MDM0', '_blank')
            }
          >
            <span className='text-2xl'>
              <BsTelegram />
            </span>
            <span>Telegram Channel</span>
            <span className='-mt-2 text-xl font-bold text-white scale-150'>
              &#8250;
            </span>
          </NavLink>

          <NavLink
            className='flex justify-between items-center w-full bg_img text-white p-4 rounded'
            onClick={() =>
              window.open('https://t.me/+55Q6bokdEukzNTdk', '_blank')
            }
          >
            <span className='text-2xl'>
              <BsTelegram />
            </span>
            <span>Telegram Group</span>
            <span className='-mt-2 text-xl font-bold text-white scale-150'>
              &#8250;
            </span>
          </NavLink>
        </nav>
        <p className='container bg_img p-3 rounded text-white text-[1rem] mt-3'>
          <span className='block w-full'>
            1. If you have any questions about our platform, please contact our
            online customer service and he will answer all your questions.
          </span>
          <br />
          <span className='block w-full'>
            2. If our online customer service does not respond to your message
            in time, please wait patiently. This is because there are too many
            messages. Our online customer service will reply to your message as
            soon as possible. Thank you for your understanding and support!
          </span>
          <br />
          <span className='block w-full'>
            3. Official personnel will not ask you for your login password,
            please pay attention to account security.
          </span>
        </p>
      </div>
      <FooterComponent />
    </section>
  );
}
