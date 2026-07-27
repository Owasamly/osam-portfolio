import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ bgPreset = '#0f172a' }) {
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

    const mouse = { x: -1000, y: -1000, radius: 260 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const nodeCount = Math.floor((width * height) / 7000);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 2,
    }));

    const animate = () => {
      // 1. Pure Solid Base Color
      ctx.fillStyle = bgPreset;
      ctx.fillRect(0, 0, width, height);

      // 2. Very Faint Edge Shadow (Standard Linux Desktop Vignette)
      const edgeVignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.max(width, height) * 0.4,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      edgeVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      edgeVignette.addColorStop(1, 'rgba(0, 0, 0, 0.25)'); // Subtle dark tint only at extreme corners

      ctx.fillStyle = edgeVignette;
      ctx.fillRect(0, 0, width, height);

      // 3. Interactive Nodes & Constellation Lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = 1 - dist / mouse.radius;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(233, 84, 32, ${Math.min(1, alpha + 0.3)})`;
          ctx.fill();

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
              ctx.strokeStyle = `rgba(240, 110, 45, ${lineAlpha * 0.95})`;
              ctx.lineWidth = 1.3;
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
  }, [bgPreset]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}