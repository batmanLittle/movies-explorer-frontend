import "./NavTab.css";
import { Link } from "react-scroll";
function NavTab() {
  return (
    <nav className="nav-tab">
      <div className="nav-tab__container">
        <Link
          to="about-project"
          smooth={true}
          duration={700}
          className="nav-tab__link"
        >
          О проекте
        </Link>
        <Link to="techs" smooth={true} duration={700} className="nav-tab__link">
          Технологии
        </Link>
        <Link
          to="about-me"
          smooth={true}
          duration={700}
          className="nav-tab__link"
        >
          Студент
        </Link>
      </div>
    </nav>
  );
}

export default NavTab;
