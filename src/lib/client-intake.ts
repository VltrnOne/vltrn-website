import { supabase } from './supabase';
import type { ClientIntakeForm } from '../types/client-intake';

export async function submitClientIntake(formData: ClientIntakeForm) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Start a transaction
    const { data: intake, error: intakeError } = await supabase
      .from('client_intakes')
      .insert({
        user_id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        company_name: formData.companyName,
        industry: formData.industry,
        company_size: formData.companySize,
        revenue_range: formData.revenueRange,
        website: formData.website,
        location: formData.location,
        registration_number: formData.registrationNumber,
        tax_id: formData.taxId,
        job_title: formData.jobTitle,
        department: formData.department,
        communication_channel: formData.communicationChannel,
        time_zone: formData.timeZone,
        budget_range: formData.budget,
        funding_stage: formData.fundingStage,
        financial_goals: formData.financialGoals,
        challenges: formData.challenges,
        short_term_goals: formData.shortTermGoals,
        long_term_goals: formData.longTermGoals,
        business_entity_type: formData.businessEntityType,
        general_counsel: formData.generalCounsel,
        nda_consent: formData.ndaConsent,
        target_audience: formData.targetAudience,
        competitors: formData.competitors,
        referral_source: formData.referralSource,
        notes: formData.notes,
        privacy_consent: formData.privacyConsent,
      })
      .select()
      .single();

    if (intakeError) throw intakeError;

    // Insert services
    if (formData.servicesOfInterest.length > 0) {
      const { error: servicesError } = await supabase.from('client_services').insert(
        formData.servicesOfInterest.map((service) => ({
          client_intake_id: intake.id,
          service_name: service,
        }))
      );

      if (servicesError) throw servicesError;
    }

    // Insert marketing channels
    if (formData.marketingChannels.length > 0) {
      const { error: channelsError } = await supabase.from('client_marketing_channels').insert(
        formData.marketingChannels.map((channel) => ({
          client_intake_id: intake.id,
          channel_name: channel,
        }))
      );

      if (channelsError) throw channelsError;
    }

    return { success: true, data: intake };
  } catch (error) {
    console.error('Error submitting client intake:', error);
    return { success: false, error };
  }
}