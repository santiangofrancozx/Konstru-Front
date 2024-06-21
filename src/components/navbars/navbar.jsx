import Link from "next/link";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import {
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export function Navbar() {
  const [user, setUser] = useState({});
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('/api/user/data');
        console.log('User response:', userResponse.data); 
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
  try {
    const logoutResponse = await axios.get('api/user/logout');
    if (logoutResponse.status === 200) {
      router.push('/login');
    } else {
      console.error('Error during logout:', logoutResponse);
      // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
    }
  } catch (error) {
    console.error('Error during logout:', error);
    // Manejar el error de manera apropiada, por ejemplo, mostrando un mensaje de error al usuario
  }
};


  const memoizedAvatar = useMemo(() => (
    <Avatar className="w-12 h-12 cursor-pointer bg-sky-950">
      <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
      <AvatarFallback>
        <UserIcon className="w-5 h-5 mr-2 bg-sky-950" />
      </AvatarFallback>
    </Avatar>
  ), [user]);

  

  return (
    <header className="flex h-16 w-full items-center px-4 md:px-6 border-b bg-cyan-700 text-white py-6 px-4 md:px-8">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {memoizedAvatar}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-4 space-y-2 text-white bg-zinc-700">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 bg-sky-950">
                  <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium">{user.Nombre}</p>
                </div>
              </div>
              <div className="grid gap-2">
                <Button variant="outline" className="text-white border-white bg-cyan-700" onClick={() => router.push('/userProfile')}>
                  <UserIcon className="w-5 h-5 mr-2 bg-sky-950" />
                  <Link href="/userProfile">Edit Profile</Link>
                </Button>
                <Button variant="outline" className="text-white border-white bg-sky-950">
                  <LogOutIcon className="w-5 h-5 mr-2 bg-sky-950" onClick={handleLogout}/>
                  Logout
                </Button>
              
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <h1 className="text-xl font-bold">{user.Nombre}</h1>
          <p className="text-gray-400">{user.Email}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="text-white border-white bg-sky-950">
              <MenuIcon className="h-6 w-6 bg-sky-950 rounded-full p-1" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="text-white bg-sky-950">
            <div className="grid gap-2 py-6">
              <Link className="flex w-full items-center py-2 text-lg font-semibold text-white hover:text-cyan-300" href="/home">
                Home
              </Link>
              <Link className="flex w-full items-center py-2 text-lg font-semibold hover:text-cyan-300" href="/search">
                Budget Generator
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all text-white" />
              </Link>
              <Link className="flex w-full items-center py-2 text-lg font-semibold text-white hover:text-cyan-300" href="/userProfile">
                User Profile
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all text-white" />
              </Link>
              <Link className="flex w-full items-center py-2 text-lg font-semibold text-white hover:text-cyan-300" href="/pricing">
                Pricing
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all text-white" />
              </Link>
              <Link className="flex w-full items-center py-2 text-lg font-semibold text-white hover:text-cyan-300" href="/dashboard">
                My Projects
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all text-white" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

const UserIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const LockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LogOutIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
