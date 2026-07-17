import FeaturedBox from './FeaturedBox';

const Featured: React.FC = () => {
  return (
    <section
      id="featured-games"
      className="min-h-160 w-full bg-[url(/games/background.webp)] bg-cover bg-bottom"
    >
      <div
        id="container"
        className="min-h-[600px] flex place-content-center"
      >
        <FeaturedBox />
      </div>
    </section>
  );
};

export default Featured;
