/*
  # Add API Keys to Client Intakes

  1. Changes
    - Add stripe_customer_id column to client_intakes table
    - Add api_key column to client_intakes table
    - Add api_secret column to client_intakes table
    - Add api_key_created_at timestamp column to client_intakes table

  2. Security
    - All columns are nullable to support existing records
    - Maintained existing RLS policies
*/

-- Add API-related columns to client_intakes table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_intakes' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE client_intakes ADD COLUMN stripe_customer_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_intakes' AND column_name = 'api_key'
  ) THEN
    ALTER TABLE client_intakes ADD COLUMN api_key text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_intakes' AND column_name = 'api_secret'
  ) THEN
    ALTER TABLE client_intakes ADD COLUMN api_secret text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_intakes' AND column_name = 'api_key_created_at'
  ) THEN
    ALTER TABLE client_intakes ADD COLUMN api_key_created_at timestamptz;
  END IF;
END $$;

-- Create index for faster lookups by API key
CREATE INDEX IF NOT EXISTS idx_client_intakes_api_key ON client_intakes(api_key);

-- Create index for Stripe customer ID
CREATE INDEX IF NOT EXISTS idx_client_intakes_stripe_customer_id ON client_intakes(stripe_customer_id);