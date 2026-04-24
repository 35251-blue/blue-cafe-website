import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export default function Visit() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section - Clean & Simple */}
        <section className="bg-background border-b-2 border-foreground py-16 px-4">
          <div className="container text-center space-y-4">
            <h1 className="font-display font-black text-5xl md:text-7xl text-foreground uppercase leading-none">
              COME SAY <span className="text-primary">HI</span>
            </h1>
            <p className="font-sans text-xl text-muted-foreground max-w-xl mx-auto">
              Located right next to Superblue. The perfect start (or finish) to your immersive art journey.
            </p>
          </div>
        </section>

        <div className="container py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info Column */}
            <div className="space-y-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 border-2 border-foreground neo-shadow">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-2">Address</h3>
                    <p className="font-sans text-lg text-muted-foreground">
                      1101 NW 23rd St,<br/>
                      Miami, FL 33127
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Blue+Cafe+Miami+1101+NW+23rd+St" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-primary font-bold hover:underline"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-white p-3 border-2 border-foreground neo-shadow">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-2">Phone</h3>
                    <p className="font-sans text-lg text-muted-foreground">
                      (786) 669-9004
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent text-foreground p-3 border-2 border-foreground neo-shadow">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-2">Hours</h3>
                    <p className="font-sans text-lg text-muted-foreground">
                      Fri - Sun: 10:00 AM - 6:00 PM<br/>
                      <span className="text-sm opacity-70">Check Google Maps for holiday hours</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Context Info */}
              <div className="bg-card border-2 border-foreground p-8 neo-shadow rotate-1">
                <h3 className="font-display font-bold text-2xl mb-4">Before & After Superblue</h3>
                <p className="font-sans text-muted-foreground mb-6">
                  We are more than a cafe; we are part of the experience. Grab a coffee before your tour, or decompress with a wine bucket on our deck afterwards.
                </p>
                <img 
                  src="/images/deck-real-1.png" 
                  alt="Blue Cafe Deck" 
                  className="w-full h-48 object-cover border-2 border-foreground"
                />
              </div>
            </div>

            {/* Map Column */}
            <div className="h-[500px] lg:h-auto min-h-[500px] border-2 border-foreground neo-shadow relative bg-gray-100">
              <MapView 
                className="w-full h-full"
                onMapReady={(map: google.maps.Map) => {
                  const position = { lat: 25.799, lng: -80.215 }; // Approx coords for 1101 NW 23rd St
                  map.setCenter(position);
                  map.setZoom(16);
                  
                  new google.maps.Marker({
                    position: position,
                    map: map,
                    title: "Blue Cafe Miami",
                    animation: google.maps.Animation.DROP
                  });
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
