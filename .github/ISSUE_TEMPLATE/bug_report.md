name: 🐛 Bug Report
description: Report a bug to help us improve SuperForm
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug! Please fill out the form below to help us investigate.
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of what the bug is.
      placeholder: I encountered an issue when...
    validations:
      required: true
  - type: textarea
    id: reproduction
    attributes:
      label: Reproduction Steps
      description: |
        Please provide a minimal code example or a repository link that reproduces the issue. 
        Without a reproduction, it's very difficult for us to help.
      placeholder: |
        1. Define a schema with...
        2. Use useForm with...
        3. Observe that...
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: A clear and concise description of what you expected to happen.
    validations:
      required: true
  - type: input
    id: environment
    attributes:
      label: Environment
      description: e.g. Node.js v18.16.0, React v18.2.0, SuperForm v1.0.0
    validations:
      required: true
  - type: checkmarks
    id: checkboxes
    attributes:
      label: Checklist
      options:
        - label: I have searched existing issues to ensure this bug hasn't been reported.
          required: true
        - label: I am using the latest version of SuperForm.
          required: true
