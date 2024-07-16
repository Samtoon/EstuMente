import Roles from "../_enums/Roles";

export function homepagePath(role: string): string {
    switch (role) {
        case Roles.Consultante:
        case Roles.Practicante: return "/citas";
        default: return "/psicologos";
    }
}