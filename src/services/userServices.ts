import { User } from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

/**
 * User Service - Handles all user-related API calls
 */
export class UserService {
  private static readonly BASE_URL = API_ENDPOINTS.USERS;

  /**
   * Fetch all users from the API
   */
  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(this.BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add caching for better performance
        cache: 'force-cache',
        next: { revalidate: 3600 }, // Revalidate every hour
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users: User[] = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
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
   * Search users by name or email (client-side filtering)
   */
  static async searchUsers(query: string): Promise<User[]> {
    try {
      const users = await this.getAllUsers();
      
      if (!query.trim()) {
        return users;
      }

      const searchTerm = query.toLowerCase();
      return users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error('Failed to search users');
    }
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