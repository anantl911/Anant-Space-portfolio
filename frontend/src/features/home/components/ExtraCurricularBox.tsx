import extracurriculars from '@/data/extraCurricular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptopCode,
  faRobot,
  faHandsHelping,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

const iconMap: Record<string, IconDefinition> = {
  faLaptopCode,
  faRobot,
  faHandsHelping,
  faTrophy,
};

const ExtraCurricularBox: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {extracurriculars.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="bg-[#1a2224]/80 backdrop-blur-md border border-gray-700 p-5 rounded-xl hover:border-[#facd8a]/50 transition-colors duration-300 flex gap-4 items-start shadow-lg group"
        >
          <div className="bg-[#facd8a]/10 p-3 rounded-lg text-[#facd8a] group-hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon
              icon={iconMap[item.icon] || faTrophy}
              size="lg"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#facd8a] transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExtraCurricularBox;
