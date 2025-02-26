# Documentation: `utils/validations` Folder

## Overview

The `utils/validations` folder is dedicated to handling all validation logic within your project. It centralizes the validation rules and utilities, ensuring that input validation is consistent, reusable, and easy to maintain. The functions in this folder are responsible for validating user inputs, form data, API responses, and other data structures that require conformity to specific rules or formats.

Instead of duplicating validation logic across multiple components or modules, the `utils/validations` folder provides a single location where all validation-related functionality resides. This improves the clarity and maintainability of the project, especially as it grows in complexity.

## Key Benefits of the `utils/validations` Folder

### 1. Centralized Validation Logic

By centralizing validation functions, you avoid scattering validation logic across multiple components and files. This makes it easier to manage and update validations in one place. If any validation rules change, you can update them in the `utils/validations` folder, and the changes will propagate throughout the application wherever the validation is used.

### 2. Reusable Validation Functions

The functions stored in `utils/validations` are reusable, meaning you can call the same validation logic in multiple places without having to rewrite it. This reduces redundancy in your codebase and ensures that the same validation rules are applied consistently across different parts of the project.

### 3. Improved Maintainability

With all validation logic housed in one location, it becomes easier to maintain and extend the project. When new validations are needed or existing rules need adjustment, developers can look to a single folder for all validation-related updates. This helps streamline development workflows and reduces the chance of inconsistencies in validation across different parts of the application.

### 4. Modular and Scalable

The `utils/validations` folder can grow and evolve with the project. As more complex validations or new features are added, the folder structure can accommodate new validation logic. You can create individual files for different types of validations (e.g., user input, form data, API responses), which keeps things organized and modular.

### 5. Enhanced Code Clarity

By moving validation logic out of components and services, you improve the readability and clarity of your code. Components and services can focus on business logic and UI, while the `utils/validations` folder handles all the intricate validation rules. This separation of concerns makes your code easier to understand and debug.

## Structure of the `utils/validations` Folder

Here’s an example of how the folder might be structured:

```
/utils
  /validations
    formValidations.ts    // Validations specific to forms
    userValidations.ts    // Validations for user data (username, password, etc.)
    courseValidations.ts  // Validations for course-related data
    index.ts              // Centralized export for validation functions
```

### Example File: `formValidations.ts`

This file contains validation functions related to forms, such as validating if fields are empty, if emails are in a valid format, etc.

```typescript
// formValidations.ts
export const isRequired = (value: string) => {
  return value.trim() !== "" ? null : "This field is required.";
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : "Invalid email format.";
};

export const isMinLength = (value: string, minLength: number) => {
  return value.length >= minLength
    ? null
    : `Must be at least ${minLength} characters long.`;
};
```

### Example File: `userValidations.ts`

This file contains validation logic specific to user data, such as checking if a username or password meets certain criteria.

```typescript
// userValidations.ts
export const isValidUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username)
    ? null
    : "Username must be 3-20 characters long and can only contain letters, numbers, and underscores.";
};

export const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password)
    ? null
    : "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.";
};
```

### Example File: `index.ts`

This file provides a centralized export for all validation functions, making it easy to import them from other parts of the project.

```typescript
// index.ts
export * from "./formValidations";
export * from "./userValidations";
export * from "./courseValidations";
```

## Usage Example in a Component

Instead of writing validation logic directly in a component, you can import validation functions from the `utils/validations` folder and use them to validate user input or form data.

### Example: Validating a Form in a Component

```tsx
import React, { useState } from "react";
import { isRequired, isValidEmail } from "@/utils/validations/formValidations";

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Perform validations
    let emailError = isRequired(email) || isValidEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    // Proceed with form submission if no errors
    console.log("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
      />
      {error && <span>{error}</span>}
      <button type='submit'>Submit</button>
    </form>
  );
};
```

In this example, the validation functions `isRequired` and `isValidEmail` are imported from `utils/validations/formValidations.ts`. This ensures the validation logic is consistent and reusable across other forms or components that require similar validation.

## When to Use the `utils/validations` Folder

- **Validating User Input**: Any time you need to validate user input, such as form fields, login credentials, or course information, use the utility functions stored in the `utils/validations` folder.
- **Ensuring Data Integrity**: Use these validation functions to ensure that data structures and API responses conform to expected formats before processing them in your application.
- **Reusing Validation Rules**: When the same validation logic is needed across different components, services, or pages, utilize the reusable functions in the `utils/validations` folder instead of duplicating code.
- **Simplifying Component Logic**: Offload complex validation logic from components into this folder to keep your components clean and focused on rendering and business logic.

## Conclusion

The `utils/validations` folder provides a dedicated, centralized place for all your application's validation logic. It offers reusable functions, simplifies maintenance, and ensures consistent validation across the project. This folder enhances code clarity, maintainability, and scalability, especially as your project grows in complexity and the need for robust validation increases.
