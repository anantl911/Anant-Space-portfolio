import education from '@/data/education';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faSchool,
  faCalendarAlt,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const EducationBox: React.FC = () => {
  return (
    <div id="education-box" className="w-full max-w-4xl mx-auto px-4">
      <div className="relative border-l-2 border-gray-700 ml-3 md:ml-6 space-y-12 my-10">
        {education.map((edu, index) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-12"
          >
            {/* Dot indicator */}
            <span className="absolute -left-[9px] md:-left-[11px] top-0 bg-[#1a2224] border-4 border-[#facd8a] w-5 h-5 md:w-6 md:h-6 rounded-full z-10 shadow-[0_0_10px_#facd8a]" />

            <div className="bg-[#1a2224]/80 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-xl hover:border-[#facd8a]/50 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 text-[#facd8a] mb-2">
                    <FontAwesomeIcon
                      icon={index === 0 ? faGraduationCap : faSchool}
                      className="text-xl mt-1 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-lg md:text-xl font-bold leading-tight whitespace-nowrap truncate"
                        title={edu.institution}
                      >
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 font-medium">
                        {edu.place}
                      </p>
                    </div>
                  </div>
                  <h4
                    className="text-lg text-white font-medium pl-8 md:pl-0 mt-2 md:mt-1 truncate"
                    title={edu.degree}
                  >
                    {edu.degree}
                  </h4>
                </div>

                <div className="flex items-center gap-2 bg-[#facd8a]/10 text-[#facd8a] px-3 py-1 rounded-full border border-[#facd8a]/20 w-fit self-start md:self-auto shrink-0">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-xs" />
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {edu.year}
                  </span>
                </div>
              </div>

              <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-gray-400 italic">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-xs text-yellow-500"
                  />
                  <span>{edu.grade}</span>
                </div>
                <p className="border-t border-gray-700 pt-3 mt-3">
                  {edu.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationBox;
