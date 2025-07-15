//========= file untuk custom logger ==========//
/**
    Loggeer.ts berfungsi untuk menyatakan
    semua log di konsol hanya muncul saat developemnt
    dan mencegah DRY
*/

// tak ada chalk karena itu hanya untuk node

// src/lib/logger.ts
export const devLog = {
  success: (...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      console.info("[DEV]", "✅", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("[DEV]", "ℹ️", ...args);
    }
  },
  failed: (...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[DEV]", "💥",...args);
    }
  },
  info: (...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("[DEV]", ...args);
    }
  },
};