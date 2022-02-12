import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, Tabs, Tab, Typography, Box } from '@mui/material';
import NavBar from './Navbar';
import UsersPanel from './UsersPanel'

function Panel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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

Panel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <NavBar />
            <Container>
                <Typography sx={{ my: '2rem', textAlign: 'left' }} variant="h4" component="div" gutterBottom>Panel Admin</Typography>
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Usuarios Activos" {...a11yProps(0)} />
                        <Tab label="Usuarios Inactivos" {...a11yProps(1)} />
                        <Tab label="Mangas Activos" {...a11yProps(2)} />
                        <Tab label="Mangas Inactivos" {...a11yProps(3)} />
                    </Tabs>
                    <Panel value={value} index={0}>
                        <UsersPanel />
                    </Panel>
                    <Panel value={value} index={1}>
                        Usuarios Inactivos
                    </Panel>
                    <Panel value={value} index={2}>
                        Mangas Activos
                    </Panel>
                    <Panel value={value} index={3}>
                        Mangas Inactivos
                    </Panel>
                </Box>
            </Container>
        </>

    );
}
