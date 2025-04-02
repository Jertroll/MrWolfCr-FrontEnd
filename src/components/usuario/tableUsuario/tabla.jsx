import { DataGrid, esES } from "@mui/x-data-grid";
import { Loading } from "../util/loading";
import { NoFiles } from "../util/NoFiles";
import { createTheme, } from "@mui/material/styles";
import { CustomToolbar } from "../util/CustomToolbar";

export const TableComponent = ({
  columns,
  rowsSet,
  isLoading,
  customButtons,
}) => {
  const theme = createTheme(esES);
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const rows = rowsSet ? rowsSet.map((cls) => ({ ...cls, id: cls.id })) : [];
  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          sx={{
            padding: "20px",
            border: "none",
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              py: "8px",
            },
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "15px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              py: "22px",
            },
            '.MuiTablePagination-displayedRows': {
              'margin-top': '1em',
              'margin-bottom': '1em'
            },
            '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
              'margin-top': '1em',
              'margin-bottom': '1em'
            }
          }}
          getEstimatedRowHeight={() => 100}
          getRowHeight={() => "auto"}
          className="rowsPerPage"
          columns={columns}
          rows={rows}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          checkboxSelection={true}
          disableMultipleRowSelection={true}
          disableColumnSelector={true}
          showCellVerticalBorder={false}
          pageSizeOptions={[5, 10]}
          slots={{
            noRowsOverlay: NoFiles,
            loadingOverlay: Loading,
            toolbar: () => CustomToolbar(customButtons),
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </div>
    </>
  );
};