import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import UsageTable from './usagetable.js';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {

    handleClose = () => {
        this.props.onClose();
    };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">List Of Users And Their Total Usage</DialogTitle>
        <div>
            <UsageTable data={this.props.data}/>
        </div>
      </Dialog>
    );
  }
}


const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class UserReportDialog extends React.Component {
    state = {
        open: false,
        userUsages: [],
    };

    handleClickOpen = () => {
        this.setState({
        open: true,
        });
    };

    _fetchData = ()=> {
        if(this.state.userUsages.length == 0) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if(xhttp.readyState === 4 && xhttp.status === 200) {
                    const jsonData = JSON.parse(xhttp.responseText);
                    this.setState({userUsages:jsonData});
                    console.log(jsonData);
                }
            };
            xhttp.open("GET", "http://localhost:8080/api/diskusage/", true);
            xhttp.send();
        }
    }

    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
    };

  render() {
    return (
      <div>
        <Button variant="outlined"  onClick={this.handleClickOpen}>User Report</Button>
        <SimpleDialogWrapped open={this.state.open} onClose={this.handleClose} onEntering={this._fetchData} data={this.state.userUsages}/>
      </div>
    );
  }
}

export default UserReportDialog;