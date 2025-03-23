"use client";

import Loading from "@/app/components/store/common/others/Loading";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For App Router in Next.js 13
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "@/app/backend/controllers/user.controller";

const Login = ({ setting }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  console.log("setting", setting);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    const { email, password } = data;
    const callbackUrl =
      new URLSearchParams(window.location.search).get("callbackUrl") || "/";

    // Call signIn with credentials
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Handle redirection manually
      callbackUrl,
    });

    // Handle login result
    if (result?.error) {
      console.error("Login failed:", result.error);
      setError("email or password not match");
      setLoading(false);
    }
  };

  // const handleAnonymousLogin = async () => {
  //   setError("");
  //   setLoading(true);

  //   const callbackUrl =
  //     new URLSearchParams(window.location.search).get("callbackUrl") || "/";

  //   const result = await signIn("anonymous", {
  //     redirect: false,
  //     callbackUrl,
  //   });

  //   if (result?.error) {
  //     console.error("Anonymous login failed:", result.error);
  //     setError("Anonymous login failed");
  //     setLoading(false);
  //   }
  // };
  const handleAnonymousLogin = async () => {
    setError("");
    setLoading(true);
    const date = new Date().toISOString();
    const userData = {
      email: `${date}@anonymous.com`,
      name: "Anonymous",
      password: date,
    };

    const res = await createUser(userData);
    // console.log("res..in signup page...", res);
    if (res?.error) {
      setError(res?.error);
      setLoading(false);
    }

    // console.log("res...", res);
    if (res?.user) {
      setError("");
      const email = res.user.email;
      const password = res.user.password;
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // console.log("result...", result);

      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        setLoading(false);
        router.push(callbackUrl);
      }
    } else {
      //   const data = await res.json();
      //   setError(data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    router.refresh();
    if (status === "authenticated") {
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";

      if (session?.user?.role !== "Customer") {
        router.push("/admin");
      } else {
        // console.log("Redirecting to ", callbackUrl);
        router.push(callbackUrl);
      }
    } else if (status === "loading") {
      // console.log("Loading session...");
    }
  }, [status, router, session]);

  const copyAdmin = () => {
    setValue("email", "admin@themetags.com");
    setValue("password", "12345678");
    setError(""); // Clear any existing error messages
  };

  const copyCustomer = () => {
    setValue("email", "customer@themetags.com");
    setValue("password", "12345678");
    setError(""); // Clear any existing error messages
  };
  return (
    <>
      <section className="login-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-5 col-12 tt-login-img"
              style={{
                background: "url(/img/banner/login-banner.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="col-lg-5 col-12 bg-white d-flex p-0 tt-login-col shadow">
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="tt-login-form-wrap p-3 p-md-6 p-lg-6 py-7 w-100"
              >
                <div className="mb-7">
                  <Link href="/">
                    <img src={setting?.home?.logo} alt="logo" />
                  </Link>
                </div>
                <h2 className="mb-4 h3">
                  Hey there! <br />
                  Welcome back <span className="text-secondary">Grostore.</span>
                </h2>
                <div className="row g-3">
                  <div className="col-sm-12">
                    <div className="input-field">
                      <label className="fw-bold text-dark fs-sm mb-1">
                        Email
                      </label>
                      <input
                        onFocus={() => setError("")}
                        type="email"
                        placeholder="Enter your email"
                        className="theme-input"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-field check-password">
                      <label className="fw-bold text-dark fs-sm mb-1">
                        Password
                      </label>
                      <div className="check-password">
                        <input
                          onFocus={() => setError("")}
                          type="password"
                          placeholder="Password"
                          className="theme-input"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                        <span className="eye eye-icon">
                          <i className="fa-solid fa-eye"></i>
                        </span>
                        <span className="eye eye-slash">
                          <i className="fa-solid fa-eye-slash"></i>
                        </span>
                      </div>
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12">
                    <label className="fw-bold">Admin Access</label>
                    <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3">
                      <small>admin@themetags.com</small>
                      <small>12345678</small>
                      <button
                        className="btn btn-sm btn-secondary py-0 px-2"
                        type="button"
                        onClick={copyAdmin}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <label className="fw-bold">Customer Access</label>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <small>customer@themetags.com</small>
                      <small>12345678</small>

                      <button
                        className="btn btn-sm btn-secondary py-0 px-2"
                        type="button"
                        onClick={copyCustomer}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                {error && <div className="mt-5 text-danger">{error}</div>}
                {loading && <Loading />}
                <div className="row g-4 mt-4">
                  <div className="col-sm-12">
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 mt-2"
                      onClick={handleAnonymousLogin}
                    >
                      Anonymous Login
                    </button>
                  </div>
                </div>
                <p className="mb-0 fs-xs mt-4 text-center">
                  Don't have an Account? <Link href="/singup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
