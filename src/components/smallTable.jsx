import React, { useMemo, useState, useEffect, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { usePostAxios } from "../hoocs/useFetchAxios";
import SelectComponent from "./createNewModal/selectComponent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import AddIcCallIcon from "@mui/icons-material/AddIcCall";

import { useSelector } from "react-redux";

export default function SmallTable({
  row,
  open,
  onClose,
  contactType,
  contactResult,
}) {
  const [loading, setLoadng] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [data, setData] = useState([]);

  //get jwt from redux
  const jwt = useSelector((state) => state.user.access);

  useEffect(() => {
    axios
      .get(row.original.contact_url)
      .then((res) => {
        setData(res.data.results);
        setLoadng(false);
      })
      .catch((err) => {
        console.log(err); // normal error if there is no contacts
        // if there is no data
        setLoadng(false);
      });
  }, []);

  // Table Columns

  const columns = useMemo(
    () => [
      {
        accessorKey: "typ",
        header: "contact_type",
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: contactType.map((contactType) => (
            <MenuItem
              key={contactType.contact_type}
              defaultValue=""
              value={contactType.contact_type}
            >
              {contactType.contact_type}
            </MenuItem>
          )),
        },
      },

      {
        accessorKey: "date",
        header: "date",
        filterFn: "lessThanOrEqualTo",
        sortingFn: "datetime",
      },
      {
        accessorKey: "result",
        header: "Result",
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: contactResult.map((contactResult) => (
            <MenuItem
              key={contactResult.contact_result}
              defaultValue=""
              value={contactResult.contact_result}
            >
              {contactResult.contact_result}
            </MenuItem>
          )),
        },
      },
    ],

    []
  );

  const handleCreateNewRow = (values) => {
    // you need another solution this row.original.contact_url is for company not contact
    // values[ "contact_url"] = row.original.contact_url; // because you will lose the link when submitting the values
    console.log(values);
    data.push(values);
    setData([...data]);
    console.log(row);
  };

  // editing logic
  const handleSaveRowEdits = ({ exitEditingMode, row, values }) => {
    // edit the row in the frontend
    values["contact_url"] = row.original.contact_url;
    data[row.index] = values;
    setData([...data]);

    //

    // grabing the endpoint
    const url = row.original.contact_url;

    // rewite the obj for the serializer
    const obj = {
      contact_type: values.typ,
      date: values.date,
      contact_result: values.result,
    };
    console.log(obj);

    // posting with axios
    axios
      .put(url, obj, {
        headers: { Authorization: `JWT ${jwt}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    exitEditingMode(); //required to exit editing mode and close modal
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("date")} contact`
        )
      ) {
      }

      //send api delete request here, then refetch or update local table data for re-render
      console.log(row.original.contact_url);
      axios
        .delete(row.original.contact_url, {
          headers: { Authorization: `JWT ${jwt}` },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err.response.data));

      // update table
      data.splice(row.index, 1);
      setData([...data]);
    },
    [data]
  );

  const handleCancelRowEdits = () => {
    console.log("canceld");
  };
  return (
    row && (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          sx={{
            p: 1,
            width: "1500px",
            height: "100%",
          }}
          open={open}
          onClose={onClose}
        >
          <DialogTitle
            className="text-blue-900 font-extrabold  "
            textAlign="center"
          >
            <p className="  inline text-black ">Contact History of</p>{" "}
            {row.original.name}
          </DialogTitle>

          <Box className="p-5">
            {/* Email , Phone Number and website */}

            <div className="flex flex-row items-center justify-start space-x-10 p-1 mb-1">
              <div className="flex flex-row items-center justify-start space-x-2">
                <p>Phone Number : </p>
                <a href={`tel:${row.original.phone}`}>
                  {row.original.phone}{" "}
                  <AddIcCallIcon fontSize="small" color="success" />
                </a>
              </div>
              <div className="flex flex-row items-center justify-start space-x-2">
                <p>Email : </p>
                <p id="email">{row.original.email} </p>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      document.getElementById("email").textContent
                    );
                  }}
                >
                  Copy Email
                </Button>
                {row.original.website === null ||
                row.original.website === "nan" ||
                row.original.website === "" ||
                row.original.website === " " ? (
                  ""
                ) : (
                  <Button
                    href={`${row.original.website}`}
                    target="_blank"
                    className="text-blue-500 text-bold"
                  >
                    Go To Website
                  </Button>
                )}
              </div>
            </div>
            <MaterialReactTable
              columns={columns || []}
              data={data}
              state={{ isLoading: loading }}
              enablePagination={false}
              enableGlobalFilter={false}
              enableDensityToggle={false}
              enableGlobalFilterRankedResults={false}
              // editing
              enableEditing
              enableD
              onEditingRowSave={handleSaveRowEdits}
              onEditingRowCancel={handleCancelRowEdits}
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRow(row)}
                    >
                      <Delete />
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
                  Add New Contact
                </Button>
              )}
            />
            <CreateNewCompanyModal
              company_row={row}
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
              contactType={contactType}
              contactResult={contactResult}
            />
          </Box>
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
}

// Modal for creating new contact
const CreateNewCompanyModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  company_row,
  contactType,
  contactResult,
}) => {
  //get jwt from redux
  const jwt = useSelector((state) => state.user.access);

  // react table ??
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  // Submit New Contact
  const handleSubmit = () => {
    console.log(values);
    //put your validation logic here

    // 1- handle todays date as default
    if (values.date === "") {
      values.date = dayjs().format("YYYY-MM-DD");
    }

    // grabing the endpoint
    const url = "http://localhost:8000/api/companies/";
    const company_id = company_row.original.id;
    const endpoint = "company/" + company_id;

    // rewite the obj for the serializer
    const obj = {
      contact_type: values.contact_type,
      date: values.date,
      contact_result: values.contact_result,
    };

    // posting with axios
    axios
      .post(url + endpoint, obj, {
        headers: { Authorization: `JWT ${jwt}` },
      })
      .catch((err) => console.log(err.response.data));
    console.log(obj);

    // update the table
    values["typ"] = values["contact_type"];
    values["result"] = values["contact_result"];

    onSubmit(values);

    // close the modal
    onClose();
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New Account</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
              }}
            >
              {/* Contact */}
              <SelectComponent
                lable={"Contact Type"}
                keyValue={"contact_type"}
                choisesArray={contactType}
                values={values}
                setValues={setValues}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={dayjs()}
                  label="Date"
                  onChange={(v) => {
                    console.log(dayjs().format("YYYY-MM-DD"));
                    setValues({
                      ...values,
                      ["date"]: `${v.$y}-${v.$M + 1}-${v.$D}`,
                    });
                  }}
                />
              </LocalizationProvider>

              {/* Results */}
              <SelectComponent
                lable={"Contact Result"}
                keyValue={"contact_result"}
                choisesArray={contactResult}
                values={values}
                setValues={setValues}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Create New Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


