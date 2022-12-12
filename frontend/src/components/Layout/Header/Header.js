import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import "./SideNav.css"

const Header = () => {
  const { openSidebar } = useGlobalContext();
  return (
    <main>
      {/* console.log('header'); */}
      <button onClick={openSidebar} className="sidebar-toggle">
        <FaBars />
      </button>
     
    </main>
  );
};

export default Header;
