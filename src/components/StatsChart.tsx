import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { CharacterStats } from './types';

interface StatsChartProps {
  stats: CharacterStats;
  color: string;
}

export const StatsChart: React.FC<StatsChartProps> = ({ stats, color }) => {
  const data = [
    { name: 'Strength', value: stats.strength },
    { name: 'Patience', value: stats.patience },
    { name: 'Fashion', value: stats.fashion },
    { name: 'IQ', value: stats.iq },
    { name: 'EQ', value: stats.eq },
    { name: 'Sense', value: stats.sense },
  ];

  return (
    <div className="h-48 w-full font-bold text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#ccc" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#000', fontSize: 10, fontWeight: 900 }} 
            axisLine={true}
            tickLine={true}
            interval={0}
          />
          <YAxis domain={[0, 5]} hide />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '2px solid black', fontWeight: 'bold' }}
          />
          <Line 
            type="linear" 
            dataKey="value" 
            stroke="#1a1a1a" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#1a1a1a', stroke: '#1a1a1a' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};