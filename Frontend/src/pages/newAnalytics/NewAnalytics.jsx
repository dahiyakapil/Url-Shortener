import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShortUrls, getUserDevice, getUserIp } from "../../features/links/linksSlice";

const NewAnalytics = () => {
  const dispatch = useDispatch();

  const { 
    shortUrls, 
    device, 
    loading: linksLoading, 
    ip 
  } = useSelector((state) => state.links);
  
  // Extract IP details from the ip object
  const ipAddress = ip?.ipAddress; 
  const ipLoading = ip?.loading;   
  const ipError = ip?.error;       

  const [tableData, setTableData] = React.useState([]);

  useEffect(() => {
    dispatch(fetchAllShortUrls()); // Fetch short URLs
    dispatch(getUserDevice()); // Fetch user device information
    dispatch(getUserIp()); // Fetch the user's IP address from Redux
  }, [dispatch]);

  useEffect(() => {
    if (ipLoading) {
      console.log("IP is loading...");
    } else if (ipAddress) {
      console.log("Fetched IP Address:", ipAddress);
    } else if (ipError) {
      console.log("Error fetching IP:", ipError);
    }
  }, [ipAddress, ipLoading, ipError]);
  
  useEffect(() => {
    if (shortUrls.length > 0) {
      const updatedTableData = shortUrls.map((urlData) => ({
        key: new Date(urlData.date).toLocaleString("en-US", {
          year: "numeric",
          month: "short", // Abbreviated month (e.g., Jan)
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false, // Use 12-hour clock (e.g., 4:30 PM)
        }),
        links: urlData.originalUrl,
        shortlink: urlData.shortUrl,
        ip: ipAddress || (ipLoading ? "Loading..." : "Unknown"),
      userdevice: device || (linksLoading ? "Loading..." : "Unknown"),
      }));

      setTableData(updatedTableData);
    }
  }, [shortUrls, ipAddress, device, ipLoading, linksLoading]); // Re-run when data changes

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "key",
      sorter: (a, b) => a.key.length - b.key.length,
    },
    {
      title: "Original Link",
      dataIndex: "links",
    },
    {
      title: "Short Link",
      dataIndex: "shortlink",
    },
    {
      title: "IP Address",
      dataIndex: "ip",
    },
    {
      title: "User Device",
      dataIndex: "userdevice",
    },
  ];

  return (
    <div className="link-section">
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
        components={{
          header: {
            row: (props) => (
              <tr
                {...props}
                style={{
                  backgroundColor: "#F3F7FD",
                  color: "#3B3C51",
                  fontWeight: "bold",
                  textAlign: "center", // Center-align text
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default NewAnalytics;
