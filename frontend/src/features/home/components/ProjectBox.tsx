import { useState } from 'react';
import type { Project } from '@/types/models/project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useProjects } from '@/hooks/queries/useProjects';
import { flattenTechTags, formatDate } from '@/utils/genericUtils';
import { ProjectsHeader } from './projects/ProjectHeader';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectLinks } from './projects/ProjectLinks';
import { DesignatedTag } from './projects/PDesignatedTag';
import { ImageViewer } from './projects/ImageViewer';

const ProjectBox: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const { data: projects, isLoading, isError } = useProjects();

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsImageViewerOpen(false);
  };
  
  const closeProject = () => setSelectedProject(null);

  const nextImage = () => {
    if (selectedProject) {
      setSlideDirection('right');
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.screenshots.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setSlideDirection('left');
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length);
    }
  };
  
  const jumpToImage = (idx: number) => {
    setSlideDirection(idx > currentImageIndex ? 'right' : 'left');
    setCurrentImageIndex(idx);
  };
  
  return (
    <div id="project-gallery" className="w-full mt-10 px-4 relative">
      {/* Header */}
      <ProjectsHeader />

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#facd8a]/30 border-t-[#facd8a] rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <p className="text-center text-red-400 py-10">Failed to load projects.</p>
      )}

      {/* Grid */}
      {projects && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onClick={openProject}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                duration: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="bg-[#1a2224] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#facd8a]/5 shadow-2xl relative flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* Modal Image Section */}
              <div className="md:w-1/2 h-64 md:h-auto relative bg-black flex-shrink-0 group overflow-hidden">
                {selectedProject.screenshots.length > 0 ? (
                  <>
                    <AnimatePresence initial={false} custom={slideDirection}>
                      <motion.img
                        key={currentImageIndex}
                        src={selectedProject.screenshots[currentImageIndex]}
                        alt={selectedProject.title}
                        custom={slideDirection}
                        variants={{
                          enter: (dir: 'left' | 'right') => ({
                            x: dir === 'right' ? '100%' : '-100%',
                            opacity: 0
                          }),
                          center: {
                            x: 0,
                            opacity: 1
                          },
                          exit: (dir: 'left' | 'right') => ({
                            x: dir === 'right' ? '-100%' : '100%',
                            opacity: 0
                          })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="absolute inset-0 w-full h-full object-contain cursor-zoom-in"
                        onClick={() => setIsImageViewerOpen(true)}
                      />
                    </AnimatePresence>
                    
                    {selectedProject.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {selectedProject.screenshots.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => jumpToImage(idx)}
                              className={`w-2 h-2 rounded-full transition-colors z-10 ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/80'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>

              {/* Modal Content Section */}
              <div className="md:w-1/2 p-8 flex flex-col">
                <h2 className="text-3xl font-bold text-[#facd8a] mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-sm text-gray-500 italic mb-6">
                  {formatDate(selectedProject.startedAt)} – {formatDate(selectedProject.finishedAt)}
                </p>

                <div className="flex-grow">
                  <h4 className="text-white font-semibold mb-3 border-b border-gray-700 pb-2">
                    About Project
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm mb-6">
                    {selectedProject.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>

                  <h4 className="text-white font-semibold mb-3 border-b border-gray-700 pb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {flattenTechTags(selectedProject.techTags).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-white/5 px-3 py-1.5 rounded-full border border-gray-600 text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Designated Tag */}
                <DesignatedTag designatedTag={selectedProject.designatedTag} />

                {/* Links */}
                <ProjectLinks links={selectedProject.links} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isImageViewerOpen && selectedProject && (
          <ImageViewer
            images={selectedProject.screenshots}
            currentIndex={currentImageIndex}
            onClose={() => setIsImageViewerOpen(false)}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectBox;
