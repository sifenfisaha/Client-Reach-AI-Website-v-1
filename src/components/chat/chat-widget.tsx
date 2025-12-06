"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const isUserScrollingRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent hydration errors by only rendering on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const { messages, status, sendMessage } = useChat({
    baseURL: "/api/chat",
  } as any);

  // Check if user is at bottom of scroll container with tighter threshold
  const checkIfAtBottom = () => {
    if (!messagesContainerRef.current) return true;
    const container = messagesContainerRef.current;
    const threshold = 50; // Tighter 50px threshold for better detection
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    return distanceFromBottom <= threshold;
  };

  // Handle scroll events to detect user scrolling vs programmatic scrolling
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isOpen) return;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      const scrollDifference = Math.abs(
        currentScrollTop - lastScrollTopRef.current
      );

      // If scroll difference is significant (> 5px), it's likely user-initiated
      if (scrollDifference > 5) {
        isUserScrollingRef.current = true;

        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Check if user scrolled to bottom
        const atBottom = checkIfAtBottom();
        if (atBottom) {
          // User scrolled back to bottom - resume auto-scroll after a brief delay
          scrollTimeoutRef.current = setTimeout(() => {
            setShouldAutoScroll(true);
            isUserScrollingRef.current = false;
          }, 300);
        } else {
          // User scrolled away from bottom - disable auto-scroll
          setShouldAutoScroll(false);
          scrollTimeoutRef.current = setTimeout(() => {
            isUserScrollingRef.current = false;
          }, 500);
        }
      }

      lastScrollTopRef.current = currentScrollTop;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Auto-scroll to bottom only if user is at bottom and not manually scrolling
  useEffect(() => {
    if (
      isOpen &&
      messagesEndRef.current &&
      shouldAutoScroll &&
      !isUserScrollingRef.current
    ) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        if (
          messagesEndRef.current &&
          shouldAutoScroll &&
          !isUserScrollingRef.current
        ) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, [messages, isOpen, shouldAutoScroll]);

  // Reset scroll position when chat opens
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      setShouldAutoScroll(true);
      isUserScrollingRef.current = false;
      lastScrollTopRef.current = 0;
      // Scroll to bottom when opening
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [isOpen]);

  // Hide welcome bubble after 5 seconds
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowWelcome(false);
    }
  };

  const isLoading = status !== "ready";

  // Check if assistant is currently streaming a response (has started typing)
  // Hide loading indicator once assistant message content appears
  const lastMessage = messages[messages.length - 1];
  const isStreaming =
    isLoading &&
    lastMessage &&
    lastMessage.role === "assistant" &&
    lastMessage.parts?.some(
      (part: any) => part.type === "text" && part.text && part.text.trim().length > 0
    );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Welcome Bubble */}
      {showWelcome && !isOpen && (
        <div className="fixed bottom-24 right-5 z-[999998] animate-fade-in-up">
          <div className="bg-white dark:bg-dark-card text-gray-900 dark:text-white px-4 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-dark-border relative max-w-xs">
            <p className="text-sm whitespace-nowrap">👋 Have any questions?</p>
            <div className="absolute bottom-0 right-6 w-3 h-3 bg-white dark:bg-dark-card border-r border-b border-gray-200 dark:border-dark-border transform rotate-45 -mb-1.5"></div>
          </div>
        </div>
      )}

      {/* Chat Button - Hidden on mobile when widget is open, visible on desktop always */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 z-[999999] w-14 h-14 md:w-16 md:h-16 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? "hidden md:flex" : "flex"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7" />
        ) : (
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-24 md:right-5 md:w-[380px] md:h-[550px] w-full h-full md:rounded-2xl rounded-none z-[999998] bg-white dark:bg-dark-card shadow-2xl border border-gray-200 dark:border-dark-border flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-brand-500 text-white px-5 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">ClientReach AI</h3>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-brand-600 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-brand-500 opacity-50" />
                <p className="text-sm">
                  Hi! I'm Reach, your AI assistant. How can I help you today?
                </p>
              </div>
            ) : (
              messages.map((message) => {
                // Extract text content from message parts
                let textContent =
                  message.parts
                    ?.filter((part: any) => part.type === "text")
                    .map((part: any) => part.text)
                    .join("") || "";

                // Strip markdown formatting to make it feel more natural and human
                if (message.role === "assistant") {
                  // Remove bold (**text** or __text__)
                  textContent = textContent.replace(/\*\*(.*?)\*\*/g, "$1");
                  textContent = textContent.replace(/__(.*?)__/g, "$1");

                  // Remove headers (# Header, ## Header, ### Header)
                  textContent = textContent.replace(/^#{1,6}\s+/gm, "");

                  // Remove italic (*text* or _text_) but keep the text
                  textContent = textContent.replace(/\*(.*?)\*/g, "$1");
                  textContent = textContent.replace(/_(.*?)_/g, "$1");

                  // Remove code blocks (```code```)
                  textContent = textContent.replace(/```[\s\S]*?```/g, "");

                  // Remove inline code (`code`)
                  textContent = textContent.replace(/`([^`]+)`/g, "$1");

                  // Remove links but keep the text [text](url) -> text
                  textContent = textContent.replace(
                    /\[([^\]]+)\]\([^\)]+\)/g,
                    "$1"
                  );

                  // Clean up extra whitespace
                  textContent = textContent.replace(/\n{3,}/g, "\n\n");
                  textContent = textContent.trim();
                }

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-brand-500 text-white rounded-br-md"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"
                      }`}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {textContent}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Loading Indicator - Only show when waiting for response, not when streaming */}
            {isLoading && !isStreaming && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <form
            onSubmit={onSubmit}
            className="border-t border-gray-200 dark:border-dark-border p-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                autoFocus
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
