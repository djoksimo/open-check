import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

export const AuthRedirect = () => {
  const history = useHistory();
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const verifyCode = async () => {
      const url = new URL(window.location.href);

      const email = url.searchParams.get("email");
      const code = url.searchParams.get("code");

      try {
        const resp = await axios.post(
          `http://localhost:5000/user/verify/code/?email=${email}&code=${code}`
        );

        localStorage.setItem("email", email);

        if (resp.data.code === "UserVerified") {
          history.push({
            pathname: "/account",
            search: `?email=${email}`,
          });

          console.log(resp);
        }
      } catch (error) {
        setMessage("Something went wrong...");
        //   show toast
        console.error(error);
      }
    };

    verifyCode();
  }, []);

  return <div>{message}</div>;
};
