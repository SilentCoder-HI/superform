# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of SuperForm seriously. If you discover a security vulnerability, please follow responsible disclosure:

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Email your findings to **security@superform.dev** (or open a [private security advisory](https://github.com/SilentCoder-HI/superform/security/advisories/new))
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: We will acknowledge your report within **48 hours**
- **Assessment**: We will assess the vulnerability and determine its impact within **5 business days**
- **Fix**: Critical vulnerabilities will be patched as soon as possible
- **Disclosure**: We will coordinate with you on public disclosure timing

### Scope

The following are in scope:
- Core validation engine (`@silentcoderhi/superform`)
- React integration (`@silentcoderhi/superform/react`)
- Official documentation and examples

### Out of Scope

- Third-party integrations not maintained by this project
- Vulnerabilities in dependencies (please report to the respective maintainers)

## Best Practices

When using SuperForm in your applications:

- Always validate on the server side, not just the client
- Keep your dependencies up to date
- Use environment variables for sensitive configuration
- Follow the [OWASP guidelines](https://owasp.org/) for web application security

Thank you for helping keep SuperForm and its users safe! 🔒
