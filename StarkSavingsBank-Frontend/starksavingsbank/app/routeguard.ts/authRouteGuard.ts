// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the middleware function
export function middleware(request: NextRequest) {
  // Get the user details from cookies (you may change this based on your storage method)
  const userDetails : string = sessionStorage.get('userdetails');

  // Check if user details are present
  if (!userDetails) {
    // If not authenticated, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Optionally, parse the user details if needed
  const user = JSON.parse(userDetails);
  
  // Check if the email is present
  if (!user.email) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated, continue to the requested route
  return NextResponse.next();
}

// Configuring which routes to apply the middleware
export const config = {
  matcher: ['/protected-route', '/another-protected-route'], // Specify protected routes here
};
