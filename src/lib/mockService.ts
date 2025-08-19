// Mock Service for VLTRN Platform
// This provides immediate functionality while backend is being set up

// Mock data storage
let mockUsers = [
  {
    id: 1,
    name: 'Jay VLTRN',
    email: 'jay@vltrn.agency',
    phone: '+1234567890',
    isVerified: true,
    createdAt: new Date().toISOString()
  }
];

let mockClientIntakes = [];
let mockProjectsData = [];
let mockTasksData = [];
let mockResourcesData = [];

// Mock authentication functions
export const mockAuth = {
  register: async (name: string, email: string, phone: string, password: string) => {
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      phone,
      isVerified: false,
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    // Generate mock token
    const token = `mock_token_${Date.now()}`;
    
    // Store in localStorage
    localStorage.setItem('vltrn_token', token);
    localStorage.setItem('vltrn_user', JSON.stringify(newUser));
    
    return {
      user: newUser,
      token,
      message: 'Registration successful! Welcome to VLTRN.'
    };
  },

  login: async (email: string, password: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Mock password validation (always accept for testing)
    const token = `mock_token_${Date.now()}`;
    
    // Store in localStorage
    localStorage.setItem('vltrn_token', token);
    localStorage.setItem('vltrn_user', JSON.stringify(user));
    
    return {
      user,
      token,
      message: 'Login successful! Welcome back to VLTRN.'
    };
  },

  resetPassword: async (email: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      message: 'Password reset link sent to your email',
      success: true
    };
  },

  logout: () => {
    localStorage.removeItem('vltrn_token');
    localStorage.removeItem('vltrn_user');
    return { message: 'Logged out successfully' };
  },

  checkSession: () => {
    const token = localStorage.getItem('vltrn_token');
    const user = localStorage.getItem('vltrn_user');
    return !!token && !!user;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('vltrn_user');
    return user ? JSON.parse(user) : null;
  }
};

// Mock client intake functions
export const mockClientIntake = {
  submit: async (data: any) => {
    const intake = {
      id: mockClientIntakes.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    mockClientIntakes.push(intake);
    
    return {
      message: 'Client intake submitted successfully!',
      intake
    };
  },

  getAll: () => {
    return mockClientIntakes;
  }
};

// Mock project functions
export const mockProjects = {
  create: async (data: any) => {
    const project = {
      id: mockProjectsData.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    mockProjectsData.push(project);
    
    return {
      message: 'Project created successfully!',
      project
    };
  },

  getAll: () => {
    return mockProjectsData;
  }
};

// Mock task functions
export const mockTasks = {
  create: async (data: any) => {
    const task = {
      id: mockTasksData.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    mockTasksData.push(task);
    
    return {
      message: 'Task created successfully!',
      task
    };
  },

  getAll: () => {
    return mockTasksData;
  }
};

// Mock resource functions
export const mockResources = {
  create: async (data: any) => {
    const resource = {
      id: mockResourcesData.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'available'
    };
    
    mockResourcesData.push(resource);
    
    return {
      message: 'Resource created successfully!',
      resource
    };
  },

  getAll: () => {
    return mockResourcesData;
  }
};

// Mock analytics
export const mockAnalytics = {
  getDashboard: () => {
    return {
      totalUsers: mockUsers.length,
      totalProjects: mockProjectsData.length,
      totalTasks: mockTasksData.length,
      totalIntakes: mockClientIntakes.length,
      activeProjects: mockProjectsData.filter(p => p.status === 'active').length,
      completedTasks: mockTasksData.filter(t => t.status === 'completed').length
    };
  }
};

// Mock notifications
export const mockNotifications = {
  getAll: () => {
    return [
      {
        id: 1,
        title: 'Welcome to VLTRN!',
        message: 'Your account has been created successfully.',
        type: 'success',
        createdAt: new Date().toISOString()
      }
    ];
  }
};
