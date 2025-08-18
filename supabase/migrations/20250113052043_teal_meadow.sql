/*
  # Client Intake System Schema

  1. New Tables
    - `client_intakes`
      - Primary table for storing client intake form submissions
      - Contains all form sections in a structured format
      - Includes timestamps and status tracking
    - `client_services`
      - Junction table for services of interest
      - Links clients to selected services
    - `marketing_channels`
      - Junction table for marketing channels
      - Links clients to selected marketing channels

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Insert their own records
      - Read their own records
      - Update their own records

  3. Changes
    - Initial schema creation
    - Added comprehensive tracking fields
    - Implemented security policies
*/

-- Create enum types for static options
CREATE TYPE funding_stage AS ENUM (
  'seed', 'seriesA', 'seriesB', 'seriesC', 'public'
);

CREATE TYPE business_entity_type AS ENUM (
  'llc', 'corporation', 'partnership', 'soleProprietorship', 'other'
);

CREATE TYPE industry_type AS ENUM (
  'technology', 'healthcare', 'finance', 'retail', 'manufacturing', 'other'
);

-- Create the main client_intakes table
CREATE TABLE IF NOT EXISTS client_intakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Personal Information
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date NOT NULL,

  -- Company Details
  company_name text NOT NULL,
  industry industry_type NOT NULL,
  company_size int NOT NULL,
  revenue_range text NOT NULL,
  website text,
  location text NOT NULL,
  registration_number text,
  tax_id text,

  -- Role and Preferences
  job_title text NOT NULL,
  department text NOT NULL,
  communication_channel text NOT NULL,
  time_zone text NOT NULL,

  -- Financial Information
  budget_range text NOT NULL,
  funding_stage funding_stage NOT NULL,
  financial_goals text NOT NULL,

  -- Project Goals
  challenges text NOT NULL,
  short_term_goals text NOT NULL,
  long_term_goals text NOT NULL,

  -- Legal and Compliance
  business_entity_type business_entity_type NOT NULL,
  general_counsel text,
  nda_consent boolean DEFAULT false,

  -- Branding and Marketing
  target_audience text NOT NULL,
  competitors text NOT NULL,

  -- Additional Preferences
  referral_source text NOT NULL,
  notes text,
  privacy_consent boolean DEFAULT false
);

-- Create services junction table
CREATE TABLE IF NOT EXISTS client_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_intake_id uuid REFERENCES client_intakes(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create marketing channels junction table
CREATE TABLE IF NOT EXISTS client_marketing_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_intake_id uuid REFERENCES client_intakes(id) ON DELETE CASCADE,
  channel_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE client_intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_marketing_channels ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own intakes"
  ON client_intakes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own intakes"
  ON client_intakes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own intakes"
  ON client_intakes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for client_services
CREATE POLICY "Users can manage their own services"
  ON client_services
  TO authenticated
  USING (client_intake_id IN (
    SELECT id FROM client_intakes WHERE user_id = auth.uid()
  ));

-- Policies for marketing channels
CREATE POLICY "Users can manage their own marketing channels"
  ON client_marketing_channels
  TO authenticated
  USING (client_intake_id IN (
    SELECT id FROM client_intakes WHERE user_id = auth.uid()
  ));

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_client_intakes_user_id ON client_intakes(user_id);
CREATE INDEX IF NOT EXISTS idx_client_services_intake_id ON client_services(client_intake_id);
CREATE INDEX IF NOT EXISTS idx_client_marketing_channels_intake_id ON client_marketing_channels(client_intake_id);