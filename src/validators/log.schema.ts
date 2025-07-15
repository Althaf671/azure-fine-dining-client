//========= file untuk zod memverifikasi data log ==========//
/**
    validators khusus untuk validate semua data untuk
    keperluan web heath monitoring frontend
*/
import { z } from 'zod';

export const userDeviceLogSchema = z.object({
    hashedFingerprint: z.string().min(20, { message: "This fingerprint were to short" }),
    browser: z.string().min(2, { message: "Browser invalid"}),
    os: z.string().min(2, { message: "OS invalid"}),
    device: z.string().min(2, { message: "Device invalid"}),
    timezone: z.string({ message: "Timezone invalid"}),
    userAgent: z.string({ message: "User Agent invalid"}),
    action: z.string({ message: "Action invalid"}), // karena FE tidak kenal enum (hanya di BE) maka validator dengan enum ada di BE
    status: z.string({ message: "Status invalid"}),
});

export type UserDeviceLogType = z.infer<typeof userDeviceLogSchema>;