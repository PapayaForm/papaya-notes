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
import RestoreIcon from '@material-ui/icons/Restore';
import DoneIcon from '@material-ui/icons/Done';
import MessageBoxDialog from './../MessageBoxDialog';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import i18n from '../i18n';
import { DataStateEnum } from './Data';

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
    fabAdd: {}, fabMenu: {}, fabMultiAdd: {}, // TODO - should be removed, but without it it is a warning message.. don't know yet why..
});

const SortableTableRow = SortableElement(({ isMainTable, idx, row, removeItem, restoreItem, classes }) => {
    if (isMainTable) {
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
    else {
        return (
            <TableRow className={classes.disableSelect}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell>
                    <Button
                        color="primary"
                        className={classes.button}
                        onClick={() => restoreItem(idx)}>
                        {i18n.t('Restore')}
                        <RestoreIcon className={classes.rightIcon} />
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                        color="secondary"
                        className={classes.button}
                        onClick={() => removeItem(idx)}>
                        {i18n.t('Delete')}
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}
)


const ShoppingElementsList = SortableContainer(({isMainTable, tableData, classes, removeItem, restoreItem}) => {
    const rows = tableData.map((row, index) => {
        if((isMainTable && tableData[index].state === DataStateEnum.eActive) ||
            (!isMainTable && tableData[index].state === DataStateEnum.eDone))
        {
            return (
                <SortableTableRow 
                    key={`item-${index}`} 
                    index={index}
                    isMainTable={isMainTable}
                    idx={index} 
                    row={row} 
                    removeItem={removeItem} 
                    restoreItem={restoreItem} 
                    classes={classes}/>
            );
        }
        else return null;
    });

    return <TableBody>{rows}</TableBody>;
});

const MessageBoxActionsEnum = Object.freeze({
    "eNone": 0,
    "eDeleteAllData": 1,
  });

class ShoppingDataDraw extends React.Component {

    state = {
        openMessageBox: false,
        MessageBoxTitle: '',
        MessageBoxText: '',
        MessageBoxAction: MessageBoxActionsEnum.eNone,
    };

    handleMessageBoxClose = value => {
        if (value === true) {
            switch (this.state.MessageBoxAction) {
                case MessageBoxActionsEnum.eDeleteAllData:
                {
                    for(let i =  this.props.tableData.length - 1; i >= 0; i--)
                        if(this.props.tableData[i].state === DataStateEnum.eDone)
                            this.props.removeItem(i);
                    break;
                }
                default:
                    break;
            }
        }
        this.setState({ MessageBoxAction: MessageBoxActionsEnum.eNone, openMessageBox: false });
    };

    onDeleteAll = () => {
        let bIsSomethingToDelete = false;
        for (let i = this.props.tableData.length - 1; i >= 0; i--) {
            if (this.props.tableData[i].state === DataStateEnum.eDone) {
                bIsSomethingToDelete = true;
                break;
            }
        }
        if(bIsSomethingToDelete) {
            let action = MessageBoxActionsEnum.eDeleteAllData;
            let message = i18n.t('Do you really want to delete all items?')
            this.setState({ MessageBoxTitle: i18n.t('Confirm Delete'), MessageBoxText: message, MessageBoxAction: action, openMessageBox: true });
        }
    };
    
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
                            isMainTable={true}
                            tableData={this.props.tableData} 
                            removeItem={this.props.removeItem}
                            restoreItem={this.props.restoreItem}
                            onSortEnd={this.onSortEnd}/>
                    </Table>
                </Paper>

                <div style={{ padding: '0.5em' }}/>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.disableSelect}>
                                <TableCell>{i18n.t('Name')}</TableCell>
                                <TableCell>{i18n.t('Description')}</TableCell>
                                <TableCell>
                                    {i18n.t('Action')}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => this.onDeleteAll()}>
                                        {i18n.t('Delete all')}
                                        <DeleteIcon className={classes.rightIcon} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <ShoppingElementsList 
                            pressDelay={200}
                            classes={classes}
                            isMainTable={false}
                            tableData={this.props.tableData}
                            removeItem={this.props.removeItem}
                            restoreItem={this.props.restoreItem}
                            onSortEnd={this.onSortEnd} />
                    </Table>
                </Paper>

                <MessageBoxDialog
                    classes={this.classes}
                    open={this.state.openMessageBox}
                    onClose={this.handleMessageBoxClose.bind(this)}
                    dialogTitle={this.state.MessageBoxTitle}
                    dialogMessage={this.state.MessageBoxText}
                />
            </div>
        );
    }
}


export default withStyles(styles)(ShoppingDataDraw);