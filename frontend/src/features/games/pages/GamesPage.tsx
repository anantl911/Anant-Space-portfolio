import Featured from '../components/Featured';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoadBarrier } from '@fortawesome/free-solid-svg-icons';
// Temporarily disabled
// import ConwaysGame from '../components/ConwaysGame';

const WIPComponent: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center select-none">
      <FontAwesomeIcon
        icon={faRoadBarrier}
        color={"white"}
        style={{ fontSize: "64px" }}
      />
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-[#facd8a] text-2xl">Under Maintainence.</h2>
        <p className="text-gray-300 text-sm max-w-78">Section due for refactor. When finished, you'll be able to submit your own games and play the ones made by me.</p>
      </div>
    </div>
  )
};

const GamesPage: React.FC = () => {
  return (
    <article id="games">
      <Featured />

      <div
        id="playground"
        className="bg-[linear-gradient(rgba(26,34,36,0.9),rgba(0,0,0,0.5)),url(/deepdarkstarrysky_hd.webp)] h-[100vh] grid place-content-center bg-[length:50%]"
      >
        <WIPComponent />
      </div>
    </article>
  );
};

export default GamesPage;
