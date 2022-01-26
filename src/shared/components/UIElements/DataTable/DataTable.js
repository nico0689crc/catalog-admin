import { useEffect, useState, createContext, useCallback } from "react";
import { useHttpClient } from "../../../hooks/http-hook";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import DataTableOptions from "./DataTableOptions";
import DataTablePagination from "./DataTablePagination";
import DataTableLoading from "./DataTableLoading";
import "./DataTable.css";

const PAGE_SIZE_DEFAULT = ["5", "10", "15", "all"];
const TEXT_DEFAULT = {
  page_size: "Size",
  loading: "Loading",
};

export const DataTableContext = createContext({
  refreshTable: () => {},
  setShouldRefreshDataTable: () => {},
  shouldRefreshDataTable: null,
});

const DataTable = ({
  columns,
  onSuccessFetching,
  texts = TEXT_DEFAULT,
  ...restProps
}) => {
  const { sendRequest } = useHttpClient();
  const [items, setItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(PAGE_SIZE_DEFAULT[0]);
  const [isPagination, setIsPagination] = useState(true);
  const [shouldRefreshDataTable, setShouldRefreshDataTable] = useState(false);

  const fetchItems = useCallback(async () => {
    setItems(null);
    const pagination = currentPageSize !== "all";
    setIsPagination(pagination);

    const url = pagination
      ? `${
          restProps.url
        }?page%5Bnumber%5D=${currentPage}&page%5Bsize%5D=${currentPageSize}${
          restProps.queries ? "&" + restProps.queries : ""
        }`
      : `${restProps.url}${restProps.queries ? "?" + restProps.queries : ""}`;

    await sendRequest(url, "GET").then(responseData => {
      const { items, totalItems } = onSuccessFetching(responseData);
      setItems(items);
      pagination && setTotalPages(Math.ceil(totalItems / currentPageSize));
    });

    setShouldRefreshDataTable(false);
  }, [
    currentPageSize,
    currentPage,
    onSuccessFetching,
    restProps.queries,
    restProps.url,
    sendRequest,
  ]);

  useEffect(() => {
    fetchItems();
  }, [
    sendRequest,
    onSuccessFetching,
    currentPage,
    currentPageSize,
    restProps.url,
    fetchItems,
  ]);

  return (
    <DataTableContext.Provider
      value={{
        refreshTable: fetchItems,
        setShouldRefreshDataTable,
        shouldRefreshDataTable,
      }}
    >
      <DataTableOptions
        pageSizes={PAGE_SIZE_DEFAULT}
        setCurrenPageSize={setCurrentPageSize}
        setCurrentPage={setCurrentPage}
        pageSizeText={texts.page_size}
      >
        {restProps.extraOptions}
      </DataTableOptions>
      <div className="data-table">
        <table className="data-table__table">
          {items ? (
            <>
              <DataTableHead columns={columns} />
              <DataTableBody columns={columns} items={items} />
            </>
          ) : (
            <DataTableLoading columns={columns} />
          )}
        </table>
      </div>
      {isPagination && (
        <DataTablePagination
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
          loadingText={texts.loading}
        />
      )}
    </DataTableContext.Provider>
  );
};

export default DataTable;
