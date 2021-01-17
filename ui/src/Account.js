import withRoot from "./modules/withRoot";
import googleLogo from "./images/google_logo.png";
import verifiedIcon from "./images/verified-icon.svg";
import fbLogo from "./images/facebook_logo.png";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import AppAppBar from "./modules/views/AppAppBar";
import Divider from "@material-ui/core/Divider";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import MailOutline from "@material-ui/icons/MailOutline";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import LinkIcon from "@material-ui/icons/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import AppleIcon from "@material-ui/icons/Apple";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IdentityModal from "./IdentityModal";
import "./account.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
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
  fbimg: {
    width: theme.spacing(40),
    height: theme.spacing(10),
  },
  listItemPrimary: {
    fontSize: 22,
    marginLeft: -8,
  },
  listItemSecondary: {
    fontSize: 16,
    marginLeft: -8,
  },
}));

function Account() {
  const classes = useStyles();
  const [data, setData] = React.useState({
    trustScore: 50,
  });

  let pathColor = "red";

  if (data?.trustScore > 100 && data?.trustScore < 300) {
    pathColor = "orange";
  } else if (data?.trustScore >= 300 && data?.trustScore <= 400) {
    pathColor = "yellow";
  } else if (data?.trustScore > 400) {
    pathColor = "green";
  }

  return (
    <div className={classes.root}>
      <AppAppBar title="OpenCheck – My Account" showAuthButtons={false} />

      <div style={{ paddingLeft: 96, paddingRight: 96, paddingTop: 32 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="left">
              User Profile
            </Typography>
            <div>
              <List>
                <ListItemAvatar>
                  <Avatar className={classes.large}>WL</Avatar>
                </ListItemAvatar>
                <ListItem>
                  <ListItemText
                    classes={{
                      primary: classes.listItemPrimary,
                      secondary: classes.listItemSecondary,
                    }}
                    primary="Name:"
                    secondary="Waleed Lazeez"
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    classes={{
                      primary: classes.listItemPrimary,
                      secondary: classes.listItemSecondary,
                    }}
                    primary="Email:"
                    secondary="waleed.lazeez@scena.com"
                  ></ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText
                    classes={{
                      primary: classes.listItemPrimary,
                      secondary: classes.listItemSecondary,
                    }}
                    primary="Date of Birth:"
                    secondary="01/08/1998"
                  ></ListItemText>
                </ListItem>
              </List>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            direction="column"
            container
            alignItems="center"
          >
            <Typography variant="h1">Trust Score</Typography>
            <Grid item>
              {/* <Typography variant="h3">100</Typography> */}

              <div
                style={{
                  width: 160,
                  height: 160,
                  display: "flex",
                  marginTop: 8,
                }}
              >
                <AnimatedProgressProvider
                  valueStart={0}
                  valueEnd={50}
                  duration={1.4}
                  easingFunction={easeQuadInOut}
                >
                  {(value) => {
                    const roundedValue = Math.round(value);
                    return (
                      <CircularProgressbarWithChildren
                        minValue={0}
                        maxValue={500}
                        value={roundedValue}
                        strokeWidth={10}
                        styles={buildStyles({
                          pathColor: pathColor,
                          strokeLinecap: "butt",
                        })}
                      >
                        <VerifiedUserIcon style={{ fontSize: 48 }} />
                        {/* <img src={VerifiedUserIcon} alt="icon" /> */}
                        <div style={{ fontSize: 24 }}>
                          <strong>50</strong>
                        </div>
                      </CircularProgressbarWithChildren>
                    );
                  }}
                </AnimatedProgressProvider>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="column"
              container
              alignItems="center"
            >
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EventAvailableIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Proved date of birth"
                    secondary="Age: 22"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <MailOutline />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Verified email"
                    secondary="Jan 17, 2021"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LinkedInIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Proved LinkedIn identity"
                    // secondary=
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>

        <div style={{ marginTop: -72 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" align="left">
                Prove Your Identity
              </Typography>
              <div style={{ marginLeft: -10 }}>
                <List>
                  <ListItem>
                    <Button
                      startIcon={<LinkIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Link Google Account
                    </Button>
                    {/* <img className={classes.gimg} src={googleLogo} /> */}
                  </ListItem>
                  <ListItem>
                    <Button
                      startIcon={<FacebookIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Link Facebook Account
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      startIcon={<AppleIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Link Apple Account
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      startIcon={<GitHubIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Link GitHub Account
                    </Button>
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
      
        <div style={{float: "left",paddingLeft: 6,paddingBottom: 20}}>
            <IdentityModal/>
        </div>
      </div>
    </div>
  );
}

export default withRoot(Account);
