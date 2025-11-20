import React from 'react';
import { Button } from '@/components/ui/sirion-components';

interface HeroProps {
  title: string;
  description: string;
  primaryCTA?: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
  image?: React.ReactNode;
  stats?: {
    value: string;
    label: string;
  }[];
}

export const Hero = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  image,
  stats = [],
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-mesh min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-white/50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-display-xl font-bold text-neutral-900">
              {title}
            </h1>
            <p className="text-body-xl text-neutral-700 max-w-2xl">
              {description}
            </p>

            {/* CTAs */}
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-wrap gap-4">
                {primaryCTA && (
                  <Button size="xl" onClick={primaryCTA.action}>
                    {primaryCTA.text}
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={secondaryCTA.action}
                  >
                    {secondaryCTA.text}
                  </Button>
                )}
              </div>
            )}

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-neutral-300">
                {stats.map((stat, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-display-sm font-bold text-sirion-primary">
                      {stat.value}
                    </div>
                    <div className="text-body-sm text-neutral-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image/Visual */}
          {image && (
            <div className="animate-fade-in-up lg:animate-slide-in-left">
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
