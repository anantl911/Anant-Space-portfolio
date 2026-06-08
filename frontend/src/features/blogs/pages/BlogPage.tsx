import BlogHero from "../components/BlogHero";
import BlogGrid from "../components/BlogGrid";
import { useBlogs } from "@/hooks/queries/useBlogs";
import { mockBlogs } from "@/data/blogs";

const BlogPage = () => {
    const { data, isLoading } = useBlogs();
    console.log(data?.blogs.length)
    // Use data from API if it exists and has items, otherwise use mockBlogs
    const { blogs } = (data && data.blogs.length > 0) ? data : { blogs: mockBlogs } ;

    return (
        <div className="bg-neutral-950">
            <BlogHero />
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center mb-16 fade-in">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#facd8a] text-bold mb-4">Latest Articles</h2>
                        <p className="text-[#facd8a]/60 max-w-2xl mx-auto text-dm">
                            Thoughts, ideas, and tutorials on software development, design, and more.
                        </p>
                    </div>

                    {isLoading && (!data || blogs?.length === 0) ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#facd8a]"></div>
                        </div>
                    ) : (
                        <BlogGrid blogs={blogs} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlogPage;