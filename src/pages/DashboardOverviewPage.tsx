import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import MetricWidget from '@/components/MetricWidget';

// Shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Recharts for Chart
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// Lucide Icons
import { CalendarClock, Boxes, ClipboardList, BookOpenText, BarChart3 } from 'lucide-react';

// Placeholder data for the chart
const bakingActivityData = [
  { day: 'Mon', itemsBaked: 35, itemsPlanned: 40 },
  { day: 'Tue', itemsBaked: 42, itemsPlanned: 45 },
  { day: 'Wed', itemsBaked: 30, itemsPlanned: 30 },
  { day: 'Thu', itemsBaked: 50, itemsPlanned: 50 },
  { day: 'Fri', itemsBaked: 45, itemsPlanned: 55 },
  { day: 'Sat', itemsBaked: 60, itemsPlanned: 60 },
  { day: 'Sun', itemsBaked: 25, itemsPlanned: 20 },
];

const DashboardOverviewPage: React.FC = () => {
  console.log('DashboardOverviewPage loaded');

  return (
    <div className="flex flex-col h-screen bg-amber-50/30 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden">
      <Header bakeryName="The Flourishing Crumb" userName="Chef Patissier" userInitials="CP" />
      
      <div className="flex flex-1 overflow-hidden"> {/* Container for Sidebar and Main Content + Footer */}
        <CollapsibleSidebar />
        
        <div className="flex-1 flex flex-col overflow-y-hidden"> {/* Container for Scrollable Main and Fixed Footer */}
          <ScrollArea className="flex-grow">
            <main className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
              {/* Page Title/Greeting */}
              <section>
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400">
                  Welcome Back, Chef!
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">
                  Here's your bakery's overview for today.
                </p>
              </section>

              {/* Metric Widgets Section */}
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                <MetricWidget
                  title="Upcoming Bakes"
                  value="5"
                  icon={<CalendarClock className="h-5 w-5" />}
                  navigateTo="/baking-schedules" // Path from App.tsx
                  description="Scheduled for today"
                  className="hover:shadow-amber-200/50 dark:hover:shadow-amber-800/50"
                />
                <MetricWidget
                  title="Low Inventory Items"
                  value="3"
                  icon={<Boxes className="h-5 w-5" />}
                  navigateTo="/inventory-tracking" // Path from App.tsx
                  description="Needs reordering soon"
                  className="hover:shadow-amber-200/50 dark:hover:shadow-amber-800/50"
                />
                <MetricWidget
                  title="Pending Orders"
                  value="12"
                  icon={<ClipboardList className="h-5 w-5" />}
                  navigateTo="/order-fulfillment" // Path from App.tsx
                  description="Ready for processing"
                  className="hover:shadow-amber-200/50 dark:hover:shadow-amber-800/50"
                />
              </section>

              {/* Charts & Other Info Section */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <Card className="lg:col-span-2 bg-white dark:bg-slate-800/50 shadow-md border-amber-100 dark:border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-amber-800 dark:text-amber-300">Recent Baking Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[280px] sm:h-[320px] lg:h-[350px] p-2 sm:p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bakingActivityData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '0.5rem',
                          }}
                          labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '14px' }} />
                        <Bar dataKey="itemsBaked" name="Baked" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="itemsPlanned" name="Planned" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-slate-800/50 shadow-md border-amber-100 dark:border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-amber-800 dark:text-amber-300">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white">
                      <Link to="/recipe-management">
                        <BookOpenText className="mr-2 h-4 w-4" /> Manage Recipes
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-900/50 dark:hover:text-amber-300">
                      <Link to="/analytics">
                        <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
                      </Link>
                    </Button>
                     <Button asChild variant="outline" className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-900/50 dark:hover:text-amber-300">
                      <Link to="/baking-schedules">
                        <CalendarClock className="mr-2 h-4 w-4" /> View Schedules
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </section>
            </main>
          </ScrollArea>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;