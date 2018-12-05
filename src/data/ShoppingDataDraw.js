import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = () => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    tableContainer: {
        height: 320,
      },
    fab:{} // TODO - should be removed, but without it it is a warning message.. don't know yet why..
  });


const ShoppingElementsList = props => {
    const classes = props;
    const rows = props.tableData.map((row, index) => {
        return (
            <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button} 
                        onClick={() => props.removeItem(index)}>
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                </TableCell>
            </TableRow>
        );
    });

    return <TableBody>{rows}</TableBody>;
}


class ShoppingDataDraw extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.tableContainer}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Remove</TableCell>
                            </TableRow>
                        </TableHead>

                        <ShoppingElementsList tableData={this.props.tableData} removeItem={this.props.removeItem}/>

                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ShoppingDataDraw);