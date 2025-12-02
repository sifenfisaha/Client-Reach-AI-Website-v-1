"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
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
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white tracking-tight">
            ClientReach.ai
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse items-center">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            href="/discover"
            className="hidden md:flex text-white bg-brand-500 hover:bg-brand-600 focus:ring-4 focus:outline-none focus:ring-brand-100 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-all shadow-lg shadow-brand-500/20"
          >
            Book a Call
          </Link>

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
              <Link
                href="/discover"
                onClick={() => setIsOpen(false)}
                className="block w-full text-white bg-brand-500 hover:bg-brand-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Book a Call
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
