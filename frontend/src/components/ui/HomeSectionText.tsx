import { motion } from 'framer-motion';
import type { HomeSectionTextProps } from '@/types/components';

const HomeSectionText: React.FC<HomeSectionTextProps> = ({
  sectionID,
  textClass,
  sectionText,
}) => {
  const combinedClass = `text-[#facd8a] ${textClass} text-center`;

  return (
    <div
      id={sectionID}
      className="flex justify-center py-10 select-none overflow-hidden"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-50px' }}
        className={combinedClass}
      >
        {sectionText}
      </motion.h1>
    </div>
  );
};

export default HomeSectionText;
