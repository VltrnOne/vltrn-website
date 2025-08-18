import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Error handling for unexpected server errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit the process, just log the error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process, just log the error
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow Vite dev server
  credentials: false
}));
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "VLTRN API Server is running",
    version: "1.0.0",
    endpoints: [
      "/client_intakes",
      "/client_intakes/:id",
      "/projects",
      "/tasks",
      "/resources"
    ]
  });
});

// Mock data for client intakes
const mockClientIntakes = [
  {
    id: "1",
    user_id: "user123",
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    company_name: "Acme Inc",
    status: "pending",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "user456",
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    company_name: "Globex Corp",
    status: "in-progress",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "user789",
    full_name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "555-456-7890",
    company_name: "Umbrella Corp",
    status: "completed",
    created_at: new Date().toISOString()
  }
];

// Routes
app.get("/client_intakes", (req, res) => {
  // Check for query parameters
  const { user_id } = req.query;
  
  if (user_id) {
    // Filter by user_id if provided
    const filteredIntakes = mockClientIntakes.filter(intake => intake.user_id === user_id);
    return res.json({ success: true, data: filteredIntakes });
  }
  
  // Return all client intakes
  res.json({ success: true, data: mockClientIntakes });
});

// Get a single client intake by ID
app.get("/client_intakes/:id", (req, res) => {
  const { id } = req.params;
  const clientIntake = mockClientIntakes.find(intake => intake.id === id);
  
  if (!clientIntake) {
    return res.status(404).json({ success: false, error: "Client intake not found" });
  }
  
  res.json({ success: true, data: clientIntake });
});

// Create a new client intake
app.post("/client_intakes", (req, res) => {
  const newIntake = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };
  
  mockClientIntakes.push(newIntake);
  res.status(201).json({ success: true, data: newIntake });
});

// Update a client intake
app.put("/client_intakes/:id", (req, res) => {
  const { id } = req.params;
  const intakeIndex = mockClientIntakes.findIndex(intake => intake.id === id);
  
  if (intakeIndex === -1) {
    return res.status(404).json({ success: false, error: "Client intake not found" });
  }
  
  mockClientIntakes[intakeIndex] = {
    ...mockClientIntakes[intakeIndex],
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  res.json({ success: true, data: mockClientIntakes[intakeIndex] });
});

// Delete a client intake
app.delete("/client_intakes/:id", (req, res) => {
  const { id } = req.params;
  const intakeIndex = mockClientIntakes.findIndex(intake => intake.id === id);
  
  if (intakeIndex === -1) {
    return res.status(404).json({ success: false, error: "Client intake not found" });
  }
  
  const deletedIntake = mockClientIntakes.splice(intakeIndex, 1)[0];
  res.json({ success: true, data: deletedIntake });
});

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    status: "in-progress",
    priority: "high",
    progress: 65,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Creating a new mobile app for customers",
    status: "pending",
    priority: "medium",
    progress: 20,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "CRM Integration",
    description: "Integrating new CRM system with existing tools",
    status: "completed",
    priority: "high",
    progress: 100,
    created_at: new Date().toISOString()
  }
];

// Get all projects
app.get("/projects", (req, res) => {
  res.json({ success: true, data: mockProjects });
});

// Get a single project
app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }
  
  res.json({ success: true, data: project });
});

// Create a new project
app.post("/projects", (req, res) => {
  const newProject = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };
  
  mockProjects.push(newProject);
  res.status(201).json({ success: true, data: newProject });
});

// Mock data for tasks
const mockTasks = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create wireframes for the new homepage",
    project_id: "1",
    status: "completed",
    priority: "high",
    due_date: "2024-04-15",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Implement Login System",
    description: "Develop authentication system for the web app",
    project_id: "1",
    status: "in-progress",
    priority: "high",
    due_date: "2024-04-20",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Create Marketing Plan",
    description: "Develop marketing strategy for product launch",
    project_id: "2",
    status: "pending",
    priority: "medium",
    due_date: "2024-05-10",
    created_at: new Date().toISOString()
  }
];

// Get all tasks
app.get("/tasks", (req, res) => {
  // Check for query parameters
  const { project_id } = req.query;
  
  if (project_id) {
    // Filter by project_id if provided
    const filteredTasks = mockTasks.filter(task => task.project_id === project_id);
    return res.json({ success: true, data: filteredTasks });
  }
  
  res.json({ success: true, data: mockTasks });
});

// Get a single task
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = mockTasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ success: false, error: "Task not found" });
  }
  
  res.json({ success: true, data: task });
});

// Create a new task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };
  
  mockTasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

// Mock data for resources
const mockResources = [
  {
    id: "1",
    title: "Brand Guidelines",
    description: "Official company brand guidelines and assets",
    file_url: "https://example.com/files/brand-guidelines.pdf",
    category: "Marketing",
    type: "document",
    author_name: "Marketing Team",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Project Proposal Template",
    description: "Template for creating new project proposals",
    file_url: "https://example.com/files/project-proposal.docx",
    category: "Business",
    type: "template",
    author_name: "Project Management",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Development Standards",
    description: "Coding standards and best practices",
    file_url: "https://example.com/files/dev-standards.pdf",
    category: "Technical",
    type: "document",
    author_name: "Engineering Team",
    created_at: new Date().toISOString()
  }
];

// Get all resources
app.get("/resources", (req, res) => {
  res.json({ success: true, data: mockResources });
});

// Get a single resource
app.get("/resources/:id", (req, res) => {
  const { id } = req.params;
  const resource = mockResources.find(r => r.id === id);
  
  if (!resource) {
    return res.status(404).json({ success: false, error: "Resource not found" });
  }
  
  res.json({ success: true, data: resource });
});

// Create a new resource
app.post("/resources", (req, res) => {
  const newResource = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };
  
  mockResources.push(newResource);
  res.status(201).json({ success: true, data: newResource });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start the server and handle errors
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
}).on('error', (err) => {
  // Handle server startup errors (e.g., port already in use)
  console.error('Failed to start server:', err.message);
  
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port or close the process using port ${PORT}.`);
  }
});

// Graceful shutdown
const handleShutdown = () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server closed successfully');
    process.exit(0);
  });
  
  // Force close if it takes too long
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);