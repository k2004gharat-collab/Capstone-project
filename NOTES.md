# Accessibility Notes: Hand-Built Components vs shadcn/ui

## Overview

For this assignment, I built a modal dialog, tabs, and disclosure component from scratch using React and TypeScript. I then installed shadcn/ui using the Base UI component library and added its Dialog and Tabs components.

I read the generated `dialog.tsx` and `tabs.tsx` source files and compared them with my own implementations.

## What shadcn/Base UI handled that I missed

### 1. More complete dialog behavior

My hand-built Modal manually implements important behavior such as Escape-to-close, focus on the close button, focus trapping with Tab/Shift+Tab, and returning focus to the element that opened the modal.

The shadcn Dialog delegates the core dialog behavior to the Base UI dialog primitive:

`@base-ui/react/dialog`

Instead of manually implementing the behavior, the generated component provides reusable primitives such as `Dialog`, `DialogTrigger`, `DialogContent`, `DialogClose`, `DialogTitle`, and `DialogDescription`.

This makes the dialog behavior more structured and reusable and reduces the amount of accessibility logic that has to be maintained manually.

### 2. Portal and overlay handling

My hand-built modal renders the modal directly in the component tree and manually creates the overlay.

The shadcn Dialog separates these responsibilities into `DialogPortal` and `DialogOverlay`. The generated source also provides a dedicated popup structure for the dialog content.

This gives the dialog a more robust structure for layering the modal above the rest of the application.

### 3. Tabs support more interaction states

My hand-built Tabs implementation supports ArrowLeft, ArrowRight, Home, and End keyboard navigation and uses the roving `tabIndex` pattern.

However, the generated shadcn Tabs delegates the behavior to:

`@base-ui/react/tabs`

The generated component also supports additional configuration such as horizontal or vertical orientation and includes styling states for disabled and active tabs.

My implementation did not include these additional states and configuration options.

### 4. More reusable accessibility primitives

My components contain the accessibility attributes directly in the component implementation.

The shadcn components expose separate primitives such as `TabsList`, `TabsTrigger`, `TabsContent`, `DialogTitle`, and `DialogDescription`.

This makes the accessible structure reusable instead of requiring every implementation to manually recreate the complete pattern.

## What I learned

Building the components myself helped me understand the accessibility requirements instead of treating an accessible component as a black box. In particular, I learned how keyboard interaction, focus management, ARIA roles, states, and relationships work.

Reading the shadcn/Base UI source showed me that production-ready accessible components require more than just adding ARIA attributes. A reusable component also needs robust interaction behavior, state handling, focus management, and support for different usage scenarios.

I would keep the knowledge from my hand-built implementations while using well-tested accessible primitives when building production applications.