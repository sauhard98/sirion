ee# Gemini API Integration Setup Guide

This guide will help you integrate Google's Gemini API with Sirion for production-ready contract analysis.

## Prerequisites

-   Node.js 18+ installed
-   A Google account
-   Access to Google AI Studio

## Step 1: Get Your Gemini API Key

1. **Visit Google AI Studio**

    - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
    - Or navigate to [https://aistudio.google.com/](https://aistudio.google.com/) and click "Get API Key"

2. **Create a New API Key**

    - Click "Create API Key" button
    - Select an existing Google Cloud project or create a new one
    - Copy the generated API key (it will look like: `AIzaSy...`)
    - **Important**: Store this key securely - you won't be able to see it again

3. **Enable Billing (Optional but Recommended for Production)**
    - Free tier includes: 15 requests per minute, 1 million tokens per minute
    - For production use, enable billing in Google Cloud Console
    - Gemini pricing: Very affordable - ~$0.001 per 1K input tokens

## Step 2: Configure Your Environment

1. **Locate the `.env.local` file** in your project root (already created)

2. **Add your API key** to `.env.local`:

    ```bash
    NEXT_PUBLIC_GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
    ```

    Replace `YOUR_ACTUAL_API_KEY_HERE` with the key you copied from Google AI Studio.

3. **Restart your development server** for changes to take effect:
    ```bash
    npm run dev
    ```

## Step 3: Test the Integration

1. **Start the development server** (if not already running):

    ```bash
    npm run dev
    ```

2. **Open the application** at [http://localhost:3000](http://localhost:3000)

3. **Navigate to the Dashboard** by clicking "Enter Command Center"

4. **Upload a contract PDF**:

    - Click "Upload New Contract"
    - Select a PDF contract file
    - The system will now use Gemini AI to analyze the contract in real-time

5. **Verify real API usage**:
    - Check browser console (F12) - you should NOT see the warning about using mock data
    - Processing should take 5-15 seconds depending on contract size
    - Results will be based on actual AI analysis, not mock data

## How It Works

### Architecture

```
PDF Upload → Text Extraction → Gemini API → JSON Parsing → Contract Analysis
```

### What Gemini Analyzes

The AI extracts:

-   **Metadata**: Contract value, parties, dates
-   **Structure**: All sections and clauses
-   **Timeline Events**: Deadlines, milestones, payment dates
-   **Risk Assessment**: Automatic risk level calculation
-   **Repercussions**: Consequences of missed deadlines

### Fallback Behavior

If the API key is not configured or invalid:

-   The system automatically falls back to **mock data**
-   A warning appears in the console
-   This allows development/testing without API access

## Step 4: Production Deployment

### Environment Variables on Vercel/Netlify

1. Go to your deployment platform's dashboard
2. Navigate to Environment Variables settings
3. Add: `NEXT_PUBLIC_GEMINI_API_KEY` with your API key value
4. Redeploy your application

### Security Best Practices

⚠️ **Important Security Notes**:

1. **API Key Exposure**: The current implementation uses `NEXT_PUBLIC_` which makes the key accessible in the browser. This is acceptable for:

    - MVP/Demo applications
    - Controlled environments
    - Applications with domain restrictions enabled

2. **For Production**, consider:
    - Moving API calls to a **Next.js API route** (server-side)
    - Using domain restrictions in Google Cloud Console
    - Implementing rate limiting
    - Adding authentication to your app

### Example Server-Side Implementation (Recommended for Production)

Create `/app/api/analyze-contract/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const apiKey = process.env.GEMINI_API_KEY; // Server-side only (no NEXT_PUBLIC_)

    // Your Gemini API logic here
    // This keeps the API key server-side only

    return NextResponse.json(result);
}
```

## Monitoring & Limits

### Free Tier Limits

-   **15 requests per minute**
-   **1 million tokens per minute**
-   **1,500 requests per day**

### Check Your Usage

-   Visit [Google Cloud Console](https://console.cloud.google.com/)
-   Navigate to "APIs & Services" → "Dashboard"
-   View Gemini API usage statistics

## Troubleshooting

### "API key not configured" Warning

-   Check that `.env.local` exists and contains the key
-   Ensure you've restarted the dev server after adding the key
-   Verify the key doesn't have extra spaces or quotes

### "Gemini API error: 403"

-   Your API key may be invalid
-   Check if the API is enabled in Google Cloud Console
-   Verify billing is enabled (if required)

### "Gemini API error: 429"

-   You've hit the rate limit
-   Wait a minute and try again
-   Consider upgrading to a paid plan

### No Results from AI

-   Check browser console for errors
-   Verify the PDF contains readable text
-   Try with a different contract file

## Advanced Configuration

### Custom Model Selection

Edit `services/geminiProcessor.ts` to use different models:

```typescript
// Current: gemini-1.5-flash (fast, cheaper)
const model = "gemini-1.5-flash";

// Alternative: gemini-1.5-pro (more capable, slower)
const model = "gemini-1.5-pro";
```

### Adjust AI Parameters

Modify in `callGeminiAPI()` function:

```typescript
generationConfig: {
  temperature: 0.2,    // Lower = more deterministic (0-1)
  topK: 40,            // Sampling parameter
  topP: 0.95,          // Nucleus sampling
  maxOutputTokens: 8192 // Max response length
}
```

## Support

-   **Google AI Studio**: [https://aistudio.google.com/](https://aistudio.google.com/)
-   **Gemini API Docs**: [https://ai.google.dev/](https://ai.google.dev/)
-   **Rate Limits**: [https://ai.google.dev/pricing](https://ai.google.dev/pricing)

## Next Steps

After successful integration:

1. ✅ Test with multiple contract types
2. ✅ Implement error handling for edge cases
3. ✅ Add retry logic for failed API calls
4. ✅ Consider implementing server-side API route for production
5. ✅ Enable domain restrictions on your API key
6. ✅ Set up monitoring and alerting

---

**Ready to integrate?** Share your API key when you're ready, and I'll add it to `.env.local` for you!
