# AfriMoney Customer Discovery Landing Page

A premium, configuration-driven customer discovery survey for cryptocurrency users in Ghana. Built with **Next.js 15** (App Router).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

All survey content lives in `src/config/`:

| File | Purpose |
|------|---------|
| `questions.ts` | Universal entry + common final questions |
| `branches.ts` | Branch-specific JTBD / Four Forces questions |
| `sharedOptions.ts` | Reusable answer options |
| `survey.ts` | Survey assembly + app settings (Google Sheets URL, links) |

To run a new study, update the config files — no engine changes required.

## Google Sheets Integration

1. Create a Google Sheet with columns for your fields.
2. Deploy this Apps Script as a **Web App** (Execute as: Me, Access: Anyone):

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.surveyId,
    data.branchId,
    JSON.stringify(data.answers),
    data.metadata.submittedAt,
    data.metadata.durationMs,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Copy the deployment URL into `src/config/integration.ts`:

```typescript
googleSheetsEndpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
```

The full Apps Script source (with auto-header creation) is in `scripts/google-apps-script.gs`.

4. Add your playbook PDF to `public/crypto-money-playbook.pdf`.
5. Set `whatsappCommunityUrl` in the same config file.

## Project Structure

```
src/
  app/              Next.js App Router (layout, page, globals.css)
  components/       UI + SurveyEngine
  config/           Survey definitions (edit here)
  hooks/            Survey flow state
  layout/           Container, Card, Button
  services/         Google Sheets + localStorage autosave
  types/            TypeScript interfaces
public/             Static assets (playbook PDF, etc.)
```

## Features

- One question per screen with progress bar
- Branch routing from Q3 (7 branches, 8 forces questions each)
- Local autosave — resume after refresh
- Early exit when respondent has never used crypto
- Conditional WhatsApp field (interview opt-in only)
- Mobile-first, accessible, premium fintech design

## Production

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) or any Node.js host that supports Next.js.
