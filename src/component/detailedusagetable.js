import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class DetailedUsageTable extends React.Component {

    render() {
        return (
            <Paper>
            <Table>
                <TableBody>
                {this.props.data.filter(
                    (n)=>{
                        if(n.used > 50.0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                ).
                map(n => {
                    return (
                    <TableRow>
                        <TableCell component="th" scope="row">
                        {n.userId}
                        </TableCell>
                        <TableCell numeric>{n.used}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </Paper>
        );
    }
}

DetailedUsageTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedUsageTable);