import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  BookOpenText,
  Boxes,
  CalendarClock,
  ClipboardList,
  BarChart3,
  Settings as SettingsIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/recipe-management', label: 'Recipes', icon: BookOpenText },
  { path: '/inventory-tracking', label: 'Inventory', icon: Boxes },
  { path: '/baking-schedules', label: 'Schedules', icon: CalendarClock },
  { path: '/order-fulfillment', label: 'Orders', icon: ClipboardList },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

const settingsNavItem: NavItem = { path: '/settings', label: 'Settings', icon: SettingsIcon };

const CollapsibleSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log('CollapsibleSidebar loaded');
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navLinkClasses = (isActive: boolean) =>
    clsx(
      'flex items-center py-2.5 px-3 my-0.5 rounded-lg text-sm transition-all duration-200 ease-in-out group',
      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground',
      isExpanded ? 'justify-start' : 'justify-center'
    );

  const iconClasses = clsx(
    'h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out',
    isExpanded ? 'mr-3' : 'mx-auto',
    'group-hover:scale-110'
  );

  const labelClasses = clsx(
    'whitespace-nowrap transition-all duration-200 ease-in-out overflow-hidden font-medium',
    isExpanded ? 'opacity-100 ml-0 w-auto' : 'opacity-0 ml-0 w-0'
  );

  const renderNavItem = (item: NavItem, key: string | number) => {
    const isActive = location.pathname === item.path;
    return (
      <Tooltip key={key} delayDuration={0}>
        <TooltipTrigger asChild>
          <NavLink
            to={item.path}
            className={() => navLinkClasses(isActive)}
            aria-label={item.label}
          >
            <item.icon className={iconClasses} aria-hidden="true" />
            <span className={labelClasses}>{item.label}</span>
          </NavLink>
        </TooltipTrigger>
        {!isExpanded && (
          <TooltipContent side="right" sideOffset={8} className="bg-popover text-popover-foreground">
            <p>{item.label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    );
  };

  return (
    <aside
      className={clsx(
        'flex flex-col h-screen bg-card text-card-foreground border-r border-border transition-all duration-300 ease-in-out',
        isExpanded ? 'w-60' : 'w-[72px]' // Slightly adjusted widths
      )}
    >
      <div
        className={clsx(
          'flex items-center h-16 border-b border-border px-4 shrink-0',
          isExpanded ? 'justify-between' : 'justify-center'
        )}
      >
        {isExpanded && (
          <NavLink to="/" className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm">
            <h1 className="text-xl font-semibold tracking-tight whitespace-nowrap transition-opacity duration-300 ease-in-out">
              Bakery Dash
            </h1>
          </NavLink>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          className="rounded-full data-[state=open]:bg-accent data-[state=closed]:bg-transparent"
        >
          {isExpanded ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-grow p-2 space-y-0.5 overflow-y-auto">
        {mainNavItems.map((item, index) => renderNavItem(item, `main-${index}`))}
      </nav>

      <div className="p-2 border-t border-border shrink-0">
        {renderNavItem(settingsNavItem, 'settings')}
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;