import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Coffee, Camera, Music, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b-4 border-foreground">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/src/assets/hero-family-deck-v2.jpg')] bg-cover bg-center opacity-20 md:opacity-100 md:w-1/2 md:left-1/2 md:border-l-4 md:border-foreground"></div>
          <div className="absolute inset-0 bg-background md:w-1/2 flex items-center p-8 md:p-16 lg:p-24 z-10">
            <div className="space-y-6 max-w-xl">
              <div className="inline-block bg-accent px-4 py-2 border-2 border-foreground neo-shadow -rotate-2 mb-4">
                <span className="font-display font-bold text-foreground uppercase tracking-widest">Miami's Coolest Deck</span>
              </div>
              <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground">
                SIP ART.<br />
                <span className="text-primary text-stroke">STAY COOL.</span>
              </h1>
              <p className="font-sans text-xl md:text-2xl font-medium text-muted-foreground max-w-md">
                Fuel your imagination at <span className="font-bold text-secondary">@bluecafe.miami</span>. 
                Coffee, vibes, and the famous #BlueLemonade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-auto">
                  <Link href="/menu">
                    <Button className="w-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground border-2 border-foreground neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-none">
                      Order & Pay Online
                    </Button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-secondary rounded-full border-2 border-foreground animate-bounce hidden md:block"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-4 border-accent rotate-12 hidden md:block animate-bounce"></div>
        </section>

        {/* Marquee */}
        <div className="bg-secondary py-4 border-b-4 border-foreground overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="font-display font-bold text-2xl text-white mx-8 flex items-center gap-4">
                ART • COFFEE • GOOD VIBES <Star className="fill-accent text-accent h-6 w-6" />
              </span>
            ))}
          </div>
        </div>

        {/* Featured Products Grid */}
        <section className="py-20 container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display font-black text-5xl md:text-6xl uppercase">
              Taste the <span className="text-secondary">Color</span>
            </h2>
            <p className="font-sans text-xl max-w-2xl mx-auto">
              Not just food and drinks, but edible art. Designed to look as good as it tastes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link href="/menu" className="group relative bg-card border-2 border-foreground neo-shadow hover:-translate-y-2 transition-transform duration-300 block">
              <div className="aspect-square overflow-hidden border-b-2 border-foreground bg-blue-100">
                <img src="/images/hero-blue-lemonade-brand-nails.jpg" alt="Blue Lemonade" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-bold text-2xl">Blue Lemonade</h3>
                  <span className="bg-primary text-white px-2 py-1 font-bold text-sm border border-foreground rotate-3">ICONIC</span>
                </div>
                <p className="font-sans text-muted-foreground">The legend itself. Refreshing, electric, and the perfect fuel for your art adventure.</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/menu" className="group relative bg-card border-2 border-foreground neo-shadow hover:-translate-y-2 transition-transform duration-300 block">
              <div className="aspect-square overflow-hidden border-b-2 border-foreground bg-pink-100">
                <img src="/images/empanadas-pop.jpg" alt="Empanadas" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-bold text-2xl">Empanadas</h3>
                  <span className="bg-accent text-foreground px-2 py-1 font-bold text-sm border border-foreground -rotate-2">MUST TRY</span>
                </div>
                <p className="font-sans text-muted-foreground">Crunchy on the outside, juicy on the inside. The secret best-seller you need to try.</p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/menu" className="group relative bg-card border-2 border-foreground neo-shadow hover:-translate-y-2 transition-transform duration-300 block">
              <div className="aspect-square overflow-hidden border-b-2 border-foreground bg-yellow-100">
                <img src="/images/coffee-art.jpg" alt="Artisan Coffee" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-bold text-2xl">Artisan Coffee</h3>
                  <span className="bg-secondary text-white px-2 py-1 font-bold text-sm border border-foreground rotate-1">PREMIUM</span>
                </div>
                <p className="font-sans text-muted-foreground">Barista-crafted coffee to wake up your senses. Perfect latte art for your feed.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 bg-primary border-y-4 border-foreground text-primary-foreground overflow-hidden">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="font-display font-black text-5xl md:text-7xl leading-none">
                MORE THAN<br />JUST A CAFE
              </h2>
              <p className="font-sans text-xl md:text-2xl font-medium opacity-90">
                We are the starting point of your journey into the unknown. Located right outside Superblue, we bridge the gap between flavor and immersive art.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-background text-foreground p-6 border-2 border-foreground neo-shadow rotate-1">
                  <Camera className="h-8 w-8 text-secondary mb-4" />
                  <h4 className="font-display font-bold text-xl mb-2">Insta-Ready</h4>
                  <p className="text-sm">Every corner is a photo op. From our colorful murals to the food itself.</p>
                </div>
                <div className="bg-background text-foreground p-6 border-2 border-foreground neo-shadow -rotate-1">
                  <Music className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-display font-bold text-xl mb-2">Good Vibes</h4>
                  <p className="text-sm">Curated playlists and a lively deck atmosphere perfect for hanging out.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent translate-x-4 translate-y-4 border-2 border-foreground"></div>
              <img src="/images/deck-filtered.jpg" alt="Blue Cafe Deck" className="relative z-10 w-full border-2 border-foreground hover:scale-[1.02] transition-all duration-500" />
              
              {/* Floating Sticker */}
              <div className="absolute -top-10 -right-10 bg-secondary text-white w-32 h-32 rounded-full flex items-center justify-center border-2 border-foreground animate-spin-slow z-20 hidden md:flex">
                <span className="font-display font-bold text-center leading-tight">OPEN<br/>EVERY DAY</span>
              </div>
            </div>
          </div>
        </section>

        {/* Wine & Beer Fun Section */}
        <section className="py-24 container relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-secondary translate-x-4 translate-y-4 border-2 border-foreground rounded-none"></div>
              <div className="relative border-2 border-foreground neo-shadow overflow-hidden bg-white">
                <img 
                  src="/images/wine-deck-chic.png" 
                  alt="Friends enjoying wine on the deck" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-accent text-foreground px-4 py-2 border-2 border-foreground font-bold font-display rotate-[-6deg] shadow-lg z-20">
                SUNSET VIBES
              </div>
              <div className="absolute -bottom-8 -right-8 text-primary animate-bounce-slow z-20">
                <Music className="h-16 w-16 drop-shadow-lg" />
              </div>
            </div>

            {/* Text Side */}
            <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-block bg-pink-200 px-6 py-2 border-2 border-foreground rounded-full mb-4">
                <span className="font-display font-bold text-foreground tracking-widest uppercase">After Art Vibes</span>
              </div>
              
              <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9]">
                GRAB A <span className="text-secondary text-stroke-sm">BUCKET.</span><br/>
                FEEL THE <span className="text-accent">BEAT.</span>
              </h2>
              
              <p className="font-sans text-xl md:text-2xl font-medium text-muted-foreground">
                Wine, beer, and the best playlist in Miami. The perfect spot to unwind with friends after the museum. 
                <br/><br/>
                <span className="font-bold text-foreground">Ask for our Wine Bucket Special!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/menu">
                  <Button className="h-14 px-8 text-lg font-bold bg-foreground text-background border-2 border-foreground hover:bg-foreground/90 hover:scale-105 transition-all rounded-none w-full sm:w-auto">
                    Order Drinks
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Feed Placeholder */}
        <section className="py-20 border-t-4 border-foreground bg-accent/20">
          <div className="container text-center space-y-12">
            <div className="space-y-4">
              <h2 className="font-display font-black text-4xl md:text-5xl">
                FOLLOW THE <span className="text-primary">VIBE</span>
              </h2>
              <a href="https://instagram.com/bluecafe.miami" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" /> @bluecafe.miami
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: "/images/insta-neon.jpg", alt: "Art Coffee & Good Vibes Neon Sign" },
                { src: "/images/insta-hand.jpg", alt: "62 Problems Hand Gesture" },
                { src: "/images/insta-lemonade.jpg", alt: "Blue Lemonade on Colorful Table" },
                { src: "/images/insta-entrance.jpg", alt: "Blue Cafe Entrance Art Basel" }
              ].map((item, i) => (
                <Link key={i} href="https://instagram.com/bluecafe.miami" className="group relative aspect-square bg-white border-2 border-foreground neo-shadow overflow-hidden block">
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                  </div>
                </Link>
              ))}
            </div>
            
            <Button className="bg-secondary text-white border-2 border-foreground neo-shadow font-bold px-8">
              View More on Instagram
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
