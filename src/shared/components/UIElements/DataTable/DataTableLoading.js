import { AiOutlineLoading } from "react-icons/ai";
import "./DataTableLoading.css";

const DataTableLoading = ({ columns, loadingText }) => {
  return (
    <tbody>
      <tr>
        <td colSpan={columns.length}>
          <div className="data-table__loading">
            <AiOutlineLoading />
            <span>{loadingText}</span>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default DataTableLoading;
