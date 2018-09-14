import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import UserReportDialog from './usagedialog.js';
// import DetailedUserReportDialog from './detailedusagedialog';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
              <UserReportDialog/>
              {/*<DetailedUserReportDialog/>*/}
              <Typography variant="title" color="inherit" className={classes.flex}>
              US TCAD AE Storage Monitoring
              </Typography>
              <div>
                <TextField
                select
                id="persistent-anchor"
                label="Filter"
                value={this.props.filterValue}
                onChange={this.props.filterHandler}
                margin="normal"
                >
                <MenuItem value={0}>All Disks</MenuItem>
                <MenuItem value={1}>TierI Disks</MenuItem>
                <MenuItem value={2}>TierII Disks</MenuItem>
                <MenuItem value={3}>TierIII Disks</MenuItem>
                </TextField>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);