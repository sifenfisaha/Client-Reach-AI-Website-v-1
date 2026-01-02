"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Phone } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { openCalendlyPopup } from "@/utils/calendly";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/#" },
    { name: "About", path: "/about" },
    { name: "AI Agents", path: "/ai-agents" },
    { name: "Discover", path: "/discover" },
    { name: "Newsletter", path: "/newsletter" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-100 dark:border-dark-border bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <div className="flex items-center gap-3">
            <img src="/clientreachai.logo.png" alt="ClientReach.ai Logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col leading-none ml-[-10px]">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Client
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white  mt-[-10px]">
                Reach<span className="text-brand-500">.ai</span>
              </span>
            </div>
          </div>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse items-center">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={openCalendlyPopup}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-brand-500 text-white font-medium rounded-full hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:scale-105"
          >
            <Phone size={18} />
            Book a Call
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded md:p-0 transition-colors ${
                    isActive(link.path)
                      ? "text-brand-500 bg-brand-50 md:bg-transparent dark:text-brand-400"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-brand-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="md:hidden mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openCalendlyPopup();
                }}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-brand-500 text-white font-medium rounded-xl hover:bg-brand-600 transition-colors"
              >
                <Phone size={18} />
                Book a Call
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
