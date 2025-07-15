//========= hulu dari getFingerprintId dan getClientInfo ==========//
import axiosClient from "@take/lib/axiosClient";
import { getClientInfo } from "@take/lib/clientInfo";
import { getFingerprintId } from "@take/lib/fingerprint";
import { devLog } from "@take/lib/logger";
import { userDeviceLogSchema } from "@take/validators/log.schema";

/**
 * gabungan dari getFingerprintId dan getClientInfo yang akan
 * digunakan di route-route yang sudah ditentukan
 */
export async function userDeviceLog(action: string, status: string) {
    devLog.info("Creating user device info");

    devLog.info("get hashed fingerprint");
    const hashedFingerprint = await getFingerprintId(); // buat fingerprint dan simpan ke dalam deklarasi ini
    if (!hashedFingerprint) {
        devLog.failed("No hashed fingerprint Id found");
        return;
    };

    devLog.info("get user device info");
    const { browser, os, device, timezone, userAgent } = getClientInfo(); // buat device info dan simpan ke dalam deklarasi ini
    if (!browser || !os || !device || !timezone || !userAgent) {
        devLog.failed("Failed to get client info");
        return;
    };

    // lalu buat payload yang akan dikirim
    devLog.warn("Creating device info payload");
    const deviceInfoPayload = {
        hashedFingerprint,
        browser,
        os,
        device,
        timezone, 
        userAgent,
        action,
        status     
    };
    devLog.success("Device info payload created", deviceInfoPayload);

    // validasi frontend untuk payload yang akan dikirim ke validator backend
    const validation = userDeviceLogSchema.safeParse(deviceInfoPayload);
    if (!validation.success) {
        devLog.warn("This payload may contain unexpected data or Invalid user device log", validation.error);
        return;
    };

    try {
        // API endpoint terpisah untuk mengirim data dari sini ke backend
        await axiosClient.post("/log-user-device", deviceInfoPayload);
        devLog.success("Success to send userDeviceLog to the route");
    } catch (error) {
        devLog.failed("Failed to send userDeviceLog to the route", error);
    }
};