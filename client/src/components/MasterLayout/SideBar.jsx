//External Lib  imports
import React from "react";
import { AiOutlineHome, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

//Internal Lib  imports
import NavItem from "./NavItem";
import sidebarLogo from "../../assets/images/logo.svg";

function SideBar({ openMenu }) {
  return (
    <div className={openMenu ? "side-nav-open" : "side-nav-close"}>
      <div className="side-nav-top text-center">
        <Link to="/" className="text-center">
          <img alt="" className="side-nav-logo" src={sidebarLogo} />
        </Link>
      </div>

      <Nav className="flex-column pt-2">
        <NavItem title="Dashboard" link="/dashboard" Icon={AiOutlineHome} />
        <NavItem title="Profile" link="/profile" Icon={CgProfile} />
        <NavItem title="Setting" link="/setting" Icon={FiSettings} />
      </Nav>

      <div className="side-bar-bottom position-fixed bottom-0 my-4">
        <span style={{ cursor: "pointer" }} className='me-3'>
          <FiSettings className="side-bar-item-icon" />
          <span className="link-item-caption">Setting</span>
        </span>
        <span style={{ cursor: "pointer" }}>
          <AiOutlineLogout className="side-bar-item-icon" />
          <span className="link-item-caption">Logout</span>
        </span>
      </div>
    </div>
  );
}

export default SideBar;
