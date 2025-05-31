import { use, useEffect, useState } from "react";
import banner from "../../assets/banner.png";
import Dropdown from "../common/Dropdown";
import Input from "../common/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthState } from "../../services/AuthSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [target, setTarget] = useState("");
  const [activity, setActivity] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle validation on every change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationErrors = { ...errors };

    // First Name Validation (min length 2, first character capital)
    if (name === "firstName") {
      if (value.length < 2) {
        validationErrors.firstName = "Name must be at least 2 characters";
      } else if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
        validationErrors.firstName = "Name must start with a capital letter";
      } else {
        validationErrors.firstName = "";
      }
    }

    // Last Name Validation (min length 2, first character capital)
    if (name === "lastName") {
      if (value.length < 2) {
        validationErrors.lastName = "Name must be at least 2 characters";
      } else if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
        validationErrors.lastName = "Name must start with a capital letter";
      } else {
        validationErrors.lastName = "";
      }
    }

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

    // Password Validation (min 6 length, 1 capital letter, 1 symbol, 1 number)
    if (name === "password") {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
      if (!passwordPattern.test(value)) {
        validationErrors.password =
          "Password at least 6 letters, 1 capital letter, 1 symbol, 1 no.";
      } else {
        validationErrors.password = "";
      }
    }

    // Confirm Password Validation (must match password)
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        validationErrors.confirmPassword = "Passwords do not match";
      } else {
        validationErrors.confirmPassword = "";
      }
    }

    setErrors(validationErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(errors).some((error) => error !== "")) {
      const dataToSend = {
        ...formData,
        target,
        activity, // Adjust if using separate dropdowns
      };

      dispatch(register(dataToSend));
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
      dispatch(resetAuthState());
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="register flex min-h-screen justify-between items-center text-sm ">
      <div className="mx-auto w-[80vw] sm:w-auto">
        <div>
          <p>LET'S GET YOU STARTED</p>
          <p className="text-2xl font-semibold">Create an Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-data grid grid-cols-1 grid-rows-6 sm:grid-cols-2 gap-2 mt-5">
            <div className="relative">
              <Input
                label={"First Name"}
                placeholder={"Enter your First Name"}
                type={"text"}
                required={true}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="text-red-700 text-xs absolute top-13 left-0">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="relative">
              <Input
                label={"Last Name"}
                placeholder={"Enter your Last Name"}
                type={"text"}
                required={true}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="text-red-700 text-xs absolute top-13  left-0">
                  {errors.lastName}
                </span>
              )}
            </div>

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
              {errors.password && (
                <span className="text-red-700 text-xs absolute top-13 left-0">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="sm:col-span-2 relative mt-1">
              <Input
                label={"Confirm New Password"}
                placeholder={"Confirm new password"}
                type={"password"}
                required={true}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="text-red-700 text-xs absolute top-13 left-0">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="sm:col-span-2 mt-1">
              <Dropdown
                label={"Your target"}
                options={["opt1", "opt2"]}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2 mt-1">
              <Dropdown
                label={"Preferable Activity"}
                options={["opt1", "opt2"]}
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2 mt-1">
              <button
                type="submit"
                className="bg-[#9EF300] w-full p-4 rounded-xl"
              >
                Create An Account
              </button>
            </div>

            <div className="sm:col-span-2 text-center">
              <p>
                Already have an account ?{" "}
                <Link to="/login" className="underline">
                  LOGIN HERE
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
  );
}
