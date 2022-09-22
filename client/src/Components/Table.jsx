import React from "react";
import { useTable, useRowSelect } from "react-table";
function Table({ columns, data, onChangeSelection }) {
  const initiallySelectedRows = React.useMemo(() => new Set(["1"]), []);
  const table = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowPaths: initiallySelectedRows,
      },
      debug: true,
    },
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowPaths },
    toggleAllRowsSelected,
  } = table;

  React.useEffect(() => {
    console.log("selectedFlatRows", selectedFlatRows.length);
    onChangeSelection(selectedFlatRows.length);
  }, [selectedFlatRows, onChangeSelection]);

  return (
    <>
      <button
        onClick={() => toggleAllRowsSelected()} //trigger select all rows
      >
        Select All Rows
      </button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Selected Rows: {selectedRowPaths.size}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowPaths: [...selectedRowPaths.values()],
              "selectedFlatRows[].original": selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

export default Table;
