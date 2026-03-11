import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {  CustomerDataTab } from "@/components/admin/CustomerDataTab";
import { BlogManagementTab } from "@/components/admin/BlogManagementTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("customer-data");

  const handleExportAll = async () => {
    // Export all data logic will be implemented in the tabs
    const event = new CustomEvent("exportAll");
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif" data-testid="text-admin-title">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive business analytics and management center
            </p>
          </div>
          <Button
            onClick={handleExportAll}
            className="gap-2"
            data-testid="button-export-all"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger
              value="customer-data"
              data-testid="tab-customer-data"
            >
              Customer Data
            </TabsTrigger>
            <TabsTrigger
              value="blog-management"
              data-testid="tab-blog-management"
            >
              Blog Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer-data" className="space-y-6">
            <CustomerDataTab />
          </TabsContent>

          <TabsContent value="blog-management" className="space-y-6">
            <BlogManagementTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
