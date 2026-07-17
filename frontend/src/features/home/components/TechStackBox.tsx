import { useState } from 'react';
import technologies from '@/data/techStack';
import type { TechIconImage } from '@/types/tech-stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faHtml5,
  faGit,
  faPython,
  faJs,
  faReact,
  faNpm,
  faNode,
  faFigma,
  faCss3,
  faBootstrap,
  faDocker,
  faJenkins,
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { motion, AnimatePresence } from 'framer-motion';

library.add(
  faHtml5,
  faGit,
  faPython,
  faJs,
  faReact,
  faNpm,
  faNode,
  faFigma,
  faCss3,
  faBootstrap,
  faDocker,
  faJenkins,
);

/** Category groupings for the tech stack tabs. */
const categories: Record<string, string[]> = {
  Languages: ['C++', 'Python', 'JavaScript', 'TypeScript'],
  Frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'JWT', 'OAuth', 'bCrypt'],
  'Database/ORM': ['PostgreSQL', 'MongoDB', 'Redis', 'ChromaDB', 'Prisma ORM'],
  IDE: ['VS Code', 'Google AntiGravity'],
  'Tooling & CI/CD': ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Postman', 'Jest'],
};

/** Brand color mappings for FontAwesome icons. */
const brandColors: Record<string, string> = {
  'C++': 'text-blue-600',
  Python: 'text-blue-400',
  JavaScript: 'text-yellow-400',
  TypeScript: 'text-blue-500',
  'React.js': 'text-cyan-400',
  'Next.js': 'text-white',
  'Tailwind CSS': 'text-teal-400',
  HTML5: 'text-orange-500',
  CSS3: 'text-blue-500',
  'Node.js': 'text-green-500',
  'Express.js': 'text-gray-300',
  'REST APIs': 'text-blue-300',
  WebSockets: 'text-purple-400',
  JWT: 'text-pink-500',
  OAuth: 'text-gray-100',
  bCrypt: 'text-yellow-200',
  PostgreSQL: 'text-blue-400',
  MongoDB: 'text-green-500',
  Redis: 'text-red-500',
  ChromaDB: 'text-blue-300',
  'Prisma ORM': 'text-white',
  'VS Code': 'text-blue-500',
  'Google AntiGravity': 'text-purple-500',
  Git: 'text-red-500',
  GitHub: 'text-white',
  'GitHub Actions': 'text-blue-400',
  Docker: 'text-blue-400',
  Postman: 'text-orange-400',
  Jest: 'text-red-600',
};

/** Type guard: checks if a value is a TechIconImage (has `iconImg` property). */
function isTechIconImage(value: unknown): value is TechIconImage {
  return (
    typeof value === 'object' &&
    value !== null &&
    'iconImg' in value &&
    typeof (value as TechIconImage).iconImg === 'string'
  );
}

/** Type guard: checks if a value is a FontAwesome IconDefinition. */
function isIconDefinition(value: unknown): value is IconDefinition {
  return (
    typeof value === 'object' &&
    value !== null &&
    'icon' in value &&
    'prefix' in value
  );
}

const TechStackBox: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Languages');

  const renderTechItem = (techName: string, iconValue: unknown) => {
    let iconSrc: string | null = null;
    let faIcon: IconDefinition | null = null;
    let colorClass = brandColors[techName] || 'text-gray-300';

    if (isTechIconImage(iconValue)) {
      iconSrc = iconValue.iconImg;
      if (iconValue.color) {
        colorClass = iconValue.color.replace('hover:', '');
      }
    } else if (typeof iconValue === 'string') {
      iconSrc = iconValue;
    } else if (isIconDefinition(iconValue)) {
      faIcon = iconValue;
    }

    return (
      <motion.li
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        key={techName}
        className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors w-14 h-14 sm:w-20 sm:h-20 tooltip-container group relative cursor-default border border-transparent hover:border-white/10 shrink-0"
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={techName}
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-1 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
          />
        ) : faIcon ? (
          <div
            className={`text-xl sm:text-2xl mb-1 transition-all duration-300 ${colorClass} group-hover:drop-shadow-[0_0_10px_currentColor] group-hover:scale-110`}
          >
            <FontAwesomeIcon icon={faIcon} />
          </div>
        ) : null}

        {/* Tooltip */}
        <span className="text-[10px] uppercase font-bold text-white opacity-0 group-hover:opacity-100 absolute -bottom-8 pointer-events-none transition-all duration-300 bg-black/80 backdrop-blur px-2 py-1 rounded shadow-lg translate-y-2 group-hover:translate-y-0 z-20 whitespace-nowrap border border-gray-700">
          {techName}
        </span>
      </motion.li>
    );
  };

  const currentTechs = categories[activeTab] || [];

  return (
    <div className="w-full h-full flex flex-col bg-[#1a2224]/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-md">
      {/* Tabs Header */}
      <div className="flex flex-wrap justify-center bg-black/20 border-b border-white/5">
        {Object.keys(categories).map((catName) => (
          <button
            key={catName}
            onClick={() => setActiveTab(catName)}
            className={`py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 whitespace-nowrap
              ${
                activeTab === catName
                  ? 'border-[#facd8a] text-[#facd8a] bg-white/5'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
          >
            {catName}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {/* Static height to prevent layout shift when icon rows wrap */}
      <div className="p-6 sm:p-8 h-[220px] sm:h-[260px] flex items-center justify-center">
        <motion.ul
          className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center max-w-3xl"
          layout
        >
          <AnimatePresence mode="popLayout">
            {currentTechs.map((techKey) => {
              const techData = technologies[techKey];
              if (
                techKey === 'database' &&
                techData &&
                typeof techData === 'object' &&
                !('icon' in techData) &&
                !('iconImg' in techData)
              ) {
                return Object.entries(
                  techData as Record<string, unknown>,
                ).map(([dbName, dbData]) => renderTechItem(dbName, dbData));
              }
              if (!techData) return null;
              return renderTechItem(techKey, techData);
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
};

export default TechStackBox;
