
import Link from "next/link";

export default function Home() {

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" ,textAlign: "center", paddingTop: "50vh", gap: "10px" }}>
          <Link href="/login">Login page</Link>
          <p style={{ textAlign: "center" }}>or</p>
          <Link href="/register">Register page</Link>
      </div>
    </>
  );
}
