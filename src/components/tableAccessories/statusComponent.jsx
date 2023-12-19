import React from 'react'
import clsx from 'clsx'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ClearIcon from '@mui/icons-material/Clear';

export default function StatusComponent({text,staus}) {
    const classes = clsx(
        staus ===  "Not Intersted" && "bg-red-300",
        staus === "Important" && "bg-green-300",
        staus === "Normal"&& "bg-orange-300",
        
    )
    
  return staus === "Important" ? <ThumbUpAltIcon color='success'/> : staus === "Not Intersted" ? <ClearIcon color='error'/> : ""
}
