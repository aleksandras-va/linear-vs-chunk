# Linear vs Chunk

## Description

Draft: This is a POC that processor caches repetitive actions.

## Usage

Install [PNPM](https://pnpm.io/installation)

Install dependencies

```bash
pnpm
```

Run development server

```bash
pnpm dev
```

This will output console logs with cold-start\* times.

\*Performance measurements will be updated to improve accuracy, but currently, it seems that chunked/sampled operations are way faster.
