import { useRef } from "react";
import logo from "../assets/images/logo.png"

function Navigation() {
  const hamburgRef = useRef<HTMLDivElement>(null);

  function handleClassToggle(): void {
    if (!hamburgRef.current) return;
    hamburgRef.current.classList.toggle("open");
  }

  return (
    <div className="navigation">
      <a href="#" className="web-logo">
        <img
          src={logo}
          alt="EasyEase"
          width="80px"
        />
      </a>
      <nav className="primary-nav">
        <a href="#">Home</a>
        <a href="#">Browse</a>
        <a href="#">Ease</a>
      </nav>
      <div
        id="hamburg"
        ref={hamburgRef}
        onClick={handleClassToggle}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navigation;