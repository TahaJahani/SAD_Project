import * as React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { Dialog, Typography, CssBaseline, Toolbar, AppBar, Drawer, Box, DialogContent, DialogTitle, Grid } from '@mui/material';
import AddLibraryForm from '../components/forms/AddLibraryForm';
import authorizedAxios from '../components/authorizedAxios';
import atoms from '../Atoms';
import { useRecoilValue } from 'recoil';
import urls from '../data/urls';
import LibraryItem from '../components/dashboard/LibraryItem';

const drawerWidth = 240;

export default function DashboardPage() {
    const [addLibraryOpen, setAddLibraryOpen] = React.useState(false)
    const [libraries, setLibraries] = React.useState([])
    const auth = useRecoilValue(atoms.AuthAtom)

    React.useEffect(() => loadLibraries('all'), [])

    const loadLibraries = (type) => {
        authorizedAxios(auth).get(urls.listLibraries, {
            params: { type: type }
        }).then(res => {
            setLibraries(res.data.libraries)
            console.log(res.data.libraries)
        }).catch(err => { })
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            App Name
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <Sidebar
                            addLibraryClicked={() => setAddLibraryOpen(true)}
                            listItemSelected={loadLibraries}
                        />
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Grid container>
                        {libraries.map(item =>
                            <Grid item xs={3}>
                                <LibraryItem name={item.name} fileCount={item.file_count} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
            <Dialog
                open={addLibraryOpen}
                onClose={() => setAddLibraryOpen(false)}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>
                    Add Library
                </DialogTitle>
                <DialogContent>
                    <AddLibraryForm close={() => setAddLibraryOpen(false)} />
                </DialogContent>
            </Dialog>
        </>
    )
}
