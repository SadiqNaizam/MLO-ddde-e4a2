import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Though not used directly, good to have if needed for future inline links.

// Custom Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import ScheduleEventCard, { ScheduleStatus } from '@/components/ScheduleEventCard';

// Shadcn/ui Components
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { Plus } from 'lucide-react';

interface ScheduledBake {
  id: string;
  recipeName: string;
  scheduledDate: Date;
  startTime: string; // e.g., "09:00"
  duration: string;  // e.g., "3 hours"
  status: ScheduleStatus;
  notes?: string;
}

const sampleRecipes = ["Sourdough Loaf", "Classic Croissants", "New York Bagels", "Rosemary Focaccia", "Cinnamon Rolls", "Artisan Rye Bread"];

const initialEvents: ScheduledBake[] = [
  {
    id: 'event1',
    recipeName: 'Sourdough Loaf',
    scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    startTime: '08:00',
    duration: '6 hours (bulk ferment) + 45 mins (bake)',
    status: 'Pending',
    notes: 'High hydration dough. Monitor closely.'
  },
  {
    id: 'event2',
    recipeName: 'Classic Croissants',
    scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    startTime: '14:00',
    duration: '3 hours (lamination & bake)',
    status: 'Pending',
  },
  {
    id: 'event3',
    recipeName: 'New York Bagels',
    scheduledDate: new Date(), // Today
    startTime: '09:30',
    duration: '2.5 hours (proof, boil & bake)',
    status: 'In Progress',
    notes: 'Poppy seed and sesame seed toppings.'
  },
  {
    id: 'event4',
    recipeName: 'Rosemary Focaccia',
    scheduledDate: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    startTime: '11:00',
    duration: '3 hours',
    status: 'Completed',
  },
];

const BakingSchedulesPage = () => {
  console.log('BakingSchedulesPage loaded');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledBake[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state for new bake
  const [newBakeRecipe, setNewBakeRecipe] = useState<string>('');
  const [newBakeStartTime, setNewBakeStartTime] = useState<string>('09:00');
  const [newBakeDuration, setNewBakeDuration] = useState<string>('');
  const [newBakeNotes, setNewBakeNotes] = useState<string>('');
  const [newBakeStatus, setNewBakeStatus] = useState<ScheduleStatus>('Pending');

  useEffect(() => {
    // Potentially fetch schedules here or sync with a backend
  }, []);

  const formatEventDateTime = (event: ScheduledBake): string => {
    const date = new Date(event.scheduledDate);
    if (event.startTime) {
        const [hours, minutes] = event.startTime.split(':');
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
    }).format(date);
  };
  
  const filteredEvents = useMemo(() => {
    if (!selectedDate) return [];
    return scheduledEvents.filter(event => {
      const eventDate = new Date(event.scheduledDate);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    }).sort((a, b) => a.startTime.localeCompare(b.startTime)); // Sort by start time
  }, [selectedDate, scheduledEvents]);

  const handleAddBake = () => {
    if (!newBakeRecipe || !selectedDate || !newBakeStartTime || !newBakeDuration) {
      alert("Please fill in Recipe, Start Time, and Duration."); // Simple validation
      return;
    }
    const newEvent: ScheduledBake = {
      id: `event${Date.now()}`, // Simple unique ID
      recipeName: newBakeRecipe,
      scheduledDate: selectedDate,
      startTime: newBakeStartTime,
      duration: newBakeDuration,
      status: newBakeStatus,
      notes: newBakeNotes,
    };
    setScheduledEvents(prevEvents => [...prevEvents, newEvent]);
    setIsDialogOpen(false);
    // Reset form fields
    setNewBakeRecipe('');
    setNewBakeStartTime('09:00');
    setNewBakeDuration('');
    setNewBakeNotes('');
    setNewBakeStatus('Pending');
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50/10 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <Header bakeryName="Artisan Bakery Dashboard" userName="Chef Baker" userInitials="CB" />
      <div className="flex flex-1 overflow-hidden">
        <CollapsibleSidebar />
        <ScrollArea className="flex-1">
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Baking Schedules
              </h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add New Bake
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-900">
                  <DialogHeader>
                    <DialogTitle className="text-slate-800 dark:text-slate-100">Schedule New Bake</DialogTitle>
                    <DialogDescription className="text-slate-600 dark:text-slate-400">
                      Add a new baking task to the schedule.
                      Selected date: {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipeName" className="text-right text-slate-700 dark:text-slate-300">
                        Recipe
                      </Label>
                      <Select value={newBakeRecipe} onValueChange={setNewBakeRecipe}>
                        <SelectTrigger className="col-span-3 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                          <SelectValue placeholder="Select a recipe" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800">
                          {sampleRecipes.map(recipe => (
                            <SelectItem key={recipe} value={recipe}>{recipe}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="startTime" className="text-right text-slate-700 dark:text-slate-300">
                        Start Time
                      </Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newBakeStartTime}
                        onChange={(e) => setNewBakeStartTime(e.target.value)}
                        className="col-span-3 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="duration" className="text-right text-slate-700 dark:text-slate-300">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        value={newBakeDuration}
                        onChange={(e) => setNewBakeDuration(e.target.value)}
                        placeholder="e.g., 3 hours"
                        className="col-span-3 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right text-slate-700 dark:text-slate-300">
                        Status
                      </Label>
                       <Select value={newBakeStatus} onValueChange={(value) => setNewBakeStatus(value as ScheduleStatus)}>
                        <SelectTrigger className="col-span-3 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800">
                          {(['Pending', 'In Progress', 'Completed', 'Delayed'] as ScheduleStatus[]).map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right text-slate-700 dark:text-slate-300">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        value={newBakeNotes}
                        onChange={(e) => setNewBakeNotes(e.target.value)}
                        placeholder="Optional notes for this bake..."
                        className="col-span-3 min-h-[80px] bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleAddBake} className="bg-amber-600 hover:bg-amber-700 text-white">Save Schedule</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <Card className="lg:col-span-1 shadow-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg text-center text-slate-700 dark:text-slate-200">Select Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-2 sm:p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-none p-0"
                    classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium text-slate-800 dark:text-slate-100",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-slate-700 dark:text-slate-300",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 text-slate-700 dark:text-slate-200",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-amber-100 dark:hover:bg-amber-800/30 rounded-md",
                        day_selected: "bg-amber-500 text-white hover:bg-amber-600 focus:bg-amber-600 dark:bg-amber-600 dark:text-amber-50 dark:hover:bg-amber-700 dark:focus:bg-amber-700",
                        day_today: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_hidden: "invisible",
                    }}
                  />
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                  Bakes for: <span className="text-amber-600 dark:text-amber-400">
                    {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No date selected'}
                  </span>
                </h2>
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map(event => (
                      <ScheduleEventCard
                        key={event.id}
                        recipeName={event.recipeName}
                        scheduledTime={formatEventDateTime(event)}
                        duration={event.duration}
                        status={event.status}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No bakes scheduled for this day.</p>
                      <p className="text-sm text-muted-foreground mt-2">Try selecting another date or add a new bake!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default BakingSchedulesPage;