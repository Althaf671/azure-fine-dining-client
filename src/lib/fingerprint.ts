//========= file untuk membuat fingerprint ==========//
/**
    Fingerprint.ts berfungsi untuk log user device untuk
    keperluan keamanan, no, kami tidak berniat buruk, tujuan 
    utama adalah untuk log security untuk memantau perilaku 
    dari device tertentu. untuk proteksi fingerprint maka
    kami hash
*/
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { devLog } from './logger';
import { hashSHA256 } from './hash';

export async function getFingerprintId(): Promise<string | null> {
    devLog.info("Starting to create fingerprint");

    if (typeof window === "undefined") {
        devLog.failed("Get fingerprint Id occured at server side, Immedietly aborting...");
        return null; // semenjak ini adalah function khusus browser, cegah ia berjalan di server
    }

    try {
        const fp = await FingerprintJS.load(); // "browser" ambil fingerprint
        const result = await fp.get(); // deklrasi result berisi fingerprint(fp)
        const hashedFingerprintId = hashSHA256(result.visitorId); // hash fingerpint id (secara default itu adalah visitor id)
        devLog.success("Fingerprint created");
        return hashedFingerprintId;
    } catch (error) {
        devLog.failed("Failed to get fingerprint", error);
        return null;
    }
};