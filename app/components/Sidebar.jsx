"use client";

import Link from "next/link";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import {
  FaCodepen,
  FaComments,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import {
  TbLayoutDashboardFilled,
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const handleOutsideClick = (e) => {
    if (isMobile && isOpen && !e.target.closest('.sidebar-content')) {
      setIsOpen(false);
    }
  };

  // Get sidebar translation class based on state
  const getSidebarTranslateClass = () => {
    if (isOpen) return "translate-x-0";
    return isMobile ? "-translate-x-[85%]" : "";
  };

  return (
    <>      
      {isMobile && isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={handleOutsideClick}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
          aria-label="Close sidebar overlay"
        />
      )}      
      
      <div className={`sidebar-content fixed top-20 left-0 h-full bg-sky-50 transition-all duration-300 z-50 shadow-2xl ${getSidebarTranslateClass()}`}>
        <nav className="flex flex-col w-56 p-4 pr-12 space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-900 hover:text-indigo-600 text-lg p-2"
          >
            <TbLayoutDashboardFilled className="mr-2" />
           Dashboard
          </Link>
          <Link
            href="/page2"
            className="flex items-center text-gray-900 hover:text-indigo-600 text-lg p-2"
          >
            <SiGoogleclassroom className="mr-2" />
            Menu Item 2
          </Link>
          <Link
            href="/page3"
            className="flex items-center text-gray-900 hover:text-indigo-600 text-lg p-2"
          >
            <FaCodepen className="mr-2" />
            Menu Item 3
          </Link>
          <Link
            href="/page4"
            className="flex items-center text-gray-900 hover:text-indigo-600 text-lg p-2"
          >
            <FaComments className="mr-2" />
            Menu Item 4
          </Link>
          <Link
            href="/page5"
            className="flex items-center text-gray-900 hover:text-indigo-600 text-lg p-2"
          >
            <MdNotifications className="mr-2" />
            Menu Item 5
          </Link>
          <Link
            href="/page6"
            className="flex items-center text-gray-900 hover:text-indigo-600 text-lg p-2"
          >
            <FaQuestionCircle className="mr-2" />
            Menu Item 6
          </Link>
        </nav>
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-2 top-2 text-indigo-600 hover:text-indigo-700"
          >
            {isOpen ? (
              <TbLayoutSidebarLeftCollapseFilled className="w-6 h-6" />
            ) : (
              <TbLayoutSidebarLeftExpandFilled className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
