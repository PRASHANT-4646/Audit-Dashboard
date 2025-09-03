"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn helper for conditional classes

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
    </aside>
  );
}
