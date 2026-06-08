import React from 'react';
import { motion } from 'framer-motion';


interface BlogPostProps {
  blog: any;
}

const BlogPost: React.FC<BlogPostProps> = ({ blog }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <header className="mb-12 text-center">
        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {blog.tags?.map((tag: string) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-wider text-[#facd8a] bg-[#facd8a]/10 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#facd8a] mb-6 leading-tight">
          {blog.title}
        </h1>
        <p className="text-xl text-[#facd8a]/60 mb-8 max-w-2xl mx-auto leading-relaxed">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-center gap-4 text-sm text-neutral-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white text-sm">
              {blog.author?.charAt(0) || 'A'}
            </div>
            <span className="text-neutral-300">{blog.author}</span>
          </div>
          <span>•</span>
          <span>{blog.readingTime} min read</span>
          <span>•</span>
          <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      {blog.heroPicture && (
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
          <img 
            src={blog.heroPicture} 
            alt={blog.title} 
            className="w-full h-auto md:h-[500px] object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg prose-invert max-w-none text-neutral-300 leading-relaxed space-y-6">
        {/* Basic rendering for simple block text */}
        {blog.content?.blocks?.map((block: any, idx: number) => {
          if (block.type === 'paragraph') {
            return <p key={idx} className="mb-6 text-lg" dangerouslySetInnerHTML={{ __html: block.data.text }}></p>;
          }
          if (block.type === 'header') {
            const Tag = `h${block.data.level}` as keyof React.JSX.IntrinsicElements;
            return <Tag key={idx} className="text-white font-bold mt-12 mb-6" dangerouslySetInnerHTML={{ __html: block.data.text }}></Tag>;
          }
          if (block.type === 'list') {
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={idx} className="list-outside list-disc pl-5 mb-6 text-lg space-y-2">
                {block.data.items.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                ))}
              </ListTag>
            );
          }
          return null;
        })}
        {(!blog.content?.blocks || blog.content.blocks.length === 0) && (
          <p>No content available for this post.</p>
        )}
      </div>
    </motion.article>
  );
};

export default BlogPost;
