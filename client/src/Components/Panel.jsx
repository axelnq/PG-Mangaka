import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, Tabs, Tab, Typography, Box } from '@mui/material';
import UsersPanel from './UsersPanel'
import MangasPanel from './MangasPanel';

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
                        <Tab label="Usuarios" {...a11yProps(0)} />
                        <Tab label="Mangas" {...a11yProps(1)} />
                    </Tabs>
                    <Panel value={value} index={0}>
                        <UsersPanel />
                    </Panel>
                    <Panel value={value} index={1}>
                        <MangasPanel />
                    </Panel>
                </Box>
            </Container>
        </>

    );
}
