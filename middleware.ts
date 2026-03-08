import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This is the case where we define our public route
const isPublicRoute = createRouteMatcher([
  "/",
  "/products(.*)",
  "/about",
  "/register",
  "/login",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/auth(.*)",
]);
// This is going to be the admin route 
// Since we a have a nested structure, we want to use admin & then all of the pages,
// & inorder  to restrict access to all of the pages, so admin/sales, products, essentially all of them
const isAdminRoute = createRouteMatcher(["/admin", "/admin/(.*)"]);

export default clerkMiddleware(async (auth, req) => {

  if (req.method !== "GET") {
    return NextResponse.next();
  }
    // Get the session once — do NOT call auth() twice
  const authData = (await auth())
  const { userId, redirectToSignIn } = authData;
    // In order to check that, we will use auth userID, 
    // if this true, it means user is admin user
    // If not, means user is regular user & user is not an admin user
    // console.log(auth().userId)
    // ⭐ FIRST: protect non-public routes
    // These are going to be public routes
    // We will actually look for the routes that are not in our createRouteMatcher
  if (isPublicRoute(req)) return NextResponse.next();


  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // ⭐ SECOND: redirect non-admin users trying to access admin routes// 
  // ⭐ NOW it is safe to call auth()

  // FIX: safely type session claims
  const claims = authData.sessionClaims as Record<string, any>;
  const role = claims.role;

  console.log("ADMIN ROUTE MATCH:", isAdminRoute(req));
  console.log("ROLE:", role);
  console.log("middleware claims:", claims);

  // Tell TypeScript what your metadata looks like
  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};

// If the user is trying to access the admin route. In that case, we redirect the user back
    // if(isAdminRoute(req) && !isAdminUser) {
        // We want to return a Next response & we need to make sure it is coming from the server
        // We want to use new URL
        // If everything is correct & we are not an admin user, we will not have access to the admin pages
    //     return NextResponse.redirect(new URL('/', req.url)) 
    // }