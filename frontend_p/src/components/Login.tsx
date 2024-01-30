import { FieldValues, useForm } from "react-hook-form";

interface SignUpProp {
  handleHookSubmit: (data: FieldValues) => void;
}

function Login({ handleHookSubmit }: SignUpProp) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  function callHandleHookSubmit(data: FieldValues) {
    handleHookSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(callHandleHookSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <p>{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password", {
          required: "Password required",
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <p>{`${errors.password.message}`}</p>
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

export default Login;