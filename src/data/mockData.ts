export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
  chatCount: number;
  joinedAt: string;
}

export interface Chat {
  id: string;
  userId: string;
  userName: string;
  hospitalName: string;
  lastMessage: string;
  timestamp: string;
  status: 'open' | 'resolved' | 'pending';
  messageCount: number;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  type: 'General' | 'Specialty' | 'Clinic' | 'Emergency';
  status: 'verified' | 'pending' | 'rejected';
  contactEmail: string;
  contactPhone: string;
  addedBy: string;
  addedAt: string;
  beds: number;
  departments: string[];
}

export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    avatar: 'JS',
    status: 'active',
    lastActive: '2 minutes ago',
    chatCount: 15,
    joinedAt: 'Jan 15, 2024',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    avatar: 'SJ',
    status: 'active',
    lastActive: '1 hour ago',
    chatCount: 8,
    joinedAt: 'Feb 3, 2024',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    avatar: 'MB',
    status: 'inactive',
    lastActive: '3 days ago',
    chatCount: 23,
    joinedAt: 'Dec 10, 2023',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    avatar: 'ED',
    status: 'active',
    lastActive: '30 minutes ago',
    chatCount: 5,
    joinedAt: 'Mar 20, 2024',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'r.wilson@email.com',
    avatar: 'RW',
    status: 'suspended',
    lastActive: '1 week ago',
    chatCount: 42,
    joinedAt: 'Nov 5, 2023',
  },
];

export const chats: Chat[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    hospitalName: 'City General Hospital',
    lastMessage: 'Thank you for the information about the cardiology department.',
    timestamp: '2 minutes ago',
    status: 'open',
    messageCount: 12,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    hospitalName: 'Metro Health Center',
    lastMessage: 'When are visiting hours for the ICU?',
    timestamp: '15 minutes ago',
    status: 'pending',
    messageCount: 5,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Michael Brown',
    hospitalName: 'Sunrise Medical Clinic',
    lastMessage: 'I need to schedule a follow-up appointment.',
    timestamp: '1 hour ago',
    status: 'resolved',
    messageCount: 8,
  },
  {
    id: '4',
    userId: '4',
    userName: 'Emily Davis',
    hospitalName: 'Downtown Emergency Care',
    lastMessage: 'What specialists are available this week?',
    timestamp: '3 hours ago',
    status: 'open',
    messageCount: 3,
  },
  {
    id: '5',
    userId: '1',
    userName: 'John Smith',
    hospitalName: 'Children\'s Hospital',
    lastMessage: 'Looking for pediatric care options.',
    timestamp: '1 day ago',
    status: 'resolved',
    messageCount: 15,
  },
];

export const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    location: '123 Main Street, Downtown',
    type: 'General',
    status: 'verified',
    contactEmail: 'info@citygeneral.com',
    contactPhone: '+1 (555) 123-4567',
    addedBy: 'John Smith',
    addedAt: 'Jan 10, 2024',
    beds: 450,
    departments: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics'],
  },
  {
    id: '2',
    name: 'Metro Health Center',
    location: '456 Oak Avenue, Midtown',
    type: 'Specialty',
    status: 'verified',
    contactEmail: 'contact@metrohealth.com',
    contactPhone: '+1 (555) 234-5678',
    addedBy: 'Sarah Johnson',
    addedAt: 'Feb 15, 2024',
    beds: 200,
    departments: ['Orthopedics', 'Sports Medicine', 'Rehabilitation'],
  },
  {
    id: '3',
    name: 'Sunrise Medical Clinic',
    location: '789 Elm Road, Suburbs',
    type: 'Clinic',
    status: 'pending',
    contactEmail: 'hello@sunrisemedical.com',
    contactPhone: '+1 (555) 345-6789',
    addedBy: 'Michael Brown',
    addedAt: 'Mar 5, 2024',
    beds: 50,
    departments: ['General Medicine', 'Dermatology'],
  },
  {
    id: '4',
    name: 'Downtown Emergency Care',
    location: '321 Central Blvd, Downtown',
    type: 'Emergency',
    status: 'verified',
    contactEmail: 'emergency@downtowncare.com',
    contactPhone: '+1 (555) 456-7890',
    addedBy: 'Emily Davis',
    addedAt: 'Jan 25, 2024',
    beds: 100,
    departments: ['Emergency', 'Trauma', 'Critical Care'],
  },
  {
    id: '5',
    name: 'Children\'s Hospital',
    location: '555 Park Lane, Westside',
    type: 'Specialty',
    status: 'rejected',
    contactEmail: 'info@childrenshospital.com',
    contactPhone: '+1 (555) 567-8901',
    addedBy: 'Robert Wilson',
    addedAt: 'Feb 28, 2024',
    beds: 300,
    departments: ['Pediatrics', 'Neonatal Care', 'Child Psychology'],
  },
];

export const dashboardStats = {
  totalUsers: 1248,
  activeChats: 89,
  totalHospitals: 156,
  pendingVerifications: 12,
  userGrowth: 12.5,
  chatGrowth: -3.2,
  hospitalGrowth: 8.1,
  verificationGrowth: 15.0,
};
