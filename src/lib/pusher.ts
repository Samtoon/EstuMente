import PusherServer from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new PusherServer({
    appId: "1807744",
    key: "0ea4f0f3354e1469f966",
    secret: "638404fc9a4608714337",
    cluster: "us2"
});

export const pusherClient = new PusherClient("0ea4f0f3354e1469f966", {cluster: "us2"});