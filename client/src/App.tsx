import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SafeAreaProvider } from "@/components/safe-area";
import AuthPage from "@/pages/auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route component={AuthPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
