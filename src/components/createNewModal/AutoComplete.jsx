import React from 'react'
import { Autocomplete, TextField, Box } from '@mui/material';

export default function AutoComplete({ options, setValues, values }) {
    return (

        <>
            <Autocomplete

                getOptionLabel={(option) => option.name}

                onChange={(e, newValue) => {
                    setValues({ ...values, ["country"]:newValue.name })
                    console.log(newValue);

                }}
                disablePortal
                className=''
                options={options}
                renderInput={
                    prams =>
                        <TextField label="Country" {...prams} />

                }
                renderOption={
                    (props, option) =>

                        <Box component="li" {...props}>
                        

                            {option.name}



                        </Box>

                }
            />

        </>

    )
}
