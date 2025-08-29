import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import CarListings from "./pages/CarListings";
import CarDetails from "./pages/CarDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

function AppContent() {
  const { toast } = useToast();

  useEffect(() => {
    // Show welcome toast on first visit
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      toast({
        title: "Welcome to Arab Auto!",
        description: "Your trusted partner for automotive excellence in the Arab world.",
      });
      localStorage.setItem("hasVisited", "true");
    }
  }, [toast]);

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cars" component={CarListings} />
        <Route path="/cars/:id" component={CarDetails} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
      <Toaster />
    </LanguageProvider>
  );
}
