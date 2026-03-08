import { motion } from "framer-motion";
import nasoLogo from "@/assets/naso-logo.png";

/**
 * Home page shell — Sprint 0.
 * Shows the brand identity and confirms the design system is working.
 * No marketing content — just a branded landing.
 */
const HomePage = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 text-center"
      >
        <img src={nasoLogo} alt="NASO" className="h-28 w-auto md:h-36" />

        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
          Creative experiences
          <br />
          <span className="text-primary">from Cairo.</span>
        </h1>

        <p className="max-w-md text-lg text-muted-foreground">
          Outings · Workshops · Events · Products
        </p>

        {/* Brand color palette strip — visual confirmation of design tokens */}
        <div className="flex gap-2 pt-4">
          {[
            "bg-foreground",
            "bg-primary",
            "bg-secondary",
            "bg-accent",
            "bg-naso-lilac",
          ].map((color) => (
            <div
              key={color}
              className={`h-3 w-12 rounded-full ${color}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
