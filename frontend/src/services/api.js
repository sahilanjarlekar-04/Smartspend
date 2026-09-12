const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Auth API methods
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error (login):', error);
      throw error;
    }
  },

  async register(username, email, password, fullName) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, fullName }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error (register):', error);
      throw error;
    }
  },

  // Fetch all transactions
  async getAllTransactions() {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`);
      if (!response.ok) throw new Error('Failed to fetch transactions from server');
      return await response.json();
    } catch (error) {
      console.error('API Error (getAllTransactions):', error);
      throw error;
    }
  },

  // Fetch financial summary metrics
  async getSummary() {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/summary`);
      if (!response.ok) throw new Error('Failed to fetch summary data');
      return await response.json();
    } catch (error) {
      console.error('API Error (getSummary):', error);
      throw error;
    }
  },

  // Create new transaction
  async createTransaction(transactionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error('Failed to create transaction');
      return await response.json();
    } catch (error) {
      console.error('API Error (createTransaction):', error);
      throw error;
    }
  },

  // Update transaction by ID
  async updateTransaction(id, transactionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error('Failed to update transaction');
      return await response.json();
    } catch (error) {
      console.error('API Error (updateTransaction):', error);
      throw error;
    }
  },

  // Delete transaction by ID
  async deleteTransaction(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete transaction');
      return true;
    } catch (error) {
      console.error('API Error (deleteTransaction):', error);
      throw error;
    }
  },
};
