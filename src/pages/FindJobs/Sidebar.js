// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Toolbar, Box } from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({ activeTab, onChangeTab }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e293b',
          color: 'white',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
          Job Dashboard
        </Typography>
      </Toolbar>
      <List>
        <ListItem button selected={activeTab === 'dashboard'} onClick={() => onChangeTab('dashboard')}>
          <ListItemIcon><HomeIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button selected={activeTab === 'jobPostings'} onClick={() => onChangeTab('jobPostings')}>
          <ListItemIcon><WorkIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Job Postings" />
        </ListItem>
        <ListItem button selected={activeTab === 'applications'} onClick={() => onChangeTab('applications')}>
          <ListItemIcon><PeopleIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
        <ListItem button selected={activeTab === 'companyProfile'} onClick={() => onChangeTab('companyProfile')}>
          <ListItemIcon><AssessmentIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Company Profile" />
        </ListItem>
        <ListItem button selected={activeTab === 'createJob'} onClick={() => onChangeTab('createJob')}>
          <ListItemIcon><AddIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Create Job" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
