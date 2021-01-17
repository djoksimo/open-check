import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import * as React from 'react';
import AppAppBar from './modules/views/AppAppBar';
import { DataGrid } from '@material-ui/data-grid';



const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width:150 },
    { field: 'modifiedAt', headerName: 'Modified At', width:150 },  
    { field: 'createdAt', headerName: 'Created At', width:150 },
    { field: 'trustScore', headerName: 'Trust Score',type: 'number',width:150 },
    { field: 'signUpDate', headerName: 'Sign Up Date', width:150 },    
  ];
  

  const rows = [
    {
        id: 1,
        name: "gary", 
        email: "gary@lazeez.ca",
        modifiedAt: "some date", 
        createdAt: "some date",
        trustScore: 0.6,
        signUpDate: "some date",
    }
  ];


function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <h1>Average Trust Score: </h1> 
      <div style={{ height: 400, width: '100%' }}>
  
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
      </div>
    </React.Fragment>
  );
}



export default withRoot(Index);