# ManageMint - A Modern Full-Stack Project Management App

ManageMint is a robust and feature-rich project management application designed to streamline team collaboration and project tracking. Built with Laravel 11, React, Tailwind CSS, and Inertia.js, it combines modern technologies to deliver an intuitive and powerful user experience.

## Features

- **Project Management:** Create, organize, and track projects with ease.
- **Task Management:** Add, assign, and prioritize tasks within projects.
- **User Collaboration:** Manage team members and assign roles.
- **Real-Time Updates:** Instant updates and notifications using Inertia.js.
- **Responsive Design:** Beautiful and seamless UI built with Tailwind CSS.
- **Authentication:** Secure user authentication and authorization.
- **API Integration:** Extend functionality with RESTful APIs.

## Technologies Used

### Backend:
- Laravel 11

### Frontend:
- React
- Tailwind CSS

### Middleware:
- Inertia.js

## Installation

### Prerequisites
- PHP >= 8.1
- Composer
- Node.js >= 16
- NPM or Yarn
- MySQL or any other supported database

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohamad-abdelkhalek/ManageMint.git
   cd ManageMint
   ```

2. **Install backend dependencies:**
   ```bash
   composer install
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Configure environment variables:**
   Copy the `.env.example` file and rename it to `.env`. Update the following fields:
   ```env
   APP_NAME=ManageMint
   APP_URL=http://localhost

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password
   ```

5. **Generate application key:**
   ```bash
   php artisan key:generate
   ```

6. **Run database migrations:**
   ```bash
   php artisan migrate
   ```

7. **Build frontend assets:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

8. **Start the development server:**
   ```bash
   php artisan serve
   ```

9. **Access the application:**
   Open your browser and navigate to `http://localhost:8000`.

## Development Commands

- **Linting and Formatting:**
  ```bash
  npm run lint
  npm run format
  ```

- **Run Tests:**
  ```bash
  php artisan test
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

## Contribution Guidelines

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add a new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

ManageMint is open-source software licensed under the [MIT license](LICENSE).

---

Thank you for choosing ManageMint! We hope it simplifies your project management experience.
