import FooterContact from './FooterContact';
import ContactForm from '@/features/RelayCRT/components/ContactForm';

const Footer: React.FC = () => {
  return (
    <footer className="z-50" id="section-contact">
      <div
        id="footer-container"
        className="md:min-h-[80px] bg-black w-full md:pt-14 pb-4 select-none"
      >
        <div className="pt-20">
          <div id="contact-header" className="flex justify-center">
            <h2 className="text-[#facd8a] text-[clamp(24px,2.4vw,30px)]">
              Let
              <span className="border-b-2 border-[#facd8a] pb-4">
                &apos;s ta
              </span>
              lk!
            </h2>
          </div>

          <ContactForm />

          <FooterContact />
        </div>

        <div className="w-full">
          <div className="w-full flex justify-center">
            <div className="h-[1px] w-[70%] bg-gray-500" />
          </div>
          <p className="text-white text-center text-[2vw] md:text-xs italic pt-4 w-full">
            Inspired by SSR Space, a space dedicated to Shri Sushant Singh Rajput 💫💐
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
