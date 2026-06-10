import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const loginAsAdmin = (adminToken) => {
    setToken(adminToken);
    setIsAdminAuthenticated(true);
    localStorage.setItem('adminToken', adminToken); // Cache administrative session
  };

  const logoutAdmin = () => {
    setToken(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider value={{ isAdminAuthenticated, token, loginAsAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);