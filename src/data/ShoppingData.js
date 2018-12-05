import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import AddIcon from '@material-ui/icons/Add';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Data from './Data';
import {CategoriesEnum} from './CategoriesEnum';
import Fab from '@material-ui/core/Fab';


const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 120,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        //bottom: theme.spacing.unit * 2,
        //right: theme.spacing.unit * 2,
      },
  });


class ShoppingData extends Data {

    constructor(name, desc) {
        super(name, CategoriesEnum.eShopping)

        this.desc = desc;
    }

    DrawElement(key) {
        return (
            <TableRow key={key}>
                <TableCell component="th" scope="row">
                    {this.name}
                </TableCell>
                <TableCell>{this.desc}</TableCell>
            </TableRow>
        );
    }

    static handleAddItem(tableData) {
        tableData.push(new ShoppingData('ala', 'makota'));
    }

    static DrawPage(props, tableData) {
        const { classes } = props;

        return (
            <div>
                <div className={classes.tableContainer}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((n, idx) => {
                                    return n.DrawElement(idx);
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                <Fab 
                    className={classes.fab}
                    onClick={() => ShoppingData.handleAddItem(tableData)}
                    color='primary'>
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}

export default withStyles(styles)(ShoppingData);
