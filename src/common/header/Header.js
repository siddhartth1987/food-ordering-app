import React, { Component } from 'react';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { MenuList } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';

import './Header.css';

// Override styles provided by material-ui
const styles = (theme => ({
    searchText: {
        'color': 'white',
        '&:after': {
            borderBottom: '2px solid white',
        }
    },
    loginButton: {
        "font-weight": 400,
        "margin":"8px 8px 8px 8px"

    },
    tab: {
        "font-weight": 400,
    },
    formButton: {
        "font-weight": 400,
    },
    formControl: {
        "width": "80%",
    },
    profileButton: {
        color: "#c2c2c2",
        "text-transform": "none",
        "font-weight": 400,
        "padding":"8px 8px 8px 8px",
    },
    menuItems: {
        "text-decoration": "none",
        "color": "black",
        "text-decoration-underline": "none",
        "padding-top": "0px",
        "padding-bottom": "0px",
    },
    menuList: {
        padding: "0px"
    }
}))

// styling for Modals
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


//TabContainer Component
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: '0px', textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

// Component to render Header
class Header extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            menuIsOpen: false,
            value: 0,
            loginContactNo: "",
            loginContactNoRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequired: "dispNone",
            firstName: "",
            firstNameRequired: "dispNone",
            lastName: "",
            email: "",
            emailRequired: "dispNone",
            invalidEmail: "dispNone",
            signUpPassword: "",
            signUpPasswordRequired: "dispNone",
            signUpContactNo: "",
            signUpContactNoRequired: "dispNone",
            inValidLoginContact: "dispNone",
            invalidPassword: "dispNone",
            notRegisteredContact: "dispNone",
            validPasswordHelpText: "dispNone",
            contactNoRegistered: "dispNone",
            contactHelpText: "dispNone",
            snackBarOpen: false,
            snackBarMessage: "",
            transition: Fade,
            loggedIn: sessionStorage.getItem('access-token') === null ? false : true,
            loggedInName: sessionStorage.getItem('customer-name'),

        }

    }

    // Method to close Modal
    closeModalHandler = () => {
        this.setState({
            ...this.state,
            isModalOpen: false
        })
        //Changing badge visibility in the details page if login clicked in details page
        if(this.props.changeBadgeVisibility){
            this.props.changeBadgeVisibility();
        }
    }

    // Method to open modal for login & sign-up
    loginButtonClickHandler = () => {
        this.setState({
            ...this.state,
            isModalOpen: true,
            loginContactNo: "",
            loginContactNoRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequired: "dispNone",
            firstName: "",
            firstNameRequired: "dispNone",
            lastName: "",
            email: "",
            emailRequired: "dispNone",
            invalidEmail: "dispNone",
            signUpPassword: "",
            signUpPasswordRequired: "dispNone",
            signUpContactNo: "",
            signUpContactNoRequired: "dispNone",
            inValidLoginContact: "dispNone",
            invalidPassword: "dispNone",
            notRegisteredContact: "dispNone",
            validPasswordHelpText: "dispNone",
            contactNoRegistered: "dispNone",
            contactHelpText: "dispNone",
        })

        // On click of login button on details page
        if(this.props.changeBadgeVisibility){
            this.props.changeBadgeVisibility();
        }
    }

    // Method to open/close menu
    openMenu = () => this.setState({
        ...this.state,
        menuIsOpen: !this.state.menuIsOpen
    })

    // Method to show Menu when profile button is clicked
    profileButtonClickHandler = (event) => {
        this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget });
        this.openMenu();
    };


    // Method called when contact No is changed.
    inputLoginContactNoChangeHandler = (event) => {
        this.setState({
            ...this.state,
            loginContactNo: event.target.value,
        })
    }

    // Method called when Password is changed.
    inputLoginPasswordChangeHandler = (event) => {
        this.setState({
            ...this.state,
            loginPassword: event.target.value,
        })
    }

    // Method called when first name is changed.
    inputFirstNameChangeHandler = (event) => {
        this.setState({
            ...this.state,
            firstName: event.target.value,
        })
    }

    // Method called when last name is changed.
    inputLastNameChangeHandler = (event) => {
        this.setState({
            ...this.state,
            lastName: event.target.value,
        })
    }

    // Method called when Email is changed.
    inputEmailChangeHandler = (event) => {
        this.setState({
            ...this.state,
            email: event.target.value,
        })
    }

    // Method called when sign-up Password is changed.
    inputSignUpPasswordChangeHandler = (event) => {
        this.setState({
            ...this.state,
            signUpPassword: event.target.value,
        })
    }

    // Method called when sign-up contact No is changed.
    inputSignUpContactNoChangeHandler = (event) => {
        this.setState({
            ...this.state,
            signUpContactNo: event.target.value,
        })
    }

    // Method called when user enters some value in search box.
    inputSearchChangeHandler = (event) => {
        let searchOn = true
        if (! (event.target.value === "")) {
            let dataRestaurant = null;
            let that = this
            let xhrSearchRestaurant = new XMLHttpRequest();

            xhrSearchRestaurant.addEventListener("readystatechange", function () {
                if (xhrSearchRestaurant.readyState === 4 && xhrSearchRestaurant.status === 200) {
                    var restaurant = JSON.parse(this.responseText).restaurants;
                    that.props.updateSearchRestaurant(restaurant,searchOn);
                }
            })

            xhrSearchRestaurant.open('GET', this.props.baseUrl + 'restaurant/name/' + event.target.value)
            xhrSearchRestaurant.setRequestHeader("Content-Type", "application/json");
            xhrSearchRestaurant.setRequestHeader("Cache-Control", "no-cache");
            xhrSearchRestaurant.send(dataRestaurant);

        }else{
            let restaurant =[];
            searchOn = false
            this.props.updateSearchRestaurant(restaurant,searchOn);

        }
    }


    // Method called on change of tabs
    tabsChangeHandler = (event, value) => {
        this.setState({
            value
        });
    }

    // This method calls login API
    loginClickHandler = () => {

        // Validate entered details and call login API
        if (this.handleLoginFormValidation()) {
            let dataLogin = null;
            let xhrLogin = new XMLHttpRequest();
            let that = this;
            xhrLogin.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (xhrLogin.status === 200) {
                        let loginResponse = JSON.parse(this.responseText);
                        sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                        sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                        sessionStorage.setItem("customer-name", loginResponse.first_name);
                        that.setState({
                            ...that.state,
                            loggedIn: true,
                            loggedInName: loginResponse.first_name,
                            snackBarMessage: "Logged in successfully!",
                            snackBarOpen: true,
                        })

                        // Close Modal after login is successful
                        that.closeModalHandler();

                        // else throw error
                    } else if (xhrLogin.status === 401) {
                        let loginResponse = JSON.parse(this.responseText);
                        let notRegisteredContact = "dispNone"
                        let invalidPassword = "dispNone"
                        if (loginResponse.code === 'ATH-001') {
                            notRegisteredContact = "dispBlock"
                        }
                        if (loginResponse.code === 'ATH-002') {
                            invalidPassword = "dispBlock"
                        }
                        that.setState({
                            ...that.state,
                            notRegisteredContact: notRegisteredContact,
                            invalidPassword: invalidPassword,
                        })
                    }
                }
            })
            xhrLogin.open("POST", this.props.baseUrl + "customer/login");
            xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginContactNo + ":" + this.state.loginPassword));
            xhrLogin.setRequestHeader("Content-Type", "application/json");
            xhrLogin.setRequestHeader("Cache-Control", "no-cache");
            xhrLogin.send(dataLogin);
        }

    }

    // Method to validate data entered in the login form
    handleLoginFormValidation = () => {
        let loginContactNoRequired = "dispNone";
        let loginPasswordRequired = "dispNone";
        let inValidLoginContact = "dispNone";
        let isFormValid = true;

        // Null/Blank check for contact no.
        if (this.state.loginContactNo === "") {
            loginContactNoRequired = "dispBlock";
            isFormValid = false;
        }

        // Null/Blank check for password
        if (this.state.loginPassword === "") {
            loginPasswordRequired = "dispBlock"
            isFormValid = false;
        }

        // validate format of contact no.
        if (this.state.loginContactNo !== "") {
            var contactNo = "[7-9][0-9]{9}";
            if (!this.state.loginContactNo.match(contactNo)) {
                inValidLoginContact = "dispBlock"
                isFormValid = false;
            }
        }

        // set entered values
        this.setState({
            loginContactNoRequired: loginContactNoRequired,
            loginPasswordRequired: loginPasswordRequired,
            inValidLoginContact: inValidLoginContact
        })
        return (isFormValid);
    }

    // This method calls sign-up API
    signUpClickHandler = () => {

        // validate sign-up form
        if (this.signUpFormValidation()) {

            let dataSignUp = JSON.stringify({
                "contact_number": this.state.signUpContactNo,
                "email_address": this.state.email,
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "password": this.state.signUpPassword
            });

            let xhrSignUp = new XMLHttpRequest();
            let that = this;

            // sign-up new user
            xhrSignUp.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (xhrSignUp.status === 201) {
                        that.setState({
                            ...that.state,
                            value: 0,
                            snackBarMessage: "Registered successfully! Please login now!",
                            snackBarOpen: true,
                        })
                    }

                    // else throw error
                    if (xhrSignUp.status === 400) {
                        let responseData = JSON.parse(this.responseText)
                        if (responseData.code === 'SGR-001') {
                            that.setState({
                                ...that.state,
                                contactNoRegistered: "dispBlock"
                            })
                        }
                    }
                }
            });

            xhrSignUp.open("POST", this.props.baseUrl + "customer/signup");
            xhrSignUp.setRequestHeader("Content-Type", "application/json");
            xhrSignUp.setRequestHeader("Cache-Control", "no-cache");
            xhrSignUp.send(dataSignUp);
        }
    }

    // Method to validate data entered in the sign-up form
    signUpFormValidation = () => {
        let firstNameRequired = "dispNone";
        let emailRequired = "dispNone";
        let signUpPasswordRequired = "dispNone";
        let signUpContactNoRequired = "dispNone";
        let validPasswordHelpText = "dispNone";
        let contactHelpText = "dispNone";
        let invalidEmail = "dispNone";
        let signUpFormValid = true;

        // Null/Blank check for first name
        if (this.state.firstName === "") {
            firstNameRequired = "dispBlock";
            signUpFormValid = false;
        }

        // Null/Blank check for email
        if (this.state.email === "") {
            emailRequired = "dispBlock";
            signUpFormValid = false;
        }

        // Validate email format
        if (this.state.email !== "") {

            if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w+)+$/.test(this.state.email))) {
                invalidEmail = "dispBlock"
                signUpFormValid = false;
            }
        }

        // Blank/Null check for contact no.
        if (this.state.signUpContactNo === "") {
            signUpContactNoRequired = "dispBlock";
            signUpFormValid = false;
        }

        // validate format for contact no.
        if (this.state.signUpContactNo !== "") {
            var contactNo = "[7-9][0-9]{9}";
            if (!this.state.signUpContactNo.match(contactNo)) {
                contactHelpText = "dispBlock"
                signUpFormValid = false;
            }
        }

        // Null/Blank check for password
        if (this.state.signUpPassword === "") { //Checking for password not empty
            signUpPasswordRequired = "dispBlock";
            signUpFormValid = false;
        }

        // Validate password strength
        if (this.state.signUpPassword !== "") {
            if (!this.isValidPassword(this.state.signUpPassword)) {
                validPasswordHelpText = "dispBlock"
                signUpFormValid = false;

            }
        }

        // set entered values
        this.setState({
            firstNameRequired: firstNameRequired,
            emailRequired: emailRequired,
            contactHelpText: contactHelpText,
            signUpPasswordRequired: signUpPasswordRequired,
            signUpContactNoRequired: signUpContactNoRequired,
            invalidEmail: invalidEmail,
            validPasswordHelpText: validPasswordHelpText,
        })

        return (signUpFormValid);
    }

    // Method checks the strength of password.
    isValidPassword = (password) => {
        let lowerCase = false;
        let upperCase = false;
        let number = false;
        let specialCharacter = false;


        if (password.length < 8) {
            return false;
        }

        if (password.match("(?=.*[0-9]).*")) {
            number = true;
        }

        if (password.match("(?=.*[a-z]).*")) {
            lowerCase = true;
        }
        if (password.match("(?=.*[A-Z]).*")) {
            upperCase = true;
        }
        if (password.match("(?=.*[#@$%&*!^]).*")) {
            specialCharacter = true;
        }

        if (lowerCase && upperCase) {
            if (specialCharacter && number) {
                return true;
            }
        } else {
            return false;
        }
        return false;
    }

    // Close snackBar
    snackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            ...this.state,
            snackBarMessage: "",
            snackBarOpen: false,
        })
    }

    // This method calls logout API
    onLogOutClickHandler = () => {
        let logoutData = null;
        let that = this
        let xhrLogout = new XMLHttpRequest();
        xhrLogout.addEventListener("readystatechange", function () {

            // Clear session data
            if (xhrLogout.readyState === 4 && xhrLogout.status === 200) {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("access-token");
                sessionStorage.removeItem("customer-name");
                that.setState({
                    ...that.state,
                    loggedIn: false,
                    menuIsOpen: !that.state.menuIsOpen,
                });

                if (that.props.logoutRedirect) {
                    that.props.logoutRedirect();
                }
            }

        })

        xhrLogout.open('POST', this.props.baseUrl + 'customer/logout');
        xhrLogout.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
        xhrLogout.send(logoutData);
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <header className="app-header">
                    <FastfoodIcon className="app-logo" fontSize="large" htmlColor="white" />
                    {this.props.showHeaderSearchBox === true &&
                    <span className="header-searchbox">
                            <Input className={classes.searchText}
                                   startAdornment={
                                       <InputAdornment position="start">
                                           <SearchIcon id="search-icon" htmlColor="white"></SearchIcon>
                                       </InputAdornment>
                                   }
                                   fullWidth={true} placeholder="Search by Restaurant Name" onChange={this.inputSearchChangeHandler} />
                        </span>
                    }

                    {/* If logged in show profile button else login button*/}
                    {this.state.loggedIn !== true ?
                        <Button className={classes.loginButton} size="large" variant="contained" onClick={this.loginButtonClickHandler}>
                            <AccountCircle className="login-button-icon" />
                            LOGIN
                        </Button>
                        : <Button className={classes.profileButton} size="large" variant="text" onClick={this.profileButtonClickHandler}>
                            <AccountCircle className="profile-button-icon" htmlColor="#c2c2c2" />
                            {this.state.loggedInName}
                        </Button>
                    }
                    <Menu id="profile-menu" anchorEl={this.state.anchorEl} open={this.state.menuIsOpen} onClose={this.profileButtonClickHandler}>
                        <MenuList className={classes.menuList}>
                            <Link to={"/profile"} className={classes.menuItems} underline="none" color={"default"}>
                                <MenuItem className={classes.menuItems} onClick={this.onMyProfileClicked} disableGutters={false}>My profile</MenuItem>
                            </Link>
                            <MenuItem className="menu-items" onClick={this.onLogOutClickHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </header>

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.isModalOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >

                    <Tabs className="login-modal-tabs" value={this.state.value} onChange={this.tabsChangeHandler}>
                        <Tab label="LOGIN" className={classes.tab} />
                        <Tab label="SIGNUP" className={classes.tab} />
                    </Tabs>

                    {/* login form */}
                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="login-contact-no">Contact No.</InputLabel>
                            <Input id="login-contact-no" className="input-fields" fullWidth={true} type="text" logincontactno={this.state.loginContactNo} onChange={this.inputLoginContactNoChangeHandler} value={this.state.loginContactNo} />
                            <FormHelperText className={this.state.loginContactNoRequired}>
                                <span className='red'>required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.inValidLoginContact}>
                                <span className="red">Invalid Contact</span>
                            </FormHelperText>

                        </FormControl>
                        <br />
                        <br />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="login-password">Password</InputLabel>
                            <Input id="login-password" className="input-fields" type="password" loginpassword={this.state.loginPassword} fullWidth={true} onChange={this.inputLoginPasswordChangeHandler} value={this.state.loginPassword} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className='red'>required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.invalidPassword}>
                                <span className="red">Invalid Credentials</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.notRegisteredContact}>
                                <span className="red">This contact number has not been registered!</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <Button variant="contained" className={classes.formButton} color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }

                    {/* Signup Form  */}
                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="first-name">First Name</InputLabel>
                            <Input id="first-name" className="input-fields" firstname={this.state.firstName} fullWidth={true} onChange={this.inputFirstNameChangeHandler} value={this.state.firstName} />
                            <FormHelperText className={this.state.firstNameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="last-name">Last Name</InputLabel>
                            <Input id="last-name" className="input-fields" lastname={this.state.lastName} fullWidth={true} onChange={this.inputLastNameChangeHandler} value={this.state.lastName} />
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" className="input-fields" type="email" email={this.state.email} fullWidth={true} onChange={this.inputEmailChangeHandler} value={this.state.email} />
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.invalidEmail}>
                                <span className="red">Invalid Email</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="sign-up-password">Password</InputLabel>
                            <Input id="sign-up-password" className="input-fields" type="password" signuppassword={this.state.signUpPassword} fullWidth={true} onChange={this.inputSignUpPasswordChangeHandler} value={this.state.signUpPassword} />
                            <FormHelperText className={this.state.signUpPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.validPasswordHelpText}>
                                <span className="red">Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="sign-up-contactNo">Contact No.</InputLabel>
                            <Input id="sign-up-contactNo" className="input-fields" signupcontactno={this.state.signUpContactNo} fullWidth={true} onChange={this.inputSignUpContactNoChangeHandler} value={this.state.signUpContactNo} />
                            <FormHelperText className={this.state.signUpContactNoRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.contactHelpText}>
                                <span className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.contactNoRegistered}>
                                <span className="red">This contact number is already registered! Try other contact number.</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <Button variant="contained" className={classes.formButton} color="primary" onClick={this.signUpClickHandler}>SIGNUP</Button>
                    </TabContainer>
                    }
                </Modal>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackBarOpen}
                        autoHideDuration={4000}
                        onClose={this.snackBarClose}
                        TransitionComponent={this.state.transition}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackBarMessage}</span>}
                    />
                </div>

            </div>
        )
    }



}

export default withStyles(styles)(Header);