# ShipStack

ShipStack is a Next.js 15 boilerplate designed to help you kickstart your SaaS application development. It comes packed with essential features to get you up and running quickly.

**Key Features:**
*   Next.js 15 (with Turbopack)
*   NextAuth.js v5 for authentication
*   Prisma ORM for database interactions
*   Stripe integration for payments
*   Internationalization (i18n) with `next-intl`
*   Tailwind CSS for styling
*   Shadcn/ui components

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v20 or later recommended)
*   npm, pnpm, or yarn
*   A PostgreSQL database (or any other database compatible with Prisma)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saammat/ShipStack.git
    cd ShipStack
    ```

2.  **Set up environment variables:**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    *   Update `.env.local` with your actual credentials and URLs. Refer to the comments in the file for guidance on each variable:
        *   `NEXT_PUBLIC_SITE_URL`: Your application's deployment URL.
        *   `AUTH_SECRET`: A secret key for NextAuth.js (generate a strong random string).
        *   `AUTH_GITHUB_ID` & `AUTH_GITHUB_SECRET`: Your GitHub OAuth application credentials.
        *   `AUTH_GOOGLE_ID` & `AUTH_GOOGLE_SECRET`: Your Google OAuth application credentials.
        *   `DATABASE_URL`: Your database connection string (e.g., `postgresql://user:password@host:port/database_name`).
        *   `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`: (Optional) If you are using Supabase.

3.  **Install dependencies:**
    Choose your preferred package manager:
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

4.  **Run database migrations:**
    This will set up your database schema based on the Prisma schema file.
    ```bash
    npx prisma migrate deploy
    # or use the provided script
    npm run migrate
    ```
    *(Ensure your `DATABASE_URL` in `.env.local` is correctly set before running migrations.)*

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

ShipStack comes with a variety of features to accelerate your SaaS development:

*   **Framework**: Built with [Next.js 15](https://nextjs.org/) (App Router) and React 19.
*   **Authentication**: Secure authentication using [NextAuth.js v5](https://authjs.dev/). Includes GitHub and Google OAuth providers out-of-the-box, easily extendable for more.
*   **Database ORM**: [Prisma](https://www.prisma.io/) for intuitive and type-safe database access.
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for utility-first styling, along with `tailwind-merge` and `clsx` for managing classes.
*   **UI Components**: A rich set of customizable UI components from [Shadcn/ui](https://ui.shadcn.com/).
*   **Internationalization (i18n)**: Ready-to-use internationalization setup with `next-intl`.
*   **Payments**: [Stripe](https://stripe.com/) integration for handling subscriptions and payments (basic setup).
*   **Linting & Formatting**: ESLint and Prettier configured for code quality and consistency.
*   **Dark Mode**: Theme support with Next-Themes.
*   **Environment Variables**: Easy configuration using `.env.local`.
*   **Database Migrations**: Simplified database schema management with Prisma Migrate.
*   **Magic UI**: Includes some components from [Magic UI](https://magicui.design/) for enhanced user experience.

## Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev` or `pnpm dev` or `yarn dev`
    *   Runs the app in development mode with Turbopack.
    *   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    *   The page will reload if you make edits.

*   `npm run build` or `pnpm build` or `yarn build`
    *   Builds the app for production to the `.next` folder.
    *   It correctly bundles React in production mode and optimizes the build for the best performance.

*   `npm run start` or `pnpm start` or `yarn start`
    *   Starts the production server.
    *   Your app is now available at the specified port (usually 3000).

*   `npm run lint` or `pnpm lint` or `yarn lint`
    *   Lints the project files using Next.js's built-in ESLint configuration.

*   `npm run migrate` or `pnpm migrate` or `yarn migrate`
    *   Applies database migrations using Prisma. This script uses `dotenv-cli` to load your `.env.local` variables.
    *   Equivalent to `dotenv -e .env.local -- npx prisma migrate deploy`.

## Deployment

You can deploy this Next.js application to any platform that supports Node.js, such as:

*   [Vercel](https://vercel.com/) (Recommended - optimal support for Next.js)
*   [Netlify](https://www.netlify.com/)
*   [AWS Amplify](https://aws.amazon.com/amplify/)
*   Your own server

### Before Deploying

*   **Build your application:** Run `npm run build`.
*   **Environment Variables:** Ensure all necessary environment variables (as defined in `.env.example` and configured in your `.env.local`) are set up on your deployment platform. This is crucial for authentication, database connectivity, and other services to function correctly.
*   **Database:** Make sure your production database is accessible from your deployment environment.

For Vercel, deployment is as simple as connecting your Git repository. Vercel automatically detects Next.js projects and sets up the build and deployment pipeline.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/issue-description
    ```
3.  **Make your changes.**
4.  **Commit your changes** with a clear and descriptive commit message.
5.  **Push to your forked repository.**
6.  **Create a Pull Request** to the main repository's `main` branch.

Please ensure your code adheres to the existing coding style and that any new features are well-documented.

## Built With

This project leverages several key open-source technologies and libraries. We extend our gratitude to their creators and maintainers:

*   [Next.js](https://nextjs.org/) - The React Framework for Production
*   [React](https://react.dev/) - A JavaScript library for building user interfaces
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
*   [NextAuth.js](https://authjs.dev/) - Authentication for Next.js
*   [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
*   [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
*   [Lucide React](https://lucide.dev/) - Simply beautiful open-source icons
*   [next-intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js
*   [Stripe](https://stripe.com/) - Online payment processing
*   [Vercel](https://vercel.com/) - For hosting and deployment inspiration

And many other fantastic libraries listed in the `package.json`.