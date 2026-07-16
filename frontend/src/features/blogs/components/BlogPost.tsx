import React from 'react';
import { motion } from 'framer-motion';

interface BlogPostProps {
  blog: any;
}

const renderTiptapNode = (node: any, index: number | string): React.ReactNode => {
  if (node.type === 'text') {
    let content: React.ReactNode = node.text;
    if (node.marks) {
      node.marks.forEach((mark: any, mIdx: number) => {
        const markKey = `mark-${index}-${mIdx}`;
        switch (mark.type) {
          case 'bold': content = <strong key={markKey}>{content}</strong>; break;
          case 'italic': content = <em key={markKey}>{content}</em>; break;
          case 'underline': content = <u key={markKey}>{content}</u>; break;
          case 'strike': content = <s key={markKey}>{content}</s>; break;
          case 'code': content = <code key={markKey} className="bg-neutral-800 px-1 py-0.5 rounded text-[#facd8a]">{content}</code>; break;
          case 'link': 
            content = (
              <a 
                key={markKey} 
                href={mark.attrs?.href} 
                className="text-[#facd8a] hover:underline" 
                target={mark.attrs?.target || '_blank'}
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ); 
            break;
        }
      });
    }
    return <React.Fragment key={`text-${index}`}>{content}</React.Fragment>;
  }

  const renderChildren = () => {
    return node.content?.map((childNode: any, childIndex: number) => 
      renderTiptapNode(childNode, `${index}-${childIndex}`)
    );
  };

  const textAlignClass = node.attrs?.textAlign && typeof node.attrs.textAlign === 'string'
    ? `text-${node.attrs.textAlign}` 
    : '';
  const blockClass = `${textAlignClass}`.trim();

  switch (node.type) {
    case 'paragraph':
      if (!node.content || node.content.length === 0) {
        return <br key={`br-${index}`} />;
      }
      return <p key={`p-${index}`} className={`mb-6 text-lg ${blockClass}`}>{renderChildren()}</p>;
    
    case 'heading': {
      const level = node.attrs?.level || 1;
      const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
      return <HeadingTag key={`h-${index}`} className={`text-white font-bold mt-12 mb-6 ${blockClass}`}>{renderChildren()}</HeadingTag>;
    }
    
    case 'bulletList':
      return <ul key={`ul-${index}`} className={`list-outside list-disc pl-5 mb-6 text-lg space-y-2 ${blockClass}`}>{renderChildren()}</ul>;
      
    case 'orderedList':
      return <ol key={`ol-${index}`} className={`list-outside list-decimal pl-5 mb-6 text-lg space-y-2 ${blockClass}`}>{renderChildren()}</ol>;
      
    case 'listItem':
      return <li key={`li-${index}`} className={blockClass}>{renderChildren()}</li>;
      
    case 'blockquote':
      return <blockquote key={`bq-${index}`} className={`border-l-4 border-[#facd8a] pl-4 italic my-6 text-neutral-400 ${blockClass}`}>{renderChildren()}</blockquote>;
      
    case 'codeBlock':
      return (
        <pre key={`pre-${index}`} className={`bg-neutral-900 p-4 rounded-lg overflow-x-auto border border-neutral-800 my-6 ${blockClass}`}>
          <code className="text-sm font-mono text-neutral-300">{renderChildren()}</code>
        </pre>
      );
      
    case 'image':
      return (
        <figure key={`img-${index}`} className={`my-8 ${blockClass}`}>
          <img 
            src={node.attrs?.src} 
            alt={node.attrs?.alt || 'Blog image'} 
            title={node.attrs?.title}
            className="rounded-xl w-full h-auto object-cover max-h-[600px]"
          />
          {node.attrs?.title && (
             <figcaption className="text-center text-sm text-neutral-500 mt-2">{node.attrs.title}</figcaption>
          )}
        </figure>
      );
      
    case 'horizontalRule':
      return <hr key={`hr-${index}`} className="border-neutral-800 my-10 border-t-2" />;

    default:
      return <React.Fragment key={`unknown-${index}`}>{renderChildren()}</React.Fragment>;
  }
};

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
          <span>{blog.readingTime || 1} min read</span>
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
        {blog.content?.type === 'doc' && blog.content?.content?.length > 0 ? (
          blog.content.content.map((node: any, idx: number) => renderTiptapNode(node, `root-${idx}`))
        ) : (
          <p>No content available for this post.</p>
        )}
      </div>
    </motion.article>
  );
};

export default BlogPost;
