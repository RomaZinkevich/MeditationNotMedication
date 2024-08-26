import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../components/FormInput";
import { InputParams } from "../interfaces/FormInterface";
import Navigation from "../components/Navigation";

export const USERNAME_REGEX: string = "^[a-zA-Z0-9_\\-]{3,16}$";
export const PASSWORD_REGEX: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$";

interface SignUpInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

interface LoginInterface {
  email: string;
  password: string;
  [key: string]: string;
}

function UserAccountPage({ login }: { login: boolean }) {
  const [signUpFormValues, setSignUpFormValues] = useState<SignUpInterface>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loginFormValues, setLoginFormValues] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const signupObjects: InputParams[] = [
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Username",
      pattern: "^[a-zA-Z0-9_\\-]{3,16}$",
      autoComplete: "off",
      autoFocus: true,
      required: true,
      errors: [
        "Must be 3-16 characters",
        "No Special characters",
        "[ - ] or [ _ ] allowed"
      ],
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
      errors: [
        "Invalid email address"
      ],
    },
    {
      id: 3,
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
      pattern: PASSWORD_REGEX,
      required: true,
      errors: [
        "Atleast 8 characters",
        "Atleast one digit",
        "Atleast one special character",
        "Atleast one upper and lowercase character",
      ],
    },
    {
      id: 4,
      label: "Confirm password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      pattern: signUpFormValues.password,
      required: true,
      errors: [
        "Password doesn't match"
      ],
    }

  ]

  const loginObjects: InputParams[] = [
    {
      id: 2,
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
      errors: [
        "Invalid email address"
      ],
    },
    {
      id: 3,
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
      pattern: PASSWORD_REGEX,
      required: true,
      errors: [
        "Atleast 8 characters",
        "Atleast one digit",
        "Atleast one special character",
        "Atleast one upper and lowercase character",
      ],
    },
  ]

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const rawData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(rawData.entries());

    console.log(data);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    if (login) {
      setLoginFormValues({ ...loginFormValues, [e.target.name]: e.target.value });
      return;
    }

    setSignUpFormValues({ ...signUpFormValues, [e.target.name]: e.target.value });
  }


  return (
    <>
      <Navigation />
      <div className="user-action">
        <form onSubmit={handleSubmit}>
          <h1 className="form-title">
            {!login ? "Create an account" : "Log In"}
          </h1>
          {!login ?
            signupObjects.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={signUpFormValues[input.name]}
                handleChange={handleChange}
              />
            ))
            :
            loginObjects.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={loginFormValues[input.name]}
                handleChange={handleChange}
              />
            ))
          }
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default UserAccountPage;