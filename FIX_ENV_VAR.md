# 🔧 Fix: OpenAI API Key Not Loading

## The Problem

Next.js is not reading the `OPENAI_API_KEY` from `.env.local`. This is a common issue that requires clearing the Next.js cache and restarting the server.

## ✅ Solution Steps

### Step 1: Stop Your Development Server

**IMPORTANT:** You MUST stop the server completely (Ctrl+C in the terminal where `pnpm dev` is running).

### Step 2: Clear Next.js Cache (Optional but Recommended)

```bash
# Delete the .next folder to clear cache
Remove-Item -Recurse -Force .next
```

**OR manually:**
- Delete the `.next` folder in your project root
- This clears Next.js's cached environment variables

### Step 3: Verify .env.local File

The `.env.local` file should be in the root directory (same level as `package.json`) and contain:

```
OPENAI_API_KEY=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
```

**Important:**
- No spaces around the `=`
- No quotes around the value
- No trailing spaces
- File must be named exactly `.env.local` (not `.env.local.txt`)

### Step 4: Restart Development Server

```bash
pnpm dev
```

### Step 5: Test Environment Variable

Open your browser and go to:
```
http://localhost:3000/api/test-env
```

You should see:
```json
{
  "openaiApiKeyExists": true,
  "openaiApiKeyPrefix": "sk-proj-B8...",
  ...
}
```

If `openaiApiKeyExists` is `false`, the environment variable is still not loading.

### Step 6: Test the Chatbot

1. Open `http://localhost:3000`
2. Click the chat widget
3. Send a message: "What services do you offer?"
4. Check server terminal logs - you should see:
   ```
   ✅ API Key present: sk-proj-B8...
   ```

## 🐛 If Still Not Working

### Option A: Check File Encoding

The `.env.local` file must be UTF-8 encoded. In PowerShell:

```powershell
# Verify encoding
Get-Content .env.local -Encoding UTF8
```

### Option B: Try Alternative Location

Sometimes Next.js has issues with `.env.local`. Try creating `.env` instead:

```bash
# Copy .env.local to .env
Copy-Item .env.local .env
```

Then restart the server.

### Option C: Set Environment Variable Directly

Temporarily set it in your terminal before starting the server:

**PowerShell:**
```powershell
$env:OPENAI_API_KEY="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"
pnpm dev
```

**Command Prompt:**
```cmd
set OPENAI_API_KEY=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
pnpm dev
```

### Option D: Check Server Logs

After restarting, when you send a chat message, check the server terminal. You should see:

```
========== NEW CHAT REQUEST ==========
✅ API Key present: sk-proj-B8...
```

If you see `❌ OPENAI_API_KEY is not set!`, the environment variable is still not loading.

## ✅ Expected Result

After following these steps:

1. ✅ Server starts without errors
2. ✅ `/api/test-env` shows `openaiApiKeyExists: true`
3. ✅ Chatbot responds to messages
4. ✅ Server logs show "✅ API Key present"

## 📝 Quick Checklist

- [ ] Stopped the dev server completely
- [ ] Deleted `.next` folder (cleared cache)
- [ ] Verified `.env.local` exists and has correct content
- [ ] Restarted dev server with `pnpm dev`
- [ ] Tested `/api/test-env` endpoint
- [ ] Tried sending a chat message
- [ ] Checked server logs for "✅ API Key present"

---

**Most Common Issue:** Forgetting to restart the server after creating/updating `.env.local`. Next.js only reads environment variables when it starts!

