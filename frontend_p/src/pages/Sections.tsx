import { useState, useEffect } from "react";
import { Section } from "../interfaces/Section";
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

  return (
    <>
      <Navigation />
      <main>
        <div>Browsing</div>
        <ListSections data={allData} />
      </main>
    </>
  );
}

export default Sections;