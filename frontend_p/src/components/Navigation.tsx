import { useState } from "react";
import logo from "../assets/images/logo.png"

function Navigation() {
  const [expanded, setExpanded] = useState<boolean>(false);

  function handleClassToggle(): void {
    setExpanded(prev => !prev);
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
      <button
        className="mobile-nav-toggle"
        onClick={handleClassToggle}
        aria-controls="primary-nav"
        aria-expanded={expanded ? "true" : "false"}
      >
        <span className="sr-only">Menu</span>
        <div id="hamburg" className={expanded ? "open" : ""}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <nav
        id="primary-nav"
        className={`primary-nav ${expanded ? "open" : ""}`}
      >
        <a href="#">HOME</a>
        <a href="#">BROWSE</a>
        <a href="#">EASE</a>
        <a href="#">LOGIN</a>
      </nav>
    </div>
  );
}

export default Navigation;