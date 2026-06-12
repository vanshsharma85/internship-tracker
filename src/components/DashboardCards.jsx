import React from 'react';
import { DASHBOARD_CARDS } from '../utils/constants.js';

const DashboardCards = ({ internships }) => {
  const total = internships.length;
  const inProgress = internships.filter(i => i.status === 'Applied' || i.status === 'Screening' || i.status === 'Interview').length;
  const interviews = internships.filter(i => i.status === 'Interview').length;
  const offers = internships.filter(i => i.status === 'Offer').length;
  const rejected = internships.filter(i => i.status === 'Rejected').length;

  const stats = { total, inProgress, interviews, offers, rejected };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
      {DASHBOARD_CARDS.map((card) => (
        <div key={card.key} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: `4px solid ${card.color}` }}>
          <div style={{ fontSize: '36px' }}>{card.icon}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{card.label}</span>
            <span style={{ fontSize: '28px', fontWeight: '700', color: '#333' }}>{stats[card.key]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;