import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Customer } from '../types';

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const customer = customers[index];
    return (
      <div style={style} className="p-4 border-b hover:bg-gray-50">
        <h3 className="font-bold text-gray-800">{customer.firstName} {customer.lastName}</h3>
        <p className="text-sm text-gray-600">{customer.email}</p>
      </div>
    );
  };

  return (
    <List
      height={400}
      itemCount={customers.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default CustomerList;
