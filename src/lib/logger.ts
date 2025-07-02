/**
    Loggeer.ts berfungsi untuk menyatakan
    semua log di konsol hanya muncul saat developemnt
    dan mencegah DRY
*/

import chalk from 'chalk';

export const devLog = {
    // console log success
    success: (...args: any[]) => {
        if (process.env.NODE_ENV === "development") {
            console.log(chalk.green("✅", ...args))
        }
    },
     // console log failed
    failed: (...args: any[]) => {
        if (process.env.NODE_ENV === "development") {
            console.log(chalk.red("💥", ...args))
        }
    },
     // console log warn
    warn: (...args: any[]) => {
        if (process.env.NODE_ENV === "development") {
            console.log(chalk.yellow("⚠️", ...args))
        }
    }, 
};