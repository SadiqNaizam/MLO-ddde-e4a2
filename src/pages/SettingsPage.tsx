import React from 'react';
// Custom Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from "sonner";

// Lucide Icons
import { User, Building, Settings as SettingsIconLucide, Database } from 'lucide-react';

const SettingsPage: React.FC = () => {
  console.log('SettingsPage loaded');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, formName: string) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    console.log(`${formName} submitted:`, formData);
    toast.success(`${formName.replace(" Form", "")} settings saved successfully!`);
  };

  return (
    <div className="flex h-screen bg-amber-50/20 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <CollapsibleSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header bakeryName="Artisan Bakery" userName="Chef Baker" userInitials="CB" />
        <ScrollArea className="flex-1 bg-background dark:bg-slate-950"> {/* Changed ScrollArea BG for content distinction */}
          <main className="p-6 sm:p-8 lg:p-10 space-y-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Settings</h1>
              <p className="text-slate-600 dark:text-slate-400">Manage your account, bakery, and application preferences.</p>
            </div>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-amber-100/70 dark:bg-slate-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="account" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-400 py-2.5">
                  <User className="mr-2 h-4 w-4" /> Account
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-400 py-2.5">
                  <Building className="mr-2 h-4 w-4" /> Bakery Profile
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-400 py-2.5">
                  <SettingsIconLucide className="mr-2 h-4 w-4" /> Preferences
                </TabsTrigger>
                <TabsTrigger value="data" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-400 py-2.5">
                  <Database className="mr-2 h-4 w-4" /> Data
                </TabsTrigger>
              </TabsList>

              {/* Account Details Tab */}
              <TabsContent value="account">
                <Card className="shadow-lg border-amber-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Account Details</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">Update your personal information and manage your password.</CardDescription>
                  </CardHeader>
                  <form onSubmit={(e) => handleSubmit(e, 'Account Details Form')}>
                    <CardContent className="space-y-6 pt-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" defaultValue="chefbaker" className="bg-white dark:bg-slate-700/50 border-amber-300/70 dark:border-slate-600"/>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue="chef.baker@example.com" className="bg-white dark:bg-slate-700/50 border-amber-300/70 dark:border-slate-600"/>
                      </div>
                      <div>
                        <Button type="button" variant="outline" className="border-amber-400/80 text-amber-700 hover:bg-amber-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Change Password</Button>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-amber-100/80 dark:border-slate-700/50 px-6 py-4 justify-end">
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600">Save Account Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              {/* Bakery Profile Tab */}
              <TabsContent value="profile">
                <Card className="shadow-lg border-amber-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Bakery Profile</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">Manage your bakery's public information and branding.</CardDescription>
                  </CardHeader>
                  <form onSubmit={(e) => handleSubmit(e, 'Bakery Profile Form')}>
                    <CardContent className="space-y-6 pt-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="bakeryName">Bakery Name</Label>
                        <Input id="bakeryName" name="bakeryName" defaultValue="Artisan Bakery Delights" className="bg-white dark:bg-slate-700/50 border-amber-300/70 dark:border-slate-600"/>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bakeryAddress">Address</Label>
                        <Input id="bakeryAddress" name="bakeryAddress" defaultValue="123 Pastry Lane, Bakeville, CA 90210" className="bg-white dark:bg-slate-700/50 border-amber-300/70 dark:border-slate-600"/>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bakeryContact">Contact Phone</Label>
                        <Input id="bakeryContact" name="bakeryContact" type="tel" defaultValue="555-0101" className="bg-white dark:bg-slate-700/50 border-amber-300/70 dark:border-slate-600"/>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-amber-100/80 dark:border-slate-700/50 px-6 py-4 justify-end">
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600">Save Profile Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              {/* Application Preferences Tab */}
              <TabsContent value="preferences">
                <Card className="shadow-lg border-amber-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Application Preferences</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">Customize your experience with the dashboard.</CardDescription>
                  </CardHeader>
                  <form onSubmit={(e) => handleSubmit(e, 'Preferences Form')}>
                    <CardContent className="space-y-6 pt-4">
                      <div className="flex items-center justify-between space-x-2 p-4 border border-amber-200/70 dark:border-slate-700/60 rounded-lg bg-amber-50/30 dark:bg-slate-700/20">
                        <Label htmlFor="imperialUnits" className="flex flex-col space-y-1 cursor-pointer">
                          <span>Use Imperial Units</span>
                          <span className="font-normal leading-snug text-slate-500 dark:text-slate-400">
                            Enable for lbs, oz, cups. Disable for grams, ml, etc. (Metric).
                          </span>
                        </Label>
                        <Switch id="imperialUnits" name="imperialUnits" aria-label="Toggle Imperial Units" /> 
                      </div>
                      <div className="flex items-center justify-between space-x-2 p-4 border border-amber-200/70 dark:border-slate-700/60 rounded-lg bg-amber-50/30 dark:bg-slate-700/20">
                        <Label htmlFor="lowStockNotifications" className="flex flex-col space-y-1 cursor-pointer">
                          <span>Low Stock Notifications</span>
                          <span className="font-normal leading-snug text-slate-500 dark:text-slate-400">
                            Receive alerts when inventory items run low.
                          </span>
                        </Label>
                        <Switch id="lowStockNotifications" name="lowStockNotifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2 p-4 border border-amber-200/70 dark:border-slate-700/60 rounded-lg bg-amber-50/30 dark:bg-slate-700/20">
                        <Label htmlFor="newOrderNotifications" className="flex flex-col space-y-1 cursor-pointer">
                          <span>New Order Notifications</span>
                          <span className="font-normal leading-snug text-slate-500 dark:text-slate-400">
                            Get notified when new orders are placed.
                          </span>
                        </Label>
                        <Switch id="newOrderNotifications" name="newOrderNotifications" defaultChecked />
                      </div>
                    </CardContent>
                     <CardFooter className="border-t border-amber-100/80 dark:border-slate-700/50 px-6 py-4 justify-end">
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600">Save Preferences</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              {/* Data Management Tab */}
              <TabsContent value="data">
                 <Card className="shadow-lg border-amber-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Data Management</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">Import or export your bakery data.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div className="space-y-1.5 p-4 border border-amber-200/70 dark:border-slate-700/60 rounded-lg bg-amber-50/30 dark:bg-slate-700/20">
                      <Label htmlFor="importData">Import Data</Label>
                      <Input id="importData" name="importData" type="file" className="bg-white dark:bg-slate-700/50 border-amber-300/70 dark:border-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 dark:file:bg-slate-600 dark:file:text-slate-200 dark:hover:file:bg-slate-500" />
                      <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">Upload CSV or JSON files for recipes, inventory, etc.</p>
                       <Button type="button" className="mt-2 bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-500 dark:hover:bg-amber-600">Upload File</Button>
                    </div>
                     <div className="space-y-1.5 p-4 border border-amber-200/70 dark:border-slate-700/60 rounded-lg bg-amber-50/30 dark:bg-slate-700/20">
                      <Label>Export Data</Label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Button variant="outline" className="border-amber-400/80 text-amber-700 hover:bg-amber-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Export Recipes</Button>
                        <Button variant="outline" className="border-amber-400/80 text-amber-700 hover:bg-amber-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Export Inventory</Button>
                        <Button variant="outline" className="border-amber-400/80 text-amber-700 hover:bg-amber-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Export All Data</Button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">Download your data in various formats.</p>
                    </div>
                  </CardContent>
                   <CardFooter className="border-t border-amber-100/80 dark:border-slate-700/50 px-6 py-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Data import/export actions are processed upon clicking respective buttons.</p>
                  </CardFooter>
                </Card>
              </TabsContent>

            </Tabs>
          </main>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SettingsPage;