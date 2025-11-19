import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  time: string;
  title: string;
}

interface CalendarWidgetProps {
  events: Event[];
}

const CalendarWidget = ({ events }: CalendarWidgetProps) => {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    weekday: 'short' 
  });

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Calendar</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <span className="text-lg font-semibold text-foreground">{dateString}</span>
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-md">
            TODAY
          </span>
        </div>

        <div className="space-y-2">
          {events.map((event, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground min-w-[50px]">
                {event.time}
              </span>
              <span className="text-sm text-foreground">{event.title}</span>
            </div>
          ))}
        </div>

        <a 
          href="#" 
          className="inline-block text-sm text-primary hover:text-primary/80 transition-colors mt-4"
        >
          See full calendar →
        </a>
      </div>
    </Card>
  );
};

export default CalendarWidget;
