/**
    Loggeer.ts berfungsi untuk menyatakan
    semua log di konsol hanya muncul saat developemnt
    dan mencegah DRY
*/

// tak ada chalk karena itu hanya untuk node

// src/lib/logger.ts
export const devLog = {
  success: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[DEV]", ...args);
    }
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("[DEV]", ...args);
    }
  },
  failed: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[DEV]", ...args);
    }
  },
};