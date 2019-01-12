import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
//import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import i18n from '../i18n';

const styles = () => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: '90%',
    },
    disableSelect: {
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none'
    },
    tableContainer: {
        height: 320,
    },
    fabAdd:{}, fabMenu:{} // TODO - should be removed, but without it it is a warning message.. don't know yet why..
  });

const SortableTableRow = SortableElement(({idx, row, removeItem, classes}) => {
    return (
        <TableRow className={classes.disableSelect}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.desc}</TableCell>
            <TableCell>
                <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => removeItem(idx)}>
                    {i18n.t('Done')}
                    <DoneIcon className={classes.rightIcon} />
                </Button>
                {/*<Button
                    color="secondary"
                    className={classes.button}
                    onClick={() => removeItem(idx)}>
                    {i18n.t('Delete')}
                    <DeleteIcon className={classes.rightIcon} />
                </Button>*/}
            </TableCell>
        </TableRow>
      );
  }
)


const ShoppingElementsList = SortableContainer(({tableData, classes, removeItem}) => {
    const rows = tableData.map((row, index) => {
        return (
            <SortableTableRow 
                key={`item-${index}`} 
                index={index}
                idx={index} 
                row={row} 
                removeItem={removeItem} 
                classes={classes}/>
        );
    });

    return <TableBody>{rows}</TableBody>;
});


class ShoppingDataDraw extends React.Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.moveElemInArray(oldIndex, newIndex);
      };

    render() {
        const { classes } = this.props;

        return (
            <div >
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.disableSelect}>
                                <TableCell>{i18n.t('Name')}</TableCell>
                                <TableCell>{i18n.t('Description')}</TableCell>
                                <TableCell>{i18n.t('Remove')}</TableCell>
                            </TableRow>
                        </TableHead>

                        <ShoppingElementsList 
                            pressDelay={200}
                            classes={classes}
                            tableData={this.props.tableData} 
                            removeItem={this.props.removeItem}
                            onSortEnd={this.onSortEnd}/>
                    </Table>
                </Paper>
            </div>
        );
    }
}


export default withStyles(styles)(ShoppingDataDraw);