import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fracture from 'react';
import Button from '@material-ui/core/Button';
import UsageReportDialog from './dialog.js';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export default class DiskTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disks: [],
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    componentDidMount() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                const jsonData = JSON.parse(xhttp.responseText);
                // this.setState({disks:JSON.parse(xhttp.responseText).disks});
                this.setState({disks:jsonData.disks});
                console.log(jsonData.disks);
            }
        };
        xhttp.open("GET", "http://localhost:8080/api/disks", true);
        xhttp.send();
    }

    render() {
        let tableRows = this.state.disks.filter(
            (disk)=>{
                if(this.props.filterValue === 0) {
                    return true;
                } else if (this.props.filterValue === 1) {
                    return disk.diskType === "TierI";
                } else if (this.props.filterValue === 2) {
                    return disk.diskType === "TierII";
                } else if (this.props.filterValue === 3) {
                    return disk.diskType === "TierIII";
                } else {
                    return true;
                }
            }
        ).map((disk) => {
            return (
        <TableRow key={disk.id}>
          <TableCell>{disk.path}</TableCell>
          <TableCell>{disk.diskType}</TableCell>
          <TableCell>{disk.capacity}</TableCell>
          <TableCell>{disk.available}</TableCell>
          <TableCell><UsageReportDialog diskId={disk.id}/></TableCell>
        </TableRow>
            )
        });
        
        return (
            <div>
            <Table>
              <TableHead>
                <TableRow>
                    <TableCell>Path</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Capacity (GB)</TableCell>
                    <TableCell>Available Space (GB)</TableCell>
                    <TableCell>User Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows}
              </TableBody>
            </Table>
            </div>
        );
    }
}