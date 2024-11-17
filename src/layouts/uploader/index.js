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

import { useState, useRef } from "react";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setUserName } from '../../redux/userSlice'; // Import the action

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
import aiCallCenterImage from "assets/images/curved-images/ai-call-center.jpeg";
import "assets/css/FileUploader.css";
import Icon from "@mui/material/Icon";
import KnowledgeInformation from "./components/KnowledgeInformation";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import NotificationItem from "./components/Items/NotificationItem";


function Uploader() {
  const [rememberMe, setRememberMe] = useState(true);
  const [uploadFile, setUploadFile] = useState("");
  const [uploadStep, setUploadStep] = useState("upload");
  const [qaPairs, setQAPairs] = useState([]);
  const [userName, setUserNameLocal] = useState("");
  const [projectName, setProjectName] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);

  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Trigger the click event on the file input
    fileInputRef.current.click();
  };

  const uploadFileChanged = (e) => {
    console.log(e.target.files[0].name);
    setUploadFile(e.target.files[0].name);
  }

  const removeUploadFile = () => {
    setUploadFile("");
    fileInputRef.current.value = "";
  }

  const dragUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadFile(e.dataTransfer.files[0].name);
  }

  const dragOverUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleAnalyzeFile = () => {
    if (!fileInputRef.current || !fileInputRef.current.files.length) {
      console.error("No file selected");
      return;
    }
  
    const file = fileInputRef.current.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const fileContent = event.target.result;
        console.log("File content:", fileContent);
        setUploadStep("review");
        const qa = extractQA(fileContent);
        console.log(qa);
        setQAPairs(qa);
        // You can now process or display the file content as needed
        // alert(`File content:\n${fileContent}`);
      };
  
      reader.onerror = () => {
        console.error("Error reading file");
      };
  
      reader.readAsText(file); // Read file as text
    }
  };

  const extractQA = (fileContent) => {

    // Regex to extract content inside {} blocks
    const blockRegex = /{([^}]+)}/g;
    // Regex to match each پرسش and پاسخ pair
    const qaRegex = /پرسش:(.+?)پاسخ:(.+?)(?=پرسش:|$)/gs;

    let matches;
    const qaPairs = [];
    let results = [];

    // Extract each {} block
    while ((matches = blockRegex.exec(fileContent)) !== null) {
      const blockContent = matches[1]; // Content inside {}

      // Extract پرسش and پاسخ pairs from the block
      let qaMatch;
      let messages = [];
      while ((qaMatch = qaRegex.exec(blockContent)) !== null) {
        const question = qaMatch[1].trim();
        const answer = qaMatch[2].trim();

        messages.push({
          role: "user",
          content: question
        });
        messages.push({
          role: "assistant",
          content: answer
        })
        qaPairs.push({ question, answer });
      }

      results.push({
        messages: messages
      })
    }
    console.log(results);
    return results;
  };


  const sendQAPairs = () => {
    const apiUrl = "http://81.12.53.242:8081/receive_data";
  
    // Prepare data to send
    const data = {
      userName: userName,
      projectName: projectName,
      qaPairs: qaPairs,
    };
    // console.log("user name in uploader:")
    dispatch(setUserName(userName));
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
        
        navigate("/dashboard");

      })
      .catch((error) => {
        console.error("Error sending qaPairs to API:", error);
      });
  }

  const changeUserName = (e) => {
    // console.log("user name in uploader:")
    setUserNameLocal(e.target.value);
  }

  const changeProjectName = (e) => {
    // console.log("user name in uploader:")
    setProjectName(e.target.value);
  }

  const generateManual = () => {
    setQAPairs([{
      messages:[
        {
          role: "user",
          content: ""
        },
        {
          role: "assistant",
          content: ""
        }
      ]
    }]);

    setUploadStep("review");

  }


  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 0 }}
    >
      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["لطفا صفحه کلید خود را بر روی زبان فارسی تنظیم نمایید"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />
      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["مکالمات مورد نظر خود را تایپ نمایید.\n هر مکالمه شامل تعدادی پرسش و پاسخ می باشد"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />
      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["هر مکالمه با آکولاد باز آغاز و با آکولاد بسته خاتمه پیدا می کند"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />
      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["هر پرسش با کلمه کلیدی پرسش: شروع می شود. همجنین هر پاسخ با کلمه کلیدی پاسخ: شروع می شود"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />
      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["هر پرسش با یک پاسخ همراه می شود"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />

      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["یک نمونه از مکالمه مانند ذیل می باشد"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />

      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["{\nپرسش:\n\t این سامانه چه کاربردی دارد؟\n پاسخ:\n\t در پاسخگویی به کاربران کاربرد دارد\n}"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{whiteSpace: "pre-wrap", direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />
      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["یک نمونه از فایل شامل دو مکالمه، مکالمه اول یک پرسش و پاسخ و مکالمه دوم دو پرسش و پاسخ در ذیل می باشد"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />

      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={["{\nپرسش:\n\t این سامانه چه کاربردی دارد؟\n پاسخ:\n\t در پاسخگویی به کاربران کاربرد دارد\n}\n{\nپرسش:\n\t هزینه استفاده از این سامانه چقدر است؟\n پاسخ:\n\t هزینه استفاده از این سامانه بسیار مقرون به صرفه می باشد\n}"]}
        // date="13 minutes ago"
        onClick={handleCloseMenu}
        style={{whiteSpace: "pre-wrap", direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}
      />
      
    </Menu>
  );
  


  return (
    uploadStep === "upload" ? 
    <CoverLayout
      title="خوش آمدید"
      description="لطفا فایل حاوی اطلاعات پرسش و پاسخ کسب و کار خود را آپلود نمایید"
      image={aiCallCenterImage}
      xl={3}
    >
      <SoftBox component="form" role="form">
        <SoftBox mt={3} textAlign="center" style={{direction:"rtl", fontFamily:"Yekan", textAlign:"justify"}}>
          <SoftTypography variant="button" color="text" fontWeight="regular" style={{direction:"rtl", fontFamily:"Yekan"}}>
            در صورت تمایل می توانید اطلاعات مکالمات مورد نیاز را بدون آپلود فایل در {" "}
            <SoftTypography
              component={Link}
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{direction:"rtl", fontFamily:"Yekan", cursor:"hand"}}
              onClick={generateManual}
              
            >
              اینجا
            </SoftTypography>
            {" "}و به صورت مرحله به مرحله تولید نمایید. در صورت نیاز به راهنمایی برای آپلود، 
            <SoftTypography
              component={Link}
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{direction:"rtl", fontFamily:"Yekan", cursor:"hand"}}
              onClick={handleOpenMenu}
              
            >
              راهنما
            </SoftTypography>
            {" "}را مطالعه نمایید
          </SoftTypography>
          {renderMenu()}
        </SoftBox>
        <SoftBox mb={2}>
          <div className="uploader-drop_box" onDrop={dragUploadFile} onDragOver={dragOverUploadFile}>
            <header>
              {uploadFile === "" &&
                <h4 style={{direction:"rtl", fontFamily:"Yekan"}}>انتخاب فایل</h4>
              }
              {uploadFile !== "" &&
                <h4>{uploadFile}</h4>
              }
            </header>
            {uploadFile === "" &&
              <SoftButton variant="gradient" color="info"  onClick={handleButtonClick}>
                <Icon>upload</Icon>&nbsp;
              </SoftButton>
            }
            <input type="file"  id="fileID" accept=".txt" ref={fileInputRef} style={{display:"none"}} onChange={uploadFileChanged}></input>
            {uploadFile !== "" && 
              <SoftTypography variant="button" color="text" fontWeight="regular">
                <SoftButton variant="gradient" color="error"  iconOnly onClick={removeUploadFile}>
                  <Icon>delete</Icon>&nbsp;
                </SoftButton>
              </SoftTypography>
            }
          </div>
        </SoftBox>
        
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth disabled={uploadFile === ""} onClick={handleAnalyzeFile} style={{direction:"rtl", fontFamily:"Yekan", fontSize:"large"}}>
            آنالیز فایل
          </SoftButton>
        </SoftBox>




        





        <SoftBox mt={3} textAlign="center" style={{direction:"rtl", fontFamily:"Yekan"}}>
          <SoftTypography variant="button" color="text" fontWeight="regular" style={{direction:"rtl", fontFamily:"Yekan"}}>
            تاکنون ثبت نام نکرده اید؟{" "}
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
    </CoverLayout> :
    uploadStep === "review" ?
    <CoverLayout
      title="لیست پرسش و پاسخ"
      description="پرسش و پاسخ های ذیل از فایل شما استخراج گردید. در صورت نیاز با انتخاب گزینه های حذف و یا ویرایش لیست خود را اصلاح نمایید. در پایان با انتخاب گزینه مرحله بعد، به ادامه فرآیند وارد شوید "
      image="noImage"
      xl={8}
      
  >
          <KnowledgeInformation 
            qaPairs = {qaPairs}
            setUploadStep = {setUploadStep}
            setQAPairs={setQAPairs}
            removeUploadFile={removeUploadFile}>
          </KnowledgeInformation>

    </CoverLayout> :
    uploadStep === "submit" ?
      <CoverLayout
        title="درخواست خود را ثبت نمایید"
        description="لطفا با وارد کردن ایمیل خود از طریق داشبورد وضعیت درخواست خود را پیگیری نمایید"
        image={aiCallCenterImage}
      >
        <SoftBox component="form" role="form">
          <SoftBox mb={2} style={{direction:"rtl", fontFamily:"Yekan"}}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold" style={{direction:"rtl", fontFamily:"Yekan"}}>
                آدرس ایمیل
              </SoftTypography>
            </SoftBox>
            <SoftInput type="email" placeholder="ایمیل" value={userName} style={{direction:"ltr", fontFamily: "Yekan"}} onChange={changeUserName}/>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold" style={{direction:"rtl", fontFamily:"Yekan"}}>
                نام پروژه
              </SoftTypography>
            </SoftBox>
            <SoftInput type="text" placeholder="نام پروژه" value={projectName} style={{direction:"rtl", fontFamily: "Yekan"}} onChange={changeProjectName} />
          </SoftBox>
          
          
          <SoftBox mt={4} mb={1}>
            <SoftButton 
              // component={Link}
              // to="/dashboard"
              variant="gradient" 
              color="success" 
              fullWidth 
              style={{direction:"rtl", fontFamily:"Yekan"}} 
              onClick={sendQAPairs} >
              تایید
            </SoftButton>
          </SoftBox>
          
        </SoftBox>
      </CoverLayout> :
    <></>
  );
}

export default Uploader;
