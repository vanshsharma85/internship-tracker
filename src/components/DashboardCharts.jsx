import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getStatusCounts } from '../utils/filters.js';
import { STATUS_OPTIONS } from '../utils/constants.js';

const DashboardCharts = ({ internships }) => {
  const statusCounts = getStatusCounts(internships);
  
  // ✅ FIXED: Bar data with proper format
  const barData = STATUS_OPTIONS.map(status => ({
    name: status.label,
    value: statusCounts[status.value] || 0,  // ← Add || 0 for safety
    color: status.color
  }));

  // ✅ FIXED: Pie data with proper format
  const pieData = STATUS_OPTIONS
    .filter(status => statusCounts[status.value] > 0)
    .map(status => ({
      name: status.label,
      value: statusCounts[status.value],
      color: status.color
    }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
      {/* Bar Chart */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '16px' }}>Applications by Status</h3>
        
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                stroke="#666"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#666"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#fff', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="#667eea"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            <p>No data available</p>
          </div>
        )}
      </div>

      {/* Pie Chart */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '16px' }}>Distribution</h3>
        
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={0}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                stroke="#fff"
                strokeWidth={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: '#fff', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCharts;