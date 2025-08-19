import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertTriangle, Info, Bell, Settings, Volume2, VolumeX } from 'lucide-react';
import { createPortal } from 'react-dom';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onAction?: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onDismiss,
  onAction
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for notification sounds
    audioRef.current = new Audio('/notification-sound.mp3');
    audioRef.current.volume = 0.3;
  }, []);

  useEffect(() => {
    // Play sound for new notifications (if not muted)
    if (!isMuted && audioRef.current && notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      if (Date.now() - latestNotification.timestamp.getTime() < 1000) {
        audioRef.current.play().catch(() => {
          // Ignore audio play errors
        });
      }
    }
  }, [notifications, isMuted]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-400" />;
      case 'error':
        return <AlertTriangle size={20} className="text-red-400" />;
      case 'info':
        return <Info size={20} className="text-blue-400" />;
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-400/30 bg-green-400/10';
      case 'warning':
        return 'border-yellow-400/30 bg-yellow-400/10';
      case 'error':
        return 'border-red-400/30 bg-red-400/10';
      case 'info':
        return 'border-blue-400/30 bg-blue-400/10';
      default:
        return 'border-blue-400/30 bg-blue-400/10';
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'top-4 right-4';
    }
  };

  const handlePositionChange = (newPosition: typeof position) => {
    setPosition(newPosition);
    setShowSettings(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (notifications.length === 0) return null;

  return createPortal(
    <div className={`fixed z-[9999] ${getPositionStyles()} space-y-3 max-w-sm w-full`}>
      {/* Notification Settings */}
      {showSettings && (
        <div className="bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-4 mb-3 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-sm">Notification Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-white/80 text-xs mb-2 block">Position</label>
              <div className="grid grid-cols-2 gap-2">
                {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => handlePositionChange(pos)}
                    className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                      position === pos
                        ? 'bg-[#FE02A1] text-white'
                        : 'bg-[rgba(255,255,255,0.1)] text-white/80 hover:bg-[rgba(255,255,255,0.2)]'
                    }`}
                  >
                    {pos.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-xs">Sound</span>
              <button
                onClick={toggleMute}
                className={`p-2 rounded-lg transition-colors ${
                  isMuted
                    ? 'bg-red-400/20 text-red-400'
                    : 'bg-green-400/20 text-green-400'
                }`}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-[rgba(0,0,0,0.8)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg text-white/60 hover:text-white transition-colors hover:bg-[rgba(0,0,0,0.9)]"
          title="Notification Settings"
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Notifications */}
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`border rounded-lg p-4 backdrop-blur-[10px] shadow-lg transform transition-all duration-300 ${
            getNotificationStyles(notification.type)
          } animate-slide-in`}
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {notification.message}
                  </p>
                  
                  {notification.action && (
                    <button
                      onClick={() => notification.action?.onClick()}
                      className="mt-2 text-[#FE02A1] hover:text-[#FE02A1]/80 text-xs font-medium transition-colors"
                    >
                      {notification.action.label} →
                    </button>
                  )}
                </div>
                
                {notification.dismissible !== false && (
                  <button
                    onClick={() => onDismiss(notification.id)}
                    className="flex-shrink-0 text-white/40 hover:text-white/60 transition-colors ml-2"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <div className="mt-2 text-white/40 text-xs">
                {notification.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default NotificationSystem;
