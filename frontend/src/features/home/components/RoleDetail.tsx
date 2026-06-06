import TechStackBox from './TechStackBox';
import { motion } from 'framer-motion';

const RoleDetail: React.FC = () => {
  return (
    <div
      id="author-workstack"
      className="mt-6 px-4 w-full flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-7xl mx-auto"
    >
      {/* Left Col: Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-100px' }}
        id="workstack-description"
        className="flex-1 flex flex-col justify-center text-gray-300 italic text-[clamp(14px,1.1vw,18px)] leading-relaxed bg-[#1a2224]/30 p-6 rounded-xl border-l-4 border-[#facd8a]"
      >
        <p className="mb-6">
          <span className="text-[#facd8a] text-xl font-bold not-italic block mb-2">
            My Journey
          </span>
          During college, hands-on work across robotics, desktop applications,
          and web development helped me build a solid foundation in shipping
          maintainable, robust software.
        </p>
        <p>
          I focus on building product-centric full-stack applications using
          React and Next.js, with backend APIs in Node.js and Express,
          supported by CI/CD workflows using Docker and GitHub Actions.
        </p>
      </motion.div>

      {/* Right Col: Tech Stack */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
        className="flex-1 w-full"
      >
        <TechStackBox />
      </motion.div>
    </div>
  );
};

export default RoleDetail;
