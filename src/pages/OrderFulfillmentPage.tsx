import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Lucide Icons
import { Search, Eye, MoreVertical, PackageCheck, PackageOpen, CookingPot, Truck, XCircle } from 'lucide-react';

type OrderStatus = "Pending" | "Baking" | "Ready for Pickup" | "Out for Delivery" | "Completed" | "Cancelled";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress?: string;
  notes?: string;
}

const sampleOrdersData: Order[] = [
  { id: "ORD001", customerName: "Alice Wonderland", customerEmail: "alice@example.com", orderDate: "2024-07-29", status: "Baking", items: [{id: "item1", name: "Sourdough Loaf", quantity: 1, price: 10.00}, {id: "item2", name: "Croissant", quantity: 6, price: 2.50}], totalAmount: 25.00, shippingAddress: "123 Rabbit Hole Lane" },
  { id: "ORD002", customerName: "Bob The Baker", customerEmail: "bob@example.com", orderDate: "2024-07-29", status: "Ready for Pickup", items: [{id: "item3", name: "Bagel", quantity: 12, price: 1.50}], totalAmount: 18.00, notes: "Pickup by 3 PM" },
  { id: "ORD003", customerName: "Charlie Brown", customerEmail: "charlie@example.com", orderDate: "2024-07-28", status: "Completed", items: [{id: "item4", name: "Chocolate Cake", quantity: 1, price: 35.00}], totalAmount: 35.00 },
  { id: "ORD004", customerName: "Diana Prince", customerEmail: "diana@example.com", orderDate: "2024-07-30", status: "Pending", items: [{id: "item5", name: "Apple Pie", quantity: 2, price: 15.00}, {id: "item6", name: "Cherry Pie", quantity: 1, price: 12.75}], totalAmount: 42.75, shippingAddress: "Themyscira Island" },
  { id: "ORD005", customerName: "Edward S.", customerEmail: "edward@example.com", orderDate: "2024-07-30", status: "Out for Delivery", items: [{id: "item7", name: "Custom Cookie Box", quantity: 1, price: 30.00}], totalAmount: 30.00, shippingAddress: "A Big Castle on a Hill" },
  { id: "ORD006", customerName: "Fiona Apple", customerEmail: "fiona@example.com", orderDate: "2024-07-31", status: "Cancelled", items: [{id: "item1", name: "Sourdough Loaf", quantity: 2, price: 10.00}], totalAmount: 20.00, notes: "Customer cancelled" },
];

const OrderFulfillmentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>(sampleOrdersData);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  useEffect(() => {
    console.log('OrderFulfillmentPage loaded');
  }, []);

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  const getStatusBadgeVariant = (status: OrderStatus): { variant: "default" | "secondary" | "destructive" | "outline", className?: string, icon?: React.ReactElement } => {
    switch (status) {
      case "Pending":
        return { variant: "secondary", icon: <Timer className="mr-1 h-3 w-3" /> };
      case "Baking":
        return { variant: "default", className: "bg-amber-500 hover:bg-amber-500/80", icon: <CookingPot className="mr-1 h-3 w-3" /> };
      case "Ready for Pickup":
        return { variant: "outline", className: "text-green-600 border-green-600", icon: <PackageOpen className="mr-1 h-3 w-3" /> };
      case "Out for Delivery":
        return { variant: "outline", className: "text-blue-600 border-blue-600", icon: <Truck className="mr-1 h-3 w-3" /> };
      case "Completed":
        return { variant: "outline", className: "text-emerald-600 border-emerald-600", icon: <PackageCheck className="mr-1 h-3 w-3" /> };
      case "Cancelled":
        return { variant: "destructive", icon: <XCircle className="mr-1 h-3 w-3" /> };
      default:
        return { variant: "secondary" };
    }
  };

  const openDetailsDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="flex h-screen bg-muted/40 dark:bg-slate-950">
      <CollapsibleSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header bakeryName="Artisan Bakery" userName="Admin Baker" userInitials="AB" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 bg-amber-50/20 dark:bg-transparent">
          <div className="max-w-7xl mx-auto">
            <header className="mb-6">
              <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">Order Fulfillment</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Manage and track customer orders from creation to completion.</p>
            </header>

            {/* Search and Actions */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders (ID, Name, Status)..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Potential Add New Order Button
              <DialogTrigger asChild>
                <Button>Add New Order</Button>
              </DialogTrigger> 
              */}
            </div>

            {/* Orders Table */}
            <div className="bg-card p-0 border border-border rounded-lg shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 dark:bg-slate-800/30">
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                      const statusBadge = getStatusBadgeVariant(order.status);
                      return (
                        <TableRow key={order.id} className="hover:bg-muted/30 dark:hover:bg-slate-800/20">
                          <TableCell className="font-medium text-primary">{order.id}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={statusBadge.variant} className={statusBadge.className}>
                              {statusBadge.icon}{order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Order Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-card border-border">
                                <DropdownMenuItem onClick={() => openDetailsDialog(order)} className="cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                {(["Pending", "Baking", "Ready for Pickup", "Out for Delivery", "Completed", "Cancelled"] as OrderStatus[]).map(statusValue => (
                                  <DropdownMenuItem
                                    key={statusValue}
                                    onClick={() => handleUpdateStatus(order.id, statusValue)}
                                    disabled={order.status === statusValue}
                                    className="cursor-pointer"
                                  >
                                    Set as {statusValue}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl">Order Details: {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Customer: {selectedOrder.customerName} ({selectedOrder.customerEmail})
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto px-1">
              <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
              <p><strong>Status:</strong> <Badge variant={getStatusBadgeVariant(selectedOrder.status).variant} className={getStatusBadgeVariant(selectedOrder.status).className}>
                {getStatusBadgeVariant(selectedOrder.status).icon}{selectedOrder.status}
              </Badge></p>
              <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
              
              <h4 className="font-semibold mt-2">Items:</h4>
              <ul className="list-disc list-inside pl-1 text-sm space-y-1">
                {selectedOrder.items.map(item => (
                  <li key={item.id}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                ))}
              </ul>

              {selectedOrder.shippingAddress && <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>}
              {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderFulfillmentPage;