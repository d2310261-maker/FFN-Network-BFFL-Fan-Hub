import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Shield, Moon, Sun, Zap, Calendar, Trophy, BarChart3, Newspaper, Target, Link2, Users, BookOpen } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function Header() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/scores", label: "Scores", icon: Zap },
    { path: "/schedule", label: "Schedule", icon: Calendar },
    { path: "/playoffs", label: "Playoffs", icon: Trophy },
    { path: "/standings", label: "Standings", icon: BarChart3 },
    { path: "/previous-weeks", label: "Previous Weeks", icon: Calendar },
    { path: "/news", label: "News", icon: Newspaper },
    { path: "/pickems", label: "Pick'ems", icon: Target },
    { path: "/social", label: "Social", icon: Users },
    { path: "/changelogs", label: "Changelogs", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-8">
          <Link href="/" data-testid="link-home" className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer whitespace-nowrap">
              BFFL Fan Hub
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  className="font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {isAuthenticated && (
              <Link href="/admin" data-testid="link-admin">
                <Button variant="outline" size="sm" className="hidden lg:flex gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </Button>
              </Link>
            )}

            {isAuthenticated ? (
              <a href="/api/logout" data-testid="link-logout">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Logout
                </Button>
              </a>
            ) : (
              <a href="/login" data-testid="link-login">
                <Button variant="default" size="sm" className="hidden md:flex">
                  Admin Login
                </Button>
              </a>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 space-y-2 border-t">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path} data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    size="default"
                    className="w-full justify-start gap-3 font-medium h-12"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            
            <div className="border-t pt-2 mt-2 space-y-2">
              {isAuthenticated && (
                <Link href="/admin" data-testid="link-mobile-admin">
                  <Button
                    variant="ghost"
                    size="default"
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield className="w-5 h-5 flex-shrink-0" />
                    <span>Admin Dashboard</span>
                  </Button>
                </Link>
              )}

              {isAuthenticated ? (
                <a href="/api/logout" data-testid="link-mobile-logout" className="block">
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full justify-start h-12"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logout
                  </Button>
                </a>
              ) : (
                <a href="/login" data-testid="link-mobile-login" className="block">
                  <Button
                    variant="default"
                    size="default"
                    className="w-full justify-start h-12"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Login
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
