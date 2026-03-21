// TaskHub Color Palette - Extracted from logo

export const colors = {
  // Primary Colors (from TaskHub logo)
  primary: '#0B4A7D', // Deep Blue (center circle)
  secondary: '#7B3F9E', // Purple (from "Hub" text)
  
  // Accent Colors (from logo dots)
  blue: '#1E90FF', // Light Blue dot
  green: '#7BC043', // Green dot
  orange: '#F39C12', // Orange dot
  purple: '#9B59B6', // Purple dot
  
  // Task Status Colors (matching Prisma TaskStatus enum)
  status: {
    pending: '#F39C12', // Orange - PENDING
    inProgress: '#1E90FF', // Blue - IN_PROGRESS
    completed: '#7BC043', // Green - COMPLETED
    cancelled: '#95A5A6', // Gray - CANCELLED
  },
  
  // Priority Colors (matching Prisma Priority enum)
  priority: {
    low: '#95A5A6', // Gray - LOW
    medium: '#1E90FF', // Blue - MEDIUM
    high: '#F39C12', // Orange - HIGH
    urgent: '#E74C3C', // Red - URGENT
  },
  
  // Functional Colors
  success: '#7BC043',
  warning: '#F39C12',
  danger: '#E74C3C',
  info: '#1E90FF',
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F7FA',
    tertiary: '#EFF3F8',
  },
  
  // Text Colors
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    tertiary: '#95A5A6',
    inverse: '#FFFFFF',
  },
  
  // Border Colors
  border: {
    primary: '#E1E8ED',
    secondary: '#D1D9E0',
    tertiary: '#BDC3C7',
  },
};

export default colors;