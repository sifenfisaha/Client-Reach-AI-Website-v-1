"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export const DelayedPopup: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 40 seconds delay
    const timer = setTimeout(() => {
      setShow(true);
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-gray-200 dark:border-dark-border animate-fade-in-up">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowRight size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Unlock Hidden Revenue
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
            Don't let another lead slip away. Book your free AI audit today and
            discover exactly where you can scale.
          </p>
          <div className="space-y-3">
            <Link
              href="/discover"
              onClick={() => setShow(false)}
              className="block w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Book My Free Audit
            </Link>
            <button
              onClick={() => setShow(false)}
              className="block w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
