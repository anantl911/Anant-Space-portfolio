import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { contactInfo } from '@/data/contactInfo';

const FooterContact: React.FC = () => {

  return (
    <div className="flex flex-col items-center gap-2 pb-5 select-none">

      <div className="flex items-center gap-2">
        <div className="h-[1px] min-w-30 bg-[#facd8a]" />
        <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">
          OR CONTACT AT
        </span>
        <div className="h-[1px] min-w-30 bg-[#facd8a]" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-300 tracking-wide font-sans">

        {/* Email Contact */}
        <div className="flex items-center gap-2 group">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-[#facd8a] text-xs transition-transform duration-300 group-hover:scale-110"
          />
          <a
            href={`mailto:${contactInfo.email}`}
            className="hover:text-[#facd8a] transition-colors border-b border-transparent hover:border-[#facd8a]/50 pb-0.5"
            title="Email Anant"
          >
            {contactInfo.email}
          </a>
        </div>

        <span className="text-gray-700 hidden sm:inline">•</span>

        {/* Phone Contact */}
        <div className="flex items-center gap-1 group">
          <FontAwesomeIcon
            icon={faPhone}
            className="text-[#facd8a] text-xs transition-transform duration-300 group-hover:scale-110"
          />
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="hover:text-[#facd8a] transition-colors border-b border-transparent hover:border-[#facd8a]/50 pb-0.5"
            title="Call Anant"
          >
            {contactInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
