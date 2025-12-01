import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import Landing from "@/pages/Landing";
import LiveScores from "@/pages/LiveScores";
import GameDetail from "@/pages/GameDetail";
import PreviousWeeks from "@/pages/PreviousWeeks";
import Schedule from "@/pages/Schedule";
import Playoffs from "@/pages/Playoffs";
import Standings from "@/pages/Standings";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Pickems from "@/pages/Pickems";
import AdminDashboard from "@/pages/AdminDashboard";
import SocialLinks from "@/pages/SocialLinks";
import Changelogs from "@/pages/Changelogs";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const christmasElements = Array.from({ length: 80 }).map((_, i) => {
    const type = i % 4;
    let content = '❄';
    if (type === 1) content = '🎄';
    if (type === 2) content = '🎅';
    if (type === 3) content = '🎁';
    
    return (
      <div
        key={i}
        className="absolute select-none font-bold"
        style={{
          fontSize: Math.random() * 24 + 12 + 'px',
          left: Math.random() * 100 + '%',
          animation: i % 2 === 0 ? `snowfall ${Math.random() * 12 + 8}s linear infinite` : `snowfall-2 ${Math.random() * 12 + 8}s linear infinite`,
          animationDelay: Math.random() * 5 + 's',
          top: -40 + 'px',
          opacity: Math.random() * 0.4 + 0.6,
        }}
      >
        {content}
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Top twinkling lights */}
      <div className="fixed top-0 left-0 right-0 h-3 z-50 pointer-events-none">
        <div className="flex justify-around h-full gap-1 px-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={`top-${i}`}
              className="flex-1 rounded-full"
              style={{
                animation: `twinkle ${0.8 + (i % 4) * 0.3}s ease-in-out infinite`,
                animationDelay: (i * 0.08) + 's',
                backgroundColor: i % 3 === 0 ? 'hsl(0 78% 48%)' : i % 3 === 1 ? 'hsl(43 96% 56%)' : 'hsl(138 44% 32%)',
                boxShadow: `0 0 8px currentColor`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom twinkling lights */}
      <div className="fixed bottom-0 left-0 right-0 h-3 z-50 pointer-events-none">
        <div className="flex justify-around h-full gap-1 px-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="flex-1 rounded-full"
              style={{
                animation: `twinkle ${0.8 + (i % 4) * 0.3}s ease-in-out infinite`,
                animationDelay: (i * 0.08 + 0.4) + 's',
                backgroundColor: i % 3 === 1 ? 'hsl(0 78% 48%)' : i % 3 === 2 ? 'hsl(43 96% 56%)' : 'hsl(138 44% 32%)',
                boxShadow: `0 0 8px currentColor`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Left side lights */}
      <div className="fixed left-0 top-0 bottom-0 w-2 z-40 pointer-events-none flex flex-col justify-around">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`left-${i}`}
            className="w-full rounded-full"
            style={{
              animation: `twinkle-delayed ${1 + (i % 3) * 0.4}s ease-in-out infinite`,
              animationDelay: (i * 0.12) + 's',
              backgroundColor: i % 3 === 0 ? 'hsl(0 78% 48%)' : i % 3 === 1 ? 'hsl(43 96% 56%)' : 'hsl(138 44% 32%)',
              boxShadow: `0 0 10px currentColor`,
              height: '6px',
            }}
          />
        ))}
      </div>

      {/* Right side lights */}
      <div className="fixed right-0 top-0 bottom-0 w-2 z-40 pointer-events-none flex flex-col justify-around">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`right-${i}`}
            className="w-full rounded-full"
            style={{
              animation: `twinkle-delayed ${1 + (i % 3) * 0.4}s ease-in-out infinite`,
              animationDelay: (i * 0.12 + 0.5) + 's',
              backgroundColor: i % 3 === 1 ? 'hsl(0 78% 48%)' : i % 3 === 2 ? 'hsl(43 96% 56%)' : 'hsl(138 44% 32%)',
              boxShadow: `0 0 10px currentColor`,
              height: '6px',
            }}
          />
        ))}
      </div>

      {/* Falling festive elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {christmasElements}
      </div>

      <Header />
      
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/scores" component={LiveScores} />
        <Route path="/game/:id" component={GameDetail} />
        <Route path="/previous-weeks" component={PreviousWeeks} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/playoffs" component={Playoffs} />
        <Route path="/standings" component={Standings} />
        <Route path="/news" component={News} />
        <Route path="/news/:id" component={NewsDetail} />
        <Route path="/pickems" component={Pickems} />
        <Route path="/social" component={SocialLinks} />
        <Route path="/changelogs" component={Changelogs} />
        {isAuthenticated && <Route path="/admin" component={AdminDashboard} />}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
