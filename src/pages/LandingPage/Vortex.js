// components/ui/Vortex.jsx
import React, { useEffect, useRef } from "react";

export const Vortex = ({
  children,
  backgroundColor = "#0f172a",
  particleCount = 80,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef();
  const particles = [];

  const initParticles = (ctx, width, height) => {
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 1.5 + 0.06; // Bigger dots
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * width * 0.4;
      const speed = Math.random() * 0.01 + 0.003;
      const hue = Math.floor(Math.random() * 360);
      particles.push({ radius, angle, distance, speed, hue });
    }
  };

  const drawParticles = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    for (let p of particles) {
      const x = Math.cos(p.angle) * p.distance;
      const y = Math.sin(p.angle) * p.distance;

      ctx.beginPath();
      ctx.arc(x, y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.7)`;
      ctx.fill();

      p.angle += p.speed;
    }

    ctx.restore();
  };

  const animate = (ctx, width, height) => {
    drawParticles(ctx, width, height);
    animationIdRef.current = requestAnimationFrame(() =>
      animate(ctx, width, height)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.length = 0;
      initParticles(ctx, canvas.width, canvas.height);
    };

    resize();
    animate(ctx, canvas.width, canvas.height);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <div className={`position-relative rounded overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ zIndex: 0 }}
      />
      <div className="position-relative z-1">{children}</div>
    </div>
  );
};
