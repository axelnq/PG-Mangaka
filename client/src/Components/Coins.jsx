import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import NavBar from "./Navbar";
import CoinsPanel from "./CoinsPanel";
import empty from "../img/empty.png";
import love from "../img/love.png";
import mask from "../img/mask.png";
import mountain from "../img/mountain.png";
import tree from "../img/tree.png";
import flower from "../img/flower.png";
import mangaka from "../img/mangaka.png";
//mui
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Avatar,
    CircularProgress
} from "@mui/material";
import {
    buyCoins,
    getCurrentUser,
    getPacks,
    getPreferenceId
} from "../Actions";
import Cart from "./Cart";
// const Mercadopago = require('mercadopago');

//modal
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//panel coins
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
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

//component
export default function Coins() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPacks());
        dispatch(getCurrentUser());
    }, [dispatch]);

    let packs = useSelector((state) => state.getPacks);
    let user = useSelector((state) => state.user);
    const data2 = useSelector((state) => state.preferenceId);
    console.log(data2);
    console.log(packs);
    console.log(user);

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

    const coinImgs = [mangaka, mask, love, tree, mountain, flower];

    const changeImg = () => {
        let coinRandom = Math.floor(Math.random() * coinImgs.length);
        document.getElementById("coinImg").src = coinImgs[coinRandom];
    };

    const [buy, setBuy] = useState(false);
    const [bought, setBought] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleBuy = (e) => {
        console.log(e.target.value);
        let packBought = packs.filter((pack) => pack.id == e.target.value);
        console.log(packBought[0]);
        let packInfo = {
            title: packBought[0].title,
            buyprice: packBought[0].buyprice,
            idaux: packBought[0].id,
        };
        console.log(packInfo);
        dispatch(buyCoins(packInfo));
        console.log("handle", data2);
        setBought(true);
        setLoading(true);
        // setBuy(true);
        // dispatch(getPreferenceId())
    };

    useEffect(() => {
        if (bought) {
            console.log(data2)
            setTimeout(() => {
                setLoading(false)
                setBuy(true)
            }, 1000)
        }
    }, [bought])

    // Agrega credenciales de SDK
    // const mp = new MercadoPago("PUBLIC_KEY", {
    //     locale: "es-AR",
    // });

    // // Inicializa el checkout
    // mp.checkout({
    //     preference: {
    //         id: "YOUR_PREFERENCE_ID",
    //     },
    //     render: {
    //         container: ".cho-container", // Indica el nombre de la clase donde se mostrará el botón de pago
    //         label: "Comprar", // Cambia el texto del botón de pago (opcional)
    //     },
    // });

    const handleCart = () => {
        setBought(false)
        setBuy(false)
    }

    return (
        <div>
            <NavBar />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ mt: "2rem", mb: "1rem", width: "96px" }}>
                    <Button sx={{ borderRadius: "50%" }} onClick={changeImg}>
                        <img id="coinImg" src={coinImgs[0]} alt="" />
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ bgcolor: "background.paper", width: "80%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "1rem",
                        }}
                    >
                        <Typography variant="h6">Mis monedas: {user.coins}</Typography>
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
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
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
                            <List
                                dense
                                sx={{
                                    width: "100%",
                                    minWidth: 500,
                                    bgcolor: "background.paper",
                                }}
                            >
                                {packs.map((pack, index) => (
                                    <ListItem key={pack.value}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <img src={empty} alt={pack.id} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItem>
                                                <ListItemText primary={pack.title} />
                                                {
                                                    !bought ?
                                                        <Button
                                                            onClick={handleBuy}
                                                            value={pack.id}
                                                            variant="contained"
                                                        >
                                                            Comprar
                                                        </Button>
                                                        : <Button
                                                            onClick={handleBuy}
                                                            value={pack.id}
                                                            disabled
                                                            variant="contained"
                                                        >
                                                            Comprar
                                                        </Button>
                                                }
                                            </ListItem>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                {loading ?
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <CircularProgress />
                                    </Box>
                                    : null
                                }
                                {buy ?
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={(e) => handleCart(e)}>
                                            <Cart data={data2} />
                                        </Button>
                                    </Box>

                                    : null}
                            </List>
                        </DialogContentText>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose}>Agree</Button>
                    </DialogActions> */}
                </Dialog>
            </div>
        </div>
    );
}
