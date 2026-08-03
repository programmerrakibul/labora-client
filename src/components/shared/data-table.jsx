import Pagination from "@/components/shared/pagination";
import Skeleton from "@/components/shared/skeleton";
import { CardSkeleton } from "@/components/shared/skeletons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const LoadingTable = ({ columns, rows }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-muted/50">
          {columns.map((column, index) => (
            <TableHead
              key={index}
              className={`${column.className || ""} whitespace-nowrap`}
            >
              <Skeleton className="h-4 w-24" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex} className={column.className}>
                <Skeleton
                  className={colIndex === 0 ? "h-4 w-32" : "h-4 w-24"}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const DataTable = ({
  columns,
  data = [],
  isLoading = false,
  page = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  striped = true,
  showPagination = true,
  loadingRows = 5,
  loadingCards = 3,
  emptyMessage = "No data available",
  rowKey,
  mobileCard,
  onPageChange,
}) => {
  const startIndex = data.length > 0 ? (page - 1) * pageSize + 1 : 0;
  const endIndex = Math.min(page * pageSize, totalItems);
  const tableClassName = cn(
    "overflow-x-auto rounded-lg border border-border",
    mobileCard && "hidden md:block",
  );

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className={tableClassName}>
          <LoadingTable columns={columns} rows={loadingRows} />
        </div>
        {mobileCard && (
          <div className="space-y-3 md:hidden">
            <CardSkeleton count={loadingCards} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className={tableClassName}>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`${column.className || ""} whitespace-nowrap`}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={rowKey ? row[rowKey] : index}
                  className={striped && index % 2 === 0 ? "bg-muted/20" : ""}
                >
                  {columns.map((column, colIndex) => {
                    const value = row[column.accessor];

                    return (
                      <TableCell key={colIndex} className={column.className}>
                        {column.cell ? column.cell(value, row) : String(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {mobileCard && (
        <div className="space-y-3 md:hidden">
          {data.length === 0 ? (
            <div className="rounded-lg border border-border p-8 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            data.map((row, index) => (
              <div key={rowKey ? row[rowKey] : index}>
                {mobileCard(row, index)}
              </div>
            ))
          )}
        </div>
      )}

      {showPagination && totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-3 sm:flex-row sm:gap-4 sm:px-4">
          <div className="order-2 text-center text-xs text-muted-foreground sm:order-1 sm:text-left sm:text-sm">
            <div className="hidden sm:block">
              Page {page} of {totalPages}
              {totalItems > 0 && (
                <>
                  {" "}
                  • Showing {startIndex} to {endIndex} of {totalItems} items
                </>
              )}
            </div>
            <div className="sm:hidden">
              {page} / {totalPages}
            </div>
          </div>
          <div className="order-1 sm:order-2">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
