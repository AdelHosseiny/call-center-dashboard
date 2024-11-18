/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setUserName } from '../../../redux/userSlice'; // Import the action

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [userName, setUserNameLocal] = useState("");
  const [password, setPassword] = useState("");

  const handleSetAgremment = () => setAgremment(!agreement);
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate();

  const registerUser = () => {
    const apiUrl = "http://81.12.53.242:8081/register";
  
    // Prepare data to send
    const data = {
      user_name: userName,
      password: password,
    };
    // console.log("user name in uploader:")
    
    // Send a POST request
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the API sends a JSON response
      })
      .then((responseData) => {
        

        console.log("Successfully sent qaPairs to API:", responseData);
        dispatch(setUserName(userName));
        navigate("/dashboard");

      })
      .catch((error) => {
        console.error("Error sending qaPairs to API:", error);
      });
  }

  const changeUserName = (e) => {
    setUserNameLocal(e.target.value);
  }

  const changePassword = (e) => {
    setPassword (e.target.value);
  }

  return (
    <BasicLayout
      title="خوش آمدید"
      description="برای ثبت نام اطلاعات زیر را تکمیل نمایید"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium" style={{direction:"rtl", fontFamily:"Yekan"}}>
            ثبت نام از طریق
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" value={userName} onChange={changeUserName}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" value={password} onChange={changePassword}/>
            </SoftBox>
            <SoftBox display="flex" alignItems="center" style={{direction:"rtl", fontFamily:"Yekan"}}>
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
                style={{direction:"rtl", fontFamily:"Yekan"}}
              >
                &nbsp;&nbsp;با&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
                style={{direction:"rtl", fontFamily:"Yekan"}}
              >
                شرایط
              </SoftTypography>
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
                style={{direction:"rtl", fontFamily:"Yekan"}}
              >
                &nbsp;&nbsp;موافقم&nbsp;
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth style={{direction:"rtl", fontFamily:"Yekan"}} onClick={registerUser}>
                ثبت نام
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center" style={{direction:"rtl", fontFamily:"Yekan"}}>
              <SoftTypography variant="button" color="text" fontWeight="regular" style={{direction:"rtl", fontFamily:"Yekan"}}>
                قبلا ثبت نام کردیده اید؟&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                  style={{direction:"rtl", fontFamily:"Yekan"}}
                >
                  ورود
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
