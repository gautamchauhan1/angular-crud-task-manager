📝 Angular CRUD Task Manager

A simple and functional Task Manager application built using Angular.
This project demonstrates core Angular concepts like components, services, routing, guards, and CRUD operations using a mock backend.

🚀 Features
➕ Add new tasks
✏️ Edit existing tasks
❌ Delete tasks
📋 View all tasks
🔐 Basic authentication using localStorage
🛡️ Route protection using Auth Guards
🔄 CRUD operations with JSON Server
🌐 Live Demo

👉 https://angular-crud-task-manager.vercel.app/login

⚠️ Note:
The app is deployed on Vercel. Since JSON Server is not supported on Vercel,
CRUD operations (Add/Edit/Delete) may not work in the live demo.

🛠️ Tech Stack
Frontend: Angular
Backend (Mock): JSON Server
Language: TypeScript
Styling: CSS
📂 Project Structure
src/app/
│── components/      # Task list, add/edit components
│── services/        # TaskService, AuthService
│── guards/          # AuthGuard for route protection
│── models/          # Task interface
│── app-routing.ts   # Routing configuration
│── app.module.ts    # Root module
🔐 Authentication

This project uses a basic authentication system:

Login state is stored in localStorage
AuthService handles login and logout
AuthGuard protects routes from unauthorized access

⚠️ This is a basic implementation for learning purposes.
In real-world applications, authentication is implemented using JWT or OAuth.

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/gautamchauhan1/angular-crud-task-manager.git
cd angular-crud-task-manager
2. Install dependencies
npm install
3. Run Angular app
ng serve
4. Start JSON Server (Mock Backend)
npx json-server --watch db.json
5. Open in browser
http://localhost:4200
📚 Concepts Covered
Angular Components & Modules
Routing & Navigation
Route Guards (AuthGuard)
Services & Dependency Injection
HTTP Client (API calls)
CRUD Operations
Two-way Data Binding
LocalStorage usage
⚠️ Known Issues
JSON Server does not work on Vercel deployment
Backend is simulated (not production-ready)
🔮 Future Improvements
🔐 Implement real authentication (JWT / Firebase)
🌐 Replace JSON Server with real backend (Node.js / Spring Boot)
🎨 Improve UI/UX
🔍 Add search and filtering
📱 Make application responsive
🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.
