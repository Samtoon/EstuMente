// import { NextRequest } from "next/server";
import { Session } from "next-auth";
import { withAuth } from "next-auth/middleware";
import Roles from "./app/_enums/Roles";
import path from "path";
import { NextResponse } from "next/server";
// import { getMyServerSession } from "./app/_utils/next-auth";

// export async function middleware(request: NextRequest) {
//   //   const session = await getMyServerSession();
//   console.log("Hola, soy el middleware, esta es la sesión:");
//   //   console.log(session);
// }

const allowedPaths = {
  Consultante: ["/citas", "/perfil", "/psicologos"],
  Practicante: ["/citas", "/perfil", "/consultantes", "/notas", "/agenda"],
  Tutor: [
    "/psicologos",
    "/perfil",
    "/consultantes",
    "/citas",
    "/reportes",
    "/solicitudes",
  ],
  Coordinador: [
    "/tutores",
    "/perfil",
    "/reportes",
    "/solicitudes",
    "/psicologos",
  ],
  Administrador: [
    "/reportes",
    "/perfil",
    "/base_de_datos",
    "/solicitudes",
    "/psicologos",
  ],
};

export default withAuth(function middleware(req) {
  if (req.nextauth.token) {
    const session = req.nextauth.token as unknown as Session;
    const pathname = req.nextUrl.pathname;
    let myAllowedPaths: string[];
    switch (session.user.role) {
      case Roles.Consultante:
        myAllowedPaths = allowedPaths.Consultante;
        break;
      case Roles.Practicante:
        myAllowedPaths = allowedPaths.Practicante;
        break;
      case Roles.Tutor:
        myAllowedPaths = allowedPaths.Tutor;
        break;
      case Roles.Coordinador:
        myAllowedPaths = allowedPaths.Coordinador;
        break;
      case Roles.Administrador:
        myAllowedPaths = allowedPaths.Administrador;
        break;
    }
    if (!myAllowedPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(myAllowedPaths[0], req.nextUrl));
    }
  }
});

//Matches every path except the home page and the following:
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)",
  ],
};
