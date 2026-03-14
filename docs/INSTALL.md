# Installation Guide 📦

SuperForm is designed to be lightweight and easy to integrate into any React project.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **React**: v18.0.0 or higher
- **TypeScript**: v4.5 or higher (recommended)

## Package Manager

You can install SuperForm using your favorite package manager:

### npm

```bash
npm install @silentcoderhi/superform
```

### yarn

```bash
yarn add @silentcoderhi/superform
```

### pnpm

```bash
pnpm add @silentcoderhi/superform
```

## Peer Dependencies

SuperForm requires `react` as a peer dependency. If you are using `@silentcoderhi/superform/react`, make sure you have it installed:

```bash
npm install react
```

## TypeScript Configuration

SuperForm is built with TypeScript and provide full type safety out of the box. For the best experience, ensure your `tsconfig.json` has `strict` mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler", // or "nodenext"
    "esModuleInterop": true
  }
}
```

## Importing SuperForm

### Core Validation

```typescript
import { s } from "@silentcoderhi/superform";
```

### React Hooks

```typescript
import { useForm, useField } from "@silentcoderhi/superform/react";
```

## Next Steps

Check out the [Quick Start Guide](QUICK_START.md) to build your first form!
