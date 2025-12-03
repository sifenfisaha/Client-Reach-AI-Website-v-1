/**
 * ClientReach AI Chat Widget
 * A fully customizable, embeddable chatbot widget
 * Usage: <script src="chat-widget.js" data-name="AI" data-primary="#14A3F6" data-welcome="Have any questions?"></script>
 */

(function () {
  'use strict';

  // Get configuration from script tag
  const script = document.currentScript;
  const config = {
    name: script?.getAttribute('data-name') || 'AI',
    primary: script?.getAttribute('data-primary') || '#14A3F6',
    welcome: script?.getAttribute('data-welcome') || 'Have any questions?',
    endpoint: script?.getAttribute('data-endpoint') || 'https://your-endpoint-here.com/chat',
  };

  // Detect theme (dark mode) - check website theme first, then system
  const isDarkMode = () => {
    // Check if website has dark class on html or body
    const htmlDark = document.documentElement.classList.contains('dark');
    const bodyDark = document.body?.classList.contains('dark');
    
    if (htmlDark || bodyDark) {
      console.log('[ClientReach Widget] Dark mode detected from website class');
      return true;
    }
    
    // Fall back to system preference
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('[ClientReach Widget] Theme detection - HTML dark:', htmlDark, '| Body dark:', bodyDark, '| System dark:', systemDark);
    return systemDark;
  };

  // Theme colors
  const getTheme = () => {
    const dark = isDarkMode();
    return {
      bg: dark ? '#1a1a1a' : '#ffffff',
      text: dark ? '#e5e5e5' : '#1a1a1a',
      border: dark ? '#333333' : '#e5e5e5',
      inputBg: dark ? '#2a2a2a' : '#f5f5f5',
      userBubble: config.primary,
      botBubble: dark ? '#2a2a2a' : '#f0f0f0',
      botText: dark ? '#e5e5e5' : '#1a1a1a',
      shadow: dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)',
    };
  };

  // Create widget container
  const container = document.createElement('div');
  container.id = 'clientreach-chat-widget';
  document.body.appendChild(container);

  // Inject styles
  const injectStyles = () => {
    // Remove any existing widget styles first
    const existingStyle = document.getElementById('cr-widget-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    const theme = getTheme();
    const style = document.createElement('style');
    style.id = 'cr-widget-styles'; // Add unique ID
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
        line-height: 1.5;
        word-wrap: break-word;
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

      @media (max-width: 480px) {
        .cr-chat-window {
          width: calc(100vw - 40px);
          height: calc(100vh - 100px);
          bottom: 80px;
          right: 20px;
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

  // DOM elements
  let chatBtn, chatWindow, closeBtn, messagesContainer, input, sendBtn, welcomeBubble;

  // Initialize DOM references
  const initElements = () => {
    chatBtn = document.getElementById('cr-chat-btn');
    chatWindow = document.getElementById('cr-chat-window');
    closeBtn = document.getElementById('cr-close-btn');
    messagesContainer = document.getElementById('cr-messages');
    input = document.getElementById('cr-input');
    sendBtn = document.getElementById('cr-send-btn');
    welcomeBubble = document.getElementById('cr-welcome');
  };

  // Add user message
  const addUserMessage = (text) => {
    const messageEl = document.createElement('div');
    messageEl.className = 'cr-message user';
    messageEl.innerHTML = `<div class="cr-message-bubble">${escapeHtml(text)}</div>`;
    messagesContainer.appendChild(messageEl);
    scrollToBottom();
  };

  // Add bot message
  const addBotMessage = (text) => {
    const messageEl = document.createElement('div');
    messageEl.className = 'cr-message bot';
    messageEl.innerHTML = `<div class="cr-message-bubble">${escapeHtml(text)}</div>`;
    messagesContainer.appendChild(messageEl);
    scrollToBottom();
  };

  // Show typing indicator
  const showTyping = () => {
    if (isTyping) return;
    isTyping = true;
    const typingEl = document.createElement('div');
    typingEl.className = 'cr-message bot';
    typingEl.id = 'cr-typing-indicator';
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
    const typingEl = document.getElementById('cr-typing-indicator');
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
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Send message to API
  const sendMessage = async (message) => {
    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.reply || 'Sorry, I didn\'t understand that.';
    } catch (error) {
      console.error('Chat widget error:', error);
      return 'Sorry, I\'m having trouble connecting. Please try again later.';
    }
  };

  // Handle send
  const handleSend = async () => {
    const message = input.value.trim();
    if (!message || isTyping) return;

    // Add user message
    addUserMessage(message);
    input.value = '';
    sendBtn.disabled = true;

    // Show typing
    showTyping();

    // Send to API
    const reply = await sendMessage(message);

    // Hide typing and show reply
    hideTyping();
    addBotMessage(reply);
    sendBtn.disabled = false;
    input.focus();
  };

  // Toggle chat window
  const toggleChat = () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatWindow.classList.remove('cr-hidden');
      welcomeBubble.classList.add('cr-hidden');
      input.focus();
      
      // Send initial greeting if no messages
      if (messagesContainer.children.length === 0) {
        setTimeout(() => {
          addBotMessage(`Hi! I'm ${config.name}, your AI assistant. How can I help you today?`);
        }, 300);
      }
    } else {
      chatWindow.classList.add('cr-hidden');
    }
  };

  // Event listeners
  const attachEvents = () => {
    chatBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', handleSend);
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    });

    // Hide welcome bubble after 5 seconds
    setTimeout(() => {
      welcomeBubble.classList.add('cr-hidden');
    }, 5000);

    // Watch for theme changes on the website
    const themeObserver = new MutationObserver(() => {
      // Re-inject styles with new theme (old styles will be auto-removed)
      injectStyles();
    });

    // Observe changes to the html element's class attribute
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Also watch body element if it exists
    if (document.body) {
      themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    // Re-inject styles on system theme change (fallback)
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
