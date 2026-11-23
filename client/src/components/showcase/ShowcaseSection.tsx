import React from "react";

interface ShowcaseSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ShowcaseSection({
  id,
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-white/10 pb-16 mb-16 last:border-0">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
          Component
        </p>
        <h2 className="tk-din-condensed text-3xl md:text-4xl uppercase text-white leading-none">
          {title}
        </h2>
        {description && (
          <p className="publicSans-text mt-3 text-sm text-white/60 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="w-full">{children}</div>
    </section>
  );
}
