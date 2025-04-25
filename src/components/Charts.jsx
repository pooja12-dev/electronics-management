// Charts.jsx
import { useEffect, useRef } from "react";

const Charts = ({ type, data, options, darkMode, height = "300px" }) => {
  const chartRef = useRef(null);

  const renderBarChart = (ctx, data, options) => {
    const barColors = darkMode
      ? ["rgba(79, 209, 197, 0.8)", "rgba(245, 158, 11, 0.8)"]
      : ["rgba(59, 130, 246, 0.8)", "rgba(245, 158, 11, 0.8)"];

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const barWidth = width / (data.labels.length * 2.5);
    const spacing = barWidth * 0.2;

    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = darkMode ? "#4B5563" : "#E5E7EB";
    ctx.moveTo(40, 20);
    ctx.lineTo(40, height - 40);
    ctx.lineTo(width - 20, height - 40);
    ctx.stroke();

    // Find max value for scaling
    let maxValue = 0;
    for (const dataset of data.datasets) {
      const datasetMax = Math.max(...dataset.data);
      maxValue = Math.max(maxValue, datasetMax);
    }
    maxValue = Math.ceil(maxValue / 10) * 10; // Round up to nearest 10

    // Draw Y-axis labels
    ctx.fillStyle = darkMode ? "#D1D5DB" : "#4B5563";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";
    const yStep = maxValue / 5;
    for (let i = 0; i <= 5; i++) {
      const yPos = height - 40 - ((height - 60) * (i * yStep)) / maxValue;
      ctx.fillText((i * yStep).toString(), 35, yPos);

      // Draw horizontal grid lines
      ctx.beginPath();
      ctx.strokeStyle = darkMode
        ? "rgba(75, 85, 99, 0.3)"
        : "rgba(229, 231, 235, 0.8)";
      ctx.moveTo(40, yPos);
      ctx.lineTo(width - 20, yPos);
      ctx.stroke();
    }

    // Draw bars
    const barSpacing = (width - 60) / data.labels.length;
    let barX = 60;

    for (let i = 0; i < data.labels.length; i++) {
      // Draw X-axis label
      ctx.fillStyle = darkMode ? "#D1D5DB" : "#4B5563";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(data.labels[i], barX + barWidth / 2, height - 20);

      // Draw bars for each dataset
      for (let j = 0; j < data.datasets.length; j++) {
        const value = data.datasets[j].data[i];
        const barHeight = ((height - 60) * value) / maxValue;

        ctx.fillStyle = barColors[j];
        ctx.fillRect(
          barX + j * (barWidth + spacing),
          height - 40 - barHeight,
          barWidth,
          barHeight
        );
      }

      barX += barSpacing;
    }

    // Draw legend
    if (data.datasets.length > 1) {
      const legendY = 20;
      let legendX = width - 150;

      for (let i = 0; i < data.datasets.length; i++) {
        ctx.fillStyle = barColors[i];
        ctx.fillRect(legendX, legendY - 8, 12, 12);

        ctx.fillStyle = darkMode ? "#D1D5DB" : "#4B5563";
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText(data.datasets[i].label, legendX + 18, legendY);

        legendX += 80;
      }
    }
  };

  const renderLineChart = (ctx, data, options) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Find max value for scaling
    let maxValue = 0;
    for (const dataset of data.datasets) {
      const datasetMax = Math.max(...dataset.data);
      maxValue = Math.max(maxValue, datasetMax);
    }
    maxValue = Math.ceil(maxValue / 10) * 10; // Round up to nearest 10

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = darkMode ? "#4B5563" : "#E5E7EB";
    ctx.moveTo(40, 20);
    ctx.lineTo(40, height - 40);
    ctx.lineTo(width - 20, height - 40);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.fillStyle = darkMode ? "#D1D5DB" : "#4B5563";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";
    const yStep = maxValue / 5;
    for (let i = 0; i <= 5; i++) {
      const yPos = height - 40 - ((height - 60) * (i * yStep)) / maxValue;
      ctx.fillText((i * yStep).toString(), 35, yPos);

      // Draw horizontal grid lines
      ctx.beginPath();
      ctx.strokeStyle = darkMode
        ? "rgba(75, 85, 99, 0.3)"
        : "rgba(229, 231, 235, 0.8)";
      ctx.moveTo(40, yPos);
      ctx.lineTo(width - 20, yPos);
      ctx.stroke();
    }

    // Draw X-axis labels and vertical grid lines
    const xStep = (width - 60) / (data.labels.length - 1);
    for (let i = 0; i < data.labels.length; i++) {
      const xPos = 40 + i * xStep;

      // Label
      ctx.fillStyle = darkMode ? "#D1D5DB" : "#4B5563";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(data.labels[i], xPos, height - 20);

      // Vertical grid line
      if (i > 0) {
        ctx.beginPath();
        ctx.strokeStyle = darkMode
          ? "rgba(75, 85, 99, 0.2)"
          : "rgba(229, 231, 235, 0.5)";
        ctx.moveTo(xPos, height - 40);
        ctx.lineTo(xPos, 20);
        ctx.stroke();
      }
    }

    // Draw lines for each dataset
    for (let j = 0; j < data.datasets.length; j++) {
      const dataset = data.datasets[j];
      const lineColor = darkMode
        ? "rgba(56, 189, 248, 0.8)"
        : "rgba(37, 99, 235, 0.8)";

      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";

      for (let i = 0; i < dataset.data.length; i++) {
        const x = 40 + i * xStep;
        const y = height - 40 - ((height - 60) * dataset.data[i]) / maxValue;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Draw points
      for (let i = 0; i < dataset.data.length; i++) {
        const x = 40 + i * xStep;
        const y = height - 40 - ((height - 60) * dataset.data[i]) / maxValue;

        ctx.beginPath();
        ctx.fillStyle = darkMode ? "#38BDF8" : "#2563EB";
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = darkMode ? "#1F2937" : "#FFFFFF";
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Charts.jsx (continued)
    // Set canvas dimensions for high-resolution rendering
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    canvas.width = displayWidth * 2;
    canvas.height = displayHeight * 2;
    ctx.scale(2, 2);

    // Render the appropriate chart type
    if (type === "bar") {
      renderBarChart(ctx, data, options);
    } else if (type === "line") {
      renderLineChart(ctx, data, options);
    }
  }, [type, data, options, darkMode]);

  return (
    <div className="chart-container" style={{ height, width: "100%" }}>
      <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Charts;
