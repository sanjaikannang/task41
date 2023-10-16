import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css"; // Import the CSS file

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        "https://day-41-task-t00l.onrender.com/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (response.status === 200) {
        setResetStatus("Password reset successful");
      } else {
        const data = await response.json();
        setResetStatus(data.error || "Password reset failed");
      }
    } catch (error) {
      setResetStatus("Network or other error occurred");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <p>Enter your new password:</p>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {resetStatus && <p className="error-message">{resetStatus}</p>}{" "}
    </div>
  );
}

export default ResetPassword;
