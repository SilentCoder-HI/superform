# Contributing to SuperForm

First off, thank you for considering contributing to SuperForm! It's people like you that make SuperForm such a great tool.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

- **Check existing issues** to see if the bug has already been reported.
- If not, **open a new issue** using the [Bug Report template](ISSUE_TEMPLATE/bug_report.md).
- Include clear steps to reproduce, expected behavior, and screenshots if applicable.

### Suggesting Enhancements

- **Open a new issue** using the [Feature Request template](ISSUE_TEMPLATE/feature_request.md).
- Explain the "why" — what problem does this solve?
- Provide examples of how the new API or feature would look.

### Pull Requests

1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies** using `npm install`.
3. **Make your changes**. If you've added code that should be tested, add tests!
4. **Ensure the test suite passes** by running `npm test`.
5. **Run linting and formatting** (scripts coming soon).
6. **Issue a Pull Request** to the `main` branch.
7. **Link the PR** to any relevant issues.

## Development Setup

### Prerequisites

- Node.js (>= 18)
- npm

### Workflow

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/superform.git
   cd superform
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run build:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Style Guide

- Use **TypeScript** for all source code.
- Follow **camelCase** for variables and functions.
- Follow **PascalCase** for classes and components.
- Use **functional components** and hooks for React integration.
- Keep components small and focused.

## Documentation

- If you change the API, update `docs/API.md`.
- Add examples to `docs/EXAMPLES.md` if relevant.
- Update `README.md` for major features.

## Questions?

Feel free to open a [Discussion](https://github.com/SilentCoder-HI/superform/discussions)!
