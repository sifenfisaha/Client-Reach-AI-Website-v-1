# ClientReach AI Chat Widget

A fully functional, embeddable chatbot widget for ClientReach.ai with automatic dark/light mode support and complete customization.

## Features

✨ **Modern Design**
- Clean, minimal UI inspired by Apple/Stripe
- Smooth animations and transitions
- Rounded, premium feel
- Responsive on all devices

🎨 **Theme Support**
- Automatic dark/light mode detection
- Matches system theme preferences
- Seamless theme switching

⚙️ **Fully Customizable**
- Custom brand colors
- Personalized welcome messages
- Custom bot name
- Configurable API endpoint

🚀 **Production Ready**
- Self-contained (no external dependencies)
- Pure vanilla JavaScript
- Optimized performance
- Clean, readable code

## Installation

### Option 1: Direct Embed (Recommended)

Add this script tag to your website, just before the closing `</body>` tag:

```html
<script 
  src="https://your-domain.com/chat-widget.js"
  data-name="AI"
  data-primary="#14A3F6"
  data-welcome="Have any questions?"
  data-endpoint="https://your-api-endpoint.com/chat"
></script>
```

### Option 2: Self-Hosted

1. Download `chat-widget.js`
2. Place it in your website's public folder
3. Add the script tag:

```html
<script 
  src="/chat-widget.js"
  data-name="AI"
  data-primary="#14A3F6"
  data-welcome="Have any questions?"
  data-endpoint="https://your-api-endpoint.com/chat"
></script>
```

## Configuration

### Data Attributes

| Attribute | Description | Default | Example |
|-----------|-------------|---------|---------|
| `data-name` | Bot name (short) | `"AI"` | `"AI"` or `"Assistant"` |
| `data-primary` | Brand color (hex) | `"#14A3F6"` | `"#FF5733"` |
| `data-welcome` | Welcome bubble text | `"Have any questions?"` | `"Need help?"` |
| `data-endpoint` | API endpoint URL | Required | `"https://api.example.com/chat"` |

### Example Configurations

**Minimal Setup:**
```html
<script 
  src="/chat-widget.js"
  data-endpoint="https://api.clientreach.ai/chat"
></script>
```

**Full Customization:**
```html
<script 
  src="/chat-widget.js"
  data-name="Reach"
  data-primary="#0066FF"
  data-welcome="👋 Need help with anything?"
  data-endpoint="https://api.clientreach.ai/chat"
></script>
```

**Dark Theme Optimized:**
```html
<script 
  src="/chat-widget.js"
  data-name="AI"
  data-primary="#00D9FF"
  data-welcome="How can I assist you today?"
  data-endpoint="https://api.clientreach.ai/chat"
></script>
```

## API Integration

### Endpoint Requirements

Your API endpoint should accept POST requests with this format:

**Request:**
```json
{
  "message": "User's message here"
}
```

**Response:**
```json
{
  "reply": "Bot's response here"
}
```

### Example API Handler (Node.js/Express)

```javascript
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  // Process message with your AI/logic
  const reply = await processMessage(message);
  
  res.json({ reply });
});
```

### Example with Antigravity AI Flow

```javascript
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    const response = await fetch('YOUR_ANTIGRAVITY_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    res.json({ reply: data.reply });
  } catch (error) {
    res.json({ reply: 'Sorry, something went wrong.' });
  }
});
```

## Widget Behavior

### First Load
1. Widget appears as a floating button in bottom-right corner
2. Welcome bubble shows above the button
3. Bubble auto-hides after 5 seconds

### User Interaction
1. Click button to open chat window
2. Chat window slides up with smooth animation
3. Bot sends initial greeting message
4. User can type and send messages
5. Bot shows typing indicator while processing
6. Responses appear with smooth animations

### Mobile Experience
- Chat window adapts to screen size
- Full-height on mobile devices
- Touch-friendly interface
- Smooth scrolling

## Styling & Customization

### Theme Detection
The widget automatically detects:
- System theme preference (dark/light)
- Theme changes in real-time
- Adapts colors accordingly

### Color Scheme

**Light Mode:**
- Background: White
- Text: Dark gray
- Borders: Light gray
- User bubbles: Brand color
- Bot bubbles: Light gray

**Dark Mode:**
- Background: Dark gray
- Text: Light gray
- Borders: Darker gray
- User bubbles: Brand color
- Bot bubbles: Medium gray

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

## Performance

- **File size:** ~15KB (uncompressed)
- **Load time:** <100ms
- **No external dependencies**
- **Minimal DOM impact**

## Troubleshooting

### Widget not appearing?
- Check that the script tag is before `</body>`
- Verify the script URL is correct
- Check browser console for errors

### API not working?
- Verify `data-endpoint` is correct
- Check CORS settings on your API
- Ensure API returns correct JSON format

### Theme not matching?
- Widget auto-detects system theme
- Force refresh the page
- Check browser theme settings

## Advanced Usage

### Programmatic Control

Access the widget via browser console:

```javascript
// The widget is self-contained and doesn't expose global APIs
// But you can interact with DOM elements:
document.getElementById('cr-chat-btn').click(); // Open chat
```

### Custom Styling

To override styles, add CSS after the widget script:

```html
<style>
  #clientreach-chat-widget {
    bottom: 30px !important;
    right: 30px !important;
  }
</style>
```

## Security

- All user input is escaped to prevent XSS
- HTTPS recommended for API endpoint
- No data stored locally
- No cookies used

## License

Proprietary - ClientReach.ai

## Support

For issues or questions:
- Email: support@clientreach.ai
- Website: https://clientreach.ai

---

**Made with ❤️ by ClientReach.ai**
