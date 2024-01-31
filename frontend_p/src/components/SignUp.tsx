import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

interface SignUpProp {
  handleHookSubmit: (data: FieldValues) => void;
}

const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters"),
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/,
      "Requires atleast a special, an uppercase character, and a number"
    ),
  confirmPassword: z
    .string(),
}).refine(data =>
  data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
});

function SignUp({ handleHookSubmit }: SignUpProp) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ resolver: zodResolver(signUpSchema) });

  function callHandleHookSubmit(data: FieldValues) {
    handleHookSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(callHandleHookSubmit)}>
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
      />
      {errors.username && (
        <p>{`${errors.username.message}`}</p>
      )}
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <p>{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <p>{`${errors.password.message}`}</p>
      )}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
      />
      {errors.confirmPassword && (
        <p>{`${errors.confirmPassword.message}`}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}

export default SignUp;