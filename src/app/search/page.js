'use client'
import BudgetGenerator from "@/components/budget-generator";
import PrivateRoute from "@/components/PrivateRoute";


export default function BudgetGeneratorRender() {
  return (
    <div>
      <PrivateRoute>
        <BudgetGenerator /> 
      </PrivateRoute>
    </div>
  );
}