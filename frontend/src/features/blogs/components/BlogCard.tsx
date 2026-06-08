import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  blog: any;
}


const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link to={`/Blog/${blog.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#facd8a]/50 transition-colors cursor-pointer group h-full flex flex-col"
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={blog.heroPicture}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex gap-2 mb-4 flex-wrap">
            {blog.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-[9px] uppercase tracking-wider text-[#facd8a] bg-[#facd8a]/10 px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-[18px] text-white font-semibold mb-3 leading-snug group-hover:text-[#facd8a] transition-colors">
            {blog.title}
          </h3>
          <p className="text-neutral-400 text-sm mb-6 flex-1 line-clamp-3">
            {blog.excerpt}
          </p>
          <div className="flex justify-between items-center text-xs text-neutral-500 font-medium border-t border-neutral-800 pt-4 mt-auto">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-white">
                {blog.author?.charAt(0) || 'A'}
              </span>
              {blog.author}
            </span>
            <span className="flex items-center gap-1">
              { /* May be replaced by Luicide's clock icon in future. */ }
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {blog.readingTime} min read
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
