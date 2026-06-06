import type { ProjectLinks as ProjectLinksType } from '@/types/models/project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faNewspaper } from '@fortawesome/free-solid-svg-icons';

interface ProjectLinksProps {
  links?: ProjectLinksType;
}

export const ProjectLinks: React.FC<ProjectLinksProps> = ({ links }) => {
  if (!links || !Object.values(links).some(Boolean)) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-700">
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg transition-colors border border-gray-600 hover:border-[#facd8a] text-sm"
        >
          <FontAwesomeIcon icon={faGithub} />
          <span>GitHub</span>
        </a>
      )}
      {links.deployment && (
        <a
          href={links.deployment}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#facd8a] hover:bg-[#eac085] text-black px-4 py-2 rounded-lg transition-colors font-semibold text-sm"
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
          <span>Live Demo</span>
        </a>
      )}
      {links.youtube && (
        <a
          href={links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-600/30 text-sm"
        >
          <FontAwesomeIcon icon={faYoutube} />
          <span>YouTube</span>
        </a>
      )}
      {links.as_blog && (
        <a
          href={links.as_blog}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-lg transition-colors border border-gray-600 text-sm"
        >
          <FontAwesomeIcon icon={faNewspaper} />
          <span>Blog</span>
        </a>
      )}
    </div>
  );
};
