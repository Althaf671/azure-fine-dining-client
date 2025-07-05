/** cookie.ts frontend berguna agar frontend dapat mengambil isi cookie, lihat csrf.route.ts
    httpOnly 
*/

export default function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2]: null;
}