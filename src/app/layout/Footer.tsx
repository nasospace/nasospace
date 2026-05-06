import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";
import { Sparkle, FlowerShape } from "@/components/shared/RetroElements";

export function Footer() {
  const year = new Date().getFullYear();

  const footerNav = [
    { label: "Manifesto", href: ROUTES.ABOUT },
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Portfolio", href: ROUTES.PORTFOLIO },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Shop", href: ROUTES.SHOP },
    { label: "Community Love", href: ROUTES.COMMUNITY_LOVE },
    { label: "FAQ", href: ROUTES.FAQ },
    { label: "Contact", href: ROUTES.CONTACT },
  ];

  return (
    <footer className="relative border-t-2 border-white/5 bg-foreground text-background">
      <div className="absolute inset-0 naso-noise opacity-20 pointer-events-none" />
      
      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Brand Vision */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <img
              src={nasoLogo}
              alt="NASO"
              className="h-12 w-auto mb-10"
            />
            <h3 className="font-groovy text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Not just a weekend.<br />
              <span className="text-secondary italic">A movement.</span>
            </h3>
            <p className="text-white/40 font-medium text-lg max-w-sm leading-relaxed mb-10">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation & Culture */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:pl-10">
            {/* Explore Column */}
            <div className="flex flex-col gap-8">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                Explore
              </h4>
              <ul className="flex flex-col gap-4">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="font-groovy text-lg font-bold text-white/60 transition-all hover:text-white hover:pl-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Connect Column */}
            <div className="flex flex-col gap-8">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                Connect
              </h4>
              <ul className="flex flex-col gap-4 mb-8">
                {Object.entries(siteConfig.social).map(([platform, url]) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-groovy text-lg font-bold text-white/60 transition-all hover:text-primary hover:pl-2 capitalize"
                    >
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="pt-8 border-t border-white/5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/20 mb-3 block">Collaborations</span>
                <a 
                  href="mailto:nasoevents22@gmail.com" 
                  className="font-groovy font-bold text-white/80 hover:text-secondary transition-colors break-all text-sm md:text-base"
                >
                  nasoevents22@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-28 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <p className="font-mono text-[9px] font-bold text-white/20 uppercase tracking-widest">
              © {year} NASO SPACE — ALL RIGHTS RESERVED
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="font-mono text-[9px] font-bold text-white/10 hover:text-white/40 uppercase tracking-widest transition-colors">Privacy</Link>
              <Link to="/terms" className="font-mono text-[9px] font-bold text-white/10 hover:text-white/40 uppercase tracking-widest transition-colors">Terms</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4 group cursor-default">
            <span className="font-mono text-[9px] font-bold text-white/40 uppercase tracking-[0.25em] group-hover:text-primary transition-colors">THE 100 CHAPTERS MOVEMENT</span>
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse group-hover:bg-primary" />
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute -top-32 -left-32 opacity-[0.02] pointer-events-none">
        <FlowerShape size={400} className="text-white" />
      </div>
    </footer>
  );
}
