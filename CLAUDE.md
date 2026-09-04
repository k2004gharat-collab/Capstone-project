# Project Rules

## 1. React and TypeScript

- Use React with TypeScript for new UI components.

- Prefer functional components and keep components focused on one responsibility.

- Use existing components and project patterns before creating new ones.

## 2. Forms and Validation

- Every form input must have a properly associated label.

- Validate required fields and user input before allowing submission.

- Display clear validation messages next to the relevant field.

- Keep validation logic separate from UI components when practical.

## 3. Accessibility

- All interactive elements must be keyboard accessible.

- Use semantic HTML elements where possible.

- Form controls must have accessible labels and validation feedback.

## 4. Testing

- Add tests for important user-facing behavior, especially form validation and successful submission.

- Run the relevant tests after making changes.

- Fix test failures before considering a feature complete.

## 5. Project Consistency

- Follow the existing project's styling and component conventions.

- Do not introduce unnecessary dependencies.

- Do not create duplicate components when an existing component can be reused.