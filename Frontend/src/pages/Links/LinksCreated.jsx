// import React from "react";
// import logo from "../../assets/logo.svg";
// import img1 from "../../assets/Dashboard-Images/img1.svg";
// import img2 from "../../assets/Dashboard-Images/img2.svg";
// import img3 from "../../assets/Dashboard-Images/img3.svg";
// import img4 from "../../assets/Dashboard-Images/img4.svg";
// import "./LinksCreated.css";
// import editIcon from "../../assets/edit_icon.png";
// import deleteIcon from "../../assets/delete_icon.png";

// import { Table, Space } from "antd";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const columns = [
//   {
//     title: "Date",
//     dataIndex: "key",
//     sorter: (a, b) => a.key.length - b.key.length,
//   },
//   {
//     title: "Original Link",
//     dataIndex: "links",
//   },
//   {
//     title: "Short Link",
//     dataIndex: "shortlink",
//     sorter: (a, b) => a.shortlink.length - b.shortlink.length,
//   },
//   {
//     title: "Remarks",
//     dataIndex: "remarks",
//   },
//   {
//     title: "Clicks",
//     dataIndex: "clicks",
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <Link to={`/edit-link`}>
//           {" "}
//           {/* Pass the record key for editing */}
//           <img
//             src={editIcon}
//             alt="Edit"
//             style={{ width: "20px", height: "20px" }}
//           />{" "}
//           {/* Added width and height */}
//         </Link>
//         <Link to={`/delete-link`}>
//           {" "}
//           {/* Pass the record key for editing */}
//           <img
//             src={deleteIcon}
//             alt="Edit"
//             style={{ width: "20px", height: "20px" }}
//           />{" "}
//           {/* Added width and height */}
//         </Link>
//       </Space>
//     ),
//   },
// ];

// const data1 = [
//   {
//     key: "2025-01-22",
//     links: "https://example.com/very-long-original-link",
//     shortlink: "https://short.ly/12345",
//     remarks: "Test link",
//     clicks: 123,
//   },
//   {
//     key: "2025-01-21",
//     links: "https://example.com/another-long-original-link",
//     shortlink: "https://short.ly/54321",
//     remarks: "Sample link",
//     clicks: 45,
//   },
// ];

// const LinksCreated = () => {
//   const navigate = useNavigate();
//   const goToDashboardsPage = () => {
//     navigate("/dashboard");
//   };
//   const goToLinksPage = () => {
//     navigate("/links");
//   };
//   const goToAnalyticsPage = () => {
//     navigate("/analytics");
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         <div className="dashboard-items">
//           {/* <div className="item1">
//                    <img src={img1} alt="Dashboard" className="item1-img" />
//                    <p>Dashboard</p>
//                  </div> */}

//           <div
//             className="item1"
//             onClick={goToDashboardsPage}
//             style={{ cursor: "pointer" }}
//           >
//             <img src={img1} alt="dashboard" className="item1-img" />
//             <p>Dashboard</p>
//           </div>

//           <div
//             className="item2"
//             onClick={goToLinksPage}
//             style={{ cursor: "pointer" }}
//           >
//             <img src={img2} alt="Links" className="item2-img" />
//             <p>Links</p>
//           </div>
//           <div
//             className="item3"
//             onClick={goToAnalyticsPage}
//             style={{ cursor: "pointer" }}
//           >
//             <img src={img3} alt="Analytics" className="item3-img" />
//             <p>Analytics</p>
//           </div>

//           {/* <div className="item3">
//                    <img src={img3} alt="Analytics" className="item3-img" />
//                    <p>Analytics</p>
//                  </div> */}
//         </div>

//         {/* Settings */}
//         <div className="setting">
//           <img src={img4} alt="Settings" />
//           <p>Settings</p>
//         </div>
//       </div>

//       <div className="main-content">
//         {/* Header */}
//         <div className="header-left">
//           <div className="greeting">
//             <p>🌞 Good morning, Sujith</p>{" "}
//             <span className="date">Tue, Jan 25</span>
//           </div>
//           <div className="header-right">
//             <button className="create-button">+ Create new</button>
//             <input
//               type="text"
//               className="search-bar"
//               placeholder="Search by remarks"
//             />
//             <div className="profile">
//               <h1>SU</h1>
//             </div>
//           </div>
//         </div>

//         {/* Links Section */}

//         <div className="link-section">
//           <Table
//             columns={columns}
//             dataSource={data1}
//             pagination={{ pageSize: 5 }}
//             components={{
//               header: {
//                 row: (props) => (
//                   <tr
//                     {...props}
//                     style={{
//                       backgroundColor: "#F3F7FD",
//                       color: "#3B3C51",
//                       fontWeight: "bold",
//                       textAlign: "center", // Center-align text
//                     }}
//                   />
//                 ),
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LinksCreated;

// LinksCreated.jsx

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Space } from "antd";
// import { fetchAllShortUrls } from "../../features/links/linksSlice"; // Import fetchAllShortUrls action
// import { Link } from "react-router-dom";
// import editIcon from "../../assets/edit_icon.png";
// import deleteIcon from "../../assets/delete_icon.png";

// // Columns for the table
// const columns = [
//   {
//     title: "Date",
//     dataIndex: "key",
//     sorter: (a, b) => a.key.length - b.key.length,
//   },
//   {
//     title: "Original Link",
//     dataIndex: "links",
//   },
//   {
//     title: "Short Link",
//     dataIndex: "shortlink",
//     sorter: (a, b) => a.shortlink.length - b.shortlink.length,
//   },
//   {
//     title: "Remarks",
//     dataIndex: "remarks",
//   },
//   {
//     title: "Clicks",
//     dataIndex: "clicks",
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <Link to={`/edit-link`}>
//           <img
//             src={editIcon}
//             alt="Edit"
//             style={{ width: "20px", height: "20px" }}
//           />
//         </Link>
//         <Link to={`/delete-link`}>
//           <img
//             src={deleteIcon}
//             alt="Delete"
//             style={{ width: "20px", height: "20px" }}
//           />
//         </Link>
//       </Space>
//     ),
//   },
// ];

// const LinksCreated = () => {
//   const dispatch = useDispatch();
//   const { shortUrls, loading, error } = useSelector((state) => state.links);

//   // Fetch all short links when the component mounts
//   useEffect(() => {
//     dispatch(fetchAllShortUrls());
//   }, [dispatch]);

//   return (
//     <div className="link-section">
//       <Table
//         columns={columns}
//         dataSource={shortUrls}
//         loading={loading}
//         pagination={{ pageSize: 5 }}
//         components={{
//           header: {
//             row: (props) => (
//               <tr
//                 {...props}
//                 style={{
//                   backgroundColor: "#F3F7FD",
//                   color: "#3B3C51",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               />
//             ),
//           },
//         }}
//       />
//       {error && <div>Error: {error}</div>}
//     </div>
//   );
// };

// export default LinksCreated;

// LinksCreated.jsx

// -----------------------------------  Working -----------------------
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Space } from "antd";
// import { fetchAllShortUrls } from "../../features/links/linksSlice"; // Import the action to fetch all short URLs
// import { Link } from "react-router-dom";
// import editIcon from "../../assets/edit_icon.png";
// import deleteIcon from "../../assets/delete_icon.png";

// // Columns for the table
// const columns = [
//   {
//     title: "Date",
//     dataIndex: "date", // Use the date field from Redux data
//     render: (text) => new Date(text).toLocaleDateString(), // Format the date properly
//     sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort by date
//   },
//   {
//     title: "Original Link",
//     dataIndex: "originalUrl", // Map to original URL from Redux data
//   },
//   {
//     title: "Short Link",
//     dataIndex: "shortUrl", // Map to short URL from Redux data
//     sorter: (a, b) => a.shortUrl.length - b.shortUrl.length,
//   },
//   {
//     title: "Remarks",
//     dataIndex: "remarks", // Map to remarks from Redux data
//   },
//   {
//     title: "Clicks",
//     dataIndex: "clicks", // Map to clicks from Redux data
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <Link to={`/edit-link`}>
//           <img
//             src={editIcon}
//             alt="Edit"
//             style={{ width: "20px", height: "20px" }}
//           />
//         </Link>
//         <Link to={`/delete-link`}>
//           <img
//             src={deleteIcon}
//             alt="Delete"
//             style={{ width: "20px", height: "20px" }}
//           />
//         </Link>
//       </Space>
//     ),
//   },
// ];

