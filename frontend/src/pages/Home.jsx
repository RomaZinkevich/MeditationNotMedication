import React from "react";
import NavBar from "../components/NavBar";
import GuideSection from "../components/GuideSection";

function Home() {
  const sections = [
    {
      id: 1,
      cards: [
        {gId: 1, title: "Tranquil Waters: A Serene Journey", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_OWcb9esUYLXKySf_ZHI7PFyAHiKZnhMDeA&usqp=CAU", description: "Description for Card 1"},
        {gId: 2, title: "Serene Forest Meditation", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqlXGUT37Mr0JW5VP8xyvWdJqtvzznas5cBw&usqp=CAU", description: "Description for Card 2"},
        {gId: 3, title: "Whispers of the Ancient Trees", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6pD_AVr3q-yTEilDZ8-m0mwEHaJiGK7YlA&usqp=CAU", description: "Description for Card 3"},
      ],
      name: "Explore the world tranquility.",
    },
    {
      id: 2,
      cards: [
        {gId: 4, title: "Card 4", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_OWcb9esUYLXKySf_ZHI7PFyAHiKZnhMDeA&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmP1IBuRwxqbyjXYs8yAI5Ryma1uMBdlLP9w&usqp=CAU", description: "Description for Card 4"},
        {gId: 5, title: "Whispers of the Forest: Nature's Harmony", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9es5zrPCQF6pKhcA7Gsf6V2P1fD9BcV8trA&usqp=CAU", description: "Description for Card 5"},
        {gId: 6, title: "Card 6", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK0LSc7kp6QdDca9JgEmtwIAfAn2fG-Hx1A&usqp=CAU", description: "Description for Card 6"},
      ],
      name: "Behold! The paradise.",
    },
  ];
  const backgroundStyle = {
    backgroundColor: "white",
  };

  return (
    <div style={backgroundStyle}>
      <NavBar />
      {sections.map((section) => {
        return <GuideSection key={section.id} Cards={section.cards} sectionID={section.id} name={section.name}/>;
      })};
    </div>
  );
}

export default Home;
