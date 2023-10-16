import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ForgotPassword.css"; // Import the CSS file

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async () => {
    if (token) {
      // If token is provided, navigate to the ResetPassword component
      window.location.href = `/reset-password/${token}`;
    } else {
      try {
        const response = await fetch(
          "https://day-41-task-t00l.onrender.com/generate-reset-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (response.status === 200) {
          setResetStatus("Password reset link sent. Check your email.");
        } else {
          const data = await response.json();
          setResetStatus(data.error || "Password reset failed");
        }
      } catch (error) {
        setResetStatus("Network or other error occurred");
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {resetStatus && <p>{resetStatus}</p>}
      {resetStatus ? (
        <>
          <input
            type="text"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button className="reset-button" onClick={handleResetPassword}>
            Reset Password
          </button>
        </>
      ) : (
        <button className="send-link-button" onClick={handleResetPassword}>
          Send Reset Link
        </button>
      )}
    </div>
  );
}

export default ForgotPassword;
