import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  isLargeText: boolean;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  focusTrap: (element: HTMLElement) => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    // Check user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    // Load saved preferences
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedLargeText = localStorage.getItem('accessibility-large-text') === 'true';
    
    setIsHighContrast(savedHighContrast);
    setIsLargeText(savedLargeText);

    // Apply preferences
    applyAccessibilityPreferences();
  }, []);

  useEffect(() => {
    applyAccessibilityPreferences();
  }, [isHighContrast, isReducedMotion, isLargeText]);

  const applyAccessibilityPreferences = () => {
    const root = document.documentElement;
    
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (isReducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    if (isLargeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('accessibility-high-contrast', newValue.toString());
  };

  const toggleReducedMotion = () => {
    const newValue = !isReducedMotion;
    setIsReducedMotion(newValue);
    localStorage.setItem('accessibility-reduced-motion', newValue.toString());
  };

  const toggleLargeText = () => {
    const newValue = !isLargeText;
    setIsLargeText(newValue);
    localStorage.setItem('accessibility-large-text', newValue.toString());
  };

  const focusTrap = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + H: Toggle high contrast
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        toggleHighContrast();
        announceToScreenReader(`High contrast ${isHighContrast ? 'disabled' : 'enabled'}`);
      }
      
      // Ctrl/Cmd + Shift + M: Toggle reduced motion
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        toggleReducedMotion();
        announceToScreenReader(`Reduced motion ${isReducedMotion ? 'disabled' : 'enabled'}`);
      }
      
      // Ctrl/Cmd + Shift + T: Toggle large text
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleLargeText();
        announceToScreenReader(`Large text ${isLargeText ? 'disabled' : 'enabled'}`);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isHighContrast, isReducedMotion, isLargeText]);

  const value: AccessibilityContextType = {
    isHighContrast,
    isReducedMotion,
    isLargeText,
    toggleHighContrast,
    toggleReducedMotion,
    toggleLargeText,
    focusTrap,
    announceToScreenReader,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Accessibility Controls Component
export const AccessibilityControls: React.FC = () => {
  const {
    isHighContrast,
    isReducedMotion,
    isLargeText,
    toggleHighContrast,
    toggleReducedMotion,
    toggleLargeText,
  } = useAccessibility();

  return (
    <div className="fixed top-4 left-4 z-[9998] bg-[rgba(0,0,0,0.9)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-4 shadow-lg">
      <h3 className="text-white font-semibold text-sm mb-3">Accessibility</h3>
      
      <div className="space-y-2">
        <button
          onClick={toggleHighContrast}
          className={`w-full px-3 py-2 text-xs rounded-lg transition-colors ${
            isHighContrast
              ? 'bg-[#FE02A1] text-white'
              : 'bg-[rgba(255,255,255,0.1)] text-white/80 hover:bg-[rgba(255,255,255,0.2)]'
          }`}
          aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast`}
        >
          {isHighContrast ? '✓' : '○'} High Contrast
        </button>
        
        <button
          onClick={toggleReducedMotion}
          className={`w-full px-3 py-2 text-xs rounded-lg transition-colors ${
            isReducedMotion
              ? 'bg-[#FE02A1] text-white'
              : 'bg-[rgba(255,255,255,0.1)] text-white/80 hover:bg-[rgba(255,255,255,0.2)]'
          }`}
          aria-label={`${isReducedMotion ? 'Disable' : 'Enable'} reduced motion`}
        >
          {isReducedMotion ? '✓' : '○'} Reduced Motion
        </button>
        
        <button
          onClick={toggleLargeText}
          className={`w-full px-3 py-2 text-xs rounded-lg transition-colors ${
            isLargeText
              ? 'bg-[#FE02A1] text-white'
              : 'bg-[rgba(255,255,255,0.1)] text-white/80 hover:bg-[rgba(255,255,255,0.2)]'
          }`}
          aria-label={`${isLargeText ? 'Disable' : 'Enable'} large text`}
        >
          {isLargeText ? '✓' : '○'} Large Text
        </button>
      </div>
      
      <div className="mt-3 text-white/40 text-xs">
        <p>Keyboard shortcuts:</p>
        <p>Ctrl/Cmd + Shift + H: High Contrast</p>
        <p>Ctrl/Cmd + Shift + M: Reduced Motion</p>
        <p>Ctrl/Cmd + Shift + T: Large Text</p>
      </div>
    </div>
  );
};

export default AccessibilityProvider;