// const LinksCreated = () => {
//   const dispatch = useDispatch();
//   const { shortUrls, loading, error } = useSelector((state) => state.links);

//   // Fetch all short links when the component mounts
//   useEffect(() => {
//     dispatch(fetchAllShortUrls());
//   }, [dispatch]);

//   return (
//     <div className="link-section">
//       <Table
//         columns={columns}
//         dataSource={shortUrls} // Make sure shortUrls contains the data from Redux
//         loading={loading}
//         pagination={{ pageSize: 5 }}
//         components={{
//           header: {
//             row: (props) => (
//               <tr
//                 {...props}
//                 style={{
//                   backgroundColor: "#F3F7FD",
//                   color: "#3B3C51",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               />
//             ),
//           },
//         }}
//       />
//       {error && <div>Error: {error}</div>}
//     </div>
//   );
// };

// export default LinksCreated;

// working

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Space } from "antd";
// import { Link } from "react-router-dom";
// import { fetchAllShortUrls } from "../../features/links/linksSlice"; // Action to fetch links
// import editIcon from "../../assets/edit_icon.png";
// import deleteIcon from "../../assets/delete_icon.png";
// import { ToastContainer, toast } from "react-toastify"; // Import react-toastify components
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
// import copy1 from "../../assets/copy.png"

// const LinksCreated = () => {
//   const dispatch = useDispatch();
//   const { shortUrls, loading, error } = useSelector((state) => state.links);

//   // Columns for the table
//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date", // Use the date field from Redux data
//       render: (text) => new Date(text).toLocaleDateString(), // Format the date properly
//       sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort by date
//     },
//     {
//       title: "Original Link",
//       dataIndex: "originalUrl", // Map to original URL from Redux data
//     },
//     {
//       title: "Short Link",
//       dataIndex: "shortUrl", // Map to short URL from Redux data
//       sorter: (a, b) => a.shortUrl.length - b.shortUrl.length,
//       render: (shortUrl) => (
//         <Space>
//           <span>{shortUrl}</span>
//           <button
//             onClick={() => copyToClipboard(shortUrl)} // Add the copy function here

//           >
//             <img src={copy1} alt="Copy" className="copy" />
//           </button>
//         </Space>
//       ),
//     },
//     {
//       title: "Remarks",
//       dataIndex: "remarks", // Map to remarks from Redux data
//     },
//     {
//       title: "Clicks",
//       dataIndex: "clicks", // Map to clicks from Redux data
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <Link to={`/edit-link`}>
//             <img
//               src={editIcon}
//               alt="Edit"
//               style={{ width: "20px", height: "20px" }}
//             />
//           </Link>
//           <Link to={`/delete-link`}>
//             <img
//               src={deleteIcon}
//               alt="Delete"
//               style={{ width: "20px", height: "20px" }}
//             />
//           </Link>
//         </Space>
//       ),
//     },
//   ];

//   // Fetch all short links when the component mounts
//   useEffect(() => {
//     dispatch(fetchAllShortUrls());
//   }, [dispatch]);

//   // Function to copy the short URL to clipboard
//   const copyToClipboard = (url) => {
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         toast.success("Short URL copied to clipboard!"); // Show success toast
//       })
//       .catch((err) => {
//         toast.error("Failed to copy short URL."); // Show error toast
//       });
//   };

//   return (
//     <div className="link-section">
//       <Table
//         columns={columns}
//         dataSource={shortUrls} // Make sure shortUrls contains the data from Redux
//         loading={loading}
//         pagination={{ pageSize: 5 }}
//         rowKey={(record) => record._id} // Add this to make each row have a unique key
//         components={{
//           header: {
//             row: (props) => (
//               <tr
//                 {...props}
//                 style={{
//                   backgroundColor: "#F3F7FD",
//                   color: "#3B3C51",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               />
//             ),
//           },
//         }}
//       />
//       {error && <div>Error: {error}</div>}

//       {/* ToastContainer to display toasts */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default LinksCreated;

// working but modal for edit and delete icons is not in this code

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Space } from "antd";
// import { Link } from "react-router-dom";
// import { fetchAllShortUrls } from "../../features/links/linksSlice"; // Redux action to fetch links
// import editIcon from "../../assets/edit_icon.png";
// import deleteIcon from "../../assets/delete_icon.png";
// import copy1 from "../../assets/copy.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LinksCreated = () => {
//   const dispatch = useDispatch();

//   // Access Redux state
//   const { shortUrls, loading, error } = useSelector((state) => state.links);

//   // Fetch all short links when the component mounts
//   useEffect(() => {
//     dispatch(fetchAllShortUrls());
//   }, [dispatch]);

//   // Function to copy the short URL to clipboard
//   const copyToClipboard = (url) => {
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         toast.success("Short URL copied to clipboard!"); // Show success toast
//       })
//       .catch((err) => {
//         toast.error("Failed to copy short URL."); // Show error toast
//       });
//   };

//   // Columns for the table
//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date", // Use the date field from Redux data
//       render: (text) => new Date(text).toLocaleDateString(), // Format the date properly
//       sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort by date
//     },
//     {
//       title: "Original Link",
//       dataIndex: "originalUrl", // Map to original URL from Redux data
//     },
//     {
//       title: "Short Link",
//       dataIndex: "shortUrl", // Map to short URL from Redux data
//       render: (shortUrl) => (
//         <Space>
//           <span>{shortUrl}</span>
//           <button onClick={() => copyToClipboard(shortUrl)} style={{ border: "none", background: "none" }}>
//             <img src={copy1} alt="Copy" className="copy" style={{ width: "20px", height: "20px" }} />
//           </button>
//         </Space>
//       ),
//     },
//     {
//       title: "Remarks",
//       dataIndex: "remarks", // Map to remarks from Redux data
//     },
//     {
//       title: "Clicks",
//       dataIndex: "clicks", // Map to clicks from Redux data
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           {/* Edit button */}
//           <Link to={`/edit-link/${record._id}`}>
//             <img src={editIcon} alt="Edit" style={{ width: "20px", height: "20px" }} />
//           </Link>
//           {/* Delete button */}
//           <Link to={`/delete-link/${record._id}`}>
//             <img src={deleteIcon} alt="Delete" style={{ width: "20px", height: "20px" }} />
//           </Link>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="link-section">
//       {/* Ant Design Table */}
//       <Table
//         columns={columns}
//         dataSource={shortUrls} // Connect table data to Redux state
//         loading={loading} // Show loading spinner if fetching data
//         pagination={{ pageSize: 5 }}
//         rowKey={(record) => record._id} // Assign unique key for each row
//         components={{
//           header: {
//             row: (props) => (
//               <tr
//                 {...props}
//                 style={{
//                   backgroundColor: "#F3F7FD",
//                   color: "#3B3C51",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               />
//             ),
//           },
//         }}
//       />
//       {/* Display error message if any */}
//       {error && <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>}

//       {/* ToastContainer for notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default LinksCreated;

// edit modal is integrated

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Space } from "antd";
// import { fetchAllShortUrls } from "../../features/links/linksSlice"; // Redux action to fetch links
// import editIcon from "../../assets/edit_icon.png";
// import deleteIcon from "../../assets/delete_icon.png";
// import copy1 from "../../assets/copy.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EditShortLinkModal from "../Links/EditModal"; // Import the Edit Modal

// const LinksCreated = () => {
//   const dispatch = useDispatch();

//   // Access Redux state
//   const { shortUrls, loading, error } = useSelector((state) => state.links);

//   // Local state for managing the modal
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedUrl, setSelectedUrl] = useState(null);

//   // Fetch all short links when the component mounts
//   useEffect(() => {
//     dispatch(fetchAllShortUrls());
//   }, [dispatch]);

//   // Function to copy the short URL to clipboard
//   const copyToClipboard = (url) => {
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         toast.success("Short URL copied to clipboard!"); // Show success toast
//       })
//       .catch((err) => {
//         toast.error("Failed to copy short URL."); // Show error toast
//       });
//   };

//   // Handle opening the edit modal
//   const openEditModal = (url) => {
//     setSelectedUrl(url);
//     setIsModalVisible(true);
//   };

//   // Handle closing the edit modal
//   const closeEditModal = () => {
//     setIsModalVisible(false);
//     setSelectedUrl(null);
//   };

//   // Function to handle the form submission from the modal
//   const handleUpdateLink = (updatedData) => {
//     // Pass the updated data to the redux action to update the link
//     // You can dispatch your update action here
//     console.log("Updated Data", updatedData);
//     closeEditModal();
//   };

//   // Columns for the table
//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date", // Use the date field from Redux data
//       render: (text) => new Date(text).toLocaleDateString(), // Format the date properly
//       sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort by date
//     },
//     {
//       title: "Original Link",
//       dataIndex: "originalUrl", // Map to original URL from Redux data
//     },
//     {
//       title: "Short Link",
//       dataIndex: "shortUrl", // Map to short URL from Redux data
//       render: (shortUrl) => (
//         <Space>
//           <span>{shortUrl}</span>
//           <button onClick={() => copyToClipboard(shortUrl)} style={{ border: "none", background: "none" }}>
//             <img src={copy1} alt="Copy" className="copy" style={{ width: "20px", height: "20px" }} />
//           </button>
//         </Space>
//       ),
//     },
//     {
//       title: "Remarks",
//       dataIndex: "remarks", // Map to remarks from Redux data
//     },
//     {
//       title: "Clicks",
//       dataIndex: "clicks", // Map to clicks from Redux data
//     },
//     {
//       title: "Action",
//       render: (_, record) => (
//         <Space size="middle">
//           {/* Edit button */}
//           <button onClick={() => openEditModal(record)} style={{ border: "none", background: "none" }}>
//             <img src={editIcon} alt="Edit" style={{ width: "20px", height: "20px" }} />
//           </button>
//           {/* Delete button */}
//           <button style={{ border: "none", background: "none" }}>
//             <img src={deleteIcon} alt="Delete" style={{ width: "20px", height: "20px" }} />
//           </button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="link-section">
//       {/* Ant Design Table */}
//       <Table
//         columns={columns}
//         dataSource={shortUrls} // Connect table data to Redux state
//         loading={loading} // Show loading spinner if fetching data
//         pagination={{ pageSize: 5 }}
//         rowKey={(record) => record._id} // Assign unique key for each row
//         components={{
//           header: {
//             row: (props) => (
//               <tr
//                 {...props}
//                 style={{
//                   backgroundColor: "#F3F7FD",
//                   color: "#3B3C51",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               />
//             ),
//           },
//         }}
//       />
//       {/* Display error message if any */}
//       {error && <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>}

//       {/* ToastContainer for notifications */}
//       <ToastContainer />

//       {/* Edit Modal */}
//       {selectedUrl && (
//         <EditShortLinkModal
//           onClose={closeEditModal}
//           onSubmit={handleUpdateLink}
//           selectedUrl={selectedUrl}
//           error={error}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// export default LinksCreated;

// ----------------- Working Fine wirh Edit Modal and Delete Modal and also Get ALL urls request working fine ------------------------------------

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space } from "antd";
import { fetchAllShortUrls } from "../../features/links/linksSlice"; // Redux action to fetch links
import editIcon from "../../assets/edit_icon.png";
import deleteIcon from "../../assets/delete_icon.png";
import copy1 from "../../assets/copy.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditShortLinkModal from "../Links/EditModal"; // Import the Edit Modal
import DeleteModal from "../Links/DeleteModal"; // Import the Delete Modal

