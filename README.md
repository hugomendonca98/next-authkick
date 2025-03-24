# Next.js Full-Stack Template

A modern Next.js template featuring BetterAuth for secure authentication with email/password and Google, Drizzle ORM for type-safe database interactions, PostgreSQL as the database, and tRPC for seamless type-safe API communication. Styled with Tailwind CSS and shadcn for a sleek and customizable UI. Also includes Resend for email handling and TanStack Query for efficient data fetching and state management.

## Features

- **Next.js 15** – App Router support for modern React features.
- **BetterAuth** – Secure authentication with email/password and Google login.
- **Drizzle ORM** – Type-safe database interactions.
- **PostgreSQL** – Reliable and scalable relational database.
- **tRPC** – Type-safe API communication between frontend and backend.
- **TanStack Query** - Powerful asynchronous state management.
- **Resend** - Simple and reliable email handling.
- **Tailwind CSS v4** – Utility-first styling for rapid UI development.
- **Shadcn** – Beautiful, customizable UI components.

## Getting Started

### Prerequisites

- Node.js 18.18.0+
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/hugomendonca98/next-authkick.git
   cd next-authkick
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and configure the necessary variables:
   ```env
   DATABASE_URL=your_postgres_connection_url
   SITE_URL=your_client_url
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=your_client_url
   USE_DEV_MIGRATIONS_PATH=true // if true run the migrations in separated folder and use the folder to dev database.
   RESEND_API_KEY=your_resend_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Setup docker:**
   ```sh
   docker-compose up
   ```

5. **Run database migrations:**
   ```sh
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

6. **Start the development server:**
   ```sh
   npm run dev
   ```

## Contributing

Feel free to fork this repository and submit pull requests for improvements!

## License

This project is licensed under the MIT License.

