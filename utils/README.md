# Utils Folder

The `utils` directory in this Next.js application contains utility functions that provide common functionality and support various tasks across the application. These functions are designed to be reusable and help maintain a clean and organized codebase.

## Purpose

The main goals of the `utils` folder are to:

- Centralize utility functions that can be reused across different components and modules.
- Keep the codebase organized by grouping related utility functions together.
- Enhance code readability and maintainability by providing simple, focused functions for common tasks.

## Structure

The `utils` folder is structured to contain individual files for different categories of utility functions without any nested folders. Below is an example of how it may look:

```
/utils
  ├── arrayUtils.ts
  ├── stringUtils.ts
  ├── numberUtils.ts
  └── dateUtils.ts
```

### Files and Their Purpose

- **`arrayUtils.ts`**: Contains utility functions for array manipulation and operations.

  ```javascript
  export const uniqueArray = (arr) => {
    return [...new Set(arr)];
  };

  export const flattenArray = (arr) => {
    return arr.flat();
  };
  ```

- **`stringUtils.ts`**: Provides functions for string manipulation and formatting.

  ```javascript
  export const trimString = (str) => {
    return str.trim();
  };

  export const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  ```

- **`numberUtils.ts`**: Includes functions for number manipulation and calculations.

  ```javascript
  export const formatNumber = (num, options) => {
    return new Intl.NumberFormat(undefined, options).format(num);
  };

  export const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
  };
  ```

- **`dateUtils.ts`**: Provides functions for date manipulation and formatting.

  ```javascript
  export const formatDate = (date, formatString) => {
    return new Intl.DateTimeFormat("en-US", { dateStyle: formatString }).format(
      new Date(date)
    );
  };

  export const isPastDate = (date) => {
    return new Date(date) < new Date();
  };
  ```

## Usage

To use the utility functions defined in this folder, simply import them into your components or other libraries as needed:

```javascript
import { uniqueArray } from "../utils/arrayUtils";
import { toTitleCase } from "../utils/stringUtils";
import { formatNumber } from "../utils/numberUtils";
import { formatDate } from "../utils/dateUtils";

const MyComponent = () => {
  const items = ["apple", "banana", "apple", "orange"];
  const uniqueItems = uniqueArray(items);
  const title = toTitleCase("hello world");
  const formattedNumber = formatNumber(123456.789, {
    style: "currency",
    currency: "USD",
  });
  const formattedDate = formatDate("2023-10-01", "short");

  // Component logic...
};
```

## Best Practices

- **Keep Functions Focused**: Each utility function should have a single responsibility and perform a specific task.
- **Document Functions**: Provide comments or JSDoc-style documentation for each function to explain its purpose, parameters, and return values.
- **Avoid Side Effects**: Utility functions should be pure whenever possible, avoiding side effects that could lead to unexpected behavior.
