# Security Folder

The `security` directory in this application contains all the functionality and data related to permissions and authorizations. This folder is designed to centralize security-related logic, making it easier to manage user roles, permissions, and access control across the application.

## Purpose

The main goals of the `security` folder are to:

- Centralize the management of user permissions and authorization logic.
- Provide a clear structure for organizing roles, permissions, and related functionalities.
- Enhance maintainability and security by isolating security concerns from the rest of the application logic.

## Structure

The `security` folder is structured to contain individual files for different aspects of security functionality without any nested folders. Below is an example of how it may look:

```
/security
  ├── roles.ts
  ├── permissions.ts
  ├── auth.ts
  └── policy.ts
```

### Files and Their Purpose

- **`roles.ts`**: Defines user roles and their associated permissions.

  ```javascript
  export const Roles = {
    ADMIN: "admin",
    USER: "user",
    GUEST: "guest",
  };

  export const rolePermissions = {
    [Roles.ADMIN]: ["create", "read", "update", "delete"],
    [Roles.USER]: ["read", "update"],
    [Roles.GUEST]: ["read"],
  };
  ```

- **`permissions.ts`**: Contains functions to check user permissions based on their roles.

  ```javascript
  import { rolePermissions } from "./roles";

  export const hasPermission = (role, permission) => {
    return rolePermissions[role]?.includes(permission) || false;
  };

  export const canCreate = (role) => hasPermission(role, "create");
  export const canRead = (role) => hasPermission(role, "read");
  export const canUpdate = (role) => hasPermission(role, "update");
  export const canDelete = (role) => hasPermission(role, "delete");
  ```

- **`auth.ts`**: Contains authentication logic, such as checking if a user is logged in and managing authentication tokens.

  ```javascript
  export const isAuthenticated = () => {
    // Logic to check if the user is authenticated (e.g., checking a token)
    return !!localStorage.getItem("authToken");
  };

  export const login = (token) => {
    localStorage.setItem("authToken", token);
  };

  export const logout = () => {
    localStorage.removeItem("authToken");
  };
  ```

- **`policy.ts`**: Defines access control policies that dictate what actions are allowed based on user roles and permissions.

  ```javascript
  import { canRead, canCreate } from "./permissions";

  export const canAccessPage = (role, page) => {
    const pageAccessPolicy = {
      "/admin": () => canRead(role) && role === "admin",
      "/dashboard": () => canRead(role),
      "/settings": () => canCreate(role),
    };

    return pageAccessPolicy[page]?.() || false;
  };
  ```

## Usage

To use the security functionality defined in this folder, simply import the relevant functions and constants into your components or services as needed:

```javascript
import { Roles, canRead } from "../security/roles";
import { isAuthenticated, login, logout } from "../security/auth";
import { canAccessPage } from "../security/policy";

const MyComponent = () => {
  const userRole = Roles.USER; // This would typically come from user data
  const currentPage = "/dashboard";

  if (isAuthenticated() && canAccessPage(userRole, currentPage)) {
    // Render the protected content
  } else {
    // Redirect to login or show an unauthorized message
  }

  // Component logic...
};
```

## Best Practices

- **Define Roles Clearly**: Ensure that user roles and their associated permissions are clearly defined and documented.
- **Limit Permissions**: Follow the principle of least privilege, ensuring that users have only the permissions they need to perform their tasks.
- **Regularly Review Policies**: Regularly review and update access control policies to ensure they meet the current security requirements.
