//import Login from '@/components/login'
'use client'
import { ActivityFormPage } from "@/components/activity-form-page"
import PrivateRoute from "@/components/PrivateRoute";

export default function LoginPage() {
  return (
    <div>
      <PrivateRoute>
      <ActivityFormPage />
      </PrivateRoute>
    </div>
  );
}