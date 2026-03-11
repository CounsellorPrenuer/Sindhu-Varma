import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Mail,
  CreditCard,
  Download,
  FileText,
  Phone,
  Users,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import type { Booking, Contact, Payment } from "@shared/schema";

interface Stats {
  bookings: number;
  contacts: number;
  payments: number;
  downloads: number;
  blogPosts: number;
  pending: number;
  contacted: number;
  completed: number;
}

export function CustomerDataTab() {
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading, isError: statsError, error: statsErrorData } = useQuery<Stats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: bookings = [], isLoading: bookingsLoading, isError: bookingsError, error: bookingsErrorData } = useQuery<Booking[]>({
    queryKey: ["/api/admin/bookings"],
  });

  const { data: contacts = [], isLoading: contactsLoading, isError: contactsError, error: contactsErrorData } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: payments = [], isLoading: paymentsLoading, isError: paymentsError, error: paymentsErrorData } = useQuery<Payment[]>({
    queryKey: ["/api/admin/payments"],
  });

  const exportToExcel = (data: any[], filename: string) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data to Excel",
        variant: "destructive",
      });
    }
  };

  const exportAllData = () => {
    try {
      const workbook = XLSX.utils.book_new();

      if (bookings.length > 0) {
        const bookingsSheet = XLSX.utils.json_to_sheet(bookings);
        XLSX.utils.book_append_sheet(workbook, bookingsSheet, "Bookings");
      }

      if (contacts.length > 0) {
        const contactsSheet = XLSX.utils.json_to_sheet(contacts);
        XLSX.utils.book_append_sheet(workbook, contactsSheet, "Contacts");
      }

      if (payments.length > 0) {
        const paymentsSheet = XLSX.utils.json_to_sheet(payments);
        XLSX.utils.book_append_sheet(workbook, paymentsSheet, "Payments");
      }

      XLSX.writeFile(workbook, "customer_data_export.xlsx");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export all data to Excel",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const handleExportAll = () => {
      exportAllData();
    };

    window.addEventListener("exportAll", handleExportAll);
    return () => window.removeEventListener("exportAll", handleExportAll);
  }, [bookings, contacts, payments]);

  useEffect(() => {
    if (statsError) {
      toast({
        title: "Error loading stats",
        description: (statsErrorData as any)?.message || "Failed to load statistics",
        variant: "destructive",
      });
    }
  }, [statsError]);

  useEffect(() => {
    if (bookingsError) {
      toast({
        title: "Error loading bookings",
        description: (bookingsErrorData as any)?.message || "Failed to load bookings",
        variant: "destructive",
      });
    }
  }, [bookingsError]);

  useEffect(() => {
    if (contactsError) {
      toast({
        title: "Error loading contacts",
        description: (contactsErrorData as any)?.message || "Failed to load contacts",
        variant: "destructive",
      });
    }
  }, [contactsError]);

  useEffect(() => {
    if (paymentsError) {
      toast({
        title: "Error loading payments",
        description: (paymentsErrorData as any)?.message || "Failed to load payments",
        variant: "destructive",
      });
    }
  }, [paymentsError]);

  const statCards = [
    { title: "Bookings", value: stats?.bookings || 0, icon: Calendar, testId: "stat-bookings" },
    { title: "Contacts", value: stats?.contacts || 0, icon: Mail, testId: "stat-contacts" },
    { title: "Payments", value: stats?.payments || 0, icon: CreditCard, testId: "stat-payments" },
    { title: "Downloads", value: stats?.downloads || 0, icon: Download, testId: "stat-downloads" },
    { title: "Blog Posts", value: stats?.blogPosts || 0, icon: FileText, testId: "stat-blogposts" },
    { title: "Pending", value: stats?.pending || 0, icon: Phone, testId: "stat-pending" },
    { title: "Contacted", value: stats?.contacted || 0, icon: Users, testId: "stat-contacted" },
    { title: "Completed", value: stats?.completed || 0, icon: CheckCircle, testId: "stat-completed" },
  ];

  if (statsLoading || bookingsLoading || contactsLoading || paymentsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(8)].map((_, i) => (
            <Card key={i} data-testid={`skeleton-stat-${i}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (statsError || bookingsError || contactsError || paymentsError) {
    const errorMessage = 
      (statsError && (statsErrorData as any)?.message) ||
      (bookingsError && (bookingsErrorData as any)?.message) ||
      (contactsError && (contactsErrorData as any)?.message) ||
      (paymentsError && (paymentsErrorData as any)?.message) ||
      "An error occurred while loading customer data";

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-destructive" data-testid="error-state">
              <p className="font-medium">Error loading data</p>
              <p className="text-sm text-muted-foreground mt-2">{errorMessage}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} data-testid={stat.testId}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid={`${stat.testId}-value`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Recent Bookings</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToExcel(bookings, "bookings")}
              disabled={bookings.length === 0}
              className="gap-2"
              data-testid="button-export-bookings"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground" data-testid="empty-bookings">
                No bookings available
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.slice(0, 5).map((booking) => (
                    <TableRow key={booking.id} data-testid={`row-booking-${booking.id}`}>
                      <TableCell data-testid={`booking-name-${booking.id}`}>{booking.name}</TableCell>
                      <TableCell data-testid={`booking-email-${booking.id}`}>{booking.email}</TableCell>
                      <TableCell data-testid={`booking-phone-${booking.id}`}>{booking.phone}</TableCell>
                      <TableCell data-testid={`booking-package-${booking.id}`}>{booking.packageName}</TableCell>
                      <TableCell data-testid={`booking-category-${booking.id}`}>{booking.category}</TableCell>
                      <TableCell data-testid={`booking-amount-${booking.id}`}>₹{booking.amount}</TableCell>
                      <TableCell data-testid={`booking-status-${booking.id}`}>
                        <span className={`capitalize ${booking.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {booking.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Recent Contact Form Submissions</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToExcel(contacts, "contacts")}
              disabled={contacts.length === 0}
              className="gap-2"
              data-testid="button-export-contacts"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground" data-testid="empty-contacts">
                No contact submissions available
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.slice(0, 5).map((contact) => (
                    <TableRow key={contact.id} data-testid={`row-contact-${contact.id}`}>
                      <TableCell data-testid={`contact-name-${contact.id}`}>{contact.name}</TableCell>
                      <TableCell data-testid={`contact-email-${contact.id}`}>{contact.email}</TableCell>
                      <TableCell data-testid={`contact-phone-${contact.id}`}>{contact.phone}</TableCell>
                      <TableCell data-testid={`contact-message-${contact.id}`}>
                        <div className="max-w-xs truncate">{contact.message}</div>
                      </TableCell>
                      <TableCell data-testid={`contact-status-${contact.id}`}>
                        <span className={`capitalize ${contact.status === 'contacted' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {contact.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Recent Payment Records</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToExcel(payments, "payments")}
              disabled={payments.length === 0}
              className="gap-2"
              data-testid="button-export-payments"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground" data-testid="empty-payments">
                No payment records available
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.slice(0, 5).map((payment) => (
                    <TableRow key={payment.id} data-testid={`row-payment-${payment.id}`}>
                      <TableCell data-testid={`payment-orderid-${payment.id}`}>
                        <div className="max-w-xs truncate">{payment.razorpayOrderId}</div>
                      </TableCell>
                      <TableCell data-testid={`payment-paymentid-${payment.id}`}>
                        <div className="max-w-xs truncate">{payment.razorpayPaymentId || 'N/A'}</div>
                      </TableCell>
                      <TableCell data-testid={`payment-amount-${payment.id}`}>₹{payment.amount}</TableCell>
                      <TableCell data-testid={`payment-status-${payment.id}`}>
                        <span className={`capitalize ${payment.status === 'success' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {payment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Resource Downloads</CardTitle>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="gap-2"
              data-testid="button-export-downloads"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center text-muted-foreground" data-testid="empty-downloads">
              No download records available
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
