import React from "react";
import Typography from "./modules/components/Typography";

export const Verify = ({ email }) => {
  return (
    <div style={{ marginTop: 64 }}>
      <Typography variant="h1" gutterBottom marked="center" align="center">
        Check your email!
      </Typography>
      <div style={{ marginTop: 24, fontSize: 20 }}>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          We sent you a verification link to {email}
        </Typography>
      </div>
    </div>
  );
};
