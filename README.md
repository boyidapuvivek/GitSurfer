# GitHub Explorer

A React Native mobile application that allows users to explore GitHub repositories, view detailed information, and save favorite repositories for quick access.
Download the APK file from [Releases](https://expo.dev/accounts/vivek_react/projects/github-explorer/builds/7eb286f0-d0b1-4fcb-870c-9f111efe2d1a)

## Features

- **Repository Search**: Search for repositories on GitHub by name
- **Detailed Repository View**: View comprehensive details of repositories including:
  - Repository name and description
  - Star and fork counts
  - Primary programming language
  - Owner information and avatar
- **Favorites System**: Save repositories to your favorites list for quick access
- **Responsive Design**: Optimized for various screen sizes
- **Error Handling**: Graceful handling of network issues and API errors

## Bonus Features Implemented

- **Pagination**: Infinite scroll for search results
- **Dark Mode**: Toggle between light and dark themes
- **Extended Repository Info**: View creation and last update dates
- **Contributors List**: See all contributors to a repository

## Installation and Setup

### Prerequisites

- Node.js (v14.0 or higher)
- npm (v6.0 or higher) or Yarn (v1.22 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- JDK 11

### Setting Up Development Environment

If you haven't set up React Native on your machine, follow the official guide:
[React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

### Installing the App

1. Clone the repository:
   ```bash
   git clone https://github.com/boyidapuvivek/github-explorer.git
   cd github-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

3. Create a `.env` file in the project root (optional for GitHub API rate limiting):
   ```
   GITHUB_API_TOKEN=your_personal_access_token
   ```
   Note: The app will work without this, but you might hit API rate limits.

4. Run the Metro bundler:
   ```bash
   npx react-native start
   ```

5. In a new terminal, run the app on Android:
   ```bash
   npx react-native run-android
   ```
   
   Or on iOS (macOS only):
   ```bash
   npx react-native run-ios
   ```

### Installing the APK on Android

1. Download the APK file from [Releases](https://expo.dev/accounts/vivek_react/projects/github-explorer/builds/7eb286f0-d0b1-4fcb-870c-9f111efe2d1a)
2. Enable installation from unknown sources in your Android device settings
3. Open the APK file on your device to install


## Technologies Used

- **React Native**: Core framework
- **Redux**: State management
- **React Navigation**: Navigation between screens
- **Axios**: API requests

## API Reference

This app uses the GitHub REST API:
- Search Repositories: `https://api.github.com/search/repositories?q={query}`
- Get Repository Details: `https://api.github.com/repos/{owner}/{repo}`
- Get Repository Contributors: `https://api.github.com/repos/{owner}/{repo}/contributors`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GitHub for providing the API
- React Native community for the excellent documentation
- [List any other resources or inspirations]
