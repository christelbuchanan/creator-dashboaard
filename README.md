# ChatAndBuild Creator Profile

A modern, responsive dashboard for content creators to manage their streams, projects, analytics, and earnings. The application features both creator and public viewing modes with social network-like interactions.

![ChatAndBuild Creator Profile Screenshot](https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80)

## Features

### For Creators
- **Profile Management**: Showcase your bio, social links, and streaming history
- **Stream Scheduling**: Plan and announce upcoming streams
- **Project Showcase**: Display your coding projects with details and stats
- **Analytics Dashboard**: Track views, followers, and audience demographics
- **Earnings Tracking**: Monitor revenue from various sources

### For Viewers
- **Creator Profiles**: Browse creator information, past streams, and projects
- **Social Interactions**: Follow creators, like streams, leave comments, and bookmark content
- **Upcoming Streams**: See what's coming next from your favorite creators

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/chatandbuild-creator-profile.git
cd chatandbuild-creator-profile
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx
│   ├── ProjectCard.tsx
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   ├── StreamCard.tsx
│   └── UpcomingStreamCard.tsx
├── context/           # React context for state management
│   └── UserContext.tsx
├── data/              # Mock data for development
│   └── mockData.ts
├── pages/             # Main application pages
│   ├── Analytics.tsx
│   ├── CreatorProfile.tsx
│   ├── Earnings.tsx
│   ├── Projects.tsx
│   └── StreamScheduler.tsx
├── App.tsx            # Main application component
├── index.css          # Global styles
└── main.tsx           # Application entry point
```

## Usage

### Toggle Between Creator and Public View

The application supports two viewing modes:
- **Creator View**: Full access to all features including analytics and earnings
- **Public View**: Limited access to public information like profile and projects

To toggle between views, use the view switcher in the header.

### Navigation

Use the sidebar to navigate between different sections:
- Profile
- Stream Schedule
- Projects
- Analytics (Creator only)
- Earnings (Creator only)

### Social Interactions

As a viewer, you can:
- Follow creators
- Like streams
- Leave comments
- Bookmark content for later

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the design by modifying the `tailwind.config.js` file.

### Mock Data

During development, the application uses mock data from `src/data/mockData.ts`. Replace this with your API calls when connecting to a backend.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Design inspiration from modern social media platforms
