import React from 'react'
import {
    MenuItem,
    InputLabel,
    FormControl,
    Select
  } from '@mui/material';

export default function SelectComponent({lable,keyValue,values,setValues,choisesArray}) {
  return (
    <FormControl>

    <InputLabel id="demo-select-small-label" >
        {lable}
    </InputLabel>
    <Select
        lable={lable}
        value= {values[keyValue] || ''}
        onChange={(e) => {
            console.log(e.target.name)
            setValues({ ...values, [e.target.name]: e.target.value })
        }
        }
        inputProps={{
            name: keyValue,

        }}
    >

        {choisesArray.map(item =>
            <MenuItem key={item[keyValue]} value={item[keyValue]}>{item[keyValue]}</MenuItem>
        )}



    </Select>
</FormControl>)
}
