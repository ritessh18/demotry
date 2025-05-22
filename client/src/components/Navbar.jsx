import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [logoutApiCall, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  

   const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();  // 1. Call logout API
      dispatch(logoutUser());           // 2. Cledux andear r RTK Query cache
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed, please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-Learning
            </h1>
          </Link>
        </div>
        {/* User icons and dark mode icon  */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {(user?.role === "admin" || user?.role === "instructor") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="dark:text-indigo-300 dark:border-indigo-400 dark:hover:bg-indigo-700 dark:hover:text-white transition-colors duration-300"
                onClick={() => navigate("/login?tab=login")}
              >
                Login
              </Button>
              <Button
                className="dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:text-white transition-colors duration-300"
                onClick={() => navigate("/login?tab=signup")}
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        {/* Pass logoutHandler to MobileNavbar */}
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full 
            dark:bg-indigo-700 dark:text-white 
            hover:bg-indigo-600 dark:hover:bg-indigo-600 
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-colors duration-300"
          variant="outline"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] dark:bg-[#0a0a0a] p-6">
        <SheetHeader className="flex flex-row items-center justify-between mt-3">
          <SheetTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        <Separator className="my-4 border-t border-gray-200 dark:border-gray-700" />

        {user ? (
          <>
            <nav className="flex flex-col space-y-4">
              <SheetClose asChild>
                <Link
                  to="/my-learning"
                  className="justify-start text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-2 py-1"
                >
                  My Learning
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/profile"
                  className="justify-start text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-2 py-1"
                >
                  Edit Profile
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <button
                  onClick={logoutHandler}
                  className="text-left w-full text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-2 py-1"
                >
                  Log out
                </button>
              </SheetClose>
            </nav>

            {(user?.role === "admin" || user?.role === "instructor") && (
              <SheetFooter className="mt-6 flex flex-col gap-2">
                <SheetClose asChild>
                  <Button
                    className="w-full 
                      bg-indigo-600 hover:bg-indigo-700 
                      dark:bg-indigo-700 dark:hover:bg-indigo-800 
                      text-white font-semibold rounded-md
                      transition-colors duration-300"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Dashboard
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="w-full 
                      bg-indigo-600 hover:bg-indigo-700 
                      dark:bg-indigo-700 dark:hover:bg-indigo-800 
                      text-white font-semibold rounded-md
                      transition-colors duration-300"
                    onClick={() => navigate("/admin/course")}
                  >
                    Courses
                  </Button>
                </SheetClose>
              </SheetFooter>
            )}
          </>
        ) : (
          <div className="flex flex-col space-y-4">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="dark:text-indigo-300 dark:border-indigo-400 dark:hover:bg-indigo-700 dark:hover:text-white transition-colors duration-300"
                onClick={() => navigate("/login?tab=login")}
              >
                Login
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                className="dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:text-white transition-colors duration-300"
                onClick={() => navigate("/login?tab=signup")}
              >
                Signup
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
