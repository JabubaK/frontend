import React from 'react';

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <table className="w-full text-sm text-left rtl:text-right ">
      <thead className="text-xs  uppercase ">
        <tr className='border-b bg-gray-50'>
          {columns.map((column) => (
            <th className="px-6 py-3" key={String(column.accessor)}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center">
              No data available.
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index} className='border-b'>
              {columns.map((column) => (
                <td className="px-6 py-4" key={String(column.accessor)}>
                  {column.render ? column.render(item) : (item[column.accessor as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

