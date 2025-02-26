# Components Directory

This directory contains all the reusable components for the application. Components are structured to reflect the specific pages they are used in. Each page on the site has its own dedicated folder within `components` to organize related components.

## Naming Conventions

We follow a specific naming convention for component files based on how they are used:

- **PascalCase**:
  - If the component is used directly in the `app` folder (in the page of the site itself), it follows the PascalCase naming convention.
  - If a component is used in both a page and within other components, it **also** follows the snake_case naming convention.
    - Example: `Header.tsx`, `UserProfile.tsx`
- **snake_case**: If a component is used inside another component file (within a folder under `components`), it follows the snake_case naming convention. \* Example: `sidebar_menu.tsx`, `footer_links.tsx`
  This helps differentiate between higher-level page components and sub-components used within other components.

## Folder Structure

Each page on the site has its own corresponding folder in the `components` directory, which contains the components for that page.
Example structure:

```
components/
├── home/
│ ├── Header.tsx # PascalCase - Directly used in the Home page
│ └── feature_card.tsx # snake_case - Used within another component
├── about/
├── AboutUsHeader.tsx
└── mission_statement.tsx
```

This organization helps maintain a clear, modular structure where components for each page are easy to locate and manage.
