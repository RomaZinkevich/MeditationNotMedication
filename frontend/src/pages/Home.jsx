import React, {useEffect} from "react";
import NavBar from "../components/NavBar";

import Cards from "../components/Cards";

function Home(props) {
  // const [indexes, setIndexes] = useState({});
  const indexes = [1, 2, 3];

  useEffect(() => {
    // TODo: Call from backend
  }, []);

  return (
    <>
      <NavBar />
      <ul>
        {indexes.map((elem, i) => (
          <li key={i}>
            <Cards index = {elem} />
          </li>),
        )}
      </ul>
    </>
  );
}

export default Home;
