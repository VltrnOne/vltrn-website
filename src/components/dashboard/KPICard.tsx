import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  timeframe: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, timeframe }) => {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300">
      <h3 className="text-[#E0E0E0] font-montserrat text-sm mb-2">{title}</h3>
      <div className="text-2xl font-['Exo_2'] font-bold text-white mb-2">{value}</div>
      <div className="flex items-center gap-2">
        <TrendIcon
          size={16}
          className={isPositive ? 'text-green-400' : 'text-red-400'}
        />
        <span
          className={`text-sm ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-[#E0E0E0]">vs {timeframe}</span>
      </div>
    </div>
  );
};

export default KPICard;