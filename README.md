# Capstone Project

## Description

This project will be developed as part of my capstone project.

## Tech Stack

- Node.js
- JavaScript
- Git
- GitHub

## Status

Project setup in progress.

## FE-07: Accessibility Analysis Tool

### Tool name

`analyzeAccessibility`

### Purpose

The `analyzeAccessibility` tool analyzes a UI element against three basic accessibility checks and returns a structured accessibility score and recommendations.

### Input schema

The tool accepts:

- `element`: string — the UI element being analyzed.
- `hasAccessibleName`: boolean — whether the element has a clear accessible name or label.
- `keyboardAccessible`: boolean — whether the element can be operated using the keyboard.
- `hasFocusStyle`: boolean — whether the element has a visible keyboard focus style.

The input is validated using Zod.

### Return shape

```ts
{
  element: string;
  score: number;
  checks: {
    label: string;
    passed: boolean;
    recommendation: string | null;
  }[];
}