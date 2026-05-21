import React from 'react';
import { AugmentStats, ItemStats, SummonerSpellStats } from '../types/arena';

interface StatsTableProps<T extends AugmentStats | ItemStats | SummonerSpellStats> {
  title: string;
  data: T[];
  columns: Array<{
    label: string;
    key: keyof T;
    format?: (value: any) => string;
  }>;
}

function StatsTable<T extends AugmentStats | ItemStats | SummonerSpellStats>({
  title,
  data,
  columns,
}: StatsTableProps<T>) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-2 text-left text-gray-700 font-semibold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                      {col.format ? col.format(item[col.key]) : String(item[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsTable;
