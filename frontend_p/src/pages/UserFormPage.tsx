import Login from "../components/Login";
import Navigation from "../components/Navigation";
import SignUp from "../components/SignUp";
import type { FieldValues } from "react-hook-form";

function UserFormPage({ flag }: { flag?: boolean }) {
  async function handleHookSubmit(data: FieldValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  }

  return (
    <>
      <Navigation />
      {flag ?
        <SignUp handleHookSubmit={handleHookSubmit} /> :
        <Login handleHookSubmit={handleHookSubmit} />
      }
    </>
  );
}

export default UserFormPage;