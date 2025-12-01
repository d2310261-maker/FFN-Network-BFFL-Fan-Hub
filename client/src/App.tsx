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
