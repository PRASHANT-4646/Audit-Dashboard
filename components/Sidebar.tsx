"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Users, Settings, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Audit Logs", href: "/", icon: FileText },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg text-xl font-medium transition-colors",
        isActive
          ? "bg-blue-500 text-white shadow-xl"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      <Icon size={18} />
      {item.name}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  // Dark Mode toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <aside className="h-screen w-64 flex flex-col border-r bg-white dark:bg-gray-900 shadow-md">
      {/* Logo / App Name */}
      <div className="p-6 text-2xl font-bold border-b bg-gray-50 dark:bg-gray-800">
        AuditLogs
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="p-4 border-t dark:border-gray-700">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center gap-2"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </div>
    </aside>
  );
}
