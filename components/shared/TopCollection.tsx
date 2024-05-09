"use client";

import * as React from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "@/app/context/ThemeProvider";
import Link from "next/link";
import useGetAllListings from "@/app/hooks/useGetAllListings";

export type CollectionData = {
  collection: string;
  floor: number;
  floor1dPercent: number;
  volume: number;
  topOffer: number;
  sales: number;
  marketCap: number;
  listed: number;
};

// Sample data array

const data: CollectionData[] = Array.from({ length: 10 }, (_, i) => ({
  collection: "CryptoPunks",
  floor: 120.5,
  floor1dPercent: 5,
  volume: 2000,
  topOffer: 115,
  sales: 300,
  marketCap: 2500000,
  listed: 55,
}));

export const columns: ColumnDef<CollectionData>[] = [
  {
    accessorKey: "collection",
    header: "#Collection",
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="capitalize text-base font-semibold cursor-pointer z-10"
      >
        {row.getValue("collection")}
      </Link>
    ),
  },
  {
    accessorKey: "floor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="z-10"
        >
          Floor
          <CaretSortIcon className="pl-2 h-7 w-7" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="lowercase text-base font-semibold flexCenter cursor-pointer z-10"
      >
        {row.getValue("floor")}
      </Link>
    ),
  },
  {
    accessorKey: "floor1dPercent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Floor 1d %
          <CaretSortIcon className="pl-2 h-7 w-7" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="lowercase text-base font-semibold flexCenter cursor-pointer"
      >
        {row.getValue("floor1dPercent")}
      </Link>
    ),
  },
  {
    accessorKey: "volume",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Volume
          <CaretSortIcon className="pl-2 h-7 w-7" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="lowercase text-base font-semibold flexCenter cursor-pointer"
      >
        {row.getValue("volume")}
      </Link>
    ),
  },
  {
    accessorKey: "topOffer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Top Offer
          <CaretSortIcon className="pl-2 h-7 w-7" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="lowercase text-base font-semibold flexCenter cursor-pointer"
      >
        {row.getValue("topOffer")}
      </Link>
    ),
  },
  {
    accessorKey: "sales",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-lg font-bold "
        >
          Sales
          <CaretSortIcon className="pl-2 h-7 w-7" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="tlowercase text-base font-semibold flexCenter cursor-pointer"
      >
        {row.getValue("sales")}
      </Link>
    ),
  },
  {
    accessorKey: "marketCap",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Market Cap
          <CaretSortIcon className="pl-2 h-7 w-7" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="lowercase text-base font-semibold flexCenter cursor-pointer"
      >
        {row.getValue("marketCap")}
      </Link>
    ),
  },
  {
    accessorKey: "listed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Listed
          <CaretSortIcon className="pl-2 h-7 w-7" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={"/collection"}
        className="lowercase text-base font-semibold flexCenter cursor-pointer"
      >
        {row.getValue("listed")}
      </Link>
    ),
  },
];

export function TopCollection() {
  const { theme } = useTheme();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const listings = useGetAllListings();

  const list: CollectionData[] = listings.map((item) => ({
    collection: item.tokenId,
    floor: item.price,
    floor1dPercent: 5,
    volume: item.quantity,
    topOffer: 115,
    sales: 300,
    marketCap: 2500000,
    listed: 55,
  }));

  const table = useReactTable({
    data,
    columns,
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
  });

  return (
    <div className="pt-8 pb-4 px-2">
      <div className="font-poppins font-bold text-2xl">
        <h3>Top Collections</h3>
      </div>

      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter collections..."
            value={
              (table.getColumn("collection")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("collection")?.setFilterValue(event.target.value)
            }
            className={`max-w-sm ${
              theme === "dark" ? "bg-transparent" : ""
            } z-10`}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`ml-auto ${
                  theme === "dark" ? "bg-transparent" : ""
                }`}
              >
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className={`rounded-md border ${
            theme === "dark" ? "text-[#ffffff]/70" : "text-black"
          }`}
        >
          <Table className="z-10">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="" key={header.id}>
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
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
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
