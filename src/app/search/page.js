'use client';

import { useSearchParams } from 'next/navigation';
import BudgetGenerator from "@/components/pages/budget-generator";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { Navbar } from '@/components/navbars/navbar';
import { Children } from 'react';

export default function BudgetGeneratorRender() {
  const searchParams = useSearchParams();
  const nameProject = searchParams.get('nameProject');
  const idProject = searchParams.get('idProject');

  return (
    <div>
      <Navbar/>
      <PrivateRoute>
        <BudgetGenerator nameProject={nameProject} idProject={idProject} />
      </PrivateRoute>
    </div>
  );
}
