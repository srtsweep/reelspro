'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


function Header() {

  const { data: session } = useSession()

  const handleSignout = async () => {
    try {
      await signOut()
    } catch (error) {

    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl text-yellow-300" href="/">RP</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {session ?
            (
              <>
                <li>
                  <a href="/upload-post">Upload</a>
                </li>
                <li>
                  <a href="/about-us">About Us</a>
                </li>
                <li>
                  <a onClick={handleSignout}>Signout</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </>
            )
          }
        </ul>
      </div>



    </div>
  );
}


export default Header