# DiscoverQA Mobile Application

DiscoverQA is a tourism app designed to enhance the travel experience in Qatar by providing a simple platform to discover places and events. This app aims to help tourists search for activities, attractions, restaurants, and anything else within Qatar.

## Table of Contents

- [Key Features](#key-features)
- [Prototype](#prototype)
- [Installation Guide](#installation-guide)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)

## Key Features

- **Place Search**: The Local Business API from RapidAPI will be used to enable users to search and discover local businesses, attractions, and more.
- **Current Events**: Using Serpapi for real-time listings of local events, ensuring users have access to the latest events.
- **Event Tickets**: Users can view available websites and choose which website they wish to purchase tickets from.
- **Map View**: A map view for each place or event, allowing users to view the location directly within the app. A press on the map opens the location in a navigation app.
- **Ratings and Reviews**: Users can view the average rating and the total number of ratings for each place.
- **Favorites**: Allows users to bookmark places, adding them to a 'Favorites' page for quick access at any time.
- **Profile**: Users will be able to view their profile and edit their information.

## Prototype

![DiscoverQA](https://github.com/Mbii55/DiscoverQA/assets/156779087/14c201cd-53e1-4f41-b4b3-f125309926a6)


## Installation Guide

### Prerequisites

Before you begin, ensure you meet the following requirements:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- npm (comes installed with Node.js) or [Yarn](https://yarnpkg.com/)
- Optional: [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
  
  ```
  npm install -g expo-cli
  ```

- For Mac users: Install Xcode to run and install the iPhone simulator.
- For Windows Users: Install Android Studio and set up the Android Emulator SDK.


## Installation

To install the project, follow these steps:

**Note:** Cloning the repository is optional, you can clone it or download the app zip folder from the code tab in the home screen.

1. Clone the repository:
   
   ```
   git clone https://github.com/3bdop/INFS3203-project02.git
   ```
3. Navigate to the project directory:
   
   ```
   cd DiscoverQA
   ```
3. Install dependencies:
   
- Using npm:
  ```
  npm install
  ```

- Using Yarn:
  ```
  yarn install
  ```

## Running the Application

To run the application on your local machine, follow these steps:

1. Open Xcode/android stodio and start the Simulator/Emulator
   
2. Start the Expo developer server:
   
- Using npm:
  
  ```
  npm start
  ```
  
- Or Using expo:
  
  ```
  npx expo start
  ```
  
- Or Using Yarn:
  
  ```
  yarn start
  ```

3. Expo CLI will start Metro Bundler, which is a JavaScript bundler that compiles your app’s code and assets. Once it's ready, you'll see a QR code in the terminal.

3. To run the app on your mobile device, download the [Expo Go](https://expo.dev/client) app from the App Store (iOS) or Google Play (Android). Scan the QR code with your device to open your project.

4. To run the app on a Simulator/Emulator:
- **iOS Simulator** (Mac only):
  Press `i` in the terminal running your project.
- **Android Emulator**:
  Press `a` in the terminal running your project.

## Usage

- Open the app and start exploring places and events in Qatar.
- Use the search feature to find specific attractions, restaurants, and more.
- Check out the current events to see what's happening around you.
- View event tickets and choose where to buy them.
- Use the map view to get directions to your chosen location.
- Read ratings and reviews to help make decisions.
- Bookmark your favorite places for easy access later.
- Edit your profile information as needed.
