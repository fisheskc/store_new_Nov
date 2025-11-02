"use client";
import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

function SignOutLink() {
  const { toast } = useToast();
  // We set up a function which we are going to invoke once the user clicks on the signout link

  // We want to display the toast
  const handleLogout = () => {
    // We are looking for the description property
    toast({ description: "Logout successful" });
  };
  // This is a signout button component, this is coming from the clerk
  // Technically, there is this redirect URL (redirectUrl='/'), that does not always work
  // It is a issue since we do not want to log the user back into the same page
  // where the previous user logged out
  // In our unstyled buttonn component, we want to use link, which is coming from the next href
  // We want to navigate to the homepage
  // This will be rendered in the links dropdown
  // This is the moment we click on a logout, we also display the toast
  return (
    <SignOutButton redirectUrl="/">
      <button>
        <Link href="/" className="w-full text-left" onClick={handleLogout}>
          Logout
        </Link>
      </button>
    </SignOutButton>
  );
}

export default SignOutLink;