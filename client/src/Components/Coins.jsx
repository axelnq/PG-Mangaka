import React from 'react'
import NavBar from './Navbar'
import CoinsPanel from './CoinsPanel'
import Coin from '../img/coin.png'
//mui
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { AppBar, Tabs, Tab, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default function Coins() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    // modal
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <NavBar />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ mt: "2rem", mb: "1rem", width: "72px" }}>
                    <img src={Coin} alt="" srcset="" />
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ bgcolor: 'background.paper', width: "80%" }}>
                    <Box sx={{ display: "flex", justifyContent: "right", mb: "1rem" }}>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Comprar monedas
                        </Button>
                    </Box>

                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Compradas" {...a11yProps(0)} />
                            <Tab label="Usadas" {...a11yProps(1)} />
                            <Tab label="Recibidas" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <CoinsPanel />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <CoinsPanel />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <CoinsPanel />
                        </TabPanel>
                    </SwipeableViews>
                </Box>
            </Box>

            {/* modal */}
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <List dense sx={{ width: '100%', minWidth: 500, bgcolor: 'background.paper' }}>

                                <ListItem key={value} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`1`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'1 moneda'} />
                                        <Button variant="contained">Comprar</Button>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key={value} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`5`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'5 monedas'} />
                                        <Button variant="contained">Comprar</Button>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key={value} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`10`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'10 monedas'} />
                                        <Button variant="contained">Comprar</Button>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key={value} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`20`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'20 monedas + 1 moneda'} />
                                        <Button variant="contained">Comprar</Button>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key={value} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`50`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'50 monedas + 3 monedas'} />
                                        <Button variant="contained">Comprar</Button>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key={value} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`75`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'75 monedas + 5 monedas'} />
                                        <Button variant="contained">Comprar</Button>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key={value} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`100`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'100 monedas + 10 monedas'} />
                                        <Button variant="contained">Comprar</Button>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </DialogContentText>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose}>Agree</Button>
                    </DialogActions> */}
                </Dialog>
            </div>
        </div >
    )
}
