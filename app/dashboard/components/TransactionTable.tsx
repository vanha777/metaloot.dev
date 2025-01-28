import { useState } from 'react';
import { FaExchangeAlt, FaFire, FaPlus } from 'react-icons/fa';
import { format } from 'date-fns';

export interface Transaction {
  transactionId: string;
  timestamp: string;
  fromWallet: string;
  toWallet: string;
  tokenAmount: number;
  transactionType: 'Transfer' | 'Mint' | 'Burn';
  gameName: string;
  status: 'Success' | 'Pending' | 'Failed';
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [sortField, setSortField] = useState<keyof Transaction>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getTransactionTypeIcon = (type: Transaction['transactionType']) => {
    switch (type) {
      case 'Transfer':
        return <FaExchangeAlt className="text-blue-400" />;
      case 'Mint':
        return <FaPlus className="text-green" />;
      case 'Burn':
        return <FaFire className="text-red-500" />;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Success':
        return 'text-green';
      case 'Pending':
        return 'text-yellow-500';
      case 'Failed':
        return 'text-red-500';
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, HH:mm');
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'desc' 
        ? new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime()
        : new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
    }
    
    if (a[sortField] < b[sortField]) return sortDirection === 'desc' ? 1 : -1;
    if (a[sortField] > b[sortField]) return sortDirection === 'desc' ? -1 : 1;
    return 0;
  });

  const handleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-white/10">
            <th className="p-4 text-gray-400 font-medium">
              <button 
                onClick={() => handleSort('timestamp')}
                className="flex items-center gap-2 hover:text-white"
              >
                Time
              </button>
            </th>
            <th className="p-4 text-gray-400 font-medium">Type</th>
            <th className="p-4 text-gray-400 font-medium">Game</th>
            <th className="p-4 text-gray-400 font-medium">From</th>
            <th className="p-4 text-gray-400 font-medium">To</th>
            <th className="p-4 text-gray-400 font-medium text-right">
              <button 
                onClick={() => handleSort('tokenAmount')}
                className="flex items-center gap-2 hover:text-white ml-auto"
              >
                Amount
              </button>
            </th>
            <th className="p-4 text-gray-400 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((tx) => (
            <tr 
              key={tx.transactionId} 
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="p-4 text-white">
                {formatDate(tx.timestamp)}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {getTransactionTypeIcon(tx.transactionType)}
                  <span className="text-white">{tx.transactionType}</span>
                </div>
              </td>
              <td className="p-4 text-white">{tx.gameName}</td>
              <td className="p-4 text-gray-400 font-mono">
                {truncateAddress(tx.fromWallet)}
              </td>
              <td className="p-4 text-gray-400 font-mono">
                {truncateAddress(tx.toWallet)}
              </td>
              <td className="p-4 text-white text-right">
                {tx.tokenAmount.toLocaleString()}
              </td>
              <td className={`p-4 ${getStatusColor(tx.status)}`}>
                {tx.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 