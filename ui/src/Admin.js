import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import * as React from "react";
import AppAppBar from "./modules/views/AppAppBar";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";



const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "modifiedAt", headerName: "Modified At", width: 300 },
  { field: "createdAt", headerName: "Created At", width: 300 },
  {
    field: "trustScore",
    headerName: "Trust Score",
    type: "number",
    width: 150,
  },
];

// let rows = [ 
//     // {
//         id: 1,
//         // name: "gary",
//         // email: "gary@lazeez.ca",
//         // modifiedAt: "some date",
//         // createdAt: "some date",
//         // trustScore: 0.6,
//         // signUpDate: "some date,
//     // }"
// ];

function Index() {
  // const [data, setData] = React.useState([])
  const [rows, setRows] = React.useState([])

  const getUsers = async () => {
    // GET req /admin/users
    try {
      let userList = [];

      const resp = await axios.get(`http://localhost:5000/admin/users`);
      userList = resp.data.users;

      // for each user create a newRow and add it to the rows const
      userList.forEach((element, index) => {
       const newRow = {
          id: index,
          name: `${element.firstName} ${element.lastName}`  ,
          email: element.email,
          modifiedAt: element.updatedAt,
          createdAt: element.createdAt,
          trustScore: element.trustScore,
        };
        setRows(prev => [...prev, newRow])
        // rows.push(newRow);
      });
    } catch (error) {
      
      //   show toast
      console.error(error);
    }
  };

  React.useEffect(() => {
    getUsers();

    // this is run when the component first loads
    // console.log the response to understand whcih data to set (using setData)
  }, []);

  return (
    <React.Fragment>
      <AppAppBar />
      <h1>Average Trust Score: 50</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    </React.Fragment>
  );
}

export default withRoot(Index);
