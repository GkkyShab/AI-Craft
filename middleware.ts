import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  '/', // Add any additional routes here
]);

// Define routes that should be public
const isPublicRoute = createRouteMatcher([
  '/api/webhooks/clerk' // Add any additional public routes here
]);

// Update clerkMiddleware to manually protect routes
export default clerkMiddleware((auth, req) => {
  // If the route is public, allow access
  if (isPublicRoute(req)) {
    return; // No protection needed for public routes
  }

  // If the route is protected, enforce protection
  if (isProtectedRoute(req)) {
    auth().protect(); // Protect the route if it matches the defined criteria
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
