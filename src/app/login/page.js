//import Login from '@/components/login'
'use client'
import dynamic from 'next/dynamic';
const DynamicLoginComponent = dynamic(() => import('@/components/login'), { ssr: false });

export default function LoginPage() {
  return (
    <div>
      <DynamicLoginComponent />
    </div>
  );
}
