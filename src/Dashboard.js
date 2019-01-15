import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainMenuItems from './listMenuItems';
import MyTable from './MyTable';
import ManageMenu from  './listManageMenu';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
//data
import Category from './data/Category';
import {ValidateCategory} from './data/CategoriesEnum';
//Dialogs:
import SettingsDialog from './SettingsDialog';
import LoginDialog from './LoginDialog';
import SignIn from './SignIn';
import AddCategoryDialog from './AddCategoryDialog';
import DeleteCategoryDialog from './DeleteCategoryDialog';
import ShortInfoMessage from './ShortInfoMessage';
import CreateUserDialog from './CreateUserDialog';
import CategoryDataNewForm from './data/CategoryDataNewForm';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class Dashboard extends React.Component {
  
  state = {
    userToLogin: null,
    openDrawer: false,
    openSettingsDialog: false,
    openLoginDialog: this.props.currentUser !== null ? false : true,
    openSignInDialog: false,
    openAddCategoryDialog: false,
    openAddCategoryItemDialog: false,
    openCreateUserDialog: false,
    openDeleteCategoryDialog: false,
    openShortInfoMessage: false,
    shortInfoText: '',
  };
  
  

  handleDrawerOpen = () => {
    this.setState({ openDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };


  //#region dialog handles
  handleShortInfoClose = () => {
    this.setState({ openShortInfoMessage: false });
  };

  handleShortInfoOpen = message => {
    this.setState({ shortInfoText: message, openShortInfoMessage: true });
  };

  handleClickCategory = value => {
    this.props.onChangeActiveCategory(value);
  };

  handleClickSettings = () => {
    this.setState({ openSettingsDialog: true, });
  };

  handleSettingsClose = () => {
    this.setState({ openSettingsDialog: false, });
  };

  handleClickPerson = () => {
    this.setState({ openLoginDialog: true, });
  };

  handleLoginClose = value => {
    if(value === '@addProfile@') {
      this.setState({ openCreateUserDialog: true, });
    }
    else if(value != null && value !== this.props.currentUser) {
      if(value.isPassword === true) {
        this.setState({ userToLogin: value, openSignInDialog: true });
      }
      else {
        this.setState({ openLoginDialog: false });
        this.props.onChangeUser(value);
        this.props.onChangeActiveCategory(null);
      }
    }
    else
      this.setState({ openLoginDialog: false });
  };

  handleSignInClose = () => {
    this.setState({ userToLogin: null, openSignInDialog: false, openLoginDialog: false });
  };

  handleSignInSignedIn = value => {
    if(value !== null) {
      this.props.onChangeUser(value);
      this.props.onChangeActiveCategory(null);
    }
    this.setState({ userToLogin: null, openSignInDialog: false, openLoginDialog: false });
  };

  handleClickAddCategory = () => {
    this.setState({ openAddCategoryDialog: true });
  };

  handleClickAddCategoryItem = () => {
    this.setState({ openAddCategoryItemDialog: true });
  };

  handleAddCategoryDialogAddCategory = (name, type) => {
    if(name !== '' && ValidateCategory(type) && this.props.currentUser !== null)
    {
      this.props.currentUser.categories.push(new Category(name, type));
      return true;
    }
    return false;
  };

  handleAddCategoryItem = (name, desc) => {
    if(this.props.activeCategory !== null && name !== '') {
      this.props.activeCategory.AddData(name, desc);
    }
  };

  handleAddCategoryDialogClose = () => {
    this.setState({ openAddCategoryDialog: false, });
  };

  handleAddCategoryItemDialogClose = () => {
    this.setState({ openAddCategoryItemDialog: false, });
  };

  handleClickDeleteCategory = () => {
    this.setState({ openDeleteCategoryDialog: true });
  };

  handleDeleteCategoryDialogClose = () => {
    this.setState({ openDeleteCategoryDialog: false, });
  };

  handleClickManageCategory = () => {
  };

  handleDeleteCategory = categoryToDelete => {
    for (var i = 0; i < this.props.currentUser.categories.length; i++) {
      if (this.props.currentUser.categories[i] === categoryToDelete) {
        //delete elem
        this.props.currentUser.categories.splice(i, 1);

        if(this.props.activeCategory === categoryToDelete)
          this.props.onChangeActiveCategory(null);
        
        return true;
      }
    }
    return false;
  }

  handleCreateUserDialogClose = () => {
    this.setState({ openCreateUserDialog: false, });
  };
  //#endregion dialog handles


  render() {
    const { classes } = this.props;
    const tooltipText = this.props.currentUser !== null ? this.props.currentUser.email : '';

    let dashboardText = this.props.activeCategory !== null ? this.props.activeCategory.name : "Dashboard";

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.openDrawer && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.openDrawer} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.openDrawer && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
            {dashboardText}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => this.handleClickSettings()}>
              <SettingsIcon />
            </IconButton>
            <Tooltip title={tooltipText}>
              <IconButton color="inherit" onClick={() => this.handleClickPerson()}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.openDrawer && classes.drawerPaperClose),
          }}
          open={this.state.openDrawer}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainMenuItems
              handleClickCategory = {this.handleClickCategory}
              categories = {this.props.currentUser !== null ? this.props.currentUser.categories : null}
              activeCategory = {this.props.activeCategory}/>
          </List>
          {this.props.currentUser !== null && 
          this.props.currentUser.categories !== null && 
          this.props.currentUser.categories.length > 0 ? (
          <Divider />
          ) : ('')}
          <List>
            <ManageMenu 
              disabled={this.props.currentUser === null}
              disabledDelete={this.props.currentUser === null || this.props.currentUser.categories.length === 0}
              handleClickManageCategory = {this.handleClickManageCategory} 
              handleClickAddCategory = {this.handleClickAddCategory}
              handleClickDeleteCategory = {this.handleClickDeleteCategory}/>
          </List>
        </Drawer>

        <SettingsDialog
          classes={this.classes}
          open={this.state.openSettingsDialog}
          onClose={this.handleSettingsClose}
          lightTheme={this.props.lightTheme}
          lang={this.props.lang}
          fontSize={this.props.fontSize}
          handleChangeSettings={this.props.onChangeTheme}
          handleChangeLanguage={this.props.handleChangeLanguage}
          handleChangeFontSize={this.props.handleChangeFontSize}
          handleClearStorage={this.props.handleClearStorage}
          handleImportStorage={this.props.handleImportStorage}
          handleExportStorage={this.props.handleExportStorage}
        />
        <LoginDialog
          currentUser={this.props.currentUser}
          open={this.state.openLoginDialog}
          onClose={this.handleLoginClose}
          emails={this.props.emails}
        />
        <SignIn
          open={this.state.openSignInDialog}
          userToLogin={this.state.userToLogin}
          onClose={this.handleSignInClose}
          handleSignedIn={this.handleSignInSignedIn}
        />
        <CreateUserDialog
          open={this.state.openCreateUserDialog}
          onClose={this.handleCreateUserDialogClose}
          handleCreateUser={this.props.handleCreateUser}
        />
        <AddCategoryDialog
          classes={this.classes}
          open={this.state.openAddCategoryDialog}
          onClose={this.handleAddCategoryDialogClose}
          handleAddCategoryDialogAddCategory = {this.handleAddCategoryDialogAddCategory.bind(this)}
        />
        <DeleteCategoryDialog
          classes={this.classes}
          open={this.state.openDeleteCategoryDialog}
          onClose={this.handleDeleteCategoryDialogClose}
          handleShortInfoMessage={this.handleShortInfoOpen}
          handleDeleteCategory={this.handleDeleteCategory}
          categories = {this.props.currentUser !== null ? this.props.currentUser.categories : null}
        />
        <CategoryDataNewForm
          classes={this.classes}
          open={this.state.openAddCategoryItemDialog}
          onClose={this.handleAddCategoryItemDialogClose}
          handleAddItem={this.handleAddCategoryItem}
          type = {this.props.activeCategory !== null ? this.props.activeCategory.type : null}
        />

        <ShortInfoMessage
          classes={this.classes}
          open={this.state.openShortInfoMessage}
          onClose={this.handleShortInfoClose}
          dialogMessage={this.state.shortInfoText}
        />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <MyTable 
            classes = {this.classes}
            activeCategory = {this.props.activeCategory}
            handleAddNewCategoryItemClick = {this.handleClickAddCategoryItem}/>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  emails: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  activeCategory: PropTypes.object,
  lang: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  lightTheme: PropTypes.bool.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  handleClearStorage: PropTypes.func.isRequired,
  handleChangeFontSize: PropTypes.func.isRequired,
  handleChangeLanguage: PropTypes.func.isRequired,
  handleImportStorage: PropTypes.func.isRequired,
  handleExportStorage: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onChangeUser: PropTypes.func.isRequired,
  onChangeActiveCategory: PropTypes.func.isRequired,
};

export default withStyles(styles)(Dashboard);