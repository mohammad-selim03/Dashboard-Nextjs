import { User } from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

// In-memory cache interface
interface CacheEntry {
  data: User[];
  timestamp: number;
  expires: number;
}

/**
 * Enhanced User Service with optimized caching and reduced API calls
 */
export class UserService {
  private static readonly BASE_URL = API_ENDPOINTS.USERS;
  private static readonly CACHE_DURATION = 1000 * 60 * 10; // 10 minutes
  private static cache: CacheEntry | null = null;
  private static pendingRequest: Promise<User[]> | null = null;

  /**
   * Check if cached data is still valid
   */
  private static isCacheValid(): boolean {
    return this.cache !== null && Date.now() < this.cache.expires;
  }

  /**
   * Fetch all users with optimized caching and request deduplication
   */
  static async getAllUsers(): Promise<User[]> {
    // Return cached data if valid
    if (this.isCacheValid()) {
      console.log('Returning cached users data');
      return this.cache!.data;
    }

    // If there's already a pending request, wait for it
    if (this.pendingRequest) {
      console.log('Waiting for pending request...');
      return this.pendingRequest;
    }

    // Create new request
    this.pendingRequest = this.fetchUsersFromAPI();
    
    try {
      const users = await this.pendingRequest;
      
      // Cache the result
      this.cache = {
        data: users,
        timestamp: Date.now(),
        expires: Date.now() + this.CACHE_DURATION,
      };
      
      console.log(`Cached ${users.length} users for ${this.CACHE_DURATION / 1000 / 60} minutes`);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } finally {
      this.pendingRequest = null;
    }
  }

  /**
   * Internal method to fetch users from API
   */
  private static async fetchUsersFromAPI(): Promise<User[]> {
    const response = await fetch(this.BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Use cache-first strategy
      cache: 'force-cache',
      next: { revalidate: 600 }, // 10 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users: User[] = await response.json();
    return users;
  }

  /**
   * Fetch a single user by ID
   */
  static async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw new Error(`Failed to fetch user with id ${id}`);
    }
  }

  /**
   * Clear the cache manually (useful for testing or force refresh)
   */
  static clearCache(): void {
    this.cache = null;
    this.pendingRequest = null;
    console.log('User cache cleared');
  }

  /**
   * Get cache info for debugging
   */
  static getCacheInfo() {
    if (!this.cache) {
      return { cached: false, users: 0 };
    }
    
    return {
      cached: true,
      users: this.cache.data.length,
      age: Math.floor((Date.now() - this.cache.timestamp) / 1000),
      remainingTime: Math.max(0, Math.floor((this.cache.expires - Date.now()) / 1000)),
      valid: this.isCacheValid(),
    };
  }

  /**
   * Optimized search that uses cached data
   */
  static async searchUsers(query: string): Promise<User[]> {
    const users = await this.getAllUsers(); // This will use cache if available
    
    if (!query.trim()) {
      return users;
    }

    const searchTerm = query.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm) ||
      user.company.name.toLowerCase().includes(searchTerm) ||
      user.address.city.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get paginated users
   */
  static async getPaginatedUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<{ users: User[]; total: number; totalPages: number }> {
    try {
      const allUsers = await this.getAllUsers();
      const total = allUsers.length;
      const totalPages = Math.ceil(total / limit);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const users = allUsers.slice(startIndex, endIndex);

      return {
        users,
        total,
        totalPages,
      };
    } catch (error) {
      console.error('Error fetching paginated users:', error);
      throw new Error('Failed to fetch paginated users');
    }
  }

  /**
   * Validate user data
   */
  static validateUser(user: Partial<User>): boolean {
    const requiredFields: (keyof User)[] = ['id', 'name', 'email'];
    
    return requiredFields.every(field => 
      user[field] !== undefined && user[field] !== null
    );
  }

  /**
   * Transform user data for display
   */
  static transformUserForDisplay(user: User) {
    return {
      ...user,
      displayName: user.name,
      displayEmail: user.email.toLowerCase(),
      initials: user.name
        .split(' ')
        .map(n => n.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      fullAddress: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
    };
  }
}