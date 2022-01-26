import { useRef } from "react";
import "./DataTableOptions.css";

const DataTableOptions = ({
  setCurrenPageSize,
  setCurrentPage,
  pageSizeText,
  children,
}) => {
  const sizePageRef = useRef();
  const pageSizeChangeHandler = () => {
    setCurrenPageSize(sizePageRef.current.value);
    setCurrentPage(1);
  };

  return (
    <div className="data-table__options">
      {children}
      <label htmlFor="data-table__select" className="data-table__label">
        {pageSizeText}:
      </label>
      <select
        className="data-table__select"
        name="size-page"
        id="size-page"
        ref={sizePageRef}
        onChange={pageSizeChangeHandler}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};

export default DataTableOptions;
