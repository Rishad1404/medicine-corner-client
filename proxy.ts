import { NextRequest, NextResponse } from "next/server";
import { userService } from "./src/app/services/user.service";
import { Roles } from "./src/constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


  const { data } = await userService.getSession();


  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;


  if (role === Roles.admin) {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  else if (role === Roles.seller) { 

    if (!pathname.startsWith("/seller")) {
      return NextResponse.redirect(new URL("/seller", request.url));
    }
  }


  else {

    if (pathname.startsWith("/admin") || pathname.startsWith("/seller")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    "/dashboard", 
    "/dashboard/:path*",
    

    "/admin", 
    "/admin/:path*",

    "/seller", 
    "/seller/:path*"
  ],
};