import withRoot from './modules/withRoot';
import googleLogo from'./images/google_logo.png';
import fbLogo from'./images/facebook_logo.png';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    gimg: {
        width: theme.spacing(40),
        height: theme.spacing(10),
    },
    fbimg:{
        width: theme.spacing(40),
        height: theme.spacing(10),
    }
}));


function Account() {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">User Profile</Typography>
                    <div>
                        <List>
                            <ListItemAvatar>
                                <Avatar className={classes.large}>WL</Avatar>
                            </ListItemAvatar>
                            <ListItem>
                                <ListItemText primary="Name:" secondary = "Waleed Lazeez"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email:" secondary = "waleed.lazeez@scena.com"></ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText primary="Date of Birth:" secondary = "01/01/1969"></ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6">User Score: 100</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Linked Accounts</Typography>
                    <div>
                        <List>
                            <ListItem>
                                <Button>
                                    <div>
                                        <img className={classes.gimg} src={googleLogo}/>
                                    </div>
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button>
                                    <div>
                                        <img className={classes.fbimg} src={fbLogo}/>
                                    </div>
                                </Button>
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
}

export default withRoot(Account);