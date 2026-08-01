import { useParams } from 'react-router-dom';
import { useBlogDetail } from '@/hooks/queries/useBlogs';
import BlogPost from '../components/BlogPost';
import { mockBlogs } from '@/data/blogs';
import aboutPost from '@/data/aboutPost';
import { useEffect } from 'react';

const ABOUT_SLUG = 'about-me-ms9ms9nz';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // aboutPost is always served locally — it's a draft and won't be in the API
  const isAboutPage = slug === ABOUT_SLUG;
  const { data, isLoading } = useBlogDetail(isAboutPage ? '' : (slug || ''));

  // Priority: local aboutPost > API data > mockBlogs fallback
  const blog = isAboutPage ? aboutPost : (data || mockBlogs.find(b => b.slug === slug));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading && !blog) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-[#facd8a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#facd8a]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Blog not found</h1>
        <p className="text-neutral-400">The article you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(rgba(26,34,36,0.9),rgba(0,0,0,0.5)),url(/deepdarkstarrysky_hd.webp)] grid place-content-center bg-[length:50%] text-white">
      <BlogPost blog={blog} />
    </div>
  );
}

export default BlogPostPage;
