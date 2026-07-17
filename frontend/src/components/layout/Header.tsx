import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import navLinks from '@/data/navLinks';
import type { HeaderProps } from '@/types/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC<HeaderProps> = ({ anantSpaceLogo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const populateList = (index: number, isMobile = false) => {
    return navLinks[index].map((link) => {
      const linkName = link === 'Paintings' ? 'Art' : undefined;
      return (
        <li
          className={
            isMobile
              ? 'w-full text-center border-b border-gray-800/50 py-4 hover:bg-white/5 transition-colors'
              : 'hover:border-b-2 hover:border-[#facd8a] pb-6'
          }
          key={link.toLowerCase()}
        >
          <Link 
            to={linkName ? linkName : link} 
            className={isMobile ? 'block w-full' : 'px-6'}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            {link.toUpperCase()}
          </Link>
        </li>
      );
    });
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        id="container"
        className="relative z-20 flex justify-between h-16 md:h-[6vw] bg-center bg-[linear-gradient(rgba(26,34,36,0.8),rgba(26,34,36,0.8)),url(/deepdarkstarrysky.webp)] text-[#facd8a] px-4 md:px-10 bg-[length:100%] md:bg-[length:60%]"
      >
        {/* Mobile View */}
        <div className="md:hidden flex justify-between items-center w-full">
          <div className="w-24 h-24 relative top-5 right-6">
            <img
              src={anantSpaceLogo}
              className="bg-center bg-[linear-gradient(rgba(26,34,36,0.8),rgba(26,34,36,0.8)),url(/deepdarkstarrysky.webp)] rounded-full select-none w-full h-full object-cover relative"
              alt="Anant's Space Logo"
            />
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#facd8a] p-2 transition-colors"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="xl" />
          </button>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex justify-center w-full gap-[20vw]">
          <div
            id="anant-space-logo"
            className="absolute left-1/2 transform -translate-x-1/2 w-[8vw]"
          >
            <img
              src={anantSpaceLogo}
              className="bg-center bg-[linear-gradient(rgba(26,34,36,0.8),rgba(26,34,36,0.8)),url(/deepdarkstarrysky.webp)] rounded-full select-none"
              alt="Anant's Space Logo"
            />
          </div>

          <div className="flex justify-between text-[1.1vw] mt-[2vw] gap-[16vw]">
            <div
              id="nav-links-1"
              className="relative left-[4.5vw] select-none"
            >
              <ul className="list-none flex gap-2">{populateList(0)}</ul>
            </div>

            <div id="nav-links-2">
              <ul className="list-none relative right-[4.5vw] flex gap-2 select-none">
                {populateList(1)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-center bg-[linear-gradient(rgba(26,34,36,0.8),rgba(26,34,36,0.8)),url(/deepdarkstarrysky.webp)] overflow-hidden z-10"
          >
            <ul className="flex flex-col items-center py-2 text-[#facd8a] text-lg font-medium tracking-widest">
              {populateList(0, true)}
              {populateList(1, true)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
