import { useEffect, useState } from "react";
import { login, resetAuthState } from "../../services/AuthSlice";
import Input from "../common/Input";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationErrors = { ...errors };

    // Email Validation (ends with @gmail.com, @admin.com, @coach.com)
    if (name === "email") {
      const emailPattern =
        /^[a-zA-Z0-9._%+-]+@(gmail.com|admin.com|coach.com)$/;
      if (!emailPattern.test(value)) {
        validationErrors.email =
          "Email ends with @gmail.com, @admin.com, @coach.com";
      } else {
        validationErrors.email = "";
      }
    }

    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(errors).some((error) => error !== "")) {
      const dataToSend = {
        ...formData,
      };

      dispatch(login(dataToSend));
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/");
      dispatch(resetAuthState());
    }
  }, [success, navigate, dispatch]);
  return (
    <>
      <div className="register flex min-h-screen justify-between items-center text-sm ">
        <div className="mx-auto w-[80vw] sm:w-[500px] ">
          <div>
            <p>WELCOME BACK</p>
            <p className="text-2xl font-semibold">Log in your Account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-data grid grid-cols-1 grid-rows-6 sm:grid-cols-2 gap-2 mt-5">
              <div className="sm:col-span-2 relative mt-1">
                <Input
                  label={"Email"}
                  placeholder={"Enter your email"}
                  type={"email"}
                  required={true}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-red-700 text-xs absolute top-14 left-0">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2 relative mt-1">
                <Input
                  label={"Password"}
                  placeholder={"Enter your password"}
                  type={"password"}
                  required={true}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2 mt-1">
                <button
                  type="submit"
                  className="bg-[#9EF300] w-full p-4 rounded-xl"
                >
                  Login
                </button>
              </div>

              <div className="sm:col-span-2 text-center">
                <p>
                  Don't have an account ?{" "}
                  <Link to="/register" className="underline">
                    CREATE NEW ACCOUNT
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="banner relative overflow-hidden hidden lg:block mx-5">
          <img
            src={banner}
            alt="No"
            className="rounded-2xl h-[600px] w-[600px] object-cover"
          />
          <div className="text-3xl w-full absolute bottom-4 left-1/3 transform -translate-x-1/3 text-justify text-white bg-opacity-50 px-8 py-5 rounded">
            “The path to triumph is paved with the{" "}
            <span className="text-[#9EF300]"> strength to train hard </span> and
            the perseverance to{" "}
            <span className="text-[#9EF300]">rise each time you fall </span> .”
          </div>
        </div>
      </div>
    </>
  );
}
