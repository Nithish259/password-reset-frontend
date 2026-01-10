

# 🌐 MERN Authentication Frontend

This is the frontend application for a MERN stack authentication system featuring:
- JWT-based login & signup
- Protected routes
- Password reset using OTP
- Axios with Authorization headers

---

## 🚀 Tech Stack

- React.js
- React Router
- Axios
- Context API
- React Toastify

---

## 🔐 Authentication Flow

1. User logs in or signs up
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Axios sends token via Authorization header
5. Protected routes allow access
6. Logout removes token from storage

## ✅ User Manual
1. Users can register by providing their name, email address, and password.
2. Registered users can log in using their email address and password.
3. To log out, users can hover over the profile letter icon and click Logout.
4. If a user forgets their password, they can reset it by:
-Entering their registered email address
-Providing the verification code (OTP) sent to that email
-Setting a new password


