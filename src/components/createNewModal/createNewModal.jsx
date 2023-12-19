import React, { useMemo, useState, useCallback, useEffect } from 'react';
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
    Select,
    FormControl,

} from '@mui/material';

import axios from 'axios';
import AutoComplete from './AutoComplete';


//redux
import { useSelector } from 'react-redux';

const CreateNewAccountModal = ({ open, columns, onClose, onSubmit, states }) => {

    // Access the jwt from redux
    const jwt = useSelector(state => state.user.access)


    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );
    const [err, setErr] = useState("")

    const handleSubmit = () => {
        //put your validation logic here
        console.log(values)

        // copy value to obj to handle country cell
        const obj = Object.assign({}, values)
        delete obj["country_name"]

        //handle status cell
        obj["status"] = obj["status"] == "Important" ? true : obj["status"] == "Not Intersted" ? false : null

        console.log(obj)
        axios.post("http://127.0.0.1:8000/api/companies/", obj,{headers: {Authorization: `JWT ${jwt}`}})
            .then(res => {
                console.log(res)
                onClose();
            }).catch(err => {
                console.log(err.response.data)
                setErr(err.response.data)
            })

        setErr("")

        // update some values to fit in the table
           values["country_name"] = values["country"]
           values["status"] = obj["status"]
            
        // uptate table values    
        onSubmit(values);
    }










    return (
        <>
            <Dialog open={open}>
                <DialogTitle textAlign="center">Add New Company </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack
                            sx={{
                                width: '100%',
                                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                                gap: '1.5rem',
                                padding: "10px"
                            }}
                        >

                            <h3 className='text-red-500'> {`${JSON.stringify(err)}`}</h3>




                            {/* Company Name */}
                            <TextField
                                key={columns[0].accessorKey}
                                label={columns[0].header}
                                name={columns[0].accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />




                            {/* Country Name */}
                            <AutoComplete options={states} setValues={setValues} values={values} />






                            {/* Status */}
                            {/* <SelectComponent  /> */}

                            <FormControl>

                                <InputLabel id="demo-select-small-label" >
                                    Status
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-simple-select"
                                    lable="status"
                                    value={values["status"]}
                                    onChange={(e) => {
                                        console.log(e.target.name, e.target.value)
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }
                                    }
                                    inputProps={{
                                        name: columns[2].accessorKey,

                                    }}
                                >

                                    {["Important", "Not Intersted", "Normal"].map(item =>
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    )}



                                </Select>
                            </FormControl>







                            <TextField
                                key={columns[5].accessorKey}
                                label={columns[5].header}
                                name={columns[5].accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                            <TextField
                                key={columns[3].accessorKey}
                                label={columns[3].header}
                                name={columns[3].accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                            <TextField
                                key={columns[4].accessorKey}
                                label={columns[4].header}
                                name={columns[4].accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />




                            <TextField
                                key={columns[6].accessorKey}
                                label={columns[6].header}
                                name={columns[6].accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />

                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button color="secondary" onClick={handleSubmit} variant="contained">
                        Create New Account
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
};


export default CreateNewAccountModal