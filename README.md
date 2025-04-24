# Job Search Portal

A modern job search portal built with React, Vite, and Supabase. This application allows users to browse job listings, apply filters, and submit job applications.

## Features

- Browse job listings with detailed information
- Advanced filtering options (job type, experience level, salary range)
- Real-time search functionality
- Responsive design for all devices
- Integration with Supabase for data storage

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Step-by-Step Setup Guide

### 1. Create a New Vite Project

```bash
# create a new project with Vite
npx create-vite@latest jobsearch --template react

# navigate to project directory
cd jobsearch

# install base dependencies
npm install
```

### 2. Install Required Dependencies

```bash
npm install react-bootstrap bootstrap

npm install react-router-dom

npm install react-icons

npm install @supabase/supabase-js
```

### 3. Set Up Project Structure

```bash
mkdir -p src/components/JobPortal src/supabase

touch src/components/JobPortal/JobPortal.jsx
touch src/components/JobPortal/JobPortal.css
touch src/supabase/supabaseClient.js
```

### 4. Configure Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Create a new table named 'jobs' with the following structure:

```sql
create table jobs (
  id bigint primary key generated always as identity,
  job_title text not null,
  company_name text not null,
  location text not null,
  job_type text not null,
  experience text not null,
  salary bigint not null,
  required_skills text[] not null
);
```

### 5. Set Up Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 6. Configure Supabase Client

In `src/supabase/supabaseClient.js`:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 7. Set Up React Router

Update `src/App.jsx`:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobPortal from "./components/JobPortal/JobPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 8. Add Bootstrap Styles

In `src/main.jsx`:

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
```

### 9. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

1. Build the project:

```bash
npm run build
```

2. The built files will be in the `dist` directory, ready for deployment to your preferred hosting platform.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Icons](https://react-icons.github.io/react-icons/)
