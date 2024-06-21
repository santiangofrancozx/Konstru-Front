'use client'
import PrivateRoute from "@/components/auth/PrivateRoute";
import { UserEditProfile } from "@/components/user-edit-profile";


export default function ProjectsRender() {
  return (
    <div className="bg-zinc-800">
        <PrivateRoute>
            <UserEditProfile /> 
        </PrivateRoute>
    </div>
  );
}