//External Lib Import
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";

//Internal Lib Import

function Navigation({ openMenu, setOpenMenu, title = "Home" }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const FullScreen = () => {
    if (isFullScreen === true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  return (
    <>
      <title>{title}</title>
      <Navbar
        className={
          openMenu
            ? "fixed-top px-0 shadow-sm top-navbar"
            : "fixed-top px-0 shadow-sm top-navbar top-navbar-expand"
        }
      >
        <Container fluid={true}>
          <Navbar.Brand>
            <button
              className="icon-nav m-0 h5 btn btn-link"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <AiOutlineMenuUnfold />
            </button>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex">
            <button
              className="mx-2 icon-nav h6 px-3 btn btn-link"
              onClick={FullScreen}
            >
              <BsArrowsFullscreen />
            </button>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
