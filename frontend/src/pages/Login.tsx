import { useCallback, useState } from "react";
import ChangeThemes from "../components/ChangesThemes";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateNotEmpty,
} from "../utilFunctions/ValidateFunction";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [number, setNumber] = useState(0);

  console.log(errorMessage, number);
  const handleLogin = useCallback(async () => {
    setErrorMessage("");
    setNumber(0);
    if (!validateNotEmpty(email) && !validateNotEmpty(password)) {
      setNumber(1);
      setErrorMessage("Email and password are required");
      return;
    } else if (!validateEmail(email)) {
      setNumber(2);
      setErrorMessage("Veuillez saisir une adresse e-mail valide.");
      return;
    } else if (!validateNotEmpty(password)) {
      setNumber(3);
      setErrorMessage("Veuillez saisir un mot de passe.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token, id } = responseData;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        getUserInfo();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }

    setEmail("");
    setPassword("");
  }, [email, password, navigate]);
  const getUserInfo = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if (token) {
        const response = await fetch(`http://localhost:3001/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          if (userInfo.role === "AccountsAdmin") navigate("/freelancers");
          else if (userInfo.role === "ProjectsAdmin") navigate("/projects");
          else if (userInfo.role === "ChatsAdmin") navigate("/reports");
          else if (userInfo.role === "SuperAdmin") navigate("/");

          console.log(userInfo);
        } else {
          console.error("Failed to get user information:", response.statusText);
        }
      } else {
        console.error("Token not found.");
      }
    } catch (error) {
      console.error("Failed to get user information:", error);
    }
  }, [navigate]);

  return (
    // screen
    <div className="w-full p-0 m-0">
      {/* container */}
      <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative ">
        {/* theme */}
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>
        <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          <div className="flex items-center gap-1 xl:gap-2">
            <span className="text-[18px] leading-[1.2] sm:text-lg xl:text-3xl 2xl:text-3xl font-semibold text-base-content dark:text-neutral-200">
              Pitchini Dashboard
            </span>
          </div>
          <span className="xl:text-xl font-semibold">
            Hello, 👋 Welcome Back!
          </span>
          <div className="w-full flex flex-col items-stretch gap-3">
            <label className="input input-bordered min-w-full flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="link link-primary font-semibold text-xs no-underline"
              >
                Forgot Password?
              </a>
            </div>
            <div
              onClick={() => handleLogin()}
              className="btn btn-block btn-primary"
            >
              Log In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
