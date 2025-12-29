'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      console.log(result.error);
    } else {
      console.log("login data : ", result);
      router.push("/");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center">

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <form onSubmit={handleSubmit}>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-neutral mt-4" type="submit">Login</button>
        </form>

        <p>
          Don't have an account ?
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </p>

      </fieldset>
    </div >
  );
}


export default LoginPage