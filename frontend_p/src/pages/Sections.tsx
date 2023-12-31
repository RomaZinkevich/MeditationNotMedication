import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Section } from "../interfaces/Section";

function Sections() {
  const [section, setSection] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllSections = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/sections/", { method: "GET" });
        const data = await response.json();

        setSection(data);
        console.log(data);
      }
      catch (err) {
        console.error(err);
        setError(err as Error);
      }
    }

    fetchAllSections();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <h3>Hello</h3>
      </main>
    </>
  );
}

export default Sections;