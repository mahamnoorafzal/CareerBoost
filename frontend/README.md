# CareerBoost Frontend

React-based frontend for the CareerBoost resume analysis platform.

## Features

- User authentication (Login/Register)
- Resume upload and management
- Job description input
- Resume-JD analysis with skill matching
- Compatibility scoring
- User profile management
- Responsive modern UI with Tailwind CSS

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/           # Reusable React components
│   ├── pages/               # Page components
│   ├── context/             # Context API for state management
│   ├── utils/               # Utility functions and API calls
│   ├── styles/              # CSS files
│   ├── App.js               # Main app component
│   └── index.js             # Entry point
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies
└── .env.example             # Environment variables template
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure API URL in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Frontend

### Development:
```bash
npm start
```

This runs the app in development mode at `http://localhost:3000`

### Build for Production:
```bash
npm run build
```

## Components

### Navigation
- **Navbar** - Main navigation with user menu

### Authentication
- **LoginPage** - User login form
- **RegisterPage** - User registration form
- **ProtectedRoute** - Route wrapper for authenticated pages

### Pages
- **HomePage** - Landing page with features overview
- **DashboardPage** - Main dashboard with resume/JD management
- **UploadResumePage** - Resume upload interface
- **AddJobDescriptionPage** - Job description input form
- **AnalysisResultPage** - Analysis results and recommendations
- **ProfilePage** - User profile and settings

### Context
- **AuthContext** - Global authentication state management

## Styling

Built with **Tailwind CSS** for modern, responsive design:
- Custom color theme (Dusky Red #8B1E3F, Dark Red #6D0F2B)
- Responsive grid layouts
- Smooth transitions and animations
- Mobile-first design approach

## Color Theme

- Primary: `#8B1E3F` (Dusky Red)
- Secondary: `#6D0F2B` (Dark Red)
- White: `#FFFFFF`
- Light Gray: `#F5F5F5`

## API Integration

Uses Axios for HTTP requests with automatic JWT token handling:
- Requests are intercepted to add authentication token
- 401 errors automatically redirect to login
- Base URL configured via environment variables

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token added to all API requests automatically
5. Protected routes check for valid token
6. Logout removes token from localStorage

## Form Validation

- Client-side validation on all forms
- Server-side validation for security
- Error messages displayed to users
- Success messages for completed actions

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation adapts for mobile devices
- Touch-friendly button sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
