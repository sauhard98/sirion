import React from 'react';
import { cn } from '@/lib/utils';

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-sirion-primary text-white hover:bg-sirion-primary-dark focus:ring-sirion-primary shadow-md hover:shadow-lg',
    secondary: 'bg-sirion-blue text-white hover:bg-sirion-blue-dark focus:ring-sirion-blue shadow-md hover:shadow-lg',
    outline: 'border-2 border-sirion-primary text-sirion-primary hover:bg-sirion-primary hover:text-white focus:ring-sirion-primary',
    ghost: 'text-sirion-primary hover:bg-sirion-primary/10 focus:ring-sirion-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = ({ hover = false, className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-neutral-200 shadow-md',
        hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  value: string;
  label: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'blue' | 'purple' | 'success';
}

export const StatCard = ({
  value,
  label,
  trend,
  trendValue,
  icon,
  color = 'primary'
}: StatCardProps) => {
  const colorClasses = {
    primary: 'text-sirion-primary bg-sirion-primary/10',
    blue: 'text-sirion-blue bg-sirion-blue/10',
    purple: 'text-sirion-purple bg-sirion-purple/10',
    success: 'text-sirion-success bg-sirion-success/10',
  };

  return (
    <Card hover className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body-sm text-neutral-600 mb-2">{label}</p>
          <h3 className="text-display-md font-bold text-neutral-900">{value}</h3>
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                'text-body-sm font-medium',
                trend === 'up' ? 'text-sirion-success' : 'text-red-500'
              )}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn('p-3 rounded-lg', colorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

// Badge Component
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    primary: 'bg-sirion-primary/10 text-sirion-primary',
    success: 'bg-sirion-success/10 text-sirion-success-dark',
    warning: 'bg-accent-amber/10 text-accent-amber',
    error: 'bg-red-500/10 text-red-700',
    neutral: 'bg-neutral-200 text-neutral-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Section Component
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'gradient';
}

export const Section = ({
  children,
  className,
  background = 'white',
  ...props
}: SectionProps) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-background-secondary',
    gradient: 'bg-gradient-mesh',
  };

  return (
    <section
      className={cn('py-16 md:py-24', backgrounds[background], className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

// Heading Component
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  gradient?: boolean;
  className?: string;
}

export const Heading = ({
  level = 1,
  children,
  className,
  gradient = false,
}: HeadingProps) => {
  const sizes = {
    1: 'text-display-lg md:text-display-xl',
    2: 'text-display-md md:text-display-lg',
    3: 'text-display-sm md:text-display-md',
    4: 'text-2xl md:text-3xl',
    5: 'text-xl md:text-2xl',
    6: 'text-lg md:text-xl',
  };

  const headingClass = cn(
    'font-bold',
    sizes[level],
    gradient && 'bg-gradient-primary bg-clip-text text-transparent',
    className
  );

  switch (level) {
    case 1:
      return <h1 className={headingClass}>{children}</h1>;
    case 2:
      return <h2 className={headingClass}>{children}</h2>;
    case 3:
      return <h3 className={headingClass}>{children}</h3>;
    case 4:
      return <h4 className={headingClass}>{children}</h4>;
    case 5:
      return <h5 className={headingClass}>{children}</h5>;
    case 6:
      return <h6 className={headingClass}>{children}</h6>;
    default:
      return <h1 className={headingClass}>{children}</h1>;
  }
};

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-sm font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 rounded-lg border border-neutral-300',
            'focus:outline-none focus:ring-2 focus:ring-sirion-primary focus:border-transparent',
            'transition-all duration-200',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-body-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  stat,
  statLabel
}: FeatureCardProps) => {
  return (
    <Card hover className="p-8">
      <div className="flex flex-col items-start gap-4">
        <div className="p-3 rounded-xl bg-gradient-primary">
          <div className="text-white text-2xl">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
        <p className="text-body-lg text-neutral-600">{description}</p>
        {stat && statLabel && (
          <div className="mt-4 pt-4 border-t border-neutral-200 w-full">
            <div className="text-display-sm font-bold text-sirion-primary">{stat}</div>
            <div className="text-body-sm text-neutral-600">{statLabel}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TestimonialCard = ({
  quote,
  author,
  role,
  company
}: TestimonialCardProps) => {
  return (
    <Card className="p-8 h-full">
      <div className="flex flex-col h-full">
        <div className="text-sirion-primary text-4xl mb-4">&ldquo;</div>
        <p className="text-body-lg text-neutral-700 mb-6 flex-grow">{quote}</p>
        <div className="border-t border-neutral-200 pt-4">
          <p className="font-semibold text-neutral-900">{author}</p>
          <p className="text-body-sm text-neutral-600">{role}</p>
          <p className="text-body-sm text-sirion-primary font-medium">{company}</p>
        </div>
      </div>
    </Card>
  );
};

// CTA Banner Component
interface CTABannerProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonAction: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
}

export const CTABanner = ({
  title,
  description,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
}: CTABannerProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-12 text-white">
      <div className="relative z-10">
        <h2 className="text-display-md font-bold mb-4">{title}</h2>
        <p className="text-body-xl mb-8 max-w-2xl opacity-90">{description}</p>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={primaryButtonAction}
            className="bg-white text-sirion-primary hover:bg-neutral-100"
          >
            {primaryButtonText}
          </Button>
          {secondaryButtonText && secondaryButtonAction && (
            <Button
              onClick={secondaryButtonAction}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
    </div>
  );
};
