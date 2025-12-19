import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentChatsTable } from '@/components/dashboard/RecentChatsTable';
import { dashboardStats, hospitals } from '@/data/mockData';
import { Users, MessageSquare, Building2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Welcome back, Admin"
    >
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          change={dashboardStats.userGrowth}
          icon={Users}
        />
        <StatsCard
          title="Active Chats"
          value={dashboardStats.activeChats}
          change={dashboardStats.chatGrowth}
          icon={MessageSquare}
        />
        <StatsCard
          title="Total Hospitals"
          value={dashboardStats.totalHospitals}
          change={dashboardStats.hospitalGrowth}
          icon={Building2}
        />
        <StatsCard
          title="Pending Verifications"
          value={dashboardStats.pendingVerifications}
          change={dashboardStats.verificationGrowth}
          icon={Clock}
        />
      </div>

      {/* Content Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Chats - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentChatsTable />
        </div>

        {/* Recent Hospitals */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Hospitals</h3>
          </div>
          <div className="divide-y divide-border">
            {hospitals.slice(0, 4).map((hospital) => (
              <div key={hospital.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-card-foreground">{hospital.name}</p>
                  <p className="text-sm text-muted-foreground">{hospital.location}</p>
                </div>
                <Badge
                  variant={
                    hospital.status === 'verified'
                      ? 'success'
                      : hospital.status === 'pending'
                      ? 'warning'
                      : 'destructive'
                  }
                >
                  {hospital.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
