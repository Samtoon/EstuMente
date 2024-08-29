import Roles from "../_enums/Roles";

<<<<<<< HEAD
export function homepagePath(role: Roles) {
  switch (role) {
    case Roles.Consultante:
      return "/citas";
    case Roles.Practicante:
      return "/citas";
    case Roles.Tutor:
      return "/psicologos";
    case Roles.Coordinador:
      return "/tutores";
    case Roles.Administrador:
      return "/reportes";
  }
}
=======
export function homepagePath(role: string): string {
    switch (role) {
        case Roles.Consultante:
        case Roles.Practicante: return "/citas";
        default: return "/psicologos";
    }
}
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758
