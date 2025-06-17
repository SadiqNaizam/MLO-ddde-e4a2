import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings as SettingsIcon, LogOut, ChefHat } from 'lucide-react'; // Using ChefHat for logo

interface HeaderProps {
  bakeryName?: string;
  userName?: string;
  userInitials?: string;
  userImageUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  bakeryName = "Artisan Bakery Dashboard",
  userName = "Jane Doe",
  userInitials = "JD",
  userImageUrl,
}) => {
  const navigate = useNavigate();
  console.log('Header component loaded');

  const handleLogout = () => {
    console.log('User logout initiated');
    // Here you would typically clear auth tokens, redirect to login, etc.
    // For now, we'll just log and navigate to home as an example
    navigate('/'); 
  };

  return (
    <header className="bg-amber-50/50 dark:bg-slate-800/50 border-b border-amber-200 dark:border-slate-700 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors">
              <ChefHat size={28} />
              <span className="font-semibold text-xl tracking-tight">{bakeryName}</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Future: Maybe a quick action button like "New Recipe" or notifications */}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-amber-300 dark:border-amber-600">
                    <AvatarImage src={userImageUrl} alt={userName} />
                    <AvatarFallback className="bg-amber-200 dark:bg-amber-700 text-amber-700 dark:text-amber-200 font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2 mt-1 bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 shadow-lg" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-800 dark:text-slate-100">{userName}</p>
                    {/* <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                      user@example.com
                    </p> */}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-100 dark:bg-slate-700" />
                <DropdownMenuItem className="cursor-pointer hover:bg-amber-50 dark:hover:bg-slate-700/50 focus:bg-amber-50 dark:focus:bg-slate-700/50" asChild>
                  <Link to="/profile"> {/* Assuming a /profile route might exist in the future */}
                    <User className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-slate-700 dark:text-slate-200">Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-amber-50 dark:hover:bg-slate-700/50 focus:bg-amber-50 dark:focus:bg-slate-700/50" asChild>
                  <Link to="/settings">
                    <SettingsIcon className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-slate-700 dark:text-slate-200">Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-amber-100 dark:bg-slate-700"/>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-amber-50 dark:hover:bg-slate-700/50 focus:bg-amber-50 dark:focus:bg-slate-700/50"
                  onSelect={(e) => { e.preventDefault(); handleLogout(); }} // Prevent default to allow navigation
                >
                  <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />
                  <span className="text-slate-700 dark:text-slate-200">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;