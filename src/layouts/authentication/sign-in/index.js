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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="خوش آمدید"
      description="آدرس ایمیل و رمز عبور خود را وارد نمایید"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2} style={{direction:"rtl", fontFamily:"Yekan"}}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold" style={{direction:"rtl", fontFamily:"Yekan"}}>
              آدرس ایمیل
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" style={{direction:"ltr"}}/>
        </SoftBox>
        <SoftBox mb={2} style={{direction:"rtl", fontFamily:"Yekan"}}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold" style={{direction:"rtl", fontFamily:"Yekan"}}>
              رمز عبور
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" style={{direction:"ltr"}}/>
        </SoftBox>
        <SoftBox display="flex" alignItems="center" style={{direction:"rtl", fontFamily:"Yekan"}}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
            style={{direction:"rtl", fontFamily:"Yekan"}}
          >
            &nbsp;&nbsp;مرا به خاطر بسپار
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth style={{direction:"rtl", fontFamily:"Yekan"}}>
            ورود
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center" style={{direction:"rtl", fontFamily:"Yekan"}}>
          <SoftTypography variant="button" color="text" fontWeight="regular" style={{direction:"rtl", fontFamily:"Yekan"}}>
            تا کنون ثبت نام نکرده اید؟{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{direction:"rtl", fontFamily:"Yekan"}}
            >
              ثبت نام
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