const LinksCreated = () => {
  const dispatch = useDispatch();

  // Access Redux state
  const { shortUrls, loading, error } = useSelector((state) => state.links);

  // Local state for managing modals
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Fetch all short links when the component mounts
  useEffect(() => {
    dispatch(fetchAllShortUrls());
  }, [dispatch]);

  // Function to copy the short URL to clipboard
  const copyToClipboard = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Short URL copied to clipboard!"); // Show success toast
      })
      .catch((err) => {
        toast.error("Failed to copy short URL."); // Show error toast
      });
  };

  // Handle opening the edit modal
  const openEditModal = (url) => {
    setSelectedUrl(url);
    setIsEditModalVisible(true);
  };

  // Handle closing the edit modal
  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedUrl(null);
  };

  // Function to handle the form submission from the modal
  const handleUpdateLink = (updatedData) => {
    // Pass the updated data to the redux action to update the link
    console.log("Updated Data", updatedData);
    closeEditModal();
  };

  // Handle opening the delete modal
  const openDeleteModal = (url) => {
    setSelectedUrl(url);
    setIsDeleteModalVisible(true);
  };

  // Handle closing the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedUrl(null);
  };

  // Function to handle delete confirmation
  const handleDeleteLink = (url) => {
    // Dispatch a delete action here or perform necessary operations to delete the link
    console.log("Deleted URL:", url);
    closeDeleteModal();
  };

  // Columns for the table
  const columns = [
    {
      title: "Date",
      dataIndex: "date", // Use the date field from Redux data
      render: (text) => new Date(text).toLocaleDateString(), // Format the date properly
      sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort by date
    },
    {
      title: "Original Link",
      dataIndex: "originalUrl", // Map to original URL from Redux data
    },
    {
      title: "Short Link",
      dataIndex: "shortUrl", // Map to short URL from Redux data
      render: (shortUrl) => (
        <Space>
          <span>{shortUrl}</span>
          <button
            onClick={() => copyToClipboard(shortUrl)}
            style={{ border: "none", background: "none" }}
          >
            <img
              src={copy1}
              alt="Copy"
              className="copy"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </Space>
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks", // Map to remarks from Redux data
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
    },
    {
      title: "Status",
      dataIndex: "expirationDate",
      render: (expirationDate, record) => {
        const isExpired = expirationDate ? new Date(expirationDate) < new Date() : false;
    
        return (
          <span
            style={{
              color: isExpired ? "#B0901E" : "#1EB036", // Yellow for inactive, Green for active
              fontWeight: "bold",
            }}
          >
            {isExpired ? "Inactive" : "Active"}
          </span>
        );
      },
    },

    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          {/* Edit button */}
          <button
            onClick={() => openEditModal(record)}
            style={{ border: "none", background: "none" }}
          >
            <img
              src={editIcon}
              alt="Edit"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
          {/* Delete button */}
          <button
            onClick={() => openDeleteModal(record)}
            style={{ border: "none", background: "none" }}
          >
            <img
              src={deleteIcon}
              alt="Delete"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="link-section">
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={shortUrls} // Connect table data to Redux state
        loading={loading} // Show loading spinner if fetching data
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record._id} // Assign unique key for each row
        components={{
          header: {
            row: (props) => (
              <tr
                {...props}
                style={{
                  backgroundColor: "#F3F7FD",
                  color: "#3B3C51",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              />
            ),
          },
        }}
      />
      {/* Display error message if any */}
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>
      )}

      {/* ToastContainer for notifications */}
      <ToastContainer />

      {/* Edit Modal */}
      {selectedUrl && isEditModalVisible && (
        <EditShortLinkModal
          onClose={closeEditModal}
          onSubmit={handleUpdateLink}
          selectedUrl={selectedUrl}
          error={error}
          loading={loading}
        />
      )}

      {/* Delete Modal */}
      {selectedUrl && isDeleteModalVisible && (
        <DeleteModal
          visible={isDeleteModalVisible}
          onCancel={closeDeleteModal}
          onDelete={handleDeleteLink}
          url={selectedUrl}
        />
      )}
    </div>
  );
};

export default LinksCreated;
