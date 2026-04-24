import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const TOAST_URL = "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st";

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b-2 border-foreground">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 group-hover:rotate-12 transition-transform">
            <img src="/images/logo-transparent.png" alt="Blue Cafe Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter">BLUE CAFE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={cn(
              "font-display font-bold text-lg hover:text-primary transition-colors relative",
              location === "/" && "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-primary after:skew-x-12"
            )}>
              Home
          </Link>
          
          <Link href="/menu" className={cn(
              "font-display font-bold text-lg hover:text-primary transition-colors relative",
              location === "/menu" && "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-primary after:skew-x-12"
            )}>
              Order & Pay
          </Link>

          <Link href="/events" className={cn(
              "font-display font-bold text-lg hover:text-primary transition-colors relative",
              location === "/events" && "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-primary after:skew-x-12"
            )}>
              Events
          </Link>

          <Link href="/visit">
            <Button className="neo-shadow bg-secondary text-white border-2 border-foreground hover:bg-secondary/90 rounded-none font-bold">
              Visit Us
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 border-2 border-foreground neo-shadow bg-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b-2 border-foreground p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link href="/" 
              className="font-display font-bold text-2xl hover:text-primary py-2 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              Home
          </Link>
          
          <Link href="/menu" 
              className="font-display font-bold text-2xl hover:text-primary py-2 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              Order & Pay
          </Link>

          <Link href="/events" 
              className="font-display font-bold text-2xl hover:text-primary py-2 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              Events
          </Link>

          <Link href="/visit" onClick={() => setIsOpen(false)}>
            <Button className="w-full neo-shadow bg-secondary text-white border-2 border-foreground rounded-none font-bold mt-4">
              Visit Us
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
