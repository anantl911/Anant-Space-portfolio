import featuredGames from '@/data/games';
import GameBox from './GameBox';

const FeaturedBox: React.FC = () => {
  return (
    <div
      id="featured-games-box"
      className="relative flex justify-center items-center  select-none"
    >
      <div>
        <div
          id="container"
          className="bg-[rgba(255,255,255,0.1)] w-[80vw] backdrop-blur-xs flex flex-col"
        >
          <div id="featured-header" className="bg-[rgba(0,0,0,0.8)]">
            <h2 className="text-[#facd8a] text-[clamp(16px,1.4vw,100px)] p-2 text-center">
              Featured Games
            </h2>
          </div>

          <div
            id="games-container"
            className=" py-2 px-1  flex flex-col gap-1 select-none"
          >
            {featuredGames.map((game) => (
              <GameBox
                key={game.title}
                gameName={game.title}
                gameDescription={game.description}
                imageSource={game.pictures[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBox;
