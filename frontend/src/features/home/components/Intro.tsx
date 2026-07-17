import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SocialItem {
  icon: IconDefinition;
  label: string;
  href?: string;
  action?: () => void;
  color: string;
}

const Intro: React.FC = () => {
  const [showResume, setShowResume] = useState(false);

  const socialItems: SocialItem[] = [
    {
      icon: faGithub,
      label: 'GitHub',
      href: 'https://github.com/anantl911',
      color: 'hover:text-white hover:border-white hover:bg-white/10',
    },
    {
      icon: faLinkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/anant-chavan-310543251/',
      color: 'hover:text-[#0077b5] hover:border-[#0077b5] hover:bg-[#0077b5]/10',
    },
    {
      icon: faFileAlt,
      label: 'Resume',
      action: () => setShowResume(true),
      color: 'hover:text-[#facd8a] hover:border-[#facd8a] hover:bg-[#facd8a]/10',
    },
  ];

  return (
    <div
      id="user-details"
      className="mt-10 flex flex-col gap-[8vw] items-center justify-center lg:flex-row lg:gap-[4vw] px-4 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="author-description"
        className="text-white italic w-full lg:w-[45vw] flex flex-col gap-6 text-[clamp(14px,1.2vw,18px)] leading-relaxed"
      >
        <p>
          I am Anant Shivdas Chavan, a budding software developer from India. I
          look forward to interesting projects.{' '}
        </p>
        <p>
          This is my personal space and a portfolio site.
          Aside from coding, I like to play video games and I read, I make white board sketches.
          I&apos; plan to use this site to share my experience regarding life, my journey as a SE and some creative works, which I'll outline in future.
        </p>
        {/* <p>
          If you&apos;d like to contribute creative works and/or your thoughts
          feel free to share them. You will be credited. I&apos;d be glad to
          feature your works here, as progress is made on Anant Space{' '}
        </p> */}

        {/* Socials */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
          {socialItems.map((item, idx) => {
            const Wrapper = item.href ? 'a' : 'button';
            const wrapperProps = item.href
              ? {
                  href: item.href,
                  target: '_blank' as const,
                  rel: 'noopener noreferrer',
                }
              : { onClick: item.action };

            return (
              <Wrapper
                key={idx}
                {...wrapperProps}
                className={`relative px-6 py-2.5 rounded-lg border border-gray-700 bg-[#1a2224]/50 backdrop-blur-sm text-gray-400 transition-all duration-300 group overflow-hidden ${item.color}`}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="font-medium tracking-wide text-sm uppercase">
                    {item.label}
                  </span>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />
              </Wrapper>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        id="photo"
        className="relative w-[60vw] max-w-[350px] lg:w-[25vw] aspect-square"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 border-2 border-[#facd8a]/30 rounded-[2rem] rotate-6 transform translate-x-4 translate-y-4 -z-10" />
        <div className="absolute inset-0 bg-[#facd8a]/10 rounded-[2rem] -rotate-3 transform -translate-x-2 -translate-y-2 -z-10 blur-sm" />

        <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-[#facd8a] shadow-[0_0_30px_rgba(250,205,138,0.2)] bg-[#1a2224] relative group">
          <img
            src="./home/anant.webp"
            alt="Anant Shivdas Chavan"
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-2"
          />

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </motion.div>

      {/* Resume Modal - Portal to document.body */}
      {createPortal(
        <AnimatePresence>
          {showResume && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setShowResume(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  mass: 0.5,
                }}
                className="bg-white w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden relative shadow-2xl flex flex-col will-change-transform"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-[#1a2224] text-white p-4 flex justify-between items-center border-b border-[#facd8a] flex-shrink-0">
                  <h2 className="text-xl font-bold text-[#facd8a]">
                    Resume - Anant Shivdas Chavan
                  </h2>
                  <div className="flex gap-4">
                    <a
                      href="/documents/anantresume.pdf"
                      download="Anant_Resume.pdf"
                      className="text-white hover:text-[#facd8a] transition-colors"
                      title="Download PDF"
                    >
                      <FontAwesomeIcon icon={faDownload} size="lg" />
                    </a>
                    <button
                      onClick={() => setShowResume(false)}
                      className="text-white hover:text-red-400 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  </div>
                </div>

                {/* Resume Preview - Image Based for Consistency */}
                <div className="flex-grow bg-gray-900 w-full h-full relative overflow-y-auto flex items-start justify-center p-4 md:p-8">
                  <img
                    src="/documents/anantresume.webp"
                    alt="Resume Preview"
                    className="w-full max-w-[800px] shadow-2xl h-auto block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const sibling = target.nextSibling as HTMLElement | null;
                      if (sibling) sibling.style.display = 'flex';
                    }}
                  />

                  {/* Fallback if Image is Missing */}
                  <div className="absolute inset-0 hidden flex-col items-center justify-center text-center p-6 text-gray-400 bg-[#1a2224] z-0">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      size="5x"
                      className="mb-6 text-gray-600 animate-pulse"
                    />
                    <h3 className="text-2xl font-bold text-gray-200 mb-2">
                      Preview Not Available
                    </h3>
                    <p className="max-w-md mb-6 text-gray-400">
                      For the best experience, please add an image version of
                      your resume named{' '}
                      <code className="text-[#facd8a]">anantresume.webp</code>{' '}
                      to the{' '}
                      <code className="text-gray-300">public/documents</code>{' '}
                      folder.
                    </p>
                    <a
                      href="/documents/anantresume.pdf"
                      download="Anant_Resume.pdf"
                      className="bg-[#facd8a] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#eac085] transition-transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                      <span>Download PDF Resume</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default Intro;
