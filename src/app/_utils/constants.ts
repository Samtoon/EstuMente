import { IDay } from "@/app/_interfaces/schedule/IDay";
import Hour from "./hour";

export const days: IDay["day"][] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const hours: Hour[] = Array.from({length: 24}, (v, i) => new Hour(i));

export const dailyHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.DAILY_API_KEY}`
}

export const driveCredentials = {
    CLIENT_ID: "854693846509-asrcvttk76uq7u0hl63gu11vl51pjanf.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
    REDIRECT_URI: "https://developers.google.com/oauthplayground",
    REFRESH_TOKEN: "1//04W1VYL7shs_eCgYIARAAGAQSNwF-L9Ir364TLll1RkbDAwoAsoNk0THB3FR9FzcgXqW1_OsHiTb-PpuADSxpls_nTcNXj_Onwc0"
}