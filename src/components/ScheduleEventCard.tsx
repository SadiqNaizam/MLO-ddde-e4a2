import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Hourglass, Timer, Zap, CheckCircle2, AlertOctagon } from 'lucide-react';

export type ScheduleStatus = "Pending" | "In Progress" | "Completed" | "Delayed";

interface ScheduleEventCardProps {
  id?: string | number;
  recipeName: string;
  scheduledTime: string; // e.g., "10:00 AM - July 28" or "Tomorrow at 2:00 PM"
  duration: string;    // e.g., "2 hours 30 minutes" or "45 mins"
  status: ScheduleStatus;
}

const ScheduleEventCard: React.FC<ScheduleEventCardProps> = ({
  recipeName,
  scheduledTime,
  duration,
  status,
}) => {
  console.log(`ScheduleEventCard loaded for recipe: ${recipeName}, Status: ${status}`);

  const getStatusAttributes = (currentStatus: ScheduleStatus) => {
    switch (currentStatus) {
      case "Pending":
        return {
          variant: "secondary" as const,
          icon: <Timer className="mr-1.5 h-3.5 w-3.5" />,
          className: "", // Uses default text color of secondary badge
        };
      case "In Progress":
        return {
          variant: "default" as const, // Uses primary theme color for badge background
          icon: <Zap className="mr-1.5 h-3.5 w-3.5" />,
          className: "", // Uses default text color of default badge
        };
      case "Completed":
        return {
          variant: "outline" as const,
          icon: <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-600 dark:text-green-500" />,
          // Apply text and border color for completed status to the badge itself
          className: "text-green-600 border-green-600 dark:text-green-500 dark:border-green-500",
        };
      case "Delayed":
        return {
          variant: "destructive" as const,
          icon: <AlertOctagon className="mr-1.5 h-3.5 w-3.5" />,
          className: "", // Destructive variant handles its own text/icon color
        };
      // TypeScript ensures all cases of ScheduleStatus are handled, so no default is strictly necessary.
      // However, to be safe in a JavaScript context or if the type widens:
      // default:
      //   return { variant: "secondary" as const, icon: <HelpCircle className="mr-1.5 h-3.5 w-3.5" />, className: "" };
    }
  };

  const statusAttributes = getStatusAttributes(status);

  return (
    <Card className="w-full shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base sm:text-lg font-medium leading-tight">
            {recipeName}
          </CardTitle>
          <Badge 
            variant={statusAttributes.variant} 
            className={`capitalize whitespace-nowrap text-xs sm:text-sm py-1 px-2 ${statusAttributes.className}`}
          >
            {statusAttributes.icon}
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-0 pb-4 px-4">
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate" title={scheduledTime}>{scheduledTime}</span>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
          <Hourglass className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate" title={duration}>{duration}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleEventCard;