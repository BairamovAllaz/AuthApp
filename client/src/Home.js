import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import Table from "./Components/Table"
import "./Home.css";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8100/user/getusers")
      .then(data => data.json())
      .then(js => {
        setUsers(js);
        console.log(js);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Registration Time",
            accessor: "registration_time",
          },
        ],
      },
    ],
    []
  );

  const [selectedRowCount, setSelectedRowCount] = React.useState(0);
  const handleChangeSelection = React.useCallback(
    count => {
      setSelectedRowCount(count);
    },
    [setSelectedRowCount]
  );

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSSy-1tccfBX99nwlQc8Qx9n5NoPFqqTk2Iek4w6hkpLJZxh4aBJrXw0jgJOUdQdv_KXg&usqp=CAU"
              width="40"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span>Admin Panel</span>
            <span className="SpanDiv">
              <Button className="But" variant="danger">
                Delete
              </Button>
              <Button className="But" variant="secondary">
                Block
              </Button>
              <Button className="But" variant="success">
                LogOut
              </Button>
            </span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Styles>
        <Table
          columns={columns}
          data={users}
          onChangeSelection={handleChangeSelection}
        />
      </Styles>
    </>
  );
}

export default Home;
