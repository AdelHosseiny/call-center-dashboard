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

function KnowledgeInformation({qaPairs, setUploadStep, setQAPairs, removeUploadFile}) {

  const goBack = () => {
    setUploadStep("upload");
    // removeUploadFile();
  }

  const goToSubmit = () => {
    setUploadStep("submit");
  }

  const removeKnowledge = (rowIndex, messageIndex) => {
    setQAPairs((prevQaPairs) => {
      // Clone the previous qaPairs to avoid direct mutation
      const updatedQaPairs = [...prevQaPairs];
  
      // Get the messages array for the specified rowIndex
      const rowMessages = updatedQaPairs[rowIndex].messages;
  
      // Remove the message at messageIndex and the next message if it exists
      if (messageIndex < rowMessages.length - 1) {
        // Remove the current message and the next one
        updatedQaPairs[rowIndex].messages = rowMessages.filter((_, index) => index !== messageIndex && index !== messageIndex + 1);
      } else {
        // If the messageIndex is the last message, just remove that one
        updatedQaPairs[rowIndex].messages = rowMessages.filter((_, index) => index !== messageIndex);
      }
  
      // If no messages are left for the row, remove the entire row
      if (updatedQaPairs[rowIndex].messages.length === 0) {
        updatedQaPairs.splice(rowIndex, 1);
      }
  
      // Return the updated qaPairs
      return updatedQaPairs;
    });
  };

  const addKnowledge = (rowIndex, messageIndex) => {
    setQAPairs((prevQaPairs) => {
      const updatedQaPairs = [...prevQaPairs];
  
      // Check if the row exists
      if (updatedQaPairs[rowIndex]) {
        const messages = updatedQaPairs[rowIndex].messages;
  
        // Insert empty question and answer after the specified messageIndex
        // messageIndex + 1 because we want to add right after the current message
        messages.splice(messageIndex + 2, 0, { role: "user", content: "" }, { role:"assistant", content: "" });
      }
  
      // Return the updated qaPairs
      return updatedQaPairs;
    });
  };

  const addConversation = () => {
    setQAPairs((prevQaPairs) => {
      const updatedQaPairs = [...prevQaPairs];
      updatedQaPairs.splice(updatedQaPairs.length + 1, 0, {messages:[{ role: "user", content: "" }, { role:"assistant", content: "" }]});
      // Return the updated qaPairs
      return updatedQaPairs;
    });
  };

  const editQuestion = (rowIndex, messageIndex, question) =>{
    let updatedQaPairs = [...qaPairs];
    updatedQaPairs[rowIndex].messages[messageIndex].content = question;
    setQAPairs(updatedQaPairs);
  }

  const editAnswer = (rowIndex, messageIndex, answer) =>{
    let updatedQaPairs = [...qaPairs];
    updatedQaPairs[rowIndex].messages[messageIndex].content = answer;
    setQAPairs(updatedQaPairs);
  }


  return (
    <Card id="delete-account">
      {/* <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Billing Information
        </SoftTypography>
      </SoftBox> */}
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
            onClick={addConversation}>
            اضافه کردن یک مکالمه
          </SoftButton>
        </SoftBox>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {qaPairs.map((item, index) => (
            <Knowledge
              key={index} // Unique key for each Knowledge component
              rowIndex={index}
              messages={item.messages}
              question={item.messages[0].content} // Set the question as the name
              answer={item.messages[1].content} // Set the answer as the company
              noGutter={index === qaPairs.length - 1} // Remove gutter for the last item
              removeKnowledge={removeKnowledge}
              editQuestion={editQuestion}
              editAnswer={editAnswer}
              addKnowledge={addKnowledge}
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
  setUploadStep: PropTypes.func.isRequired,
  setQAPairs: PropTypes.func.isRequired,
  removeUploadFile: PropTypes.func.isRequired
};

export default KnowledgeInformation;
