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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

// Data
import BusinessTable from "../BusinessTables/BusinessTable";
import SoftProgress from "components/SoftProgress";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Projects({apiData}) {
  const [rows, setRows] = useState([]);
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    console.log("in Projects apiData is:", apiData)
    const generatedRows = apiData.map((row, key) => ({
    
        
          companies: [logoXD, row[5]],
          members: (
            <SoftTypography variant="caption" color="text" fontWeight="medium" style={{direction:"rtl", fontFamily:"Yekan"}}>
              {"Ticket-"+row[0]}
            </SoftTypography>
          ),
          budget: (
            <SoftTypography variant="caption" color="text" fontWeight="medium" style={{direction:"rtl", fontFamily:"Yekan"}}>
              {row[2] === "preprocessing" ? "در حال پردازش اولیه داده ها" : row[2] === "createmodel" ? "در حال ساخت مدل شما" : "تکمیل"}
            </SoftTypography>
          ),
          completion: (
            <SoftBox width="8rem" textAlign="left">
              <SoftProgress value={row[6]} color="info" variant="gradient" label={false} />
            </SoftBox>
          ),
        
      
    }));
    console.log("generatedRows:", generatedRows)
    setRows(generatedRows);
  }, [apiData]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      {/* <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            پروژه ها
          </SoftTypography>
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </SoftTypography>
          </SoftBox> 
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox> */}
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        {/* <Table columns={columns} rows={rows} /> */}
        <BusinessTable rows={rows} ></BusinessTable>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of Table
Projects.defaultProps = {
  apiData: [{}],
};

// Typechecking props for the Table
Projects.propTypes = {
  apiData: PropTypes.arrayOf(PropTypes.object),
};

export default Projects;
