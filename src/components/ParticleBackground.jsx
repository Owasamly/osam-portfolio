import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 250 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Fast-moving nodes
    const nodeCount = Math.floor((width * height) / 7500);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.6, // Higher velocity
      vy: (Math.random() - 0.5) * 1.6,
      radius: 2,
    }));

    const animate = () => {
      // Crisp dark Ubuntu background render
      const gradient = ctx.createRadialGradient(
        width * 0.4, height * 0.4, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      gradient.addColorStop(0, '#3a1331');
      gradient.addColorStop(0.6, '#1e0517');
      gradient.addColorStop(1, '#0d020a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Responsive cursor proximity
        if (dist < mouse.radius) {
          const alpha = 1 - dist / mouse.radius;

          // Draw sharp node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(233, 84, 32, ${alpha * 0.95})`; // Ubuntu Orange
          ctx.fill();

          // Connect nearby nodes with crisp lines
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const odx = node.x - other.x;
            const ody = node.y - other.y;
            const odist = Math.sqrt(odx * odx + ody * ody);

            if (odist < 140) {
              const lineAlpha = (1 - odist / 140) * alpha;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(255, 153, 51, ${lineAlpha * 0.85})`;
              ctx.lineWidth = 1.25;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}