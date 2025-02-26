# Context Folder

The `context` directory in this Next.js application contains all the React context functionality used throughout the application. This folder is designed to centralize state management and provide a clean way to share data and functions between components without the need for prop drilling.

## Purpose

The main goals of the `context` folder are to:

- Centralize the management of shared state across the application using React Context API.
- Provide a clear structure for organizing context providers and consumers related to specific features or pages.
- Enhance maintainability and readability by keeping context logic separate from component files.

## Structure

The `context` folder is organized to reflect the specific features or sections of the application. Below is an example structure:

```
/context
  ├── AuthContext.ts
  ├── ThemeContext.ts
  └── CartContext.ts
```

### Files and Their Purpose

- **`AuthContext.ts`**: Manages authentication state and provides functionality for logging in and out.

  ```javascript
  import React, { createContext, useState, useContext } from "react";

  const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);
  ```

- **`ThemeContext.ts`**: Handles theme-related state, such as toggling between light and dark modes.

  ```javascript
  import React, { createContext, useState, useContext } from "react";

  const ThemeContext = createContext();

  export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };

  export const useTheme = () => useContext(ThemeContext);
  ```

- **`CartContext.ts`**: Manages the shopping cart state, including adding and removing items.

  ```javascript
  import React, { createContext, useState, useContext } from "react";

  const CartContext = createContext();

  export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => setCart((prevCart) => [...prevCart, item]);
    const removeFromCart = (itemId) =>
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () => useContext(CartContext);
  ```

## Usage

To use the context functionality defined in this folder, wrap your application or specific components with the appropriate provider and then use the corresponding hook to access the context values:

```javascript
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { CartProvider } from "../context/CartContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;
```

In a component, you can access the context values like this:

```javascript
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const MyComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>{isAuthenticated ? "Welcome back!" : "Please log in"}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

## Best Practices

- **Organize by Feature**: Consider creating separate context files for different features to keep the logic modular and easier to manage.
- **Limit Context Usage**: Use context for data that needs to be accessed by many components. For local state, consider using React state or props.
- **Document Changes**: If a context file is modified, add comments to explain changes for future reference.
