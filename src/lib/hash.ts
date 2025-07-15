//========= file untuk hash value tertentu ==========//
/**
    ini adalah file khusus untuk hash berbagai
    encode, menggunakan hash SHA256
*/
import SHA256 from "crypto-js/sha256";
import { devLog } from './logger';

export function hashSHA256(value: string): string {
    if (typeof value !== "string" || !value.length) {
        devLog.failed("Invalid value for hashSHA256");
        return "invalid";
    };

    devLog.info("Starting to hash any value into SHA256");
    try {
        const hashed = SHA256(value).toString();
        devLog.success("any value hashed");
        return hashed;
    } catch (error) {
        devLog.failed("any value failed to hash", error)
        return "Invalid";
    }
};
