import React, { useEffect, useRef } from 'react';
import useIsMobile from '../hooks/useIsMobile';

export default function ParticleBackground({ bgPreset = '#0f172a' }) {
  const canvasRef = useRef(null);
  const isMobile = useIsMobile(768);

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

    const mouse = { x: -1000, y: -1000, radius: isMobile ? 100 : 170 };
    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    const handlePointerUp = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerup', handlePointerUp);

    const nodeCount = isMobile ? 30 : 100;
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

      // 2. Very Faint Edge Shadow
      const edgeVignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.max(width, height) * 0.4,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      edgeVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      edgeVignette.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
      ctx.fillStyle = edgeVignette;
      ctx.fillRect(0, 0, width, height);

      // 3. Update node positions first
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      // 4. Draw background constellation web (Always Visible & Vibrant)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Check distance to mouse for interactive highlight
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = dist < mouse.radius;
        const mouseAlpha = isNearMouse ? 1 - dist / mouse.radius : 0;

        // Draw the node itself (always visible, brighter near mouse)
        ctx.beginPath();
        ctx.arc(node.x, node.y, isNearMouse ? node.radius + 1.5 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse 
          ? `rgba(233, 84, 32, ${Math.min(1, mouseAlpha + 0.5)})` 
          : `rgba(233, 84, 32, 0.35)`; // Baseline soft visibility
        ctx.fill();

        // Connect lines to neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const odx = node.x - other.x;
          const ody = node.y - other.y;
          const odist = Math.sqrt(odx * odx + ody * ody);

          if (odist < 130) {
            const lineAlpha = (1 - odist / 130);
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            
            // If near mouse, make those specific lines glow bright orange
            if (isNearMouse) {
              ctx.strokeStyle = `rgba(240, 110, 45, ${(lineAlpha * mouseAlpha * 0.9) + 0.15})`;
              ctx.lineWidth = 1.5;
            } else {
              // Subtle background web lines so it's never empty
              ctx.strokeStyle = `rgba(240, 110, 45, ${lineAlpha * 0.12})`;
              ctx.lineWidth = 1;
            }
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bgPreset, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ touchAction: 'none' }}
    />
  );
}