import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import BlogDetail from "@/pages/BlogDetail";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
    <Router base="/Sindhu-Varma">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
