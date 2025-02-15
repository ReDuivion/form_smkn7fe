"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://hono-on-vercel-pied.vercel.app/api/v1/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,  
      });

      if (response.status !== 200) throw new Error(response.data.error || "Registration failed");

      alert("Registration successful!");
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          {...register("passwordConfirmation", { required: "Please confirm your password" })}
        />
        {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
