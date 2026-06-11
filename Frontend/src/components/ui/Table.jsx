const Table = ({ columns, data = [], actions }) => {
  const safeData = Array.isArray(data) ? data : [];
  
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3">{col.label}</th>
            ))}
            {actions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {safeData.map((row, i) => (
            <tr key={i} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-900 dark:text-white">
                  {col.render ? col.render(row,i) : row[col.key]}
                </td>
              ))}
              {actions && <td className="px-4 py-3">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;