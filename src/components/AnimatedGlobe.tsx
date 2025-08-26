import { useEffect, useRef } from 'react';

const AnimatedGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Animation variables
    let rotation = 0;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw rotating grid lines
      ctx.strokeStyle = `hsla(0, 84%, 60%, 0.3)`;
      ctx.lineWidth = 1;

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const radius = 200;

      // Draw globe grid
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 + rotation;
        
        // Meridians
        ctx.beginPath();
        for (let j = 0; j <= 20; j++) {
          const lat = (j * Math.PI) / 20 - Math.PI / 2;
          const x = centerX + radius * Math.cos(lat) * Math.cos(angle);
          const y = centerY + radius * Math.sin(lat);
          
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Parallels
        if (i < 6) {
          const lat = (i * Math.PI) / 12 - Math.PI / 4;
          const r = radius * Math.cos(lat);
          ctx.beginPath();
          ctx.arc(centerX, centerY + radius * Math.sin(lat), r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw connecting lines (network effect)
      ctx.strokeStyle = `hsla(0, 84%, 60%, 0.6)`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 20; i++) {
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;
        const lat1 = (Math.random() - 0.5) * Math.PI;
        const lat2 = (Math.random() - 0.5) * Math.PI;
        
        const x1 = centerX + radius * Math.cos(lat1) * Math.cos(angle1 + rotation);
        const y1 = centerY + radius * Math.sin(lat1);
        const x2 = centerX + radius * Math.cos(lat2) * Math.cos(angle2 + rotation);
        const y2 = centerY + radius * Math.sin(lat2);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;
        
        // Draw particle
        ctx.fillStyle = `hsla(0, 84%, 60%, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = 'hsla(0, 84%, 60%, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update rotation
      rotation += 0.005;
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedGlobe;