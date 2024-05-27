export function homepagePath(role: string): string {
    switch (role) {
        case "Consultante":
        case "Practicante": return "/citas";
        default: return "/psicologos";
    }
}