import WelcomeSection from '../components/WelcomeSection';
import AboutSection from '../components/AboutSection';

const HomePage: React.FC = () => {
  return (
    <article>
      <WelcomeSection />
      <AboutSection />
    </article>
  );
};

export default HomePage;
