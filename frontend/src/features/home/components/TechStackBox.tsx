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
  Frontend: ['HTML5', 'CSS3', 'javascript', 'reactJs', 'bootstrap', 'figma'],
  Backend: ['python', 'nodeJs', 'database', '.NET', 'ASPNET'],
  Tools: ['GIT', 'NPM', 'Docker', 'Jenkins', 'SFML', 'gazebo'],
  Robotics: ['ROS2', 'CoppeliaSIM'],
};

/** Brand color mappings for FontAwesome icons. */
const brandColors: Record<string, string> = {
  HTML5: 'text-orange-500',
  CSS3: 'text-blue-500',
  javascript: 'text-yellow-400',
  reactJs: 'text-cyan-400',
  bootstrap: 'text-purple-600',
  python: 'text-blue-400',
  nodeJs: 'text-green-500',
  GIT: 'text-red-500',
  NPM: 'text-red-600',
  Docker: 'text-blue-400',
  Jenkins: 'text-gray-400',
  figma: 'text-purple-400',
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
  const [activeTab, setActiveTab] = useState('Frontend');

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
        className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors w-16 h-16 sm:w-20 sm:h-20 tooltip-container group relative cursor-default border border-transparent hover:border-white/10"
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={techName}
            className="w-8 h-8 object-contain mb-1 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
          />
        ) : faIcon ? (
          <div
            className={`text-2xl mb-1 transition-all duration-300 ${colorClass} group-hover:drop-shadow-[0_0_10px_currentColor] group-hover:scale-110`}
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
      <div className="flex bg-black/20 overflow-x-auto scrollbar-hide">
        {Object.keys(categories).map((catName) => (
          <button
            key={catName}
            onClick={() => setActiveTab(catName)}
            className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 whitespace-nowrap
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
      <div className="p-4 sm:p-6 min-h-[300px] flex items-center justify-center relative">
        <motion.ul
          className="flex flex-wrap gap-4 justify-center absolute inset-0 content-center p-4"
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
