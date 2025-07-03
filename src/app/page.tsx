"use client";
import LoginButton from "@take/app/(auth)/components/loginButton";
import styles from "./page.module.css";

export default function Home() {

  return (
    <>
      <div className={styles.page}>
          <LoginButton />
      </div>
    </>
  )
}
