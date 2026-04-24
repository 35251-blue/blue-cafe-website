import { Link } from "wouter";
import { Instagram, MapPin, Clock, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await subscribeMutation.mutateAsync({ email });
      toast.success("Successfully subscribed to our newsletter!");
      setEmail(""); // Clear the input
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-foreground text-background border-t-4 border-primary">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <img src="/images/logo-transparent.png" alt="Blue Cafe Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter">BLUE CAFE</span>
            </div>
            <p className="font-sans text-background/80 max-w-xs">
              Where flavor meets imagination. Sip art, stay cool, and fuel your Superblue adventure.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com/bluecafe.miami" target="_blank" rel="noreferrer" className="p-2 bg-secondary text-white border-2 border-background hover:-translate-y-1 transition-transform">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6 text-primary">Explore</h3>
            <ul className="space-y-3 font-sans font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-primary transition-colors">Order & Pay</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li>
                <a 
                  href="https://tickets.superblue.com/en/miami/tickets/immersive-art-experience-miami-superblue?cp_landing_source=www.superblue&utm_source=rsd&utm_medium=gmb&utm_campaign=brandawareness&utm_content=" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  Superblue Tickets ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6 text-accent">Visit Us</h3>
            <ul className="space-y-4 font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-1" />
                <span>1101 NW 23rd St,<br />Miami, FL 33127<br />(Right next to Superblue)</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent mt-1" />
                <div className="space-y-1 text-sm">
                  <div>Sunday: 9:45AM - 7PM</div>
                  <div>Mon - Thu: 10:45AM - 7PM</div>
                  <div>Fri - Sat: 9:45AM - 7PM</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:info@bluecafemiami.com" className="hover:text-primary transition-colors underline">info@bluecafemiami.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-background/10 p-6 border-2 border-dashed border-background/30 rotate-1">
            <h3 className="font-display font-bold text-xl mb-2 text-secondary">Stay in the Loop</h3>
            <p className="text-sm mb-4">Get the latest updates on events and secret menu items.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribeMutation.isPending}
                className="w-full bg-background text-foreground px-3 py-2 font-bold border-2 border-transparent focus:border-primary outline-none disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={subscribeMutation.isPending}
                className="bg-primary text-primary-foreground px-4 py-2 font-bold border-2 border-transparent hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeMutation.isPending ? "..." : "→"}
              </button>
            </form>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© 2026 Blue Cafe Miami. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
