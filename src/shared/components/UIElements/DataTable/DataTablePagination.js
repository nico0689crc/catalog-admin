import Button from "../../FormElements/Button/Button";
import "./DataTablePagination.css";

const DataTablePagination = ({ setCurrentPage, totalPages, currentPage }) => {
  let paginationLinks = [];

  for (let index = 0; index < totalPages; index++) {
    paginationLinks.push(
      <Button
        htmlType="button"
        type="primary"
        shape="circle"
        key={index}
        className={`${index + 1 === currentPage && "active"}`}
        onClick={() => setCurrentPage(index + 1)}
        text={`${index + 1}`}
      />
    );
  }

  return <div className="data-table__pagination">{paginationLinks}</div>;
};

export default DataTablePagination;
