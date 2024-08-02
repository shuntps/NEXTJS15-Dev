"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, validateRequest } from "@/auth";

// Define an asynchronous function to handle user logout
export async function logout() {
  // Validate the current request to get the session information
  const { session } = await validateRequest();

  // If there is no active session, throw an error indicating unauthorized access
  if (!session) {
    throw new Error("Unauthorized");
  }

  // Invalidate the current user session using Lucia
  await lucia.invalidateSession(session.id);

  // Create a blank session cookie to effectively log out the user
  const sessionCookie = lucia.createBlankSessionCookie();
  // Set the blank session cookie in the response headers to clear the existing session
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  // Redirect the user to the login page after successful logout
  return redirect("/login");
}
