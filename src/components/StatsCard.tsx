import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  period?: string;
  iconColor?: string;
}

const StatsCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  changeType, 
  period,
  iconColor = 'hsl(var(--primary))'
}: StatsCardProps) => {
  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
            {change && (
              <span className={`text-sm font-semibold ${
                changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {changeType === 'positive' ? '+' : '-'}{change}
              </span>
            )}
          </div>
          {period && (
            <p className="text-xs text-muted-foreground">vs last {period.toLowerCase()}</p>
          )}
        </div>
        <div 
          className="p-3 rounded-lg bg-secondary/50"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={24} style={{ color: iconColor }} />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
