# React + Vite App

This guide outlines how to run and preview the React + Vite project and set up the backend environment using Docker.

## Prerequisites

Make sure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/products/docker-desktop/)

## Installation

Clone this repository and navigate into the project directory:

```bash
git clone <repo-url>
cd <project-directory>
```

Install dependencies:

```bash
pnpm install
```

## Running the Application

To build and preview the application locally, run:

```bash
pnpm build
pnpm preview
```

By default, the application will run at:

```
http://localhost:4173
```

> **Note:** The port `4173` is the default provided by Vite, but it might vary depending on your system and availability. Make sure to check the terminal output for the correct URL and port.

## Setting Up the Backend

The backend service can be easily started via Docker. Run the following command to start the backend:

```bash
docker run -p"8088:8080" registry.gitlab.com/saysimpler/hiring/fe-sample-api
```

This maps the Docker container's port `8080` to your local port `8088`.

The backend API will be accessible at:

```
http://localhost:8088
```

### Customizing Backend Port

If you prefer or need to run on a different local port (for example, if port `8088` is occupied), you can specify a different port:

```bash
docker run -p"<your-port>:8080" registry.gitlab.com/saysimpler/hiring/fe-sample-api
```

Replace `<your-port>` with your desired port number.

### Updating the API URL Configuration

In case the exposed port differs from `8088`, make sure to update your app configuration accordingly. Locate your configuration file (e.g., `src/config.ts`) and adjust the `apiUrl` setting:

```javascript
// src/config.ts
export const config = {
  apiUrl: "http://localhost:<your-port>/",
};
```

Replace `<your-port>` with the actual port you've set up for the backend service.

## Additional Information

- **Vite Docs:** [https://vitejs.dev/](https://vitejs.dev/)
- **React Docs:** [https://reactjs.org/](https://reactjs.org/)
- **Docker Docs:** [https://docs.docker.com/](https://docs.docker.com/)
