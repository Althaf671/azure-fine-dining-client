//========= file untuk mendapatkan info device user ==========//
/**
    Client info akan mendata timezone, userAgent/browser
    os, dan device.
*/

import { devLog } from "./logger";

export function getClientInfo() {
    devLog.info("Starting to get user device info");

    // semenjak ini adalah function khusus browser karena dia meminta browser untuk collect data, cegah ia berjalan di server
    if(typeof window === "undefined") {
        devLog.failed("Get client info occured at server side, Immedietly aborting...");
        return {
            browser: "Unknown",
            os: "Unknown",
            timezone: "Unknown",
            device: "unknown",
            userAgent: "unknown"
        }
    };

    let browser = "Unknown";
    let os = "Unknown";
    let timezone = "Unknown";
    let device = "unknown";
    let userAgent = "unknown"

    try {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
        devLog.success("success to execute timezone");
    } catch (error) {
        timezone = "unknown";
        devLog.failed("failed to execute timezone", error);
    }
   
    try {
        userAgent = navigator.userAgent || "unknown";

        // detect browser yang digunakan
        devLog.warn("executing find user browser");
        if (userAgent.includes("Chrome")) browser = "Chrome";
        else if (userAgent.includes("Firefox")) browser = "Firefox";
        else if (userAgent.includes("Safari")) browser = "Safari";
        else if (userAgent.includes("Edge")) browser = "Edge";
        devLog.warn("browser found", browser);

        // detect OS
        devLog.warn("executing find user OS");
        if (userAgent.includes("Windows")) os = "Windows";
        else if (userAgent.includes("Mac")) os = "MacOS";
        else if (userAgent.includes("Linux")) os = "Linux";
        else if (userAgent.includes("Android")) os = "Android";
        else if (userAgent.includes("iPhone")) os = "iOS";
        devLog.warn("OS found", os);

        // detect jenis device yang digunakan
        devLog.warn("executing find user device type");
        if (/Mobi|Android/i.test(userAgent)) device = "Mobile";
        else device = "Desktop";
        devLog.warn("device type:", device);

        devLog.success("success to execute user agent - Browser and OS");
    } catch (error) {
        devLog.failed("failed to execute user agent", error);
    }
   return { browser, os, timezone, userAgent, device };
};