import { useParams } from 'react-router-dom';
import { useBlogDetail } from '@/hooks/queries/useBlogs';
import BlogPost from '../components/BlogPost';
import { mockBlogs } from '@/data/blogs';
import { useEffect } from 'react';

const BlogPostPage = () => {
   const { slug } = useParams<{ slug: string }>();
   const { data, isLoading } = useBlogDetail(slug || '');
   
   // Fallback to mock data if API is not populated or offline
   const blog = data?.data || mockBlogs.find(b => b.slug === slug);

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
      <div className="min-h-screen bg-neutral-950 text-white">
          <BlogPost blog={blog} />
      </div>
   );
}

export default BlogPostPage;
