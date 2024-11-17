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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useState } from "react";
import SoftInput from "components/SoftInput";

function Knowledge({ rowIndex, messages, question, answer, noGutter, removeKnowledge, editQuestion, editAnswer, addKnowledge }) {

  const [mode, setMode] = useState(new Array(messages.length).fill("data"));

  const removeMe = (messageIndex) => {
    console.log("remove knowledge ", rowIndex);
    removeKnowledge(rowIndex, messageIndex);
  }

  const addAfterMe = (messageIndex) => {
    addKnowledge(rowIndex, messageIndex);
    setMode((prevMode) => {
      const updatedMode = [...prevMode];
      updatedMode.splice(messageIndex + 1, 0, "data", "data"); // Insert "data" at the right position in mode array
      return updatedMode;
    });
  }

  const changeMode = (index) => {
    const newMode = [...mode]; // Copy the current mode array
    newMode[index] = newMode[index] === "data" ? "edit" : "data"; // Toggle between "data" and "edit"
    newMode[index+1] = newMode[index+1] === "data" ? "edit" : "data"; // Toggle between "data" and "edit"
    setMode(newMode); // Update the state
  }

  const editMyQuestion = (index, e) => {
    console.log(index)
    editQuestion(rowIndex, index, e.target.value);
  }

  const editMyAnswer = (index, e) => {
    editAnswer(rowIndex, index, e.target.value);
  }

  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
      
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
      {messages.map((content, index) => (
        index % 2 === 0 ? <SoftBox
          key= {index}
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          style={{direction:"rtl"}}
        >
          {mode[index] === "data" ? 
            <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize" style={{direction:"rtl", fontFamily:"Yekan", fontSize:"medium", fontWeight:"700"}}>
              {messages[index].content}
            </SoftTypography> :
            <SoftInput type="text" variant="button" fontWeight="medium" value={messages[index].content} textTransform="capitalize" onChange={(e) => editMyQuestion(index, e)} style={{direction:"rtl", fontFamily:"Yekan", fontSize:"medium", fontWeight:"700"}}/>
          }

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            {mode[index] === "data" ? 
              <SoftBox mr={1}>
                <SoftButton variant="text" color="primary" style={{direction:"rtl", fontFamily:"Yekan", fontSize:"small", fontWeight:"700"}} onClick={() => addAfterMe(index)}>
                  <Icon>add</Icon>&nbsp;اضافه کن
                </SoftButton>
              </SoftBox> :
              <></>
              
            }
            {mode[index] === "data" ? 
              <SoftBox mr={1}>
                <SoftButton variant="text" color="error" style={{direction:"rtl", fontFamily:"Yekan", fontSize:"small", fontWeight:"700"}} onClick={() => removeMe(index)}>
                  <Icon>delete</Icon>&nbsp;حذف
                </SoftButton>
              </SoftBox> :
              <></>
              
            }
            
            <SoftButton variant="text" color={mode[index] === "data" ? "info" : "success"} style={{direction:"rtl", fontFamily:"Yekan", fontSize:"small", fontWeight:"700"}} onClick={() => changeMode(index)}>
              <Icon>edit</Icon>&nbsp;{mode[index] === "data" ? "ویرایش" : "ثبت"}
            </SoftButton> 
            
            
            
          </SoftBox>
        </SoftBox> :
        <SoftBox key={index} mb={1} lineHeight={0} style={{textAlign:"right"}}>
          <SoftTypography variant="caption" color="text" >
            {mode[index] === "data" ? 
              <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{direction:"rtl", fontFamily:"Yekan"}}>
                {messages[index].content}
              </SoftTypography>:
              <SoftInput type="text" variant="button" fontWeight="medium" value={messages[index].content} textTransform="capitalize" onChange={(e) => editMyAnswer(index, e)} style={{direction:"rtl", fontFamily:"Yekan", fontSize:"medium", fontWeight:"700"}}/>
            }
            
          </SoftTypography>
        </SoftBox>
      ))}
      {/* {messages.map((content, index) => (
        index % 2 === 1 && <SoftBox key={index} mb={1} lineHeight={0} style={{textAlign:"right"}}>
        <SoftTypography variant="caption" color="text" >
          {mode === "data" ? 
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{direction:"rtl", fontFamily:"Yekan"}}>
              {messages[1].content}
            </SoftTypography>:
            <SoftInput type="text" variant="button" fontWeight="medium" value={messages[1].content} textTransform="capitalize" onChange={editMyAnswer} style={{direction:"rtl", fontFamily:"Yekan", fontSize:"medium", fontWeight:"700"}}/>
          }
          
        </SoftTypography>
      </SoftBox>
      ))} */}
        {/* <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          style={{direction:"rtl"}}
        >
          {mode === "data" ? 
            <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize" style={{direction:"rtl", fontFamily:"Yekan", fontSize:"medium", fontWeight:"700"}}>
              {messages[0].content}
            </SoftTypography> :
            <SoftInput type="text" variant="button" fontWeight="medium" value={messages[0].content} textTransform="capitalize" onChange={editMyQuestion} style={{direction:"rtl", fontFamily:"Yekan", fontSize:"medium", fontWeight:"700"}}/>
          }

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            {mode === "data" ? 
              <SoftBox mr={1}>
                <SoftButton variant="text" color="error" style={{direction:"rtl", fontFamily:"Yekan", fontSize:"small", fontWeight:"700"}} onClick={removeMe}>
                  <Icon>delete</Icon>&nbsp;حذف
                </SoftButton>
              </SoftBox> :
              <></>
              
            }
            
            <SoftButton variant="text" color="dark" style={{direction:"rtl", fontFamily:"Yekan", fontSize:"small", fontWeight:"700"}} onClick={changeMode}>
              <Icon>edit</Icon>&nbsp;{mode === "data" ? "ویرایش" : "ثبت"}
            </SoftButton> 
            
            
            
          </SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} style={{textAlign:"right"}}>
          <SoftTypography variant="caption" color="text" >
            {mode === "data" ? 
              <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{direction:"rtl", fontFamily:"Yekan"}}>
                {messages[1].content}
              </SoftTypography>:
              <SoftInput type="text" variant="button" fontWeight="medium" value={messages[1].content} textTransform="capitalize" onChange={editMyAnswer} style={{direction:"rtl", fontFamily:"Yekan", fontSize:"medium", fontWeight:"700"}}/>
            }
            
          </SoftTypography>
        </SoftBox> */}
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Bill
Knowledge.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Knowledge.propTypes = {
  key: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  removeKnowledge: PropTypes.func.isRequired,
  editQuestion: PropTypes.func.isRequired,
  editAnswer: PropTypes.func.isRequired,
  addKnowledge: PropTypes.func.isRequired
};

export default Knowledge;
