import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

function Home() {
  return (
    <>
      <Navigation />
      <main className="home-page-main">
        <h1>Meditation do be crazy</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
          suscipit?
          <br />
          Before you think about <b> abusing all those opioids </b>
          <br />
          How about we talk about something romantic. <br />
          Like how good your mother looks tonight! <i>Anyways</i>
          <br />
          Try out our custom made meditation plans to ease you into not{" "}
          <b>abusing opioids</b>.
          <br />
          <div className="redirect-buttons">
            <Link className="browse-button" to="/login">
              <button>Join us</button>
            </Link>{" "}
            <Link className="user-action-button" to="/browse">
              <button>Take a Look Around</button>
            </Link>
          </div>
        </p>
      </main>
    </>
  );
}

export default Home;
