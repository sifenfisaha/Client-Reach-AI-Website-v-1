/**
 * ClientReach AI Chat Widget
 * A fully customizable, embeddable chatbot widget
 * Usage: <script src="chat-widget.js" data-name="AI" data-primary="#14A3F6" data-welcome="Have any questions?"></script>
 */

(function () {
  "use strict";

  // Get configuration from script tag
  const script = document.currentScript;
  const config = {
    name: script?.getAttribute("data-name") || "AI",
    primary: script?.getAttribute("data-primary") || "#14A3F6",
    welcome: script?.getAttribute("data-welcome") || "Have any questions?",
    endpoint:
      script?.getAttribute("data-endpoint") ||
      "https://your-endpoint-here.com/chat",
  };

  // Detect theme (dark mode) - check website theme first, then system
  const isDarkMode = () => {
    // Check if website has dark class on html or body
    const htmlDark = document.documentElement.classList.contains("dark");
    const bodyDark = document.body?.classList.contains("dark");

    if (htmlDark || bodyDark) {
      console.log("[ClientReach Widget] Dark mode detected from website class");
      return true;
    }

    // Fall back to system preference
    const systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log(
      "[ClientReach Widget] Theme detection - HTML dark:",
      htmlDark,
      "| Body dark:",
      bodyDark,
      "| System dark:",
      systemDark
    );
    return systemDark;
  };

  // Theme colors
  const getTheme = () => {
    const dark = isDarkMode();
    return {
      bg: dark ? "#1a1a1a" : "#ffffff",
      text: dark ? "#e5e5e5" : "#1a1a1a",
      border: dark ? "#333333" : "#e5e5e5",
      inputBg: dark ? "#2a2a2a" : "#f5f5f5",
      userBubble: config.primary,
      botBubble: dark ? "#2a2a2a" : "#f0f0f0",
      botText: dark ? "#e5e5e5" : "#1a1a1a",
      shadow: dark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.1)",
    };
  };

  // Create widget container
  const container = document.createElement("div");
  container.id = "clientreach-chat-widget";
  document.body.appendChild(container);

  // Inject styles
  const injectStyles = () => {
    // Remove any existing widget styles first
    const existingStyle = document.getElementById("cr-widget-styles");
    if (existingStyle) {
      existingStyle.remove();
    }

    const theme = getTheme();
    const style = document.createElement("style");
    style.id = "cr-widget-styles"; // Add unique ID
    style.textContent = `
      #clientreach-chat-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }

      .cr-chat-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: ${config.primary};
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px ${theme.shadow};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        position: relative;
      }

      .cr-chat-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px ${theme.shadow};
      }

      .cr-chat-button svg {
        width: 28px;
        height: 28px;
        fill: white;
      }

      .cr-welcome-bubble {
        position: absolute;
        bottom: 70px;
        right: 0;
        background: ${theme.bg};
        color: ${theme.text};
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px ${theme.shadow};
        white-space: nowrap;
        font-size: 14px;
        animation: cr-slide-up 0.3s ease;
        border: 1px solid ${theme.border};
      }

      .cr-welcome-bubble::after {
        content: '';
        position: absolute;
        bottom: -6px;
        right: 20px;
        width: 12px;
        height: 12px;
        background: ${theme.bg};
        transform: rotate(45deg);
        border-right: 1px solid ${theme.border};
        border-bottom: 1px solid ${theme.border};
      }

      .cr-chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        height: 550px;
        background: ${theme.bg};
        border-radius: 16px;
        box-shadow: 0 8px 32px ${theme.shadow};
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: cr-fade-in 0.3s ease;
        border: 1px solid ${theme.border};
      }

      .cr-chat-header {
        background: ${config.primary};
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .cr-chat-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }

      .cr-close-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.9;
        transition: opacity 0.2s;
      }

      .cr-close-btn:hover {
        opacity: 1;
      }

      .cr-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .cr-messages::-webkit-scrollbar {
        width: 6px;
      }

      .cr-messages::-webkit-scrollbar-track {
        background: transparent;
      }

      .cr-messages::-webkit-scrollbar-thumb {
        background: ${theme.border};
        border-radius: 3px;
      }

      .cr-message {
        display: flex;
        animation: cr-slide-up 0.3s ease;
      }

      .cr-message.user {
        justify-content: flex-end;
      }

      .cr-message-bubble {
        max-width: 75%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.6;
        word-wrap: break-word;
      }

      .cr-message-bubble p {
        margin: 0 0 14px 0;
        padding: 0;
        line-height: 1.7;
      }

      .cr-message-bubble p:last-child {
        margin-bottom: 0;
      }

      .cr-message-bubble p:first-child {
        margin-top: 0;
      }

      .cr-message-bubble br {
        line-height: 1.8;
      }

      .cr-message-bubble .cr-list-item {
        margin: 10px 0;
        line-height: 1.7;
        padding-left: 4px;
      }

      .cr-message-bubble .cr-list-item:first-child {
        margin-top: 4px;
      }

      .cr-message-bubble .cr-list-item:last-child {
        margin-bottom: 4px;
      }

      .cr-message-bubble p + .cr-list-item,
      .cr-message-bubble .cr-list-item + p {
        margin-top: 12px;
      }

      .cr-message.user .cr-message-bubble {
        background: ${theme.userBubble};
        color: white;
        border-bottom-right-radius: 4px;
      }

      .cr-message.bot .cr-message-bubble {
        background: ${theme.botBubble};
        color: ${theme.botText};
        border-bottom-left-radius: 4px;
      }

      .cr-input-container {
        padding: 16px;
        border-top: 1px solid ${theme.border};
        display: flex;
        gap: 8px;
      }

      .cr-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid ${theme.border};
        border-radius: 24px;
        background: ${theme.inputBg};
        color: ${theme.text};
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;
      }

      .cr-input:focus {
        border-color: ${config.primary};
      }

      .cr-send-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: ${config.primary};
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .cr-send-btn:hover {
        transform: scale(1.05);
      }

      .cr-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .cr-send-btn svg {
        width: 20px;
        height: 20px;
        fill: white;
      }

      .cr-typing {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
      }

      .cr-typing span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${theme.text};
        opacity: 0.4;
        animation: cr-typing 1.4s infinite;
      }

      .cr-typing span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .cr-typing span:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes cr-fade-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes cr-slide-up {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes cr-typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }

      @media (max-width: 768px) {
        #clientreach-chat-widget {
          bottom: 10px;
          right: 10px;
        }

        .cr-chat-button {
          width: 56px;
          height: 56px;
        }

        .cr-chat-button svg {
          width: 24px;
          height: 24px;
        }

        .cr-chat-window {
          position: fixed;
          width: 100vw;
          height: 100vh;
          bottom: 0;
          right: 0;
          left: 0;
          top: 0;
          border-radius: 0;
          max-width: 100%;
          max-height: 100%;
        }

        .cr-welcome-bubble {
          bottom: 66px;
          right: 0;
          max-width: calc(100vw - 80px);
          white-space: normal;
        }

        .cr-messages {
          padding: 12px;
        }

        .cr-input-container {
          padding: 12px;
        }

        .cr-message-bubble {
          max-width: 85%;
          font-size: 14px;
        }
      }

      .cr-hidden {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  // Create widget HTML
  const createWidget = () => {
    container.innerHTML = `
      <div class="cr-welcome-bubble" id="cr-welcome">
        ${config.welcome}
      </div>
      
      <button class="cr-chat-button" id="cr-chat-btn" aria-label="Open chat">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      </button>

      <div class="cr-chat-window cr-hidden" id="cr-chat-window">
        <div class="cr-chat-header">
          <h3>ClientReach AI</h3>
          <button class="cr-close-btn" id="cr-close-btn" aria-label="Close chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="cr-messages" id="cr-messages"></div>
        
        <div class="cr-input-container">
          <input 
            type="text" 
            class="cr-input" 
            id="cr-input" 
            placeholder="Type your message..."
            autocomplete="off"
          />
          <button class="cr-send-btn" id="cr-send-btn" aria-label="Send message">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  };

  // Widget state
  let isOpen = false;
  let isTyping = false;
  let conversationHistory = [];

  // DOM elements
  let chatBtn,
    chatWindow,
    closeBtn,
    messagesContainer,
    input,
    sendBtn,
    welcomeBubble;

  // Initialize DOM references
  const initElements = () => {
    chatBtn = document.getElementById("cr-chat-btn");
    chatWindow = document.getElementById("cr-chat-window");
    closeBtn = document.getElementById("cr-close-btn");
    messagesContainer = document.getElementById("cr-messages");
    input = document.getElementById("cr-input");
    sendBtn = document.getElementById("cr-send-btn");
    welcomeBubble = document.getElementById("cr-welcome");
  };

  // Add user message
  const addUserMessage = (text) => {
    const messageEl = document.createElement("div");
    messageEl.className = "cr-message user";
    messageEl.innerHTML = `<div class="cr-message-bubble">${escapeHtml(
      text
    )}</div>`;
    messagesContainer.appendChild(messageEl);
    scrollToBottom();
  };

  // Add bot message
  const addBotMessage = (text, isStreaming = false) => {
    // Check if there's already a streaming message element
    let messageEl = document.getElementById("cr-streaming-message");

    if (!messageEl) {
      // Create new message element
      messageEl = document.createElement("div");
      messageEl.className = "cr-message bot";
      messageEl.id = "cr-streaming-message";
      const formattedText = formatBotMessage(text);
      messageEl.innerHTML = `<div class="cr-message-bubble">${formattedText}</div>`;
      messagesContainer.appendChild(messageEl);
    } else {
      // Update existing streaming message
      const bubble = messageEl.querySelector(".cr-message-bubble");
      if (bubble) {
        const formattedText = formatBotMessage(text);
        bubble.innerHTML = formattedText;
      }
    }

    // If streaming is complete, remove the ID so next message creates a new element
    if (!isStreaming) {
      messageEl.removeAttribute("id");
    }

    scrollToBottom();
  };

  // Show typing indicator
  const showTyping = () => {
    if (isTyping) return;
    isTyping = true;
    const typingEl = document.createElement("div");
    typingEl.className = "cr-message bot";
    typingEl.id = "cr-typing-indicator";
    typingEl.innerHTML = `
      <div class="cr-message-bubble cr-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    scrollToBottom();
  };

  // Hide typing indicator
  const hideTyping = () => {
    isTyping = false;
    const typingEl = document.getElementById("cr-typing-indicator");
    if (typingEl) typingEl.remove();
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  };

  // Escape HTML
  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  // Format bot message text - convert markdown-like formatting to readable text
  const formatBotMessage = (text) => {
    if (!text) return "";

    // First escape HTML to prevent XSS
    text = escapeHtml(text);

    // Remove markdown headers (###, ##, #) - but keep the text
    text = text.replace(/^#{1,6}\s+/gm, "");

    // Remove markdown bold (**text** or __text__)
    text = text.replace(/\*\*(.*?)\*\*/g, "$1");
    text = text.replace(/__(.*?)__/g, "$1");

    // Normalize line endings
    text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    // UNIVERSAL: Detect and split numbered items that are on the same line
    // Pattern: "1. Item: description2. Item: description" -> split into separate lines
    text = text.replace(/(\d+\.\s+[^0-9\n]+?)(?=\s*\d+\.\s+)/g, "$1\n\n");

    // Also handle cases where numbered items are separated by text without line breaks
    // Pattern: "text1. Item: description2. Item:" -> add line breaks
    text = text.replace(/([^\n])(\d+\.\s+)/g, "$1\n\n$2");

    // UNIVERSAL: Detect and split numbered items that appear together
    // More comprehensive pattern matching
    text = text.replace(/(\d+\.\s+[^0-9\n]{10,}?)(?=\d+\.\s+)/g, "$1\n\n");

    // UNIVERSAL: Detect patterns like "Concept: descriptionConcept:" and split them
    // Pattern: "Sales AI Agents: descriptionSupport AI Agents:" -> split
    text = text.replace(
      /([A-Z][^:]{5,}:\s+[^:\n]{10,}?)(?=[A-Z][^:]{5,}:\s+)/g,
      "$1\n\n"
    );

    // UNIVERSAL: Add line breaks after sentences ending with periods/exclamation/question marks
    // But be smart - don't break on abbreviations or decimals
    text = text.replace(/([.!?])\s+([A-Z][a-z])/g, "$1\n\n$2");

    // Split into lines for processing
    const lines = text.split("\n");
    const processedLines = [];
    let previousWasListItem = false;
    let previousWasEmpty = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmedLine = line.trim();

      // Handle empty lines - preserve for spacing
      if (!trimmedLine) {
        if (previousWasListItem && !previousWasEmpty) {
          processedLines.push(""); // Add spacing after list
        }
        previousWasEmpty = true;
        previousWasListItem = false;
        continue;
      }

      previousWasEmpty = false;

      // Check if this is a list item (at start of line or after text)
      const isBulletList = /^[-*]\s+/.test(trimmedLine);
      // More flexible numbered list detection - can be anywhere in line
      const hasNumberedItem = /(\d+\.\s+[^0-9\n]+)/.test(trimmedLine);
      const isNumberedList = /^\d+\.\s+/.test(trimmedLine);
      const isListItem = isBulletList || isNumberedList;

      // If line contains numbered item but doesn't start with it, split it
      if (hasNumberedItem && !isNumberedList) {
        // Split on numbered items
        const parts = trimmedLine.split(/(\d+\.\s+)/);
        let currentPart = "";
        for (let j = 0; j < parts.length; j++) {
          if (/^\d+\.\s+$/.test(parts[j])) {
            // This is a number prefix
            if (currentPart) {
              processedLines.push(currentPart.trim());
              currentPart = "";
            }
            currentPart = parts[j];
          } else if (currentPart && /^\d+\.\s+/.test(currentPart)) {
            // Continue the numbered item
            currentPart += parts[j];
            processedLines.push(currentPart.trim());
            currentPart = "";
          } else {
            currentPart += parts[j];
          }
        }
        if (currentPart) {
          processedLines.push(currentPart.trim());
        }
        previousWasListItem = true;
        continue;
      }

      if (isListItem) {
        // Add spacing before list if previous wasn't a list item
        if (!previousWasListItem && processedLines.length > 0) {
          processedLines.push("");
        }

        // Convert to clean format
        if (isBulletList) {
          line = trimmedLine.replace(/^[-*]\s+/, "• ");
        } else if (isNumberedList) {
          line = trimmedLine.replace(/^(\d+)\.\s+/, "$1. ");
        }
        processedLines.push(line);
        previousWasListItem = true;
      } else {
        // Regular text line
        if (previousWasListItem) {
          processedLines.push(""); // Add spacing after list
        }

        // Clean up extra spaces
        line = trimmedLine.replace(/\s+/g, " ");
        processedLines.push(line);
        previousWasListItem = false;
      }
    }

    // Join lines with double line breaks for paragraph separation
    let result = processedLines.join("\n");

    // UNIVERSAL: Ensure proper spacing - add line breaks where needed
    // This is applied AFTER initial processing to catch any missed patterns

    // Add spacing after periods that end sentences (but not in the middle of URLs or numbers)
    result = result.replace(/([.!?])\s+([A-Z][a-z])/g, "$1\n\n$2");

    // Ensure numbered items always have spacing
    result = result.replace(/(\d+\.\s+[^\n]+?)(?=\d+\.\s+)/g, "$1\n\n");

    // Split by double line breaks to get paragraphs/sections
    const sections = result.split(/\n\n+/).filter((s) => s.trim().length > 0);

    if (sections.length === 0) return "";

    // Process each section
    const formattedSections = sections
      .map((section) => {
        section = section.trim();
        if (!section) return null;

        const sectionLines = section
          .split("\n")
          .filter((l) => l.trim().length > 0);

        // Check if section contains list items
        const hasListItems = sectionLines.some((line) =>
          /^[•\d]\.\s/.test(line.trim())
        );

        if (hasListItems) {
          // Format as list with proper spacing
          const formattedItems = [];
          let previousWasListItem = false;

          sectionLines.forEach((line) => {
            line = line.trim();
            if (!line) return;

            const isListItem = /^[•\d]\.\s/.test(line);

            if (isListItem) {
              // Add spacing before list item if previous wasn't a list item
              if (!previousWasListItem && formattedItems.length > 0) {
                formattedItems.push("");
              }
              formattedItems.push(`<div class="cr-list-item">${line}</div>`);
              previousWasListItem = true;
            } else {
              // Regular text - add spacing if previous was list item
              if (previousWasListItem) {
                formattedItems.push("");
              }
              formattedItems.push(`<p>${line}</p>`);
              previousWasListItem = false;
            }
          });

          return formattedItems.join("");
        } else {
          // Regular paragraph - but check if it contains multiple sentences that should be separated
          let paragraphText = sectionLines
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();

          // If paragraph is very long (over 200 chars), try to break it into smaller paragraphs
          if (paragraphText.length > 200) {
            // Split on sentence endings
            const sentences = paragraphText.split(/([.!?]\s+)/);
            const formattedSentences = [];
            let currentGroup = "";

            for (let i = 0; i < sentences.length; i++) {
              currentGroup += sentences[i];
              // Group 2-3 sentences together, then break
              if (currentGroup.length > 150 && /[.!?]\s*$/.test(currentGroup)) {
                formattedSentences.push(currentGroup.trim());
                currentGroup = "";
              }
            }
            if (currentGroup) {
              formattedSentences.push(currentGroup.trim());
            }

            if (formattedSentences.length > 1) {
              return formattedSentences.map((s) => `<p>${s}</p>`).join("");
            }
          }

          return `<p>${paragraphText}</p>`;
        }
      })
      .filter((s) => s && s.length > 0);

    return formattedSections.join("");
  };

  // Send message to API with streaming support
  const sendMessage = async (message) => {
    try {
      // Add user message to conversation history
      conversationHistory.push({
        role: "user",
        content: message,
      });

      // Log what we're sending
      console.log("📤 Sending to API:", {
        endpoint: config.endpoint,
        messages: conversationHistory,
        messagesCount: conversationHistory.length,
        lastMessage: conversationHistory[conversationHistory.length - 1],
      });

      const requestBody = {
        messages: conversationHistory,
      };

      console.log("📤 Request body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Response status:", response.status, response.statusText);

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = "Network response was not ok";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
          console.error("API Error Response:", errorData);
        } catch (e) {
          console.error(
            "API Error Status:",
            response.status,
            response.statusText
          );
        }
        throw new Error(errorMessage);
      }

      // Check if response is streaming (text/event-stream, application/x-ndjson, or text/plain)
      const contentType = response.headers.get("content-type") || "";
      const isStreaming =
        contentType.includes("text/event-stream") ||
        contentType.includes("application/x-ndjson") ||
        contentType.includes("text/plain") ||
        contentType.includes("text/");

      if (isStreaming) {
        // Handle streaming response (Vercel AI SDK format)
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        let buffer = "";

        // Hide typing indicator since we're streaming
        hideTyping();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // Keep incomplete line in buffer

          for (const line of lines) {
            if (!line.trim()) continue;

            // Try to parse as data stream format first (for compatibility)
            let textChunk = null;

            // Vercel AI SDK data stream format: "0: {...}" or "1: {...}"
            if (/^\d+:/.test(line)) {
              try {
                const colonIndex = line.indexOf(":");
                const data = JSON.parse(line.slice(colonIndex + 1));
                if (data.type === "text-delta" && data.textDelta) {
                  textChunk = data.textDelta;
                } else if (data.type === "finish") {
                  break;
                }
              } catch (e) {
                // Not JSON, treat as plain text
                textChunk = line;
              }
            }
            // SSE format: "data: {...}"
            else if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === "text-delta" && data.textDelta) {
                  textChunk = data.textDelta;
                } else if (data.type === "finish") {
                  break;
                }
              } catch (e) {
                textChunk = line;
              }
            }
            // Plain text chunk (toTextStreamResponse format)
            else {
              textChunk = line;
            }

            // Append text chunk if found
            if (textChunk) {
              fullText += textChunk;
              addBotMessage(fullText, true);
            }
          }
        }

        // Add assistant message to conversation history
        conversationHistory.push({
          role: "assistant",
          content: fullText,
        });

        // Finalize the message (remove streaming flag)
        addBotMessage(fullText, false);
        return fullText;
      } else {
        // Fallback: handle non-streaming response
        const data = await response.json();
        const reply =
          data.reply || data.text || "Sorry, I didn't understand that.";

        // Add assistant message to conversation history
        conversationHistory.push({
          role: "assistant",
          content: reply,
        });

        return reply;
      }
    } catch (error) {
      console.error("Chat widget error:", error);
      const errorMessage =
        error.message ||
        "Sorry, I'm having trouble connecting. Please try again later.";
      // Return error message so it can be displayed to user
      return errorMessage;
    }
  };

  // Handle send
  const handleSend = async () => {
    const message = input.value.trim();
    if (!message || isTyping) return;

    // Add user message to UI
    addUserMessage(message);
    input.value = "";
    sendBtn.disabled = true;

    // Show typing indicator
    showTyping();

    try {
      // Send to API (handles streaming internally)
      const reply = await sendMessage(message);

      // If sendMessage returns a string (error case), display it
      if (reply && typeof reply === "string" && !isTyping) {
        // Check if this is an error message (not a successful response)
        // If streaming worked, reply will be the full text and we don't need to add it again
        // But if it's an error, we need to display it
        if (
          reply.includes("error") ||
          reply.includes("trouble") ||
          reply.includes("Sorry")
        ) {
          addBotMessage(reply, false);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg =
        error.message ||
        "Sorry, I'm having trouble connecting. Please try again later.";
      addBotMessage(errorMsg, false);
    } finally {
      // Hide typing indicator
      hideTyping();
      sendBtn.disabled = false;
      input.focus();
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatWindow.classList.remove("cr-hidden");
      welcomeBubble.classList.add("cr-hidden");
      input.focus();

      // Send initial greeting if no messages
      if (messagesContainer.children.length === 0) {
        setTimeout(() => {
          const greeting = `Hi! I'm ${config.name}, your AI assistant. How can I help you today?`;
          addBotMessage(greeting, false);
          // Add greeting to conversation history
          conversationHistory.push({
            role: "assistant",
            content: greeting,
          });
        }, 300);
      }
    } else {
      chatWindow.classList.add("cr-hidden");
    }
  };

  // Event listeners
  const attachEvents = () => {
    chatBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);
    sendBtn.addEventListener("click", handleSend);

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    });

    // Hide welcome bubble after 5 seconds
    setTimeout(() => {
      welcomeBubble.classList.add("cr-hidden");
    }, 5000);

    // Watch for theme changes on the website
    const themeObserver = new MutationObserver(() => {
      // Re-inject styles with new theme (old styles will be auto-removed)
      injectStyles();
    });

    // Observe changes to the html element's class attribute
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also watch body element if it exists
    if (document.body) {
      themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    // Re-inject styles on system theme change (fallback)
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
          injectStyles();
        });
    }
  };

  // Initialize widget
  const init = () => {
    injectStyles();
    createWidget();
    initElements();
    attachEvents();
  };

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
