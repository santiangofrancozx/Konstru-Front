//import Login from '@/components/login'
'use client'
import { ActivityFormPage } from "@/components/pages/activity-form-page"
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function LoginPage() {
  return (
    <div>
      <PrivateRoute>
      <ActivityFormPage />
      </PrivateRoute>
    </div>
  );
}