"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

import { verify } from "@node-rs/argon2";

import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { lucia } from "@/auth";

// Define an asynchronous function to handle user login
export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    // Parse and validate the login credentials using the login schema
    const { username, password } = loginSchema.parse(credentials);

    // Find an existing user with the provided username (case-insensitive)
    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    // Check if the user exists and has a password hash stored
    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Incorrect username or password",
      };
    }

    // Verify the provided password against the stored password hash
    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // If the password is incorrect, return an error
    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    // Create a new session for the user
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    // Set the session cookie in the response headers
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    // Redirect the user to the home page after successful login
    return redirect("/");
  } catch (error) {
    // If a redirect error occurs, rethrow it
    if (isRedirectError(error)) throw error;

    // Log any other errors and return a generic error message
    console.error(error);

    return {
      error: "Something went wrong. Please try again",
    };
  }
}
