'use client';

import { useSearchParams } from 'next/navigation';
import BudgetGenerator from "@/components/pages/budget-generator";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function BudgetGeneratorRender() {
  const searchParams = useSearchParams();
  const nameProject = searchParams.get('nameProject');
  const idProject = searchParams.get('idProject');

  return (
    <div>
      <PrivateRoute>
        <BudgetGenerator nameProject={nameProject} idProject={idProject} />
      </PrivateRoute>
    </div>
  );
}
