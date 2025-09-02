export const API_ENDPOINTS = {
  USERS: 'https://jsonplaceholder.typicode.com/users',
  POSTS: 'https://jsonplaceholder.typicode.com/posts',
  ALBUMS: 'https://jsonplaceholder.typicode.com/albums',
} as const;

export const PAGINATION = {
  USERS_PER_PAGE: 6,
  MAX_PAGE_BUTTONS: 5,
} as const;

export const ANIMATION = {
  CARD_DELAY: 100,
  STAGGER_DELAY: 200,
  DURATION: {
    FAST: 300,
    NORMAL: 500,
    SLOW: 700,
  },
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const COLORS = {
  PRIMARY: '#6366f1',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#3b82f6',
} as const;

export const LOCAL_STORAGE_KEYS = {
  SEARCH_TERM: 'dashboard_search_term',
  CURRENT_PAGE: 'dashboard_current_page',
  THEME: 'dashboard_theme',
} as const;