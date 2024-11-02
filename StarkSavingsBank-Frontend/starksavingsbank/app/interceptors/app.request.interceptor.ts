// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { User } from '../model/user.model';

export async function middleware(request: NextRequest) {
  const user = sessionStorage.getItem("userdetails")
  const authToken = sessionStorage.get('Authorization');
  const xsrfToken = sessionStorage.get('XSRF-TOKEN');

  const headers = new Headers(request.headers);

  if (user) {
    const userDetails: User = JSON.parse(user);
    if (userDetails.password && userDetails.email) {
      console.log("Processing Login with Basic Authentication");
      headers.set('Authorization', 'Basic ' + btoa(`${userDetails.email}:${userDetails.password}`));
    }
  } else if (authToken) {
    headers.set('Authorization', authToken);
  }

  if (xsrfToken) {
    headers.set('X-XSRF-TOKEN', xsrfToken);
  }

  // Clone the request with the modified headers
  const modifiedRequest = new Request(request, {
    headers: headers,
  });

  // Handling the response
  return fetch(modifiedRequest)
    .then((response: Response) => {
      if (!response.ok) {
        // Handle specific status codes
        if (response.status === 401) {
          // Redirect to login page on 401 Unauthorized
          return NextResponse.redirect(new URL('/login', request.url));
        }
        // You can handle other status codes here as needed
        throw new Error('Network response was not ok');
      }
      return NextResponse.next(response);
    })
    .catch((error: Error) => {
      console.error('Error in middleware:', error);
      // You can redirect or handle the error response as needed
      return NextResponse.redirect(new URL('/error', request.url));
    });
}
