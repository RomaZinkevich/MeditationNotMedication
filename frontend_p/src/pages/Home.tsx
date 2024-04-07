import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

function Home() {
  return (
    <>
      <Navigation />
      <main>
        <h1>Meditation do be crazy</h1>
        <p>
          We out here meditating... What you doing?<br />
          Before you think about <b> killing yourself </b> with all those bitchass medicines,<br />
          How about we talk about something romantic. <br />Like how good your mother looks tonight! <i>Anyways</i><br />
          Try out our custom made meditation plans to ease you into not <b>killing yourself</b>.
          <br />

          <div className="redirect-buttons">
            <Link className="browse-button" to="/browse">Take a look around</Link> or
            <Link className="user-action-button" to="user-action">Join us</Link>
          </div>
        </p>
      </main>
    </>
  );
}

export default Home;