//========= file untuk zod memverifikasi payload ==========//
import { z } from 'zod';

/** 
    register schema berisi payload ( name, email, dan password)
    yang akan divalidasi oleh zod 
 */
export const registerSchema = z.object({
    name: 
    z.string({ required_error: "Name is required" }) // name validation
    .min(1, { message: "Username is required" })
    .max(12, { message: "Max 12 characters allowed" }), 
    email: 
    z.string().min(1, { message: "Email is required" }) // email validation
    .email({ message: "Invalid email format" }), // email validation
    password: 
    z.string().min(8, { message: "Password must be atleast 8 characters"}) // password validation
    .refine(val => /[A-Z]/.test(val), { message: "Password must be atleast 1 capital letter"}) // hurus terdiri dari 1 huruf kapital
    .refine(val => /[a-z]/.test(val), { message: "Password must be atleast 1 lowercase"}) // hurus terdiri dari 1 huruf kecil
    .refine(val => /[0-9]/.test(val), { message: "Password must be atleast 1 number"}) // hurus terdiri dari 1 angka
    .refine(val => /[^A-Za-z0-9]/.test(val), { message: "Password must be atleast a symbol"}) // hurus terdiri dari sebuah tanda baca
}).strict();

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
}).strict();

export type LoginSchemaType = z.infer<typeof loginSchema> 

/**
    otp schema berisi payload (otp)
 */
export const otpSchema = z.object({
    otp: 
    z.string().length(6, { message: "OTP must be 6 digits"})
    .regex(/^\d+$/, { message: "OTP must be a number"}),
}).strict();

export type OtpSchemaType = z.infer<typeof otpSchema> 

/**
    forgot password berisi hanya 1 payload (email)
 */
export const forgotPasswordSchema = z.object({
    email: 
    z.string().min(1, { message: "Email is required" }).email("Invalid email format")
}).strict();

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

/**
    reset password berisi 2 payload (password dan confirm password)
 */
export const resetPasswordSchema = z.object({
    password: z.string().min(1, { message: "Password required" })
    .refine(val => /[A-Z]/.test(val), { message: "Password must be atleast 1 capital letter"}) // hurus terdiri dari 1 huruf kapital
    .refine(val => /[a-z]/.test(val), { message: "Password must be atleast 1 lowercase"}) // hurus terdiri dari 1 huruf kecil
    .refine(val => /[0-9]/.test(val), { message: "Password must be atleast 1 number"}) // hurus terdiri dari 1 angka
    .refine(val => /[^A-Za-z0-9]/.test(val), { message: "Password must be atleast a symbol"}), // hurus terdiri dari sebuah tanda baca
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).strict()
.refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

