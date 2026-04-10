# AGENT.md — Adding new SaaS listings to oksaas.co

This document describes the process to follow every time the user pastes a batch of new SaaS submissions to add to `data.json`.

## Input format

The user pastes raw submissions from the admin dashboard. Each entry looks like:

```
<Date>, <Time>
<email>
<Title>
<Description>
<URL>
<image_url>
Listing + Backlink Dofollow (Free)
-    -
```

Dates are relative to the current year. Convert them to ISO 8601 UTC (`YYYY-MM-DDTHH:MM:00Z`) using the current year from the session context.

## Process

1. **Read `data.json`** to understand the structure and get the last entry.
2. **Deduplicate against existing entries**: grep `data.json` for each new URL/title. Skip any that already exist.
3. **Deduplicate within the batch**: if the same submission appears twice, keep only one.
4. **Generate UUIDs**: one per new entry, using `python3 -c "import uuid; [print(uuid.uuid4()) for _ in range(N)]"`.
5. **Build the entries** with this exact schema:
   ```json
   {
     "id": "<uuid>",
     "created_at": "<ISO 8601 UTC>",
     "title": "<Title>",
     "description": "<Description>",
     "image_url": "<image_url as provided>",
     "url": "<URL as provided>",
     "is_promoted": false,
     "is_featured": false,
     "likes_count": 0,
     "email": "<email>"
   }
   ```
6. **Append** the new entries at the end of the array in `data.json`, before the final `]`. Add a comma after the previous last entry.
7. **Validate JSON**: `python3 -c "import json; json.load(open('data.json')); print('valid')"`.
8. **Generate the tweet** (see format below).

## Rules

- Preserve URLs and image URLs exactly as provided (do not rewrite/fix them unless it is an obvious transcription typo in the `submitsaas.com/images/` path).
- Strip curly quotes from description starts if they look like stray artifacts; otherwise keep UTF-8 characters intact.
- Long descriptions (multi-paragraph) should be trimmed to a concise 1-2 sentence summary that fits on one line.
- Do not set `is_promoted` or `is_featured` to true for new submissions.
- `likes_count` always starts at 0.
- Preserve entry order: most recent submission first within the appended block (matches how the user pastes them).
- Skip entries missing critical fields (URL or title).

## Tweet format (generated after every batch)

At the end of the task, produce a simple tweet in this exact format:

```
<N> new launch<es> on oksaas.co
<url1>
<url2>
<url3>
...
```

Rules for the tweet:
- `<N>` is the number of new entries actually added (after dedup).
- Use "new launch" for 1, "new launches" for >1.
- One URL per line — NO leading spaces, NO `- ` bullet prefix, NO indentation. Twitter/X renders leading whitespace as awkward wrapping (see incident 2026-04-10).
- Use the `url` field from each new entry (not the image_url).
- No hashtags, no emojis, no extra commentary.
- List URLs in the same order they were added to `data.json`.

## Example

Input: 24 submissions (1 duplicate within batch) → 23 added after dedup.
Output tweet:
```
23 new launches on oksaas.co
https://axeploit.com
https://fleetbell.com
...
```
