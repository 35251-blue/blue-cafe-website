import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Menu() {
  // Consolidated all items into a single list
  const menuItems = [
    {
      name: "Blue Lemonade",
      price: "$9.00",
      description: "Our famous frozen lemonade. Icy, refreshing, and electric blue.",
      image: "/images/hero-blue-lemonade-brand-nails.jpg",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    },
    {
      name: "Empanadas",
      price: "$8.00",
      description: "Golden, crispy pastry filled with your choice of seasoned Beef, tender Chicken, or gooey Cheese.",
      image: "/images/empanadas-trio-enhanced.jpg",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    },
    {
      name: "Cuban Sandwich",
      price: "$18.00",
      description: "The Miami classic. Ham, roasted pork, swiss cheese, pickles, and mustard.",
      image: "/images/cuban-sandwich-enhanced.jpg",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    },
    {
      name: "Strawberry Matcha Latte",
      price: "$9.00",
      description: "Made with fresh strawberries and premium matcha. A beautiful layered drink with red strawberry puree, creamy milk, and green matcha.",
      image: "/images/strawberry_matcha_branded.png",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    },
    {
      name: "Iced Latte",
      price: "$8.00",
      description: "Our signature frozen blended latte. Creamy, icy, and perfect for a hot Miami day.",
      image: "/images/frozen-latte-custom-cup.jpg",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    },
    {
      name: "Cappuccino",
      price: "$8.00",
      description: "Perfectly frothed milk over our signature espresso blend.",
      image: "/images/cappuccino_processed.png",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    },
    {
      name: "Cherry Burrata Salad",
      price: "$18.00",
      description: "A fluffy cloud of burrata landing on a bed of peppery arugula, juicy cherry tomatoes, and a glossy balsamic drizzle. Fresh, creamy, and so good...!!",
      image: "/images/burrata_salad_new.png",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    },
    {
      name: "Croque Monsieur Croissant",
      price: "$16.00",
      description: "A buttery croissant stuffed with savory ham, melted cheese, and a perfectly cooked egg inside. Flaky, golden, and satisfyingly rich.",
      image: "/images/croque-monsieur-clean.png",
      link: "https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      
      <div className="pt-12 pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
            Our <span className="text-stroke">Menu</span>
          </h1>
          <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground font-medium">
            Curated flavors for the art-obsessed. <span className="text-primary font-bold">Order here, pick up at the counter.</span>
          </p>
        </div>

        {/* Single "Best Sellers" Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <h2 className="font-display font-bold text-3xl md:text-4xl bg-accent inline-block px-6 py-2 border-2 border-foreground neo-shadow -rotate-1">
              Best Sellers
            </h2>
            <div className="h-1 flex-grow bg-foreground opacity-20 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div key={index} className="group bg-card border-2 border-foreground neo-shadow hover:-translate-y-1 transition-transform duration-200 flex flex-row md:flex-col h-full overflow-hidden">
                {/* Image Container */}
                <div className="w-1/3 md:w-full aspect-square md:aspect-video overflow-hidden border-r-2 md:border-r-0 md:border-b-2 border-foreground relative shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-secondary text-white font-bold px-2 py-0.5 text-sm border-2 border-foreground neo-shadow hidden md:block">
                    {item.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-display font-bold text-xl leading-tight">{item.name}</h3>
                      <span className="font-bold text-lg md:hidden">{item.price}</span>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-snug line-clamp-2 md:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-3 md:mt-4">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button size="sm" className="w-full font-bold border-2 border-foreground bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all rounded-none group-hover:bg-primary h-9">
                        Add to Order <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-secondary text-white p-8 border-2 border-foreground neo-shadow relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="font-display font-black text-3xl md:text-5xl leading-none">
              HUNGRY FOR MORE?
            </h2>
            <p className="font-sans text-lg font-medium max-w-xl mx-auto opacity-90">
              Check out our full selection on Toast, including seasonal specials and bakery items.
            </p>
            <a 
              href="https://order.toasttab.com/online/blue-cafe-1101-nw-23rd-st" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="bg-white text-foreground border-2 border-foreground hover:bg-gray-100 text-lg px-6 py-4 rounded-none neo-shadow h-auto">
                View Full Menu <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
          
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '15px 15px'}}>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
