import Link from "next/link";
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

export function Navbar2() {
  return (
    <header className="flex h-16 w-full items-center px-4 md:px-6 border-b bg-cyan-700 text-white py-6 px-4 md:px-8">
      <div className="flex items-center gap-4">
      <Sheet>
          <SheetTrigger asChild>
          <Avatar className="w-16 h-18 cursor-pointer bg-sky-950 -translate-x-4">
              <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback >
              <div className="w-full h-full bg-cyan-700 flex items-center justify-center">
                <img src="/logoKonstru.png" alt="Fallback Image" className="object-cover w-full h-full" />
                </div>
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side="left" className="text-white bg-sky-950"> {/* Cambia el color de fondo del menú desplegable */}
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
                Pricing (Beta)
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all text-white" />
              </Link>
              <Link className="flex w-full items-center py-2 text-lg font-semibold text-white hover:text-cyan-300" href="/dashboard">
                My Projects
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all text-white" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div>
          <p className="text-white-400 text-lg font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Construction Budget Manager</p>
        </div>
      </div>
    </header>
  );
}


function ChevronRightIcon(props) {
  return (
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
}

function LockIcon(props) {
  return (
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
}

function LogOutIcon(props) {
  return (
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
}
function UserIcon(props) {
  return (
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
}

function MenuIcon(props) {
  return (
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
}

function MountainIcon(props) {
  return (
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
