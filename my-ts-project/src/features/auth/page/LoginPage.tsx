import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ReactComponent as ErrorICon } from "@/assets/svg/alert-circle.svg";
import { ReactComponent as EyeIcon } from "@/assets/svg/eye.svg";
import { ReactComponent as EyeCloseIcon } from "@/assets/svg/eye-off.svg";
import request from "@/services";
import { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import Alert from "@/components/alerts";
import { FooterPowerBy } from "@/components/layouts/Footer";

const alertRef = React.createRef<Alert>();

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      defaultValues = {
        username: "AdminPage",
        password: "123456",
      },
    },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await onLogin(data);
      setCookie("token", response.data?.token, { maxAge: 1800 }); // 1800 == 30min
      localStorage.setItem("username", data?.username);
      navigate("/");
    } catch (error: any) {
      if (error instanceof Error) {
        setError("api", { message: error?.message });
      }
      alertRef.current?.open("error", error?.message ?? error ?? "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (data: any): Promise<AxiosResponse | any> => {
    try {
      const response = await request("POST", "/login", {
        // CompanyDB: import.meta.env.VITE_COMPANY,
        ...data,
      });
      return response;
    } catch (error) {
      console.error("Error in onLogin:", error);
      throw error; // rethrow the error to be caught in onSubmit
    }
  };

  const onShowPassword = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <div className="w-[60%] 2xl:w-[70%]  xl:w-[70%] lg:w-[80%] md:w-[70%] sm:w-[100%] rounded-md flex border shadow-xl drop-shadow-sm">
        <div className="w-6/12 md:hidden login-cover flex justify-center items-center bg-no-repeat bg-center bg-origin-border bg-cover rounded-l-xl">
                  <img
                      className="w-[300px] rounded-md"
            src="data:image/png;base64,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"
            alt=""
          />
        </div>

        {/*  */}
        <div className="w-6/12 md:w-full h-full">
          <div className="flex h-full flex-col p-10 px-16 xl:px-10 gap-2">
            <div className="flex items-center gap-6">
              <img
                className="w-[1.7rem]"
                src="data:image/png;base64,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"
                alt=""
              />
              <h1 className="text-2xl font-extrabold">System Login</h1>
            </div>

            <form
              className="grow flex flex-col gap-5 py-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Alert ref={alertRef} />
              <div
                className={` bg-red-100 rounded-lg text-red-600 font-bold transition-all flex gap-4  items-center whitespace-nowrap duration-300 ${
                  Object.keys(errors).length > 0
                    ? "min-h-[3.5rem] max-h-[3.5rem] px-4"
                    : "min-h-0 max-h-0"
                }`}
              >
                {Object.keys(errors).length > 0 && (
                  <>
                    <ErrorICon />
                    <span>
                      {" "}
                      {errors[Object.keys(errors)[0]]?.message === ""
                        ? "Please provide username and password"
                        : //   : (errors?.api?.message as string)}
                          (errors?.api?.message as string)}
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="text-base text-gray-600 font-bold"
                >
                  Username
                </label>
                <input
                  // type="email"
                  {...register("username", { required: true, min: 3 })}
                  aria-invalid={errors?.username ? "true" : "false"}
                  placeholder="email"
                  defaultValue={defaultValues.username}
                  className={`input input-sm input-bordered rounded-md w-full bg-gray-100 text-lg ${
                    errors?.UserName && "border-2 border-red-500"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-base text-gray-600 font-bold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoCorrect="false"
                    autoComplete="false"
                    {...register("password", { required: true, min: 3 })}
                    defaultValue={defaultValues.password}
                    className={`input input-sm rounded-md input-bordered w-full bg-gray-100 text-lg ${
                      errors?.Password && "border-2 border-red-500"
                    }`}
                  />
                  <div
                    onClick={onShowPassword}
                    className="absolute top-[6px] right-3 btn btn-xs bg-transparent border-none hover:bg-gray-200"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <button
                className={`btn btn-lg mt-8 bg-primary hover:bg-slate-300 text-white hover:text-gray-500  ${
                  loading && "btn-disabled"
                }`}
                disabled={loading}
              >
                <div className="w-full flex justify-center gap-4">
                  {loading && (
                    <span className="loading loading-spinner text-primary"></span>
                  )}
                  <span className="text-center text-lg">SIGN IN</span>
                </div>
              </button>

              <div className="flex justify-center">
                <FooterPowerBy />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
