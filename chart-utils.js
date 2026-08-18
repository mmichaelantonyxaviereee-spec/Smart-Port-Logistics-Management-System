/**
 * Smart Port & Logistics - Chart Utilities
 * Helper functions for creating charts using Canvas API
 */

class SimpleChart {
    constructor(canvasId, type = 'line') {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.type = type;
        this.padding = { top: 30, right: 30, bottom: 30, left: 60 };
        this.colors = {
            primary: '#0066cc',
            secondary: '#667085',
            success: '#28a745',
            warning: '#ffc107',
            danger: '#dc3545',
            light: '#f9fafb',
            grid: '#e5e7eb',
            text: '#1f2937',
        };
        this.setup();
    }

    setup() {
        // Set canvas size
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width - 20;
        this.canvas.height = 300;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    draw(data) {
        this.data = data;
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.type === 'line') {
            this.drawLineChart();
        } else if (this.type === 'bar') {
            this.drawBarChart();
        }
    }

    drawLineChart() {
        const { labels, datasets } = this.data;
        const chartArea = this.getChartArea();
        const dataPoints = labels.length;

        // Draw grid
        this.drawGrid(chartArea, dataPoints);

        // Find min/max values
        const allValues = datasets.reduce((acc, ds) => [...acc, ...ds.data], []);
        const minValue = Math.min(...allValues);
        const maxValue = Math.max(...allValues);
        const range = maxValue - minValue;
        const padding = range * 0.1;

        // Draw lines for each dataset
        datasets.forEach((dataset, dsIndex) => {
            this.ctx.strokeStyle = dataset.color || this.colors.primary;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            dataset.data.forEach((value, index) => {
                const x = chartArea.x + (index / (dataPoints - 1)) * chartArea.width;
                const y = chartArea.y + chartArea.height - 
                         ((value - minValue + padding) / (range + padding * 2)) * chartArea.height;

                if (index === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });

            this.ctx.stroke();

            // Draw dots
            this.ctx.fillStyle = dataset.color || this.colors.primary;
            dataset.data.forEach((value, index) => {
                const x = chartArea.x + (index / (dataPoints - 1)) * chartArea.width;
                const y = chartArea.y + chartArea.height - 
                         ((value - minValue + padding) / (range + padding * 2)) * chartArea.height;

                this.ctx.beginPath();
                this.ctx.arc(x, y, 4, 0, Math.PI * 2);
                this.ctx.fill();
            });
        });

        // Draw labels
        this.drawLabels(labels, chartArea, dataPoints);
    }

    drawBarChart() {
        const { labels, datasets } = this.data;
        const chartArea = this.getChartArea();
        const dataPoints = labels.length;

        // Draw grid
        this.drawGrid(chartArea, dataPoints);

        // Find max value
        const allValues = datasets.reduce((acc, ds) => [...acc, ...ds.data], []);
        const maxValue = Math.max(...allValues);

        // Draw bars
        const barWidth = chartArea.width / (dataPoints * (datasets.length + 1));
        
        datasets.forEach((dataset, dsIndex) => {
            this.ctx.fillStyle = dataset.color || this.colors.primary;
            
            dataset.data.forEach((value, index) => {
                const x = chartArea.x + (index * (dataPoints + 1) + dsIndex) * barWidth;
                const barHeight = (value / maxValue) * chartArea.height;
                const y = chartArea.y + chartArea.height - barHeight;

                this.ctx.fillRect(x, y, barWidth, barHeight);
            });
        });

        // Draw labels
        this.drawLabels(labels, chartArea, dataPoints);
    }

    drawGrid(chartArea, dataPoints) {
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 0.5;

        // Horizontal grid lines
        for (let i = 0; i <= 4; i++) {
            const y = chartArea.y + (i / 4) * chartArea.height;
            this.ctx.beginPath();
            this.ctx.moveTo(chartArea.x, y);
            this.ctx.lineTo(chartArea.x + chartArea.width, y);
            this.ctx.stroke();
        }

        // Vertical grid lines
        for (let i = 0; i < dataPoints; i++) {
            const x = chartArea.x + (i / (dataPoints - 1)) * chartArea.width;
            this.ctx.beginPath();
            this.ctx.moveTo(x, chartArea.y);
            this.ctx.lineTo(x, chartArea.y + chartArea.height);
            this.ctx.stroke();
        }
    }

    drawLabels(labels, chartArea, dataPoints) {
        this.ctx.fillStyle = this.colors.text;
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'center';

        labels.forEach((label, index) => {
            const x = chartArea.x + (index / (dataPoints - 1)) * chartArea.width;
            const y = chartArea.y + chartArea.height + 20;
            this.ctx.fillText(label, x, y);
        });
    }

    getChartArea() {
        return {
            x: this.padding.left,
            y: this.padding.top,
            width: this.width - this.padding.left - this.padding.right,
            height: this.height - this.padding.top - this.padding.bottom,
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleChart;
}
