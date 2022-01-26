import {
  RiDeleteBin6Line,
  RiEdit2Line,
  RiFileSearchLine,
} from "react-icons/ri";
import DataTableActions from "./DataTableActions";
import "./DataTableBody.css";

const DataTableBody = props => {
  const { columns, items } = props;

  return (
    <tbody className="data-table__body">
      {items &&
        items.length > 0 &&
        items.map((item, indexTr) => {
          return (
            <tr key={indexTr}>
              {columns.map((column, indexTd) => {
                let innerElement;

                if (column.showActions) {
                  innerElement = (
                    <div className="data-table__actions">
                      {column.showActions.view && (
                        <DataTableActions
                          type="action-view"
                          icon={<RiFileSearchLine />}
                          item={item}
                          modalHeader={column.showActions.view.modalHeader}
                          content={column.showActions.view.component}
                        />
                      )}
                      {column.showActions.edit && (
                        <DataTableActions
                          type="action-edit"
                          icon={<RiEdit2Line />}
                          item={item}
                          modalHeader={column.showActions.edit.modalHeader}
                          content={column.showActions.edit.component}
                        />
                      )}
                      {column.showActions.delete && (
                        <DataTableActions
                          type="action-delete"
                          icon={<RiDeleteBin6Line />}
                          item={item}
                          modalHeader={column.showActions.delete.modalHeader}
                          content={column.showActions.delete.component}
                          className={column.showActions.delete.className}
                        />
                      )}
                    </div>
                  );
                } else {
                  innerElement = column.selector(item);
                }

                return (
                  <td key={indexTd} style={{ ...column.style }}>
                    {innerElement}
                  </td>
                );
              })}
            </tr>
          );
        })}
    </tbody>
  );
};

export default DataTableBody;
