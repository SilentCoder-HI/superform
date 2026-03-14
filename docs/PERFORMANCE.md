# Performance ⚡

SuperForm is built for speed and responsiveness.

## Benchmarks

SuperForm is designed to minimize re-renders and overhead during form interactions.

### Component Re-renders

- **SuperForm**: Only re-renders the specific field being changed when using `useField` or the parent form when using `useForm` state changes.
- **Optimization**: We use internal refs and optimized state updates to ensure smooth performance even on low-end devices.

### Validation Speed

- **Synchronous**: Validation of a 20-field form takes less than **1ms** on modern hardware.
- **Asynchronous**: Optimized to avoid redundant calls during typing via debouncing strategies (planned for v1.2.0).

## Build Size

| Package                           | Minified  | Gzipped     |
| --------------------------------- | --------- | ----------- |
| `@silentcoderhi/superform` (Core) | ~3 KB     | ~1.2 KB     |
| `@silentcoderhi/superform/react`  | ~2 KB     | ~0.8 KB     |
| **Total**                         | **~5 KB** | **~2.0 KB** |

## Best Practices for Performance

1. **Keep components small**: Use the `useField` hook for complex form fields to isolate re-renders.
2. **Memoize custom components**: Wrap input components in `React.memo` if they are passed down through many props.
3. **Avoid heavy logic in `onSubmit`**: Offload heavy processing to web workers or the server where possible.
