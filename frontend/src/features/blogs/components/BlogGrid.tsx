import BlogCard from './BlogCard';

interface BlogGridProps {
  blogs: any[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <div className="text-center text-neutral-400 py-12">No blogs found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog._id || blog.slug} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;
