import type { Project } from '@/types/models/project';
import { flattenTechTags } from '@/utils/genericUtils';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const tags = flattenTechTags(project.techTags);

  return (
    <motion.div
      key={project._id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-[#1a2224] border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(250,205,138,0.15)] hover:border-[#facd8a]/50 transition-all duration-300 w-full max-w-[380px] cursor-pointer flex flex-col h-full will-change-transform"
      onClick={() => onClick(project)}
    >
      {/* Image Container */}
      <div className="h-52 overflow-hidden relative">
        {project.screenshots.length > 0 ? (
          <img
            src={project.screenshots[0]}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2224] to-transparent opacity-80" />

        <div className="absolute bottom-4 left-4 z-10 p-2">
          <h3 className="text-xl font-bold text-white group-hover:text-[#facd8a] transition-colors duration-300 drop-shadow-lg">
            {project.title}
          </h3>
        </div>

        {/* Overlay Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
          <span className="bg-[#facd8a] text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Short Info */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow font-light">
          {project.description[0]}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300"
            >
              {tech}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
