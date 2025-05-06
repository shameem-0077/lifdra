import React, { useRef, useState } from "react";
import styled from "styled-components";
import TermsService from "../general/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../general/RequestLoader";
import FlagDropDown from "../general/FlagDropDown";
import CountrySelector from "../general/CountrySelector";

import { serverConfig } from "../../../../../axiosConfig";
import { connect } from "react-redux";
// ... existing code ...

// Replace any history.push() calls with navigate()
// For example:
// Instead of: history.push('/some-path')
// Use: navigate('/some-path') 

const LoginModal = ({ isOpen, onClose, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // ... rest of your component code ...

  // Example of how to use navigate:
  const handleLogin = () => {
    // Instead of history.push('/dashboard')
    navigate('/dashboard');
  };

  // For navigation with state:
  const handleLoginWithState = () => {
    // Instead of history.push({ pathname: '/dashboard', state: { from: location } })
    navigate('/dashboard', { state: { from: location } });
  };

  // ... rest of your component code ...
};

export default connect(null, null)(LoginModal); 