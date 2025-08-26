import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Enhanced Matrix characters with more variety
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω';
    const charArray = chars.split('');
    
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];

    // Initialize drops with random positions and properties
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
      speeds[x] = Math.random() * 3 + 1;
      colors[x] = '#ff0000'; // All red for subtle theme
    }

    const draw = () => {
      // Enhanced fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = 'center';

      // Draw characters with enhanced effects
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        // Add glow effect
        ctx.shadowColor = colors[i];
        ctx.shadowBlur = 15;
        
        // Main character
        ctx.fillStyle = colors[i];
        ctx.fillText(text, x, y);

        // Brighter leading character
        if (drops[i] > 0) {
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#ff4d4d';
          ctx.fillText(text, x, y);
        }

        // Move drop
        drops[i] += speeds[i] * 0.35;

        // Reset drop with some randomness
        if (drops[i] * fontSize > canvas.height + Math.random() * 500) {
          drops[i] = -20 - Math.random() * 100;
          speeds[i] = Math.random() * 3 + 1;
          colors[i] = '#ff0000';
        }
      }
      
      ctx.shadowBlur = 0; // Reset shadow
    };

    const interval = setInterval(draw, 140);

    return () => {
      window.removeEventListener('resize', updateSize);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-10 pointer-events-none z-0"
      style={{ zIndex: 0 }}
    />
  );
};

export default MatrixRain;