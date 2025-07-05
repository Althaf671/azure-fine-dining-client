// pages/admin-panel.tsx
"use client" // test

import { useAdminPanel } from "@take/context/provider";
import { ROLE_LABEL } from "@take/lib/roles.list";

export default function AdminPanel() {
  const admin = useAdminPanel()

  return (
    <div>
      <h1>Admin Panel</h1>
      {admin && (
        <div>
          <p>{admin.message}</p>
          <p>Role: {ROLE_LABEL[admin.role]}</p>
          <p>name: {admin.name}</p>
          <p>email: {admin.email}</p>
        </div>
      )}
    </div>
  )
}