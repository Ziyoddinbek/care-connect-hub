import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ title, value, change, icon: Icon, iconColor = 'text-primary' }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg animate-scale-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">{value.toLocaleString()}</p>
        </div>
        <div className={cn('rounded-lg bg-primary/10 p-3', iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-success" />
        ) : (
          <TrendingDown className="h-4 w-4 text-destructive" />
        )}
        <span className={cn('text-sm font-medium', isPositive ? 'text-success' : 'text-destructive')}>
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-muted-foreground">from last month</span>
      </div>
    </div>
  );
}
