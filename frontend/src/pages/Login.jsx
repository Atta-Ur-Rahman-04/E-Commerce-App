import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentState === "Sign Up") {
        const responce = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (responce.data.success) {
          setToken(responce.data.token);
          localStorage.setItem("token", responce.data.token);
        } else {
          toast.error(responce.data.message);
        }
      } else {
        const responce = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (responce.data.sucess) {
          setToken(responce.data.token);
          localStorage.setItem("token", responce.data.token);
        } else {
          toast.error(responce.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        disabled={loading}
        className="bg-black text-white font-light px-8 py-2 mt-4 flex items-center justify-center gap-2 min-w-32 transition active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}
        {loading
          ? currentState === "Login"
            ? "Signing In..."
            : "Signing Up..."
          : currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
