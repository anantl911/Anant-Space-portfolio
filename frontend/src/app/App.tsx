import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/features/home/pages/HomePage';
import ArtPage from '@/features/art/pages/ArtPage';
import GamesPage from '@/features/games/pages/GamesPage';
import BlogPage from '@/features/blogs/pages/BlogPage';
import BlogPostPage from '@/features/blogs/pages/BlogPostPage';
import BlogEditorPage from '@/features/blogs/pages/BlogPageEditor';

const App: React.FC = () => {
  return (
    <article>
      <BrowserRouter>
        <div className="sticky top-0 z-50">
          <Header anantSpaceLogo="/anant_space_logo2.webp" />
        </div>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Art" element={<ArtPage />} />
          <Route path="/Games" element={<GamesPage />} />
          <Route path="/Blog" element={<BlogPage />} />
          <Route path="/Blog/:slug" element={<BlogPostPage />} />
          <Route path="/Blog/Create" element={<BlogEditorPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </article>
  );
};

export default App;
