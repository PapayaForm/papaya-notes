import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
});


class MyTable extends React.Component {

  render() {
    const { classes } = this.props;

    let out = '';
    if(this.props.activeCategory !== null)
      out = this.props.activeCategory.DrawPage(this.props);
    
    if(out !== '') return out;
    else return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Items list
        </Typography>
        <div className={classes.tableContainer}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell numeric>Quantity</TableCell>
                  <TableCell numeric>Num</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.tableData.map(n => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.quantity}</TableCell>
                      <TableCell numeric>{n.num}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  activeCategory: PropTypes.object,
};

export default withStyles(styles)(MyTable);