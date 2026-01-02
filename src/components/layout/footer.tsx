import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border mt-auto">
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 max-w-sm">
            <div className="flex items-center gap-3">
            <img src="/clientreachai.logo.png" alt="ClientReach.ai Logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col leading-none ml-[-10px]">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Client</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white  mt-[-10px]">
                Reach<span className="text-brand-500">.ai</span>
              </span>
            </div>
          </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed py-2">
              Client Reach AI provides a digital workforce of AI agents that work together to increase revenue without adding headcount.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-3">
                <li>
                  <Link
                    href="/ai-agents"
                    className="hover:underline hover:text-brand-500"
                  >
                    AI Agents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/discover"
                    className="hover:underline hover:text-brand-500"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newsletter"
                    className="hover:underline hover:text-brand-500"
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Company
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="hover:underline hover:text-brand-500"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:underline hover:text-brand-500"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/discover"
                    className="hover:underline hover:text-brand-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-3">
                <li>
                  <a href="#" className="hover:underline hover:text-brand-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-brand-500">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-800 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2026{" "}
            <a href="https://clientreach.ai/" className="hover:underline">
              ClientReach.ai™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
