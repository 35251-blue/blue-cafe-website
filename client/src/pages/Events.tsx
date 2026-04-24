import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, PartyPopper, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function Events() {
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    guests: 0,
    details: "",
    name: "",
    email: "",
    phone: "",
  });

  const submitInquiry = trpc.events.submitInquiry.useMutation({
    onSuccess: () => {
      toast.success("Request sent! Our event planner will contact you shortly.");
      // Reset form
      setFormData({
        eventType: "",
        date: "",
        guests: 0,
        details: "",
        name: "",
        email: "",
        phone: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to send request. Please try again or call us directly.");
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative py-20 bg-primary text-primary-foreground border-b-4 border-foreground overflow-hidden">
          <div className="container relative z-10 text-center space-y-6">
            <div className="inline-block bg-accent text-foreground px-4 py-2 font-bold border-2 border-foreground rotate-2 mb-4">
              CELEBRATE WITH US
            </div>
            <h1 className="font-display font-black text-5xl md:text-7xl">
              HOST YOUR EVENT<br/>ON THE DECK
            </h1>
            <p className="font-sans text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              Birthdays, special dinners, or just because. Rent our colorful deck for an unforgettable experience.
            </p>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-secondary rounded-full animate-bounce delay-100"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rotate-12"></div>
        </section>

        <div className="container py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-display font-black text-4xl">WHY CHOOSE BLUE CAFE?</h2>
              <div className="grid gap-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-secondary text-white p-3 border-2 border-foreground neo-shadow">
                    <PartyPopper className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Unique Atmosphere</h3>
                    <p className="text-muted-foreground">Immersive art vibes inside Superblue. Colorful, energetic, and perfect for photos.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-accent text-foreground p-3 border-2 border-foreground neo-shadow">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Flexible Space</h3>
                    <p className="text-muted-foreground">From intimate dinners to large birthday bashes. We can configure the deck for you.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-foreground p-8 neo-shadow rotate-1">
              <h3 className="font-display font-bold text-2xl mb-4">Contact Event Planner</h3>
              <div className="flex items-center gap-4 text-xl font-bold text-primary">
                <Phone className="h-6 w-6" />
                <a href="tel:7866746397" className="hover:underline">786-674-6397</a>
              </div>
              <p className="mt-2 text-muted-foreground">Call or text us directly for immediate inquiries.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-background border-2 border-foreground p-8 md:p-10 neo-shadow -rotate-1 relative">
            <div className="absolute -top-4 -right-4 bg-secondary text-white px-4 py-2 font-bold border-2 border-foreground rotate-3">
              GET A QUOTE
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-bold text-sm">Event Type</label>
                <Input 
                  placeholder="Birthday, Dinner, Corporate..." 
                  className="border-2 border-foreground h-12" 
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-bold text-sm">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      type="date" 
                      className="pl-10 border-2 border-foreground h-12" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm">Guests</label>
                  <Input 
                    type="number" 
                    placeholder="10-50" 
                    className="border-2 border-foreground h-12" 
                    value={formData.guests || ""}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 0 })}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm">Tell us about your event</label>
                <Textarea 
                  placeholder="Any special requests, catering needs, or themes?" 
                  className="border-2 border-foreground min-h-[120px]" 
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm">Contact Info</label>
                <Input 
                  placeholder="Your Name" 
                  className="border-2 border-foreground h-12 mb-2" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required 
                />
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="border-2 border-foreground h-12" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                />
                <Input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="border-2 border-foreground h-12" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required 
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-xl font-display font-bold bg-primary text-primary-foreground border-2 border-foreground neo-shadow hover:translate-y-1 hover:shadow-none"
                disabled={submitInquiry.isPending}
              >
                {submitInquiry.isPending ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
