export const login = async (email, password) => {
  if (!email || !password) throw new Error('Email and password are required');

  const mockUsers = [{ email: 'student@example.com', password: 'password123', id: 1 }];
  const user = mockUsers.find(u => u.email === email && u.password === password);

  if (!user) throw new Error('Invalid email or password');

  return { user: { id: user.id, email: user.email, name: 'Student User' } };
};

export const logout = async () => Promise.resolve();