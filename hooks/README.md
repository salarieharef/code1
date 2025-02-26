# Hooks Folder

The `hooks` directory in this Next.js application contains all the custom hooks that are utilized across the application. Custom hooks allow for the extraction of reusable logic from components, promoting cleaner and more maintainable code.

## Purpose

The main goals of the `hooks` folder are to:

- Centralize reusable logic and functionality that can be shared among various components.
- Enhance code readability and maintainability by encapsulating complex logic within hooks.
- Provide a straightforward way to manage side effects and stateful logic in functional components.

## Structure

The `hooks` folder is structured to contain individual files for each custom hook without any nested folders. Below is an example of how it may look:

```
/hooks
  ├── useFetch.ts
  ├── useLocalStorage.ts
  ├── useDebounce.ts
  └── useToggle.ts
```

### Files and Their Purpose

- **`useFetch.ts`**: A custom hook for fetching data from an API, handling loading and error states.

  ```javascript
  import { useState, useEffect } from "react";

  const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Network response was not ok");
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [url]);

    return { data, loading, error };
  };

  export default useFetch;
  ```

- **`useLocalStorage.ts`**: A custom hook for managing state that syncs with local storage.

  ```javascript
  import { useState } from "react";

  const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    };

    return [storedValue, setValue];
  };

  export default useLocalStorage;
  ```

- **`useDebounce.ts`**: A custom hook for debouncing a value.

  ```javascript
  import { useState, useEffect } from "react";

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  export default useDebounce;
  ```

- **`useToggle.ts`**: A custom hook for toggling a boolean value.

  ```javascript
  import { useState } from "react";

  const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => {
      setValue((prevValue) => !prevValue);
    };

    return [value, toggle];
  };

  export default useToggle;
  ```

## Usage

To use the custom hooks defined in this folder, simply import them into your components as needed:

```javascript
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import useDebounce from "../hooks/useDebounce";
import useToggle from "../hooks/useToggle";

const MyComponent = () => {
  const { data, loading, error } = useFetch("https://api.example.com/data");
  const [storedValue, setStoredValue] = useLocalStorage(
    "myKey",
    "defaultValue"
  );
  const debouncedValue = useDebounce(storedValue, 300);
  const [isToggled, toggle] = useToggle();

  // Component logic...
};
```

## Best Practices

- **Keep Hooks Pure**: Ensure that custom hooks are pure and do not contain side effects unless necessary.
- **Use Descriptive Names**: Name hooks clearly to reflect their functionality, making it easier to understand their purpose at a glance.
- **Document Usage**: Include usage examples in the hook files to provide guidance for future developers.
