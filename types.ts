
export enum UserRole {
  ARTISAN = 'ARTISAN',
  OWNER = 'OWNER'
}

export enum JobStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DISPUTED = 'DISPUTED'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REVERSED = 'REVERSED'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  fullName: string;
  phone: string;
  avatar?: string;
}

export interface Profile {
  userId: string;
  bio: string;
  skills: string[];
  lga: string;
  baseRate: number;
  portfolio: string[]; // URLs
  rating: number;
  reviewCount: number;
}

export interface Job {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  lga: string;
  budget: number;
  status: JobStatus;
  createdAt: string;
  artisanId?: string;
}

export interface Bid {
  id: string;
  jobId: string;
  artisanId: string;
  amount: number;
  proposal: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  jobId: string;
  amount: number;
  status: TransactionStatus;
  type: 'PAYMENT' | 'ESCROW_RELEASE' | 'REFUND';
  timestamp: string;
}

export type EkitiLGA = 
  | 'Ado-Ekiti' | 'Efon' | 'Ekiti East' | 'Ekiti West' | 'Ekiti South-West' 
  | 'Emure' | 'Gbonyin' | 'Ido-Osi' | 'Ijero' | 'Ikere' | 'Ikole' 
  | 'Ilejemeje' | 'Irepodun/Ifelodun' | 'Ise-Orun' | 'Moba' | 'Oye';
