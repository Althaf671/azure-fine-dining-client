// pages/admin-panel.tsx
"use client" // test

import { useProtectedPage } from "@take/hooks/useProtectedPage";
import { getAdminPanel } from "@take/lib/api";
import { ROLE_LABEL } from "@take/lib/roles.list";

export default function AdminPanel() {
  const { data, loading } = useProtectedPage(getAdminPanel);

  return (
    <div>
      <h1>Admin Panel</h1>
      {data && (
        <div>
          <p>{data.message}</p>
          <p>Role: {ROLE_LABEL[data.role]}</p>
          <p>name: {data.name}</p>
          <p>email: {data.email}</p>
        </div>
      )}
    </div>
  )
}