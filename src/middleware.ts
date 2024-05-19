import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL } from "./common/constants";

function isApiRequest(urlPathname: string) {
  console.log(urlPathname);
  return urlPathname.startsWith("/api");
}

export async function middleware(request: NextRequest, response: NextResponse) {
  try {
    const session = request.cookies.get("session");
    if (!session) {
      console.log("No session");
      // Check if the request is an API request
      const { pathname } = request.nextUrl;
      if (isApiRequest(pathname)) {
        const authHeader = request.headers.get("Authorization");
        if (authHeader) {
          const uid = process.env.API_UUID;
          if (authHeader === `Bearer ${uid}`) {
            return NextResponse.next();
          } else {
            return NextResponse.json(
              {
                error: true,
                message: "Unauthorized",
              },
              { status: 401 }
            );
          }
        }
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    //Call the authentication endpoint
    const responseAPI = await fetch(`${BASE_URL}/api/login`, {
      headers: {
        Cookie: `session=${session?.value}`,
      },
    });

    //Return to /login if token is not authorized
    if (responseAPI.status !== 200) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error }, { status: 401 });
  }
}

//Add your protected routes
export const config = {
  matcher: [
    "/protected/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/requests/:path*",
    "/api/requests/:path*", //Add the API routes that you want to protect
  ],
};
