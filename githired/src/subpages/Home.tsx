import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import PageWrapper from "../PageWrapper";
// import { useNavigate } from "react-router-dom";
import { handleGithubLogin } from "../components/GithubLogin";

const images = ["/images/Home1.png", "/images/Home2.png", "/images/Home3.jpg"];

const cardsData = [
  {
    id: 1,
    image: "/images/search.png",
    title: "Job Search",
    description:
      "Search target jobs that suit your specific skills, experience, and education. We make the job search process more efficient, relevant, and personalized.",
  },
  {
    id: 2,
    image: "/images/folder.png",
    title: "Portfolio",
    description:
      "Showcase your personal and professional projects in one place. It typically includes: A collection of past work, such as coding projects, designs, or writing samples. Descriptions of each project, including tools used, challenges faced, and outcomes. Education history and skills proficiency.",
  },
  {
    id: 3,
    image: "/images/interview.png",
    title: "Interview",
    description:
      "Generate possible behavior or situational interview questions based on the job description and relevant details that you can provide. We help users to prepare for their interviews by simulating questions tailored to the specific role and taking into account other bits of information. ",
  },
];

const Home: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  // Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % cardsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <PageWrapper>
      <div>
        {/* Background Images */}
        <div className="background-rotator">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`bg-image ${index === bgIndex ? "visible" : ""}`}
              alt={`background-${index}`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="home-container">
          <img src="/images/Logo.png" alt="Logo" className="home-logo" />
          <div>
            <Link to="/login" onClick={handleGithubLogin} className="home-btn">
              Login
            </Link>
            <Link to="/signup" className="home-btn">
              Sign Up
            </Link>
          </div>
        </div>

        <img
          src="/images/texture.png"
          alt="background texture"
          className="texture"
        />

        {/* Card Slider */}
        <div className="card-slider-container">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className={`card-slide ${
                index === currentIndex
                  ? "active"
                  : index === prevIndex
                  ? "exit"
                  : ""
              }`}
            >
              <img src={card.image} alt={card.title} />
              <div className="card-slide-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
