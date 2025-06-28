import React, { useEffect, useState } from 'react';

interface CelebrationAnimationProps {
  show: boolean;
  onComplete: () => void;
  message?: string;
}

const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
  show,
  onComplete,
  message = "Thanks for booking!"
}) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      // Reduced number of sparkles for better performance
      const newSparkles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1
      }));
      setSparkles(newSparkles);

      // Play celebration sound with error handling
      playSuccessSound();

      // Auto-hide after shorter animation
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const playSuccessSound = () => {
    // Simplified audio with better error handling
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playNote = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Shorter, simpler melody
      const now = audioContext.currentTime;
      playNote(523.25, now, 0.15); // C5
      playNote(659.25, now + 0.1, 0.15); // E5
      playNote(783.99, now + 0.2, 0.2); // G5
      
    } catch (error) {
      // Silently fail if audio is not supported
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden gpu-accelerated">
      {/* Reduced sparkles for better performance */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            willChange: 'transform'
          }}
        >
          <div className="sparkle">✨</div>
        </div>
      ))}

      {/* Celebration Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center animate-celebration-bounce gpu-accelerated">
          <div className="text-5xl mb-3 animate-pulse">🎉</div>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text animate-gradient-text">
            {message}
          </h2>
          <div className="text-xl mt-3 text-gray-600 animate-fade-in-up">
            Your booking has been confirmed! 🙏
          </div>
        </div>
      </div>

      {/* Reduced confetti for better performance */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 1}s`,
              willChange: 'transform'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)]
              }}
            />
          </div>
        ))}
      </div>

      {/* Reduced fireworks for better performance */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-firework"
            style={{
              left: `${25 + Math.random() * 50}%`,
              top: `${25 + Math.random() * 30}%`,
              animationDelay: `${i * 0.4}s`,
              willChange: 'transform'
            }}
          >
            <div className="firework">
              {Array.from({ length: 8 }).map((_, j) => (
                <div
                  key={j}
                  className="firework-particle"
                  style={{
                    transform: `rotate(${j * 45}deg)`,
                    willChange: 'transform'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelebrationAnimation;