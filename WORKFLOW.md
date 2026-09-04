# Workflow Comparison: Settings Form

## Round 1: Vague Prompt

In Round 1, I used a short and vague prompt to ask the AI to implement a settings form. The AI generated the feature with limited guidance about the project's existing structure, validation, accessibility, testing, and expected behavior. The implementation used a simpler JavaScript structure with `settings.js` and `styles.css`.

## Round 2: Precise Prompt

In Round 2, I gave the AI a detailed prompt with specific requirements, expected validation behavior, accessibility requirements, project conventions, and a verification workflow. I also asked the AI to inspect the project first, make a plan, implement the feature, write tests, run the tests, fix failures, and review the final implementation.

The Round 2 implementation introduced a more structured React and TypeScript setup. It added `SettingsForm.tsx`, `SettingsForm.css`, `SettingsForm.test.tsx`, and separate validation files and tests. The branch comparison showed 21 files changed, with 3,772 insertions and 667 deletions.

## Comparison

The precise workflow required more review of the generated changes, but it produced clearer separation between the form, styling, validation, and tests. The validation requirements also made edge cases such as empty names and invalid email addresses explicit.

The Round 2 prompt specifically required proper labels, keyboard accessibility, accessible validation messages, prevention of invalid submission, and success feedback. These requirements made accessibility and correctness easier to review than in Round 1.

The main disadvantage was that the more detailed workflow resulted in more files and more code to review. However, the additional structure and tests make the implementation easier to verify and maintain.

## Review and Lessons

The biggest lesson was that precise prompts reduce ambiguity. Giving the AI exact requirements, expected behavior, file-selection instructions, and a testing step made the development process more controlled. The diff also made it easier to identify what changed between the two approaches.

Before final submission, I reviewed the generated implementation and tests for correctness, accessibility, edge cases, and consistency with the project.