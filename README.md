# Vibecast: Movie and Game Discovery Platform

[Live Demo](https://vibecast-entertainment.onrender.com//) | [GitHub Repo](https://github.com/azad12614/videcast)

Vibecast is a modern, single-page application (SPA) designed to help users discover trending movies and popular video games. It leverages powerful external APIs to provide up-to-date content in a fast, responsive interface.

## 🌟 Features

- **Trending Content:** Dynamically fetch and display the latest trending movies and popular games from external APIs.
- **Intuitive Interface:** A clean, modern user interface built with Tailwind CSS and DaisyUI.
- **Client-Side Routing:** Fast navigation between different sections (Movies, Games, About) without full page reloads, powered by React Router DOM.
- **Responsive Design:** Fully optimized layout for seamless viewing across desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

Vibecast is built using a modern JavaScript stack.

| Category               | Technology                  | Description                                                                    |
| :--------------------- | :-------------------------- | :----------------------------------------------------------------------------- |
| **Frontend Framework** | React (v18)                 | The core UI library for building the application.                              |
| **Build Tool**         | Vite                        | Next-generation frontend tooling for fast development and bundling.            |
| **Styling**            | Tailwind CSS & DaisyUI      | Utility-first CSS framework for rapid styling, enhanced by DaisyUI components. |
| **Routing**            | React Router DOM            | Handles client-side navigation and routing within the SPA.                     |
| **API Clients**        | TMDB (Movies), RAWG (Games) | External APIs used to fetch content data.                                      |

## 🚀 Installation & Local Setup

Follow these steps to set up the project locally on your machine.

### 1. Prerequisites

You must have **Node.js** and **npm** installed.

### 2. Clone the Repository

```bash
git clone [https://github.com/azad12614/Vibecast.git](https://github.com/azad12614/Vibecast.git)
cd Vibecast
```

### 3. Install Dependencies

Install all necessary project dependencies:

```bash
npm install
```

### 4. Environment Variables

This project requires API keys for data fetching. Create a file named .env in the root of your project directory and add your API keys:

```bash
VITE_TMDB_MOVIE_API_KEY="YOUR_TMDB_API_KEY_HERE"
VITE_RAWG_GAME_API_KEY="YOUR_RAWG_API_KEY_HERE"
```

### 5. Run the Development Server

Start the application in development mode:

```bash
npm run dev
```

The application will typically be accessible at http://localhost:5173.

## 📦 Building for Production

To create a production-ready static build, run the build command:

```bash
npm run build
```

This command compiles the application and outputs the optimized static files into the dist directory.

## 🤝 Contribution

Abdullah Al Azad
