/**
 * Client-side API for communicating with the Chairman chatbot
 */

/**
 * Sends a user message to the Chairman API and returns the response
 * 
 * @param pageContext The context/topic of the conversation (e.g., "concept-development")
 * @param userMessage The user's message
 * @returns A promise that resolves to the chairman's response
 */
export async function sendToChairman(pageContext: string, userMessage: string): Promise<string> {
  try {
    console.log(`Sending message to Chairman API (${pageContext}):`, userMessage);
    
    const response = await fetch('/api/chairman', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageContext,
        userMessage
      })
    });
    
    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Chairman API error:', response.status, errorData || response.statusText);
      throw new Error('Failed to get response from Chairman');
    }
    
    // Parse the response
    const data = await response.json();
    
    // Return the response text
    return data.response;
  } catch (error) {
    console.error('Error calling Chairman API:', error);
    throw error;
  }
}