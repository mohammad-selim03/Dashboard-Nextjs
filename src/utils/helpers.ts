import { User } from '@/types';

/**
 * Generate initials from a full name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

/**
 * Generate a consistent color from a string
 */
export const getColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: never[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Filter users by search term
 */
export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) return users;
  
  const term = searchTerm.toLowerCase();
  
  return users.filter(user => 
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.username.toLowerCase().includes(term) ||
    user.company.name.toLowerCase().includes(term)
  );
};

/**
 * Calculate pagination data
 */
export const getPaginationData = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  return {
    totalPages,
    startIndex,
    endIndex,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
    itemsOnCurrentPage: endIndex - startIndex,
  };
};

/**
 * Generate random delay for animations
 */
export const getRandomDelay = (min: number = 0, max: number = 500): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Check if code is running in browser
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Safe JSON parse with fallback
 */
export const safeJsonParse = <T>(str: string, fallback: T): T => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};