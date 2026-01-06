# BORDJ STEEL - Corporate Website

This repository contains the source code for the Bordj Steel corporate website, built with Next.js and managed within Firebase Studio.

## Project Purpose

This application serves as the primary marketing and informational website for Bordj Steel, a leader in the steel construction industry in Algeria. It showcases the company's products, projects (references), history, and provides contact information.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React
- **Component Toolkit**: ShadCN UI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Generative AI**: Genkit
- **Deployment**: Firebase App Hosting

## Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    The application's Next.js development server can be started with:
    ```bash
    npm run dev
    ```
    This will start the web application, typically on `http://localhost:9002`.

3.  **Run the Genkit Development Server**:
    For AI-related feature development, the Genkit server runs separately:
    ```bash
    npm run genkit:dev
    ```

## Deployment

This project is configured for continuous deployment to **Firebase App Hosting**. Any changes pushed to the main branch will automatically trigger a new build and deployment.

Configuration can be found in `firebase.json` and `apphosting.yaml`.
