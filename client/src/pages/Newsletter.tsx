import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("Welcome to the Blue Cafe family! 🎉");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  // Auto-focus email input on page load
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    subscribeMutation.mutate({ email: email.trim() });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">
        <div className="max-w-md w-full bg-background border-4 border-foreground neo-shadow p-8 md:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-accent rounded-full border-4 border-foreground flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-foreground" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="font-display font-black text-4xl md:text-5xl uppercase">
              You're In!
            </h1>
            <p className="font-sans text-lg text-muted-foreground">
              Check your inbox for exclusive updates, special offers, and the latest from Blue Cafe Miami.
            </p>
          </div>

          <div className="pt-4">
            <a href="/" className="inline-block w-full">
              <Button className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground border-2 border-foreground neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-none">
                Visit Our Menu
              </Button>
            </a>
          </div>

          <div className="pt-2 space-y-2">
            <p className="text-sm text-muted-foreground">Follow us on Instagram</p>
            <a 
              href="https://instagram.com/bluecafe.miami" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block font-bold text-secondary hover:underline"
            >
              @bluecafe.miami
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">
      <div className="max-w-md w-full bg-background border-4 border-foreground neo-shadow p-8 md:p-12">
        <div className="space-y-6">
          {/* Logo/Brand */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 border-2 border-foreground neo-shadow -rotate-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="font-display font-bold text-foreground uppercase tracking-widest">Blue Cafe</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center space-y-3">
            <h1 className="font-display font-black text-4xl md:text-5xl leading-tight uppercase">
              Stay in the <span className="text-primary">Loop</span>
            </h1>
            <p className="font-sans text-lg text-muted-foreground">
              Get exclusive updates, special offers, and be the first to know about new menu items and events.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                ref={emailInputRef}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribeMutation.isPending}
                className="h-14 pl-12 text-lg border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground border-2 border-foreground neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {subscribeMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                "Subscribe Now"
              )}
            </Button>
          </form>

          {/* Trust Badge */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>

          {/* Social Proof */}
          <div className="border-t-2 border-border pt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">Join the community</p>
            <a 
              href="https://instagram.com/bluecafe.miami" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block font-bold text-secondary hover:underline"
            >
              @bluecafe.miami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
