# Documentation for `nextFetcher` Function

The `nextFetcher` function is a versatile utility for making HTTP requests in a Next.js application. It handles both client-side and server-side session tokens, supports token authentication, allows for incremental static regeneration (ISR) revalidation, and provides functionality for file uploads with progress tracking.

## Table of Contents

- [Documentation for `nextFetcher` Function](#documentation-for-nextfetcher-function)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Session Token Functions](#session-token-functions)
    - [`getServerSessionToken`](#getserversessiontoken)
    - [`getClientSessionToken`](#getclientsessiontoken)
  - [Fetcher Function](#fetcher-function)
    - [Function Signature](#function-signature)
    - [Parameters](#parameters)
    - [Returns](#returns)
    - [Behavior](#behavior)
  - [Example Usage](#example-usage)
    - [Fetching Data with Authentication](#fetching-data-with-authentication)
    - [Posting Data with Revalidation](#posting-data-with-revalidation)
    - [File Upload with Progress Tracking](#file-upload-with-progress-tracking)
  - [Notes](#notes)
  - [Integration into Your Project](#integration-into-your-project)
  - [Example Usage from Your Project](#example-usage-from-your-project)
    - [Example: Using `nextFetcher` in a Component](#example-using-nextfetcher-in-a-component)
    - [Example: Submitting a Form with `nextFetcher`](#example-submitting-a-form-with-nextfetcher)

## Overview

- **Authentication Handling**: Automatically attaches the user's authentication token to requests when `useToken` is `true`.
- **Client and Server Compatibility**: Fetches session tokens appropriately based on whether the code is running on the client or server.
- **Flexible Request Options**: Supports custom HTTP methods, headers, body content, and additional fetch options.
- **Revalidation Support**: Integrates with Next.js ISR by specifying a `revalidate` duration.
- **File Uploads**: Handles file uploads using `FormData` and provides upload progress tracking.

## Session Token Functions

### `getServerSessionToken`

Retrieves the session token on the server side.

```typescript
const getServerSessionToken = async () => {
  if (cachedToken) return cachedToken;

  const session: any = await getServerSession(authOptions);
  cachedToken = session?.token?.access_token || null;
  return cachedToken;
};
```

- **Purpose**: Fetches the user's access token during server-side rendering.
- **Caching**: Uses `cachedToken` to avoid redundant session fetches.

### `getClientSessionToken`

Retrieves the session token on the client side.

```typescript
const getClientSessionToken = async () => {
  if (cachedToken) return cachedToken;

  const session: any = await getClientSession();
  cachedToken = session?.token?.access_token || null;
  return cachedToken;
};
```

- **Purpose**: Fetches the user's access token during client-side rendering.
- **Caching**: Uses `cachedToken` to avoid redundant session fetches.

## Fetcher Function

### Function Signature

```typescript
export const nextFetcher = async ({
  url,
  method = "GET",
  body,
  options = {},
  useToken = false,
  revalidate,
  isServer = false,
}: FetcherOptions) => {
  /* ... */
};
```

### Parameters

- **`url`** (`string`): The endpoint URL for the HTTP request.
- **`method`** (`string`, optional): The HTTP method (e.g., `"GET"`, `"POST"`). Defaults to `"GET"`.
- **`body`** (`any`, optional): The request payload. Can be a JSON object or `FormData` for file uploads.
- **`options`** (`any`, optional): Additional fetch options, including custom headers.
- **`useToken`** (`boolean`, optional): Whether to include the authentication token in the request headers. Defaults to `false`.
- **`revalidate`** (`number`, optional): Time in seconds for ISR revalidation.
- **`isServer`** (`boolean`, optional): Indicates if the request is made on the server side. Defaults to `false`.

### Returns

- **`Promise<any>`**: Resolves with the response data in JSON format.

### Behavior

1. **Header Preparation**: Initializes headers and includes the `Authorization` header if `useToken` is `true`.
2. **Content-Type Handling**: Sets `Content-Type` to `"application/json"` if the request body is a JSON object.
3. **File Upload Handling**:
   - Uses `XMLHttpRequest` when uploading files with `FormData` to track upload progress via `options.onUploadProgress`.
4. **Fetch Execution**: Performs the fetch request using the Fetch API.
5. **Error Handling**: (Commented out) Can throw an error if the response status is not OK.

## Example Usage

### Fetching Data with Authentication

```typescript
// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

const {
  data: userInfo,
  isLoading: userInfoLoading,
  error: userInfoError,
} = useSWR(
  routes.userRoutes.me,
  (url) =>
    nextFetcher({
      url: url,
      method: "GET",
      useToken: true,
    }),
  {
    revalidateOnFocus: false,
  }
);
```

- **Purpose**: Fetches the user's profile data from the API.
- **Authentication**: Sets `useToken` to `true` to include the `Authorization` header.

### Posting Data with Revalidation

```typescript
import { nextFetcher } from "@/utils/nextFetcher";

const submitFeedback = async (feedback: { message: string }) => {
  try {
    const response = await nextFetcher({
      url: "/api/feedback",
      method: "POST",
      body: feedback,
      useToken: true,
      revalidate: 300, // Revalidate ISR cache every 5 minutes
    });
    return response;
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    throw error;
  }
};
```

- **Purpose**: Sends user feedback to the server.
- **Revalidation**: Uses ISR to revalidate cached data every 5 minutes.

### File Upload with Progress Tracking

```typescript
import { nextFetcher } from "@/utils/nextFetcher";

const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await nextFetcher({
      url: "/api/user/avatar",
      method: "POST",
      body: formData,
      useToken: true,
      options: {
        onUploadProgress: (event: ProgressEvent) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          console.log(`Upload Progress: ${progress}%`);
        },
      },
    });
    return response;
  } catch (error) {
    console.error("Avatar upload failed:", error);
    throw error;
  }
};
```

- **Purpose**: Uploads a user avatar image to the server.
- **Progress Tracking**: Provides real-time upload progress feedback.

## Notes

- **Session Management**: Ensure that `authOptions` is correctly set up to handle authentication sessions.
- **Caching Tokens**: The `cachedToken` variable helps reduce the number of session fetches by caching the token.
- **TypeScript Considerations**: The use of `any` for session types is a placeholder. Consider defining proper types for better type safety.
- **Error Handling**: The error handling in the fetch response is commented out. Uncomment it to enable throwing errors on non-OK responses.

## Integration into Your Project

To integrate the `nextFetcher` utility into your project:

1. **Create Utility File**: Save the code in a file named `nextFetcher.ts` within a `utils` directory.

   ```bash
   /utils/nextFetcher.ts
   ```

2. **Import the Utility**: Import `nextFetcher` into your components or services where you need to make API requests.

   ```typescript
   import { nextFetcher } from "@/utils/nextFetcher";
   ```

3. **Configure Authentication**: Ensure that your `authOptions` and session management are properly configured.

4. **Use in Components**: Replace direct `fetch` calls with `nextFetcher` to handle requests consistently.

   ```typescript
   const data = await nextFetcher({
     /* parameters */
   });
   ```

## Example Usage from Your Project

Assuming you have components in your project that need to fetch data or submit forms, here's how you can integrate `nextFetcher` using examples inspired by typical components.

### Example: Using `nextFetcher` in a Component

```tsx
// components/CourseList.tsx

import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

const CourseList: React.FC = () => {
  const {
    data: courses,
    error,
    isLoading,
  } = useSWR(
    routes.courseRoutes.courses({ sort: "most_liked" }),
    (url) =>
      nextFetcher({
        url,
        method: "POST",
        body: {},
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      <h2>Available Courses</h2>
      {courses?.data.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
```

- **Purpose**: Fetches a list of courses from the server and displays them.
- **Authentication**: Uses the authentication token to access protected routes.

### Example: Submitting a Form with `nextFetcher`

```tsx
// components/ContactForm.tsx

import React, { useState } from "react";
import { nextFetcher } from "@/utils/nextFetcher";

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await nextFetcher({
        url: "/api/contact",
        method: "POST",
        body: { message },
        useToken: true,
        revalidate: 60,
      });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("There was an error sending your message.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Your message here...'
      />
      <button type='submit'>Send Message</button>
    </form>
  );
};

export default ContactForm;
```

- **Purpose**: Allows users to send a message via a contact form.
- **Revalidation**: Ensures that the contact page data is revalidated every 60 seconds.

---

By incorporating `nextFetcher` into your components and utilities, you centralize your data fetching logic, making your codebase cleaner and more maintainable.
