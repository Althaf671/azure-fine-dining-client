// pages/admin-panel.tsx
"use client" // test

import { ROLE_LABEL } from "@take/lib/roles.list";
import { useUserPanel } from "../../context/provider";
import LogoutButton from "@take/components/buttons/logoutButton";

export default function UserPanel() {
    const user = useUserPanel();

  return (
    <div>
      <h1>User Panel</h1>
      {user && (
        <div>
          <p>{user.message}</p>
          <p>Role: {ROLE_LABEL[user.role]}</p>
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
          <LogoutButton />
        </div>
      )}
    </div>
  )
}