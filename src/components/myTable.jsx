import React, { useMemo, useState, useCallback, useEffect } from "react";
// import {handleSaveRowEdits} from "../helper/mainTableHelper"
import StatusComponent from "./tableAccessories/statusComponent";

import MaterialReactTable from "material-react-table";
import SmallTable from "./smallTable";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  NativeSelect,
  Stack,
  TextField,
  Tooltip,
  InputLabel,
} from "@mui/material";

// icons
import {
  CommentsDisabledOutlined,
  Create,
  Delete,
  Edit,
  TroubleshootOutlined,
} from "@mui/icons-material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import TableViewIcon from "@mui/icons-material/TableView";


import axios from "axios";
import CreateNewAccountModal from "./createNewModal/createNewModal";

//redux
import { useSelector } from "react-redux";

export default function Table({
  tableData,
  setTableData,
  states,
  contactType,
  contactResult,
}) {
  // states

  //data and fetching state

  // const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [SmallTableOpen, setSmallTableOpen] = useState(false);
  const [rowSmallTable, setRow] = useState();

  //get jwt from redux
  const jwt = useSelector((state) => state.user.access);

  // const [tableData, setTableData] = useState([])
  const [validationErrors, setValidationErrors] = useState({});
  const handleSmallTable = (row) => {
    setRow(row);
    setSmallTableOpen(true);
    console.log(row);
    console.log(rowSmallTable);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      //put your validation logic here

      // copy value to obj to handle country cell
      const obj = Object.assign({}, values);
      obj["country"] = obj["country_name"];
      delete obj["country_name"];

      //handle status cell
      obj["status"] =
        obj["status"] == "Important"
          ? true
          : obj["status"] == "Not Intersted"
          ? false
          : null;

      // update database
      axios
        .put(row.original.company_url, obj, {
          headers: { Authorization: `JWT ${jwt}` },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          const error = err.response.data;
          alert(Object.entries(error));
        });

      // update table data
      values["company_url"] = row.original.company_url; // update contact url you lose it when you edit
      values["contact_url"] = row.original.contact_url; // update contact url you lose it when you edit
      values["status"] = obj["status"]; // update status to true or false
      tableData[row.index] = values; // update row

      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("name")}`
        )
      ) {
        return;
      }

      //send api delete request here, then refetch or update local table data for re-render
      console.log(row.original);
      axios
        .delete(row.original.company_url, {
          headers: { Authorization: `JWT ${jwt}` },
        })
        .then((res) => {
          console.log(res);
        });

      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Company Name",
        size: 30,
        enableClickToCopy: true,
      },

      {
        accessorKey: "country_name",
        header: "Country",
        size: 10,

        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: states.map((state) => (
            <MenuItem key={state.name} value={state.name}>
              {state.name}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: "status",

        // to be able to sort by status you need to add accessorFn to extract the value from the row
        accessorFn: (row) => {
          return row.status === true
            ? "Important"
            : row.status === false
            ? "Not Intersted"
            : "Normal";
        },

        header: "Status",
        size: 3,

        Cell: ({ cell, column }) => {
          return (
            <StatusComponent text={cell.getValue()} staus={cell.getValue()} />
          );
        },
        muiTableBodyCellEditTextFieldProps: ({ cell, column, row, table }) => {
          return {
            select: true, //change to select for a dropdown

            //to get the value of the cell
            children: ["Important", "Not Intersted", "Normal"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            )),
          };
        },
      },
      {
        accessorKey: "manager",
        header: "Manager",
        size: 10,
        Cell: ({ cell, column }) => {
          if (
            cell.getValue() === null ||
            cell.getValue() === "nan" ||
            cell.getValue() === "" ||
            cell.getValue() === " "
          ) {
            return "";
          } else {
            return cell.getValue();
          }
        },
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 30,
        enableClickToCopy: true,
        Cell: ({ cell, column }) => {
          if (
            cell.getValue() === null ||
            cell.getValue() === "nan" ||
            cell.getValue() === "" ||
            cell.getValue() === " "
          ) {
            return "";
          } else {
            return (
              <>
                <p>{cell.getValue()}</p>
                <a
                  href={`tel:${cell.getValue().trim()}`}
                  className="hover:shadow-lg hover:shadow-blue-500"
                >
                  <AddIcCallIcon fontSize="small" color="success" />
                </a>
              </>
            );
          }
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 10,
        enableClickToCopy: true,
        Cell: ({ cell, column }) => {
          if (
            cell.getValue() === null ||
            cell.getValue() === "nan" ||
            cell.getValue() === "" ||
            cell.getValue() === " "
          ) {
            return "";
          } else {
            return (
              <p className="text-blue-500 text-bold shadow-blue-300"> Copy </p>
            );
          }
        },
      },
      {
        accessorKey: "website",
        header: "Website",
        size: 10,
        enableClickToCopy: true,
        Cell: ({ cell, column }) => {
          if (
            cell.getValue() === null ||
            cell.getValue() === "nan" ||
            cell.getValue() === "" ||
            cell.getValue() === " "
          ) {
            return "";
          } else {
            return (
              <a
                href={`${cell.getValue()}`}
                target="_blank"
                className="text-blue-500 text-bold"
              >
                {" "}
                Click{" "}
              </a>
            );
          }
        },
      },

      // {
      //     accessorKey: 'status', header: 'Status', size: 50,
      //      accessorFn: (row) => {
      //        if (row.important)return "Important"
      //        if (row.not_intersted)return "Not Intersted"
      //        else return "Normal"

      //      },
      //     //type: "singleSelect",
      // //    valueOptions: ["important", "Not Intersted", "Normal"],
      //     // renderCell:prams=>{console.log(prams.colDef.valueOptions)}
      // },
      // {
      //     accessorKey: 'Update', header: 'Update', size: 50,
      //   //  renderCell: (prams) => <Button onClick={() => console.log(prams.row)}> Update</Button>
      // },
    ],
    [states]
  );

  return (
    <>
      <MaterialReactTable
        editingMode="modal"
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 40,
          },
        }}
        columns={columns || []}
        data={tableData || []}
        enableColumnOrdering
        enableEditing
        // state={{ isLoading: isLoading }}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip arrow placement="right" title="Contact History">
              <IconButton
                color="secondary"
                onClick={() => handleSmallTable(row)}
              >
                <TableViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Add New Company
          </Button>
        )}
      />

      {SmallTableOpen && (
        <SmallTable
          contactType={contactType}
          contactResult={contactResult}
          row={rowSmallTable}
          open={SmallTableOpen}
          onClose={() => setSmallTableOpen(false)}
          // onSubmit={handleCreateNewRow}
          // states={states}
        />
      )}
      {/* the Modal to Add new Company */}
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        states={states}
      />
    </>
  );
}
