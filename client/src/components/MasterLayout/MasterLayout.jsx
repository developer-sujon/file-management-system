//External Lib Import
import React, { useState } from "react";

//Internal Lib Import
import Navigation from "./Navigation";
import SideBar from "./SideBar";

const MasterLayout = ({ children, title }) => {
  const [openMenu, setOpenMenu] = useState(true);
  return (
    <>
      <Navigation openMenu={openMenu} setOpenMenu={setOpenMenu} title={title} />
      <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className={openMenu ? "content" : "content-expand"}>{children}</div>
    </>
  );
};

export default MasterLayout;
