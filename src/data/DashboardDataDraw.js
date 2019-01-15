import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
//import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { Divider } from '@material-ui/core';
import i18n from '../i18n';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    disableSelect: {
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        margin: 10
    },
    fabAdd:{}, fabMenu:{}, fabMultiAdd:{} // TODO - should be removed, but without it it is a warning message.. don't know yet why..
  });


const SortableTableRow = SortableElement(({idx, tile, removeItem, classes}) => {
    return (
        <GridListTile cols={tile.cols || 1}>
            <Card className={classes.disableSelect}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {tile.name}
                    </Typography>
                    <Typography component="p">
                        {tile.desc}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions>
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
                </CardActions>
            </Card>
        </GridListTile>
      );
  }
)


const DashboardElementsList = SortableContainer(({tableData, classes, removeItem}) => {
    const rows = tableData.map((tile, index) => {
        return (
            <SortableTableRow 
                key={`item-${index}`} 
                index={index}
                idx={index} 
                tile={tile} 
                removeItem={removeItem} 
                classes={classes}/>
        );
    });

    return <GridList>{rows}</GridList>;
});


class DashboardDataDraw extends React.Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.moveElemInArray(oldIndex, newIndex);
      };

    render() {
        const { classes } = this.props;

        // <div className={classes.root}>
        return (
            <div >
                <DashboardElementsList 
                    pressDelay={200}
                    axis='xy'
                    classes={classes}
                    tableData={this.props.tableData} 
                    removeItem={this.props.removeItem}
                    onSortEnd={this.onSortEnd}/>
            </div>
        );
    }
}


export default withStyles(styles)(DashboardDataDraw);