'use client';
import { useEffect, useRef } from 'react';

export default function CosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    const N = 190;
    let W = 0, H = 0;
    type Star = { x: number; y: number; r: number; speed: number; op: number; ph: number; ps: number; c: string };
    let stars: Star[] = [];
    const mouse = { x: 0, y: 0 };
    let raf: number;

    const mk = () => {
      const cols = ['#F0EDE8', '#F0EDE8', '#C9922A', '#26D9D9'];
      stars = Array.from({ length: N }, () => ({
        x: Math.random() * 2000, y: Math.random() * 1200,
        r: Math.random() * 1.1 + 0.2, speed: Math.random() * 0.08 + 0.02,
        op: Math.random() * 0.44 + 0.08,
        ph: Math.random() * Math.PI * 2, ps: Math.random() * 0.018 + 0.004,
        c: cols[Math.floor(Math.random() * cols.length)],
      }));
    };

    const rsz = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    rsz(); mk();
    window.addEventListener('resize', rsz);
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      cx.clearRect(0, 0, W, H);
      const bg = cx.createRadialGradient(W * 0.3, H * 0.3, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.9);
      bg.addColorStop(0, 'rgba(13,22,40,0.98)');
      bg.addColorStop(0.5, 'rgba(8,14,28,0.99)');
      bg.addColorStop(1, 'rgba(5,8,15,1)');
      cx.fillStyle = bg;
      cx.fillRect(0, 0, W, H);

      const nb = cx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      nb.addColorStop(0, 'rgba(201,146,42,0.055)');
      nb.addColorStop(1, 'transparent');
      cx.fillStyle = nb;
      cx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        s.ph += s.ps;
        const p = s.op + Math.sin(s.ph) * 0.12;
        const dx = (mouse.x - W / 2) * s.speed * 0.05;
        const dy = (mouse.y - H / 2) * s.speed * 0.05;
        const px = ((s.x - dx) % W + W) % W;
        const py = ((s.y - dy) % H + H) % H;
        cx.save();
        cx.globalAlpha = Math.max(0, Math.min(1, p));
        cx.fillStyle = s.c;
        if (s.r > 0.8) { cx.shadowColor = s.c; cx.shadowBlur = 4; }
        cx.beginPath();
        cx.arc(px, py, s.r, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', rsz);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}
