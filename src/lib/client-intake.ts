import { mockClientIntake } from './mockService';

// Client intake service using VLTRN's own backend infrastructure
// TEMPORARILY USING MOCK SERVICE FOR IMMEDIATE FUNCTIONALITY

export const submitClientIntake = async (intakeData: any) => {
  try {
    console.log('Submitting client intake:', intakeData);
    
    const result = await mockClientIntake.submit(intakeData);
    
    console.log('Client intake submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error submitting client intake:', error);
    throw error;
  }
};

export const getClientIntakes = async () => {
  try {
    return mockClientIntake.getAll();
  } catch (error) {
    console.error('Error fetching client intakes:', error);
    return [];
  }
};