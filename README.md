# Web-Mail Application

A robust email management system built with Spring Boot and React, featuring secure authentication, email organization, contact management, and file attachments with AWS S3 integration.

---


## 🚀 Features

- User authentication with JWT
- Email composition and management
- Folder organization system
- Contact management
- File attachments with AWS S3 storage
- Advanced email filtering and search capabilities
- Mail importance levels
- Asynchronous file handling

---

## 🛠️ Technologies

### Backend
- Java Spring Boot
- Spring Security with JWT
- Spring Data JPA
- AWS S3 for file storage
- MySQL Database
- Lombok

### Frontend
- React
- Vite
- Node.js
- NPM

---

## 📋 Prerequisites

- JDK 17 or later
- Maven
- MySQL Database
- AWS Account with S3 access
- Node.js and NPM

---

## ⚙️ Environment Variables Setup

You need to set the following environment variables:

1. AWS Configuration:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `AWS_REGION`: AWS region (e.g., us-east-1)
   - `AWS_S3_BUCKET_NAME`: Your S3 bucket name

2. JWT Configuration:
   - `JWT_SECRET`: A secure random string for JWT signing
   - `JWT_EXPIRATION`: Token expiration time in milliseconds

3. File System:
   - `FILE_UPLOAD_DIRECTORY`: Local directory path for temporary file storage

4. Database Configuration:
   - `SPRING_DATASOURCE_URL`: MySQL connection URL (e.g., jdbc:mysql://localhost:3306/webmail)
   - `SPRING_DATASOURCE_USERNAME`: Database username
   - `SPRING_DATASOURCE_PASSWORD`: Database password

---

## 🚀 Installation & Running

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/msabry1/web-mail.git
cd web-mail
```

2. Set up environment variables as described above

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The backend server will start running on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

---

## 🏗️ Project Structure

### Backend (`/backend`)
```
├── src/main/java/com/foe/webmail
    ├── java/com/foe/webmail
        ├── aws         # AWS S3 configuration and integration
        ├── config      # Application configurations (Security, CORS, etc.)
        ├── controller  # REST API endpoints
        ├── dto         # Data Transfer Objects
        ├── entity      # Database entities
        ├── mapper      # Object mappers
        ├── repository  # Database repositories
        └──  service     # Business logic services
    ├── resources   # Application properties and database schema
        
```

### Frontend (`/frontend`)
```
├── src
    ├── components      # React components
        ├── mail-composing  # Email composition components
        ├── mails          # Mail listing and details
        ├── login-signup   # Authentication components
        └── ui            # Reusable UI components
    ├── context       # React context providers
    ├── hooks         # Custom React hooks
    ├── services      # API integration services
    └── utils         # Utility functions
```

---


## 🔒 Security Features

- JWT-based authentication
- Password encryption
- Secure file handling

---


## 💡 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
