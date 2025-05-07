# Lifdra Frontend

A modern React-based frontend application for Lifdra, built with Vite and React.

## 🚀 Features

- **Authentication System**
  - Email/Password login
  - OTP-based authentication
  - Social media integration
  - Session management

- **User Interface**
  - Responsive design
  - Modern UI components
  - Dark/Light theme support
  - Customizable layouts

- **State Management**
  - Zustand for global state
  - Persistent storage
  - Optimized performance

- **Routing**
  - Protected routes
  - Dynamic routing
  - Nested routes
  - Route guards

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **Routing**: React Router v6
- **Styling**: Styled Components
- **UI Components**: Custom components
- **API Integration**: Axios
- **Form Handling**: Custom hooks
- **Authentication**: JWT

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/lifdra-frontend.git
cd lifdra-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_APP_ENVIRONMENT=development
VITE_API_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Configuration

### Environment Variables

- `VITE_APP_ENVIRONMENT`: Set to 'development', 'production', or 'local'
- `VITE_API_URL`: Your API endpoint URL

### API Configuration

The application uses different API endpoints based on the environment:
- Production: `https://accounts.steyp.com`
- Development: `https://accounts.steyp.com`
- Local: `http://localhost:8015`

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # React components
│   ├── general/     # Common components
│   ├── auth/        # Authentication components
│   └── ...
├── store/           # Zustand stores
├── utils/           # Utility functions
├── hooks/           # Custom hooks
├── routes/          # Route configurations
└── styles/          # Global styles
```

## 🔐 Authentication Flow

1. User enters credentials
2. Server validates and returns JWT
3. Token stored in Zustand store
4. Protected routes check authentication
5. Automatic token refresh

## 🎨 UI Components

- Header with responsive navigation
- Profile management
- Notification system
- Search functionality
- Custom modals and popups

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## 📝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email support@lifdra.com or join our Slack channel.
