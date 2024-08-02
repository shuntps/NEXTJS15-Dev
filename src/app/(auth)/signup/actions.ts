"use server";

import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { lucia } from "@/auth";

// Define an asynchronous function to handle user sign-up
export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    // Parse and validate the sign-up credentials using the sign-up schema
    const { username, email, password } = signUpSchema.parse(credentials);

    // Hash the password with specific parameters for security
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Generate a unique user ID
    const userId = generateIdFromEntropySize(10);

    // Check if the username already exists in a case-insensitive manner
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username.toLowerCase(),
        },
      },
    });

    // If the username is taken, return an error message
    if (existingUsername) {
      return {
        error: "Username is already taken",
      };
    }

    // Check if the email already exists in a case-insensitive manner
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email.toLowerCase(),
        },
      },
    });

    // If the email is taken, return an error message
    if (existingEmail) {
      return {
        error: "Email is already taken",
      };
    }

    // Create a new user record in the database with the provided details
    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
      },
    });

    // Create a new session for the user using Lucia
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    // Set the session cookie in the response headers
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    // Redirect the user to the home page after successful sign-up
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
