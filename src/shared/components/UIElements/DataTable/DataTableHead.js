import "./DataTableHead.css";

const DataTableHead = props => {
  const { columns } = props;

  return (
    <thead className="data-table__thead">
      <tr>
        {columns.map((column, index) => (
          <th key={index} style={{ ...column.style }}>
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;

export default DataTableHead;
