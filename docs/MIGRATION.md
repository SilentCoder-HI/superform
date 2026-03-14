# Migration Guide ⬆️

This document helps you migrate between major versions of SuperForm.

## Migrating to v1.0.0

Since v1.0.0 is the first stable release, no migration path is required from previous experimental versions.

### Key Changes in v1.0.0

- **Stable API**: The `s` builder and `useForm` hooks are now considered stable.
- **Improved Type Inference**: Fixed issues with nested object type resolution.
- **Dual ESM/CJS Support**: The package is now published as both ESM and CommonJS.

---

## Future Migrations

Migration steps for future major versions will be added here. We follow [Semantic Versioning](https://semver.org/), so breaking changes will only occur in major versions (v2.0, v3.0, etc.).

### Staying Up to Date

To check for the latest version:

```bash
npm outdated @silentcoderhi/superform
```

To update:

```bash
npm install @silentcoderhi/superform@latest
```
