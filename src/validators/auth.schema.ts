//========= file untuk zod memverifikasi payload ==========//
import { z } from 'zod';

/** 
    register schema berisi payload ( name, email, dan password)
    yang akan divalidasi oleh zod 
 */
export const registerSchema = z.object({
    name: z.string().max(12, { message: "12 character max" }), // name validation
    email: z.string().email({ message: "Invalid email format" }), // email validation
    password: 
    z.string().min(8, { message: "Password must be atleast 8 characters"}) // password validation
    .refine(val => /[A-Z]/.test(val), { message: "Password must be atleast 1 capital letter"}) // hurus terdiri dari 1 huruf kapital
    .refine(val => /[a-z]/.test(val), { message: "Password must be atleast 1 lowercase"}) // hurus terdiri dari 1 huruf kecil
    .refine(val => /[0-9]/.test(val), { message: "Password must be atleast 1 number"}) // hurus terdiri dari 1 angka
    .refine(val => /[^A-Za-z0-9]/.test(val), { message: "Password must be atleast a symbol"}) // hurus terdiri dari sebuah tanda baca
});

export type RegisterSchemaType = z.infer<typeof registerSchema>

/**
    login schema berisi payload ( email dan password)
    yang akan divalidasi oleh zod 
 */
export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }), // email validation
    password: z.string().min(1, { message: "Password required" })
    .refine(val => /[A-Z]/.test(val), { message: "Password must be atleast 1 capital letter"}) // hurus terdiri dari 1 huruf kapital
    .refine(val => /[a-z]/.test(val), { message: "Password must be atleast 1 lowercase"}) // hurus terdiri dari 1 huruf kecil
    .refine(val => /[0-9]/.test(val), { message: "Password must be atleast 1 number"}) // hurus terdiri dari 1 angka
    .refine(val => /[^A-Za-z0-9]/.test(val), { message: "Password must be atleast a symbol"}) // hurus terdiri dari sebuah tanda baca
})

export type LoginSchemaType = z.infer<typeof loginSchema> 