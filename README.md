# Nearest Cities App

This application allows users to find the nearest cities based on a search term. It is built using React with TypeScript and Vite.

## Components

### App Component

The `App` component is the main component of the application. It renders the header, input field for searching cities, and displays the list of nearest cities or all cities based on the search term. It also handles user input for searching and utilizes memoization for performance optimization.

Key features:
- Renders header with the title of the application.
- Renders an input field for searching cities.
- Displays the list of nearest cities or all cities based on the search term.
- Utilizes useMemo for memoization to optimize performance.
- Handles user input for searching cities.

## Running the App

To run the Nearest Cities App locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/stevegm/nearest-cities-app.git
```

2. Navigate to the project directory:

```bash
cd nearest-cities-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## Additional Information

- This application uses React with TypeScript for frontend development.
- Vite is used as the build tool for fast development and HMR (Hot Module Replacement).
- ESLint is configured with TypeScript-specific rules for code quality and consistency.
- The application utilizes memoization for performance optimization when rendering large datasets.
- For production deployment, consider optimizing the application further and implementing additional features such as pagination or virtualization for better performance with large datasets.