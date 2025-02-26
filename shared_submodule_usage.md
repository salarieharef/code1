# Using the `shared` Submodule

This document explains how to use the `shared` submodule in our Next.js projects. The submodule contains shared components and utilities that can be reused across multiple applications, promoting consistency and reducing duplication.

## Table of Contents

- [Using the `shared` Submodule](#using-the-shared-submodule)
  - [Table of Contents](#table-of-contents)
  - [Cloning the Repository with Submodules](#cloning-the-repository-with-submodules)
  - [Initializing and Updating Submodules](#initializing-and-updating-submodules)
  - [Using Shared Components](#using-shared-components)
  - [Using Shared Utilities](#using-shared-utilities)
  - [Updating the Submodule](#updating-the-submodule)
  - [Contributing to the Submodule](#contributing-to-the-submodule)
  - [Troubleshooting](#troubleshooting)

## Cloning the Repository with Submodules

When cloning a repository that contains submodules, use the `--recurse-submodules` flag to ensure all submodules are cloned properly.

```sh
git clone --recurse-submodules <your-nextjs-app-repo-url>
```

If you have already cloned the repository without the `--recurse-submodules` flag, you can initialize and update the submodules manually:

```sh
cd path/to/your-nextjs-app
git submodule init
git submodule update
```

## Initializing and Updating Submodules

After cloning the repository, if there are any changes to the submodule, you can update it using:

```sh
cd path/to/your-nextjs-app
git submodule update --remote shared
```

## Using Shared Components

You can import and use the shared components in your Next.js application like this:

```jsx
// Import a shared component
import Button from "../shared/components/Button";

const MyComponent = () => (
  <div>
    <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
  </div>
);

export default MyComponent;
```

## Using Shared Utilities

Similarly, you can import and use the shared utility functions:

```js
// Import a shared utility function
import { apiCall } from "../shared/utils/api";

apiCall("/endpoint", "GET").then((response) => {
  console.log(response);
});
```

## Updating the Submodule

When changes are made to the `shared` repository and you need to pull those changes into your project:

```sh
cd path/to/your-nextjs-app/shared
git pull origin master
cd ..
git add shared
git commit -m "Update shared submodule"
git push origin master
```

## Contributing to the Submodule

If you need to make changes to the shared components or utilities, follow these steps:

1. Navigate to the submodule directory:

   ```sh
   cd path/to/your-nextjs-app/shared
   ```

2. Make your changes and commit them:

   ```sh
   git add .
   git commit -m "Describe your changes"
   git push origin master
   ```

3. Update the submodule reference in the main repository:

   ```sh
   cd ..
   git add shared
   git commit -m "Update shared submodule reference"
   git push origin master
   ```

## Troubleshooting

- **Submodule Not Initialized**: If you encounter errors about missing submodule directories, make sure you've initialized and updated the submodule:

  ```sh
  git submodule init
  git submodule update
  ```

- **Submodule Update Conflicts**: If there are conflicts when updating the submodule, resolve them within the `shared` directory and commit the changes.

If you have any questions or run into issues, please reach out for help in our team chat or consult the Git documentation on [submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).
