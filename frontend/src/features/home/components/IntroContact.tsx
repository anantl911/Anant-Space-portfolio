import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { contactInfo } from '@/data/contactInfo';

const IntroContact: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<'phone' | 'email' | null>(null);

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-sm text-gray-300 font-sans tracking-wide mt-2">
      {/* Phone Contact */}
      <div className="flex items-center gap-2 group">
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
        <button
          onClick={() => handleCopy(contactInfo.phone, 'phone')}
          className="relative text-xs text-gray-500 hover:text-[#facd8a] transition-colors p-1"
          title="Copy Phone Number"
          aria-label="Copy Phone Number"
        >
          <FontAwesomeIcon
            icon={copiedItem === 'phone' ? faCheck : faCopy}
            className={copiedItem === 'phone' ? 'text-green-400' : ''}
          />
          {copiedItem === 'phone' && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#facd8a] text-black text-[10px] font-semibold px-1.5 py-0.5 rounded shadow z-20 whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>

      <span className="text-gray-600 hidden sm:inline">•</span>

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
        <button
          onClick={() => handleCopy(contactInfo.email, 'email')}
          className="relative text-xs text-gray-500 hover:text-[#facd8a] transition-colors p-1"
          title="Copy Email Address"
          aria-label="Copy Email Address"
        >
          <FontAwesomeIcon
            icon={copiedItem === 'email' ? faCheck : faCopy}
            className={copiedItem === 'email' ? 'text-green-400' : ''}
          />
          {copiedItem === 'email' && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#facd8a] text-black text-[10px] font-semibold px-1.5 py-0.5 rounded shadow z-20 whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default IntroContact;
