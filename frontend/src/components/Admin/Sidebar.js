
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./Sidebar.css";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";

import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebarA">
      <Link to="/">
        <img
          className="logo"
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/black-and-yellow-logo-design-template-753d0594c51b7e8417a7a94453d69182_screen.jpg?ts=1585932268"
          alt="Ecommerce"
        />
      </Link>
      <Link to="/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to="#">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
