import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { hospitals } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MoreHorizontal, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Building,
  Bed,
  Plus
} from 'lucide-react';

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitals[0] | null>(null);

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || hospital.status === statusFilter;
    const matchesType = typeFilter === 'all' || hospital.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="success">Verified</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'General':
        return <Badge variant="info">{type}</Badge>;
      case 'Specialty':
        return <Badge variant="secondary">{type}</Badge>;
      case 'Emergency':
        return <Badge variant="destructive">{type}</Badge>;
      case 'Clinic':
        return <Badge variant="outline">{type}</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <AdminLayout title="Hospitals" subtitle="Manage hospital listings and verifications">
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4 flex-wrap">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Specialty">Specialty</SelectItem>
              <SelectItem value="Emergency">Emergency</SelectItem>
              <SelectItem value="Clinic">Clinic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Hospital
        </Button>
      </div>

      {/* Hospitals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeBadge(hospital.type)}
                    {getStatusBadge(hospital.status)}
                  </div>
                  <h3 className="font-semibold text-lg text-card-foreground">{hospital.name}</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedHospital(hospital)}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    {hospital.status === 'pending' && (
                      <>
                        <DropdownMenuItem className="text-success">
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{hospital.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bed className="h-4 w-4" />
                  <span>{hospital.beds} beds</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {hospital.departments.slice(0, 3).map((dept) => (
                  <span
                    key={dept}
                    className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                  >
                    {dept}
                  </span>
                ))}
                {hospital.departments.length > 3 && (
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                    +{hospital.departments.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-border bg-muted/30 px-6 py-3">
              <p className="text-xs text-muted-foreground">
                Added by {hospital.addedBy} • {hospital.addedAt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hospital Details Dialog */}
      <Dialog open={!!selectedHospital} onOpenChange={() => setSelectedHospital(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedHospital?.name}</DialogTitle>
            <DialogDescription>Hospital details and contact information</DialogDescription>
          </DialogHeader>
          {selectedHospital && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                {getTypeBadge(selectedHospital.type)}
                {getStatusBadge(selectedHospital.status)}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedHospital.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedHospital.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedHospital.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bed className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{selectedHospital.beds} beds</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Departments</p>
                <div className="flex flex-wrap gap-2">
                  {selectedHospital.departments.map((dept) => (
                    <Badge key={dept} variant="secondary">{dept}</Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  Added by <span className="font-medium text-foreground">{selectedHospital.addedBy}</span> on {selectedHospital.addedAt}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Edit Hospital</Button>
                {selectedHospital.status === 'pending' && (
                  <Button variant="success" className="flex-1">Approve</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Hospitals;
