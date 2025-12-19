import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { chats } from '@/data/mockData';
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
  Clock,
  Trash2,
  MessageCircle
} from 'lucide-react';

const Chats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedChat, setSelectedChat] = useState<typeof chats[0] | null>(null);

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || chat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="info">Open</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <MessageCircle className="h-4 w-4 text-primary" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Chats" subtitle="Monitor and manage user conversations">
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{chats.filter(c => c.status === 'open').length}</p>
              <p className="text-sm text-muted-foreground">Open Chats</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{chats.filter(c => c.status === 'pending').length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{chats.filter(c => c.status === 'resolved').length}</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chats List */}
      <div className="space-y-4">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">
                    {chat.userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-card-foreground">{chat.userName}</h3>
                    {getStatusBadge(chat.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{chat.hospitalName}</p>
                  <p className="mt-2 text-sm text-card-foreground line-clamp-1">{chat.lastMessage}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{chat.timestamp}</span>
                    <span>•</span>
                    <span>{chat.messageCount} messages</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedChat(chat)}>
                    <Eye className="mr-2 h-4 w-4" /> View Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" /> Mark Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Clock className="mr-2 h-4 w-4" /> Mark Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Preview Dialog */}
      <Dialog open={!!selectedChat} onOpenChange={() => setSelectedChat(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chat Details</DialogTitle>
          </DialogHeader>
          {selectedChat && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">
                    {selectedChat.userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChat.userName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedChat.hospitalName}</p>
                </div>
              </div>
              
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(selectedChat.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="font-medium">{selectedChat.messageCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Activity</span>
                  <span className="font-medium">{selectedChat.timestamp}</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground mb-1">Last Message</p>
                <p className="text-card-foreground">{selectedChat.lastMessage}</p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Open Full Chat</Button>
                <Button variant="outline" className="flex-1">Reply</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Chats;
