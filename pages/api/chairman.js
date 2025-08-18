/**
 * Chairman API - ChatBot API for VLTRN
 * 
 * This serverless function handles chat interactions with the VLTRN "Chairman"
 * chatbot using AgenticFlow.ai. It receives messages from different page contexts and generates
 * appropriate responses.
 */

// Define response by context
const contextResponses = {
  'concept-development': [
    "Our concept development approach combines design thinking with market research to create innovative product concepts. We start with understanding your business goals and user needs, then generate multiple concepts that align with your vision.",
    
    "For concept development, we recommend starting with a discovery workshop. This collaborative session will help us understand your vision, target audience, and business objectives. After that, we can move to ideation and concept generation.",
    
    "When developing new product concepts, we focus on three key areas: desirability (what users want), feasibility (what's technically possible), and viability (what makes business sense). This ensures all concepts have a solid foundation.",
    
    "The concept development phase typically takes 2-4 weeks, depending on the complexity of your project. This includes research, ideation, concept generation, and initial validation with stakeholders.",
    
    "Deliverables from our concept development process include a comprehensive concept brief, visual mockups or sketches, a feature priority matrix, and a roadmap for prototype development.",
    
    "We use a variety of methodologies including design thinking, Jobs-to-be-Done framework, and competitive analysis to ensure we develop innovative yet practical concepts.",
    
    "To validate concepts, we recommend A/B testing, stakeholder reviews, and limited user testing. This helps identify the strongest concepts before investing in detailed prototyping."
  ],
  
  'prototyping': [
    "Our prototyping approach ranges from low-fidelity wireframes to functional prototypes, depending on your specific needs. We can create quick proof-of-concepts or detailed interactive models.",
    
    "For your project, I'd recommend starting with a mid-fidelity clickable prototype. This balances speed with enough detail to get meaningful user feedback without the cost of full development.",
    
    "We typically deliver prototypes in 1-3 weeks, depending on complexity. Our process includes defining key user flows, designing the interface, creating interactive elements, and testing with users.",
    
    "The best prototyping method depends on your goals. For technical validation, a functional prototype is best. For user experience testing, an interactive prototype would be more appropriate. For visual design feedback, a high-fidelity mockup works well.",
    
    "Yes, our prototypes can be used for user testing. We design them specifically to validate key hypotheses and gather meaningful feedback from your target audience.",
    
    "We use tools like Figma, Adobe XD, and InVision for UI/UX prototypes, and frameworks like React for functional prototypes that require complex interactions or data processing.",
    
    "After prototype testing, we compile all feedback and insights into an actionable report that informs the next phase of development. The prototype itself can often serve as a specification for the development team."
  ],
  
  'design-engineering': [
    "Our design and engineering approach integrates user-centered design with robust technical architecture to create products that are both user-friendly and technically sound.",
    
    "We typically work in agile sprints, delivering incremental value throughout the development process. This allows for regular feedback and course correction as needed.",
    
    "For most projects, we recommend a full-stack JavaScript approach using React for the frontend and Node.js for the backend. However, we tailor our technology choices to your specific requirements.",
    
    "Security is built into our development process from the ground up. We follow OWASP guidelines, implement proper authentication and authorization, and conduct regular security audits.",
    
    "Yes, we can integrate with your existing systems and APIs. We have experience working with a wide range of third-party services and legacy systems.",
    
    "Our quality assurance process includes automated testing, manual testing, code reviews, and continuous integration to ensure high-quality deliverables.",
    
    "We provide comprehensive documentation including technical specifications, API documentation, and user guides to ensure a smooth handoff and ongoing maintenance."
  ],
  
  'launch-strategy': [
    "Our launch strategy framework encompasses pre-launch preparation, launch execution, and post-launch optimization to ensure maximum market impact.",
    
    "We typically recommend a soft launch approach, starting with a limited audience to gather feedback before scaling to a wider market. This reduces risk and allows for optimization.",
    
    "Marketing channels are selected based on your target audience and product type. We often use a mix of content marketing, social media, PR, email campaigns, and paid advertising.",
    
    "For B2B products, we focus on thought leadership content, LinkedIn engagement, industry partnerships, and direct outreach to key decision-makers.",
    
    "For consumer products, we prioritize social proof, influencer partnerships, viral mechanics, and targeted digital advertising.",
    
    "Post-launch, we closely monitor key metrics including user acquisition, activation, retention, and revenue to identify optimization opportunities.",
    
    "Our launch support typically continues for 3-6 months after the initial launch to ensure the product gains traction and achieves sustainable growth."
  ],
  
  // Default responses for any other context
  'default': [
    "I'm here to assist you with your project. Could you provide more details about what you're looking to achieve?",
    
    "That's an interesting question. Based on our experience, I recommend focusing on user needs first and technology considerations second.",
    
    "VLTRN specializes in helping businesses transform their ideas into market-ready products. Our process includes concept development, prototyping, development, and launch support.",
    
    "Our team has expertise across multiple industries including fintech, healthcare, e-commerce, and SaaS. We can adapt our approach to match your specific industry requirements.",
    
    "For your specific needs, I'd recommend scheduling a discovery call with our team. This would allow us to understand your project better and provide more tailored guidance.",
    
    "The typical timeline for a project like this is 3-6 months from concept to launch, depending on complexity and scope. We can create a more detailed timeline after understanding your specific requirements.",
    
    "Our pricing is based on project scope and requirements. We offer flexible engagement models including fixed-price projects and dedicated team arrangements."
  ]
};

/**
 * Get a response based on the page context and user message
 * 
 * @param {string} pageContext - The context/topic of the conversation
 * @param {string} userMessage - The user's message
 * @returns {string} - The response from the Chairman
 */
function getChairmanResponse(pageContext, userMessage) {
  // Get responses for this context, or fall back to default responses
  const responses = contextResponses[pageContext] || contextResponses.default;
  
  // For a more sophisticated approach, we could use keywords in userMessage
  // to select the most relevant response. For now, we'll select a weighted random response.
  
  // Simple keyword matching to try to find relevant responses
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Common keywords to look for
  const timeKeywords = ['long', 'time', 'duration', 'timeline', 'when', 'schedule'];
  const costKeywords = ['price', 'cost', 'expensive', 'afford', 'budget'];
  const processKeywords = ['how', 'process', 'work', 'step', 'methodology'];
  const deliverableKeywords = ['get', 'receive', 'deliverable', 'outcome', 'result'];
  
  // Try to find a response that matches the user's question
  // This is a very simplistic approach - in a real implementation,
  // you would use a more sophisticated NLP approach or actual LLM
  if (timeKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
    // Return time-related responses
    if (pageContext === 'concept-development') {
      return "The concept development phase typically takes 2-4 weeks, depending on the complexity of your project. This includes research, ideation, concept generation, and initial validation with stakeholders.";
    } else if (pageContext === 'prototyping') {
      return "We typically deliver prototypes in 1-3 weeks, depending on complexity. Our process includes defining key user flows, designing the interface, creating interactive elements, and testing with users.";
    } else if (pageContext === 'design-engineering') {
      return "The design and engineering phase typically takes 2-4 months, depending on the complexity and scope of your project. We work in agile sprints to deliver incremental value throughout the process.";
    } else if (pageContext === 'launch-strategy') {
      return "Launch strategy development typically takes 4-6 weeks, with the actual launch campaign running for 8-12 weeks. Post-launch support continues for 3-6 months to ensure sustainable growth.";
    }
  } else if (costKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
    return "Our pricing is based on project scope and requirements. We offer flexible engagement models including fixed-price projects and dedicated team arrangements. I'd be happy to discuss specific pricing after understanding your project needs in more detail.";
  } else if (processKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
    if (pageContext === 'concept-development') {
      return "Our concept development process starts with a discovery workshop to understand your vision, follows with market research and user insights gathering, then moves to ideation sessions and concept creation. We finally evaluate and refine concepts before presenting the final recommendations.";
    } else if (pageContext === 'prototyping') {
      return "Our prototyping process begins with defining the scope and goals of the prototype, then creating initial designs, building the interactive elements, and finally testing with users to gather feedback for refinement.";
    } else if (pageContext === 'design-engineering') {
      return "Our design and engineering process follows an agile methodology. We begin with requirements gathering and user research, create technical specifications, develop in sprints with regular demos, and conduct thorough testing before deployment.";
    } else if (pageContext === 'launch-strategy') {
      return "Our launch strategy process includes market analysis, competitive positioning, channel strategy development, content and creative planning, and building a detailed launch timeline with key milestones.";
    }
  } else if (deliverableKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
    if (pageContext === 'concept-development') {
      return "Deliverables from our concept development process include a comprehensive concept brief, visual mockups or sketches, a feature priority matrix, and a roadmap for prototype development.";
    } else if (pageContext === 'prototyping') {
      return "Our prototype deliverables include the interactive prototype itself, documentation of the design decisions, user testing results and insights, and recommendations for the next development phase.";
    } else if (pageContext === 'design-engineering') {
      return "Our design and engineering deliverables include technical specifications, UI/UX designs, functional product, source code, API documentation, and deployment instructions.";
    } else if (pageContext === 'launch-strategy') {
      return "Launch strategy deliverables include a comprehensive launch plan, marketing assets, channel strategy, content calendar, analytics dashboard, and post-launch optimization recommendations.";
    }
  }
  
  // If no specific match is found, select a random response
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

/**
 * API handler for the chairman endpoint
 */
export default async function handler(req, res) {
  // Check for correct HTTP method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Get the request body
    const { pageContext, userMessage } = req.body;
    
    // Validate required fields
    if (!pageContext || !userMessage) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        message: 'Please provide pageContext and userMessage' 
      });
    }
    
    // Log the incoming request (for debugging)
    console.log(`Chairman API: Received message from ${pageContext}:`, userMessage);
    
    // Check for AgenticFlow.ai API key
    const agenticKey = process.env.AGENTICFLOW_API_KEY;
    if (agenticKey) {
      try {
        // Prepare system prompt for AgenticFlow
        const systemPrompt = `
You are the VLTRN Super Agent ("Chairman") for the "${pageContext}" tab.
You should provide helpful and informative responses about ${pageContext}.
User's message: "${userMessage}"
        `.trim();

        // Call AgenticFlow with the prompt
        const AGENTICFLOW_URL = "https://api.agenticflow.ai/v1/chat";
        const afResponse = await fetch(AGENTICFLOW_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${agenticKey}`
          },
          body: JSON.stringify({
            prompt: systemPrompt
          })
        });

        if (!afResponse.ok) {
          const errText = await afResponse.text();
          console.error("AgenticFlow API error:", afResponse.status, errText);
          // Fall back to our simple response system
          console.log("Falling back to built-in responses");
          const response = getChairmanResponse(pageContext, userMessage);
          return res.status(200).json({ response });
        }

        const afData = await afResponse.json();
        const chairmanReply = afData.reply || afData.output || "";
        
        if (chairmanReply) {
          return res.status(200).json({ response: chairmanReply });
        } else {
          // If no valid reply from AgenticFlow, fall back to our simple response system
          console.log("No valid reply from AgenticFlow, using fallback");
          const response = getChairmanResponse(pageContext, userMessage);
          return res.status(200).json({ response });
        }
      } catch (error) {
        // If AgenticFlow API call fails, log and fall back to our simple response system
        console.error('Error calling AgenticFlow:', error);
        const response = getChairmanResponse(pageContext, userMessage);
        return res.status(200).json({ response });
      }
    } else {
      // If no API key, use our simple response system
      console.log("No AGENTICFLOW_API_KEY set, using built-in responses");
      const response = getChairmanResponse(pageContext, userMessage);
      return res.status(200).json({ response });
    }
  } catch (error) {
    console.error('Chairman API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: 'An error occurred while processing your request' 
    });
  }
}