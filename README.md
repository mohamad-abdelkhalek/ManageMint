<div align="center">

![ManageMint Logo](Readme/LogoIcon.png)

# **ManageMint**

### A modern, full-stack project management solution built for teams that move fast.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-11.0-FF2D20?logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.0-6875F5)](https://inertiajs.com)


</div>

---

## 🚀 **Overview**

ManageMint revolutionizes project management by combining powerful features with an intuitive interface. Built for teams of all sizes, it streamlines collaboration while providing robust tools for project tracking and coordination.

### **Why Choose ManageMint?**

- 🎯 **Intuitive Interface**: Get started in minutes with our user-friendly design.
- ⚡ **Real-Time Updates**: Stay synchronized with instant notifications and live updates.
- 🛠️ **Customizable Workflows**: Tailor the system to match your team's unique processes.
- 📱 **Responsive Design**: Seamlessly access projects across all devices.
- 🔒 **Enterprise-Grade Security**: Built with security best practices at its core.

---

## ✨ **Key Features**

### **Project Management**
- Create, update, and delete projects.
- Add descriptions, images, deadlines, and statuses.
- Assign projects to team members.

### **Task Management**
- Create, edit, and delete tasks.
- Associate tasks with projects and users.
- Add descriptions, deadlines, priorities, statuses, and images.

### **Team Collaboration**
- Individualized task assignments.
- Shared calendars and milestones.
- Multiple users can collaborate on the same project.

### **Integration & APIs**
- RESTful API with extensive documentation.
- Single Sign-On (SSO) capabilities.
- Export data in multiple formats.
- Third-party app integrations.

---

## 🛠️ **Technology Stack**

### **Backend**
- **Framework**: Laravel 11
- **Database**: MySQL 8.0+

### **Frontend**
- **Framework**: React 18
- **Styling**: Tailwind CSS 3
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form

### **Infrastructure**
- **Routing**: Inertia.js
- **Testing**: PHPUnit & Jest
- **CI/CD**: GitHub Actions

---

## 📦 **Installation**

### **Prerequisites**

Ensure the following tools are installed:
- PHP >= 8.1
- Composer >= 2.0
- Node.js >= 16
- MySQL >= 8.0 (or PostgreSQL >= 13)
- Redis >= 6.0 (optional for caching)

### **Quick Start**

1. **Clone & Install Dependencies**
   ```bash
   git clone https://github.com/mohamad-abdelkhalek/ManageMint.git
   cd ManageMint

   # Install PHP dependencies
   composer install

   # Install Node.js dependencies
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy environment file
   cp .env.example .env

   # Generate application key
   php artisan key:generate

   # Update database credentials in .env
   ```

3. **Database & Storage Setup**
   ```bash
   # Run migrations
   php artisan migrate

   # Seed the database (optional)
   php artisan db:seed

   # Link storage
   php artisan storage:link
   ```

4. **Start Development Servers**
   ```bash
   # Start Laravel server
   php artisan serve

   # Start Vite development server
   npm run dev
   ```

Visit `http://localhost:8000` to access the application.


---

## 📖 **Documentation**


- Getting Started Guide
- API Documentation
- Configuration Options
- Deployment Strategies
- Security Best Practices
- Troubleshooting Guide

---

## 🖼️ **Screenshots**

### **Authentication**
![Login Page](Readme/Login.png)
*Secure and streamlined login experience.*

### **Dashboard**
![Dashboard](Readme/Dashboard.png)
*Customizable overview with project metrics.*

### **Projects**
![Projects](Readme/Projects.png)
*Manage and organize projects effectively.*

### **Create New Project**
![Create New Project](Readme/NewProject.png)
*Create new projects effectively.*

### **Tasks**
![Tasks](Readme/AllTasks.png)
*Comprehensive task management interface.*

### **Create New Task**
![Create New Task](Readme/NewTask.png)
*Create new tasks effectively.*

### **Users**
![Users](Readme/Users.png)
*Easily manage team members.*

### **Add New Users**
![Add New Users](Readme/NewUser.png)
*Easily add new team members.*

---

## 🤝 **Contributing**

We love contributions!

- Reporting bugs
- Suggesting features
- Writing documentation
- Submitting pull requests

---

<div align="center">

Made with ❤️ by the developer Mohammad Abdelkhalek

[**GitHub**](https://github.com/mohamad-abdelkhalek)

</div>
