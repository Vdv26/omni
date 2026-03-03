import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Canvas Component - demonstrates HTML5 Canvas API
// Drawing rating bars and visualization
function RatingCanvas({ rating, showDetails = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (showDetails) {
      // Draw detailed rating breakdown
      const categories = [
        { label: 'Communication', value: rating },
        { label: 'Quality', value: rating - 0.1 },
        { label: 'Delivery Time', value: rating + 0.1 },
        { label: 'Value', value: rating - 0.2 }
      ];

      const barHeight = 30;
      const gap = 15;
      const maxBarWidth = width - 150;

      // Using do...while loop (JavaScript loop demonstration)
      let i = 0;
      do {
        const category = categories[i];
        const y = i * (barHeight + gap) + 10;
        
        // Draw label
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(category.label, 10, y + 20);
        
        // Draw background bar
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(130, y, maxBarWidth, barHeight);
        
        // Draw filled bar with gradient
        const gradient = ctx.createLinearGradient(130, y, 130 + maxBarWidth, y);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        ctx.fillStyle = gradient;
        const fillWidth = (category.value / 5) * maxBarWidth;
        ctx.fillRect(130, y, fillWidth, barHeight);
        
        // Draw value text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(category.value.toFixed(1), 130 + fillWidth - 10, y + 20);
        
        i++;
      } while (i < categories.length);

    } else {
      // Draw simple star rating visualization
      const centerX = width / 2;
      const centerY = height / 2;
      const starSize = 25;
      const totalStars = 5;
      const spacing = 35;

      // Calculate starting position
      const startX = centerX - ((totalStars - 1) * spacing) / 2;

      // Draw stars using for loop
      for (let i = 0; i < totalStars; i++) {
        const x = startX + i * spacing;
        const filled = i < Math.floor(rating);
        
        // Draw star
        drawStar(ctx, x, centerY, starSize, filled);
      }

      // Draw rating text
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${rating.toFixed(1)} / 5.0`, centerX, centerY + 50);
    }
  }, [rating, showDetails]);

  // Helper function to draw a star
  const drawStar = (ctx, cx, cy, size, filled) => {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size / 2;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * outerRadius;
      let y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();

    if (filled) {
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
    } else {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  return (
    <div className="canvas-container" data-testid="rating-canvas-container">
      <canvas
        ref={canvasRef}
        width={showDetails ? 500 : 300}
        height={showDetails ? 200 : 150}
        style={{
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          background: 'white',
          display: 'block',
          margin: '0 auto'
        }}
        data-testid="rating-canvas"
      />
    </div>
  );
}

// Props Validation
RatingCanvas.propTypes = {
  rating: PropTypes.number.isRequired,
  showDetails: PropTypes.bool
};

export default RatingCanvas;