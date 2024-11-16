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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Knowledge from "layouts/uploader/components/Knowledge";

import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";
import { Link } from "react-router-dom";

function KnowledgeInformation({qaPairs, setUploadStep}) {

  const goBack = () => {
    setUploadStep("submit");
  }

  const goToSubmit = () => {
    setUploadStep("submit");
  }


  return (
    <Card id="delete-account">
      {/* <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Billing Information
        </SoftTypography>
      </SoftBox> */}
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {qaPairs.map((item, index) => (
            <Knowledge
              key={index} // Unique key for each Knowledge component
              name={item.messages[0].content} // Set the question as the name
              company={item.messages[1].content} // Set the answer as the company
              noGutter={index === qaPairs.length - 1} // Remove gutter for the last item
            />
          ))}
          
        </SoftBox>
      </SoftBox>
      <SoftBox 
        display="flex"
        alignItems="center"
        style={{direction:"rtl"}}
        mt={{ xs: 2, sm: 0 }}
        ml={{ xs: -1.5, sm: 0 }}
      >
        <SoftBox px={1}>
          <SoftButton 
            // component={Link}
            // to="/tables"
            size="small"
            circular

            variant="gradient" 
            color="success" 
            style={{direction:"rtl", fontFamily:"Yekan"}} 
            onClick={goToSubmit}>
            تایید
          </SoftButton>
        </SoftBox>
        <SoftBox px={1}>
          <SoftButton 
            variant="gradient" 
            color="info" 
            style={{direction:"rtl", fontFamily:"Yekan"}} 
            onClick={goBack}
            size="small"
            circular
          >
            بازگشت
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}


KnowledgeInformation.propTypes = {
  qaPairs: PropTypes.array.isRequired,
  setUploadStep: PropTypes.func.isRequired
};

export default KnowledgeInformation;
