Patient Doctor Management App
=================================

Lightweight web application for managing patients, doctors and appointments. This repository contains the backend (ASP.NET Core Web API). The frontend is a separate React client (expected on http://localhost:3000).

Quick overview
--------------
- Backend: ASP.NET Core (.NET 5) with a three-layer architecture: Controllers -> BusinessLogicLayer -> DataAbstractionLayer (EF Core, code-first).
- Frontend: React (separate project: patient-doctor-management-client).
- Real-time chat powered by SignalR (hub: /chatHub).
- Authentication: JWT-based tokens (24h session lifetime, token refresh cadence used by the client).

Getting started (backend)
-------------------------
1. Open the solution in Visual Studio (requires .NET 5 SDK).
2. Update the connection string in PatientDoctorManagementApp/appsettings.json if needed.
3. Apply EF Core migrations / update database (code-first migrations located in DataAbstractionLayer/Migrations).
4. Run the API project (PatientDoctorManagementApp). Swagger UI is available in development at /swagger.

Client
------
The React client lives in a separate folder (patient-doctor-management-client). It expects the API on localhost and connects to SignalR at /chatHub.

Key technologies
----------------
- ASP.NET Core Web API (.NET 5)
- Entity Framework Core (Code-First)
- SignalR (WebSockets)
- React (frontend, separate repo)

Key features
------------
- Role-based accounts: patient (self-register), doctor (created by admin), administrator
- Appointment calendar with 30-minute slots (doctor view and patient booking)
- Real-time chat between doctors and patients
- CRUD management for medicines, diseases, specializations (admin)
- Feedback and prescriptions management

Notes
-----
- Passwords are encrypted and JWT tokens are used for authentication and authorization checks.
- CORS is configured to allow the React client at http://localhost:3000.

Local development
-----------------
Quick tips to run the project locally:

- Prerequisites: .NET 5 SDK, Node.js (for the frontend), and a local SQL Server or other provider configured via connection string.
- Update the connection string in PatientDoctorManagementApp/appsettings.json to point to your local database.
- Ensure dotnet-ef is available to apply migrations (install with: dotnet tool install --global dotnet-ef).
- Apply EF Core migrations from the repository root:

  dotnet ef database update --project DataAbstractionLayer --startup-project PatientDoctorManagementApp

- Run the backend API (from Visual Studio or):

  cd PatientDoctorManagementApp
  dotnet run

- Run the React client (separate folder patient-doctor-management-client):

  cd ../patient-doctor-management-client
  npm install
  npm start

- The API Swagger UI is available in development at https://localhost:<port>/swagger and the SignalR hub is mapped at /chatHub.
- If your client runs on a different origin, update CORS origins in Startup.cs accordingly.
