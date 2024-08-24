import { useState, useEffect } from "react";
import { Section, Content } from "../interfaces/DataTypes";
import Navigation from "../components/Navigation";
import ListSections from "../components/ListSections";

function Sections() {
  const [allData, setAllData] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/sections/", { method: "GET" });
        const data = await response.json();

        setAllData(data);
      }
      catch (err) {
        console.error(err);
        setError(err as Error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const fetchContent = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/contents/${id}`, { method: "GET" });
      const data = await response.json();

      console.log(data);
    }
    catch (err) {
      console.error(err);
      setError(err as Error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />
      <main>
        {loading && <p>loading...</p>}
        <ListSections
          data={allData}
          onContentFetch={fetchContent}
        />
        {error && <p>{error.message}</p>}
      </main>
    </>
  );
}

export default Sections;
