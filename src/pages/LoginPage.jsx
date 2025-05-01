// src/pages/LoginPage.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";
const MAX_ATTEMPTS = 3;
const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [unlockIn, setUnlockIn] = useState(null);

  useEffect(() => {
    const storedAttempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
    const lockTime = parseInt(localStorage.getItem("lockTime")) || null;
    const now = Date.now();

    if (lockTime && now - lockTime < LOCK_DURATION_MS) {
      setIsLocked(true);
      updateUnlockCountdown(lockTime);
    } else {
      clearLock();
    }

    setAttempts(storedAttempts);
  }, []);

  const updateUnlockCountdown = (lockTime) => {
    const interval = setInterval(() => {
      const timePassed = Date.now() - lockTime;
      const timeLeft = LOCK_DURATION_MS - timePassed;
      if (timeLeft <= 0) {
        clearInterval(interval);
        clearLock();
      } else {
        setUnlockIn(Math.ceil(timeLeft / 1000)); // seconds left
      }
    }, 1000);
  };

  const clearLock = () => {
    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("lockTime");
    setAttempts(0);
    setIsLocked(false);
    setUnlockIn(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      login();
      clearLock();
      navigate("/admin");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("loginAttempts", newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        const lockTime = Date.now();
        localStorage.setItem("lockTime", lockTime);
        updateUnlockCountdown(lockTime);
      }

      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col w-64 space-y-3">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLocked}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLocked}
        />
        <button
          className={`p-2 rounded ${
            isLocked
              ? "bg-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          type="submit"
          disabled={isLocked}
        >
          {isLocked ? "Locked Out" : "Login"}
        </button>
        {isLocked && unlockIn && (
          <p className="text-red-500 text-sm text-center">
            Locked out. Try again in {unlockIn} seconds.
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
