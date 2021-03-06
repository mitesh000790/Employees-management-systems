import React from "react";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import {commonTransition} from "../../../HelperFunction";

const DefaultDrawer = ({routeList, drawerStatus, setDrawerStatus, history}) => {

    const drawerStatusSetHandler = () => {
        setDrawerStatus(drawerStatus => ({...drawerStatus, isNarrow: !drawerStatus.isNarrow}));
    };

    const theme = useTheme();
    const isGreaterThanSmallBreakpoint = useMediaQuery(
        theme.breakpoints.up("sm")
    );

    return (
        <Drawer
            id={"Drawer"}
            variant={isGreaterThanSmallBreakpoint || drawerStatus.isNarrow ? "persistent" : "temporary"}
            open={drawerStatus.isOpen} anchor={"left"}
            onClose={() => {
            }}
            sx={{
                width: (theme) => drawerStatus.isOpen ? drawerStatus.isNarrow ? `calc(${theme.spacing(8.6)})` : `200px` : `0`,
                ...(commonTransition(`width`)),
                "& .MuiDrawer-paper": {
                    ...(commonTransition(`transform, width`)),
                    width: (theme) => drawerStatus.isNarrow ? `calc(${theme.spacing(8.6)})` : `200px`,
                    overflowX: `hidden`,
                    position: `relative`,
                },
            }}>
            <Box>
                <List disablePadding>
                    {
                        routeList.filter(
                            e => e.haveViewInDrawer).map(
                            eachListItem => <ListItem
                                key={eachListItem.key}
                                button={eachListItem.isButton}
                                selected={history.location.pathname.startsWith(eachListItem.route)}
                                onClick={() => {
                                    history.replace(eachListItem.route || '/')
                                }}
                                sx={{
                                    px: {
                                        xs: 2.75,
                                        sm: 2.75
                                    },
                                    py: {
                                        xs: 1.25,
                                        sm: 1.25
                                    }
                                }}>
                                <ListItemIcon sx={{minWidth: "46px"}}>{eachListItem.icon}</ListItemIcon>
                                <ListItemText primary={eachListItem.textValue}/>
                            </ListItem>
                        )
                    }
                </List>
                <List sx={{
                    padding: 0,
                    position: `absolute`,
                    bottom: 0,
                    right: 0,
                    overflow: `hidden`
                }}>
                    <ListItem sx={{padding: 0}} button={false}>
                        <IconButton sx={{
                            margin: `5px 10px`,
                            transform: `rotate(${drawerStatus.isNarrow ? 540 : 720}deg)`,
                            transitionProperty: `transform !important`,
                            transitionDuration: "225ms !important",
                            transitionTimingFunction: `cubic-bezier(0.25, 0.1, 0.25, 1.0) !important`,
                            transitionDelay: `0ms !important`,
                        }} size={`large`} onClick={drawerStatusSetHandler}>
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};
export default DefaultDrawer;