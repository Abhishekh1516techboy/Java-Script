# Voting Application

## Introduction

The Voting Application is a web-based system that allows users to vote for a given set of candidates. It ensures a secure and transparent voting process with real-time vote count updates.

## Features

1. **User Authentication:** Users can sign up and log in using their Aadhar Number and password.
2. **Candidate Viewing:** Users can view a list of candidates before voting.
3. **Voting Mechanism:** Users can vote for one candidate only. Once voted, they cannot change their vote.
4. **Real-Time Results:** Votes are counted and displayed in real time, sorted by the number of votes.
5. **Admin Management:** An admin manages the list of candidates and users.
6. **Password Management:** Users and admins can change their passwords.

## System Architecture

![Voting Application Architecture](VotingApp.drawio.svg)

## API Routes

### User Authentication

- `POST /user/auth/signup` - Register a new user.
- `POST /user/auth/login` - Log in an existing user.

### User Profile

- `GET /user/profile/:userId` - Retrieve user profile details.
- `PUT /user/profile/change-password/:userId` - Change user password.

### Voting

- `GET /voting/candidates` - Retrieve a list of available candidates.
- `POST /voting/vote/:Candidateid` - Vote for a candidate.

### Live Voting Results

- `GET /voting/results` - Get live voting results sorted by vote count.

### Admin Authentication

- `POST /admin/auth/signup` - Register a new admin.
- `POST /admin/auth/login` - Log in an admin.

### Admin Profile

- `GET /admin/profile` - Retrieve admin profile details.
- `PUT /admin/profile/change-password` - Change admin password.

### Admin Candidate Management

- `POST /admin/manage/candidate/create` - Create a new candidate.
- `PUT /admin/manage/candidate/update/:candidateId` - Update candidate details.
- `DELETE /admin/manage/candidate/delete/:candidateId` - Remove a candidate.

### Admin User Management

- `GET /admin/manage/u/users` - Retrieve a list of users.
- `DELETE /admin/manage/u/delete/:userId` - Delete a user.

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone git clone https://github.com/Abhishekh1516techboy/Java-Script/tree/main/Hello_World_NodeJs/Voting-Application.git
   ```
2. Navigate to the project folder:
   ```sh
   cd voting-application
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Package Dependencies

The project utilizes the following dependencies:

```json
{
  "bcryptjs": "^3.0.2",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.13.1",
  "passport": "^0.7.0",
  "passport-local": "^1.0.0"
}
```

## License

This project is licensed under the ISC License.

## Author

Created by **@Abhishekh1516techboy** date: 3/04/2025  Time: 02:25AM.
