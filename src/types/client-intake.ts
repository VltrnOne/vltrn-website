export interface ClientIntakeForm {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Company Details
  companyName: string;
  industry: string;
  companySize: number;
  revenueRange: string;
  website?: string;
  location: string;
  registrationNumber?: string;
  taxId?: string;
  
  // Role and Preferences
  jobTitle: string;
  department: string;
  communicationChannel: string;
  timeZone: string;
  
  // Financial Information
  budget: string;
  fundingStage: string;
  financialGoals: string;
  
  // Project Goals
  servicesOfInterest: string[];
  challenges: string;
  shortTermGoals: string;
  longTermGoals: string;
  
  // Legal and Compliance
  businessEntityType: string;
  generalCounsel?: string;
  ndaConsent: boolean;
  
  // Branding and Marketing
  targetAudience: string;
  competitors: string;
  marketingChannels: string[];
  
  // Additional Preferences
  referralSource: string;
  notes?: string;
  privacyConsent: boolean;
}