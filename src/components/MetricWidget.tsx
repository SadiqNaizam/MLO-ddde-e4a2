import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assumed to exist from shadcn/ui setup

interface MetricWidgetProps {
  title: string;
  value: string;
  icon?: React.ReactElement; // Example: <UsersIcon className="h-4 w-4" />
  description?: string;       // Example: "+20% from last month"
  navigateTo?: string;        // Example: "/inventory-tracking". If provided, the whole card becomes a link.
  className?: string;         // For additional styling on the root element (Link or Card)
}

const MetricWidget: React.FC<MetricWidgetProps> = ({
  title,
  value,
  icon,
  description,
  navigateTo,
  className,
}) => {
  console.log(`MetricWidget loaded for: ${title}`);

  const cardInnerElements = (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && React.cloneElement(icon, { className: cn("h-4 w-4 text-muted-foreground", icon.props.className) })}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl md:text-3xl font-bold text-card-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
      </CardContent>
    </>
  );

  // Base classes for the Card component itself.
  // These are applied whether the Card is standalone or wrapped in a Link.
  const cardComponentBaseClasses = cn(
    "bg-card text-card-foreground w-full h-full flex flex-col transition-all duration-300 ease-in-out border border-transparent"
  );

  if (navigateTo) {
    return (
      <Link
        to={navigateTo}
        className={cn(
          "block rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className // className from props applies to the Link (which is the root element)
        )}
        aria-label={`View details for ${title}`}
      >
        <Card className={cn(cardComponentBaseClasses, "group-hover:shadow-lg group-hover:border-primary/70")}>
          {cardInnerElements}
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cn(
        cardComponentBaseClasses, 
        "hover:shadow-lg hover:border-primary/70 rounded-lg", // standalone Card gets hover effects and rounding directly
        className // className from props applies to the Card (which is the root element)
    )}>
      {cardInnerElements}
    </Card>
  );
};

export default MetricWidget;