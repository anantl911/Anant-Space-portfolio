import type { Project } from '@/types/models/project';

interface DesignatedTagProps {
  designatedTag?: Project['designatedTag'];
}

export const DesignatedTag: React.FC<DesignatedTagProps> = ({ designatedTag }) => {
  if (!designatedTag?.tag) return null;

  return (
    <div className="mt-auto pt-4 border-t border-gray-700">
      <span className="inline-block bg-[#facd8a]/10 text-[#facd8a] text-xs font-semibold px-3 py-1 rounded-full border border-[#facd8a]/30">
        {designatedTag.tag}
      </span>
      {designatedTag.detail && (
        <p className="text-gray-400 text-xs mt-2">
          {designatedTag.detail}
        </p>
      )}
    </div>
  );
};
