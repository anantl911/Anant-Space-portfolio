import { useState, useCallback } from 'react';
import experience from '@/data/experience';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ExperienceBox: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(0);

  const nextExperience = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % experience.length);
    setSelectedTheme(0);
  }, []);

  const prevExperience = useCallback(() => {
    setSelectedIndex(
      (prev) => (prev - 1 + experience.length) % experience.length,
    );
    setSelectedTheme(0);
  }, []);

  const renderNavigationDots = () => (
    <div className="flex justify-center gap-4 mt-6">
      {experience.map((_, idx) => (
        <button
          key={idx}
          onClick={() => {
            setSelectedIndex(idx);
            setSelectedTheme(0);
          }}
          className={`transition-all duration-300 rounded-full ${
            selectedIndex === idx
              ? 'w-8 h-2 bg-[#facd8a]'
              : 'w-2 h-2 bg-gray-500 hover:bg-gray-400'
          }`}
          aria-label={`Go to experience ${idx + 1}`}
        />
      ))}
    </div>
  );

  const renderContent = () => {
    const currentExp = experience[selectedIndex];
    const hasThemes = Boolean(currentExp.theme);

    let displayData = currentExp;
    if (hasThemes && currentExp.theme) {
      displayData = {
        ...currentExp,
        ...currentExp.theme[selectedTheme],
      };
    }

    const images = (hasThemes && currentExp.theme ? currentExp.theme[selectedTheme].images : displayData.images) || [];
    const tasks = (hasThemes && currentExp.theme ? currentExp.theme[selectedTheme].tasks_description : displayData.tasks_description) || [];
    const time = (hasThemes && currentExp.theme ? currentExp.theme[selectedTheme].time : displayData.time) || currentExp.time;

    return (
      <div className="flex flex-col lg:flex-row gap-8 mt-6 h-full px-2">
        {/* Left Column: Images & Title */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {/* Theme Tabs if applicable */}
          {hasThemes && currentExp.theme && (
            <div className="flex flex-wrap gap-2 mb-2 p-1 bg-black/20 rounded-lg">
              {currentExp.theme.map((theme, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTheme(idx)}
                  className={`flex-1 py-2 px-3 text-xs sm:text-sm rounded-md transition duration-300 font-medium ${
                    selectedTheme === idx
                      ? 'bg-[#facd8a] text-black shadow-md'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {theme.title}
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-gray-700 bg-black/50 relative group">
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt={
                  (hasThemes && currentExp.theme
                    ? currentExp.theme[selectedTheme].title
                    : undefined) || currentExp.title
                }
                className="w-full h-full object-cover transition duration-700 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Title & Date */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white">
              {(hasThemes && currentExp.theme
                ? currentExp.theme[selectedTheme].title
                : undefined) || currentExp.title}
            </h3>
            <p className="text-[#facd8a] text-sm font-mono mt-1">{time}</p>
          </div>
        </div>

        {/* Right Column: Description & Tasks */}
        <div className="lg:w-2/3 flex flex-col bg-black/20 rounded-xl p-6 border border-white/5">
          <p className="text-gray-300 italic mb-6 text-sm lg:text-base leading-relaxed border-l-2 border-[#facd8a] pl-4">
            {currentExp.description}
            {currentExp.detail_description && (
              <span className="block mt-2">
                {currentExp.detail_description}
              </span>
            )}
          </p>

          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <h4 className="text-white font-semibold mb-3 border-b border-gray-700 pb-1 inline-block">
              Key Contributions
            </h4>
            <ul className="space-y-3">
              {tasks.map((task, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 text-sm flex gap-3 items-start"
                >
                  <span className="text-[#facd8a] mt-1.5 min-w-[6px] h-[6px] rounded-full bg-[#facd8a]" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      id="experience-container"
      className="w-[90vw] lg:w-[85vw] mx-auto py-10 relative group-hover-container"
    >
      <div className="bg-[rgba(26,34,36,0.8)] backdrop-blur-xl border border-gray-700 rounded-2xl p-6 lg:p-10 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-[#facd8a] text-2xl lg:text-3xl font-bold tracking-wide">
            Experience{' '}
            <span className="text-white font-light opacity-50">
              / {experience[selectedIndex].title}
            </span>
          </h2>

          {/* Desktop Arrows (Top Right) */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={prevExperience}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-gray-600 hover:border-[#facd8a]"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextExperience}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-gray-600 hover:border-[#facd8a]"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <div className="flex-grow relative">
          {/* Mobile Arrows (Overlay) */}
          <button
            onClick={prevExperience}
            className="lg:hidden absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-gray-600"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={nextExperience}
            className="lg:hidden absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-gray-600"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          {renderContent()}
        </div>

        {renderNavigationDots()}
      </div>
    </div>
  );
};

export default ExperienceBox;
