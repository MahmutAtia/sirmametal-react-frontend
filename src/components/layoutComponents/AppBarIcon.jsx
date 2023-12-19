import React from 'react'

export default function AppBarIcon({name}) {
  return (
     
    <Link to={item.link}>
    <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {index % 2 === 0 ? <HomeIcon /> : <HomeIcon />}
        </ListItemIcon>
        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />

      </ListItemButton>
    </ListItem>
  </Link>

  )
}
