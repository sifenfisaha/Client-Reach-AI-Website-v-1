# Chatbot Debugging Guide

## ✅ Changes Made

1. **Added comprehensive logging** to API route (`src/app/api/chat/route.ts`)
2. **Improved error handling** in chat widget (`public/chat-widget.js`)
3. **Set Node.js runtime** (required for streaming)
4. **Verified API key** exists in `.env.local`

## 🔍 Diagnostic Steps

### Step 1: Restart Development Server

**CRITICAL:** The server must be restarted to:
- Load the new logging code
- Pick up environment variables from `.env.local`

```bash
# Stop the current server (Ctrl+C)
# Then restart:
pnpm dev
```

### Step 2: Check Server Logs

When you send a message, you should see detailed logs in your terminal:

```
========== NEW CHAT REQUEST ==========
Time: [timestamp]
✅ API Key present: sk-proj-B8...
📝 Parsing request body...
💬 Conversation history: X messages
🤖 Calling OpenAI API...
✅ OpenAI response initiated
⏱️ Total time: XXXms
```

**OR if there's an error:**

```
========== CHAT API ERROR ==========
Error Type: [error type]
Error Message: [error message]
Error Stack: [stack trace]
```

### Step 3: Test the API Directly

Open a new terminal and test the API endpoint:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}]}"
```

**What to look for:**
- Status code (200 = success, 500 = error)
- Response body (should show streaming data or error message)

### Step 4: Check Browser Console

Open browser DevTools (F12) → Console tab

**Look for:**
- Any red error messages
- Network request status
- Chat widget errors

### Step 5: Check Network Tab

1. Open DevTools → Network tab
2. Send a message in the chat
3. Find the `/api/chat` request
4. Click on it and check:
   - **Status:** Should be 200 (not 500)
   - **Response:** Should show streaming data
   - **Headers:** Check Content-Type

## 🐛 Common Issues & Fixes

### Issue 1: "OPENAI_API_KEY is not set"

**Symptom:** Server log shows "❌ OPENAI_API_KEY is not set!"

**Fix:**
1. Verify `.env.local` exists in root directory
2. Check it contains: `OPENAI_API_KEY=sk-...`
3. **Restart the dev server**
4. Verify in server logs: "✅ API Key present: sk-proj-B8..."

### Issue 2: API Key Invalid or Expired

**Symptom:** Error message mentions "authentication" or "invalid API key"

**Fix:**
1. Verify API key is correct in `.env.local`
2. Check OpenAI dashboard for API key status
3. Ensure no extra spaces or quotes around the key
4. Try regenerating the API key if needed

### Issue 3: Rate Limit Exceeded

**Symptom:** Error mentions "rate limit" or "quota"

**Fix:**
1. Check OpenAI dashboard for usage/quota
2. Wait a few minutes and try again
3. Consider upgrading OpenAI plan if needed

### Issue 4: Streaming Not Working

**Symptom:** Response appears but doesn't stream token-by-token

**Fix:**
- This is okay - the widget falls back to non-streaming mode
- The response should still appear, just all at once

### Issue 5: 500 Internal Server Error

**Symptom:** Browser console shows 500 error

**Action:**
1. **Check server terminal logs** - they will show the exact error
2. Share the error message from server logs
3. Common causes:
   - Missing API key
   - Invalid API key
   - Network issues
   - OpenAI API down

## 📊 What to Report

If the issue persists, please provide:

1. **Server Terminal Logs:**
   - Copy the entire log output when you send a message
   - Look for the "========== NEW CHAT REQUEST ==========" section

2. **Browser Console Errors:**
   - Any red error messages
   - Network request details

3. **Network Tab Details:**
   - Status code of `/api/chat` request
   - Response preview (if any)

4. **Environment Check:**
   - Is `.env.local` present? (Yes/No)
   - Did you restart the server? (Yes/No)
   - What does the server log show for "API Key present"?

## 🎯 Expected Behavior After Fix

1. User sends message
2. Typing indicator appears
3. Server logs show successful API call
4. Response streams in token-by-token (or appears all at once)
5. Complete response displays in chat
6. No console errors

## 🔧 Quick Test

After restarting the server, try this in the chat:

**Message:** "What services do you offer?"

**Expected Response:** The bot should explain ClientReach.ai services including Sales AI Agents, Support AI Agents, and Operational Excellence.

---

**Next Steps:**
1. Restart your dev server
2. Send a test message
3. Check server logs
4. Report findings if issue persists

