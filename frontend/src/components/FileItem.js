import { Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material'
import * as React from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function FileItem({ name, file, owner, description, size, can_edit, onDelete, onDownload, onShare, onEdit }) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Stack>
                    <Typography variant='h6' sx={{ mb: 2 }}>
                        {name.length > 30 ? name.substring(0, 27) + "..." : description}
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#aaaaaa', flexGrow: 1, mb: 2 }}>
                        {size}
                    </Typography>
                    <Typography variant='caption' sx={{ color: '#aaaaaa' }}>
                        {description.length > 35 ? description.substring(0, 31) + "..." : description}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'end', alignItems: 'end' }}>
                {can_edit &&
                    <>
                        <IconButton size='large' onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton size='large' onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton size='large' onClick={onShare}>
                            <ShareIcon />
                        </IconButton>
                    </>
                }
                <IconButton size='large' onClick={onDownload}>
                    <DownloadIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}