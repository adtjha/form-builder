# Form Builder Web App

Welcome to the Form Builder web app, a user-friendly platform built using the MERN (MongoDB, Express, React, Node) stack. With Form Builder, you can effortlessly create various types of forms to suit your needs. The following types of forms are supported:

- [Categorize](https://help.socratease.co/lms/what-is-categorize-and-how-to-create-it): A form type that enables you to create categorized questions.
- [Cloze](https://help.socratease.co/lms/what-is-cloze-and-how-to-create-it): Design cloze-style questions using this form type.
- [Comprehension](https://help.socratease.co/lms/comprehension): Craft comprehension-based forms with ease.

## Features

- **MERN Stack Architecture:** Our app is built on the robust MERN stack, utilizing the strengths of each component:
  - **MongoDB:** Our database choice for seamless data management.
  - **Express:** Empowering the backend with APIs and efficient handling of tasks.
  - **React:** Providing an interactive and dynamic user interface.
  - **Node:** Serving as the backend technology to support the app's functionality.

- **Firebase Integration:** I have leveraged Firebase for image storage, ensuring quick and reliable image handling. Images are stored in Firebase Storage, and their respective download URLs are stored in our MongoDB database.

- **Redux State Management:** To enhance user experience and ensure smooth state transitions, I have incorporated Redux for state management.

## Getting Started

Follow these steps to get started with Form Builder:

1. Clone this repository to your local machine.
2. Ensure you have MongoDB and Node.js installed.
3. Navigate to the project directory and install dependencies:
   ```sh
   npm install
   npm run start
