import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils'; // Assumed from shadcn/ui setup
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CalendarIcon, ArrowRightLeft, TrendingUp, PieChartIcon as LucidePieChartIcon, ShoppingBasket } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

// Sample Data for Charts
const salesTrendData = [
  { date: 'Jan', sales: 1200, expenses: 800 },
  { date: 'Feb', sales: 1500, expenses: 900 },
  { date: 'Mar', sales: 1800, expenses: 1000 },
  { date: 'Apr', sales: 1600, expenses: 1100 },
  { date: 'May', sales: 2000, expenses: 1200 },
  { date: 'Jun', sales: 2200, expenses: 1300 },
];

const topProductsData = [
  { product: 'Sourdough Loaf', sold: 350, revenue: 2800 },
  { product: 'Croissants (Box of 6)', sold: 280, revenue: 3360 },
  { product: 'Bagels (Dozen)', sold: 200, revenue: 1800 },
  { product: 'Cupcakes (Assorted)', sold: 450, revenue: 1575 },
  { product: 'Artisan Breadsticks', sold: 150, revenue: 750 },
];

const ingredientUsageData = [
  { name: 'Flour (Organic)', value: 400, unit: 'kg' },
  { name: 'Sugar (Cane)', value: 150, unit: 'kg' },
  { name: 'Butter (Unsalted)', value: 100, unit: 'kg' },
  { name: 'Yeast (Active Dry)', value: 20, unit: 'kg' },
  { name: 'Chocolate Chips', value: 50, unit: 'kg' },
];
const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE'];


const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });
  const [reportType, setReportType] = useState<string>('sales_overview');

  useEffect(() => {
    console.log('AnalyticsPage loaded');
    // Fetch data based on dateRange and reportType here
    console.log('Selected Date Range:', dateRange);
    console.log('Selected Report Type:', reportType);
  }, [dateRange, reportType]);

  return (
    <div className="flex flex-col h-screen bg-amber-50/20 dark:bg-slate-900/50">
      <Header bakeryName="Artisan Bakery Analytics" userName="Admin Baker" userInitials="AB" />
      <div className="flex flex-1 overflow-hidden">
        <CollapsibleSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-300">Bakery Analytics</h1>
              <p className="text-muted-foreground">
                Insights into your bakery's performance.
              </p>
            </div>

            {/* Filters Section */}
            <Card className="mb-6 bg-white dark:bg-slate-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-amber-700 dark:text-amber-400">Filters</CardTitle>
                <CardDescription>Adjust the parameters for your reports.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-auto">
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Select Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales_overview">Sales Overview</SelectItem>
                      <SelectItem value="product_performance">Product Performance</SelectItem>
                      <SelectItem value="ingredient_consumption">Ingredient Consumption</SelectItem>
                      <SelectItem value="baking_efficiency">Baking Efficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className={cn("grid gap-2 w-full sm:w-auto")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full sm:w-[300px] justify-start text-left font-normal",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sales Trend Chart */}
              <Card className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
                    <TrendingUp className="mr-2 h-5 w-5" /> Sales & Expenses Trend
                  </CardTitle>
                  <CardDescription>Monthly sales and expenses over the selected period.</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesTrendData}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(2px)',
                          borderRadius: '0.5rem',
                          borderColor: '#F59E0B' // amber-500
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#F59E0B" strokeWidth={2} activeDot={{ r: 6 }} name="Sales" />
                      <Line type="monotone" dataKey="expenses" stroke="#64748B" strokeWidth={2} activeDot={{ r: 6 }} name="Expenses" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Selling Products Chart */}
              <Card className="bg-white dark:bg-slate-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
                     <ShoppingBasket className="mr-2 h-5 w-5" /> Top Selling Products
                  </CardTitle>
                  <CardDescription>Performance of your most popular items.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProductsData} layout="vertical" margin={{ left: 30, right:10 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis type="number" />
                      <YAxis dataKey="product" type="category" width={120} tick={{ fontSize: 12 }} />
                      <Tooltip
                         contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(2px)',
                          borderRadius: '0.5rem',
                          borderColor: '#10B981' // emerald-500
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sold" fill="#10B981" name="Units Sold" />
                      <Bar dataKey="revenue" fill="#F59E0B" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Ingredient Usage Summary Chart */}
              <Card className="bg-white dark:bg-slate-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
                    <LucidePieChartIcon className="mr-2 h-5 w-5" /> Ingredient Usage
                  </CardTitle>
                  <CardDescription>Breakdown of ingredient consumption by weight.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ingredientUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ingredientUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [`${value} ${props.payload.unit}`, name]}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(2px)',
                          borderRadius: '0.5rem',
                          borderColor: PIE_CHART_COLORS[0]
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Placeholder for another analytics card */}
              <Card className="md:col-span-2 bg-white dark:bg-slate-800 shadow-lg">
                  <CardHeader>
                      <CardTitle className="text-amber-700 dark:text-amber-400">Future Analytics</CardTitle>
                      <CardDescription>More insights coming soon!</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p>This section can display other key metrics like baking efficiency, customer acquisition cost, or average order value.</p>
                      <Link to="/baking-schedules" className="text-amber-600 hover:underline mt-2 inline-block">View Baking Schedules</Link>
                  </CardContent>
              </Card>

            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;