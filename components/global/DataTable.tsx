"use client";

import { useEffect, useState } from "react";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { DraggableTableRows, DraggableWrapper } from "../ui/draggable-card";
import { slice } from "lodash";

export function DataTable({
  className,
  headerClassName,
  columns,
  data,
  loading,
  pageSize,
  onRowSelectionChange,
  loadingMessage = "درحال بارگذاری...",
  emptyMessage = "محتوا یافت نشد.",
  draggableRows = false,
  onReorder = () => {},
}: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data || [],
    columns: columns || [],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: pageSize || 20,
      },
    },
  });

  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(table.getGroupedSelectedRowModel().rows);
    }
  }, [rowSelection]);

  const TableRowWrapper = (item: any) => (
    <>
      {slice(item.getVisibleCells(), 1, item.getVisibleCells()?.length).map(
        (cell: any) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        )
      )}
    </>
  );

  return (
    <>
      <div className={`rounded-md ${className}`} dir='rtl'>
        <Table>
          <TableHeader className='text-right'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-none'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "overflow-hidden bg-muted text-right first:rounded-r-xl last:rounded-l-xl",
                        headerClassName
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {draggableRows ? (
              <DraggableTableRows
                items={table.getRowModel().rows || []}
                onReorder={onReorder}
                showDragHandle={true}
                gripType='vertical'
                containerClassName='w-full'
                layout={null}
                columns={4}
                showContainer={false}
                renderItem={TableRowWrapper}
                cardClassName='bg-transparent shadow-none'
              />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  {loading ? (
                    <span>{loadingMessage}</span>
                  ) : (
                    <span>{emptyMessage}</span>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
