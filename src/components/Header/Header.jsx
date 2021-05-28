import React, {useState} from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Badge, MenuItem, Menu, Button, TextField, InputAdornment, ThemeProvider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Search, AccountCircle, Settings, Notifications, MoreVert} from '@material-ui/icons';
import logo from "./logo.png";

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const search = (event) => {
    event.preventDefault();

    if (input.includes(" ")) {
      setInput('');
      setError(true);
    } else if (input !== '' ) {
      props.changeKey(input);
      setInput('');
      setError(false);
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="default">
            <Settings />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="default">
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#F2D16A",
      }
    }
  });
  

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
            <img src={logo} alt="logo" className={classes.logo} />
          <div className={classes.search}>         
          <form onSubmit={search} noValidate autoComplete="off">
          <ThemeProvider theme={theme}>
            <TextField
              error={error}
              helperText="Search term can only be one word"
              placeholder="Search…"
              classes={{
                input: classes.inputInput,
              }}
              type="search"
              margin="dense"
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                       <IconButton aria-label="search" color="default">  
              <Search />
            </IconButton>
                    </InputAdornment>
                  ),
              }}
              value={input}
              variant="outlined"
              onChange={(event) => setInput(event.target.value)}
            />
            </ThemeProvider>
          </form>
          </div>
          <Button className={classes.searchButton} onClick={search} variant="contained" disableElevation>
              Search
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="settings" color="default">
                <Settings />
            </IconButton>
            <IconButton aria-label="show 4 new notifications" color="default">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="default"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="default"
            >
              <MoreVert />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2.2),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    logo: {
          maxWidth: 160,
          display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    appBar: {
        backgroundColor: 'white',
    },
    searchButton:{
        backgroundColor: '#F2D16A',
   
        display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        '&:hover': {
          backgroundColor: '#E8B310',
        },
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        textTransform: 'none',
    },
  }
  }));