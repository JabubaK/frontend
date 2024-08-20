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
    <div className="border border-gray-300 rounded-xl overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right border-collapse">
        <thead className="text-xs uppercase bg-gray-50">
          <tr className="border-b">
            {columns.map((column) => (
              <th className="px-6 py-3" key={String(column.accessor)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} // Alterna colores entre filas
              >
                {columns.map((column) => (
                  <td className="px-6 py-4" key={String(column.accessor)}>
                    {column.render
                      ? column.render(item)
                      : (item[column.accessor as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
