# Constants Folder

The `constants` directory contains all the static data that is unlikely to change frequently for the application. This folder is designed to keep the codebase clean and maintainable by isolating static values from component and page logic.

## Purpose

The main goals of the `constants` folder are to:

- Store static data structures (arrays, objects) that can be reused across the application.
- Organize data in a way that reflects the specific pages or services they are associated with, enhancing clarity and maintainability.
- Reduce clutter in component and page files by centralizing static information.

## Structure

The `constants` folder is structured to provide a clear organization based on the specific pages or services of the application. Here’s an example of how it may look:

```markdown
components/
├── home/
│ ├── heroData.ts
│ └── featuresData.ts
├── about/
│ └── teamMembers.ts
├── services/
│ └── serviceList.ts
├── common/
├── formLabels.ts
└── apiEndpoints.ts
```

### Files and Their Purpose

- **`/home/heroData.ts`**: Contains static data related to the hero section of the home page.

  ```javascript
  export const HERO_DATA = {
    title: "Welcome to Our Application",
    subtitle: "Building a better future together",
    cta: "Get Started",
  };
  ```

- **`/home/featuresData.ts`**: Lists the features of the application showcased on the home page.`export const FEATURES_DATA = [
  { id: 1, title: 'Feature One', description: 'Description of feature one.' },
  { id: 2, title: 'Feature Two', description: 'Description of feature two.' },
];
`
- **`/about/teamMembers.ts`**: Contains information about team members for the about page.`export const TEAM_MEMBERS = [
  { id: 1, name: 'Alice', role: 'CEO' },
  { id: 2, name: 'Bob', role: 'CTO' },
];
`
- **`/services/serviceList.ts`**: Lists the services offered by the application.`export const SERVICES_LIST = [
  { id: 1, name: 'Service One', description: 'Description of service one.' },
  { id: 2, name: 'Service Two', description: 'Description of service two.' },
];
`
- **`/common/formLabels.ts`**: Contains static labels and placeholders for forms used throughout the application.`export const FORM_LABELS = {
  username: 'Username',
  password: 'Password',
  email: 'Email Address',
};
`
- **`/common/apiEndpoints.ts`**: Stores the API endpoints used across the application for easy reference.`export const API_ENDPOINTS = {
  GET_USERS: '/api/users',
  GET_POSTS: '/api/posts',
};
`

## Usage

To utilize the constants defined in this folder, simply import the necessary data into your components or pages:

```javascript
import { HERO_DATA } from "../constants/home/heroData";
import { TEAM_MEMBERS } from "../constants/about/teamMembers";

const HomePage = () => {
  // Use HERO_DATA and other constants as needed
};
```

## Best Practices

- **Organize by Page/Service**: Ensure that constants are organized in dedicated folders according to the pages or services they are associated with.
- **Document Changes**: If any constant is modified, document the change in a comment for clarity and future reference.
- **Limit Scope**: Only include constants that are static and unlikely to change often; for dynamic data, consider using state or props.
