import Featured from '../components/Featured';
import ConwaysGame from '../components/ConwaysGame';

const GamesPage: React.FC = () => {
  return (
    <article id="games">
      <Featured />

      <div
        id="subsection-author-info"
        className="bg-[linear-gradient(rgba(26,34,36,0.9),rgba(0,0,0,0.5)),url(/deepdarkstarrysky_hd.webp)] bg-[length:50%]"
      >
        <ConwaysGame />
      </div>
    </article>
  );
};

export default GamesPage;
