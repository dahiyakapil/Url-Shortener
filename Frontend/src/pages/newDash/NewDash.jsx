import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalClicks, // ✅ Updated import
  getDateWiseClicks,
  getClickDevices, // ✅ Updated import
   // ✅ Updated import
} from "../../features/links/linksSlice";
import "./NewDash.css"


const NewDash = () => {
    const dispatch = useDispatch();

    // Fetch data from Redux store
    const { totalClicks, dateWiseClicks, clickDevices, loading } = useSelector(
      (state) => state.links
    );

    useEffect(() => {
      dispatch(getTotalClicks());
      dispatch(getDateWiseClicks());
      dispatch(getClickDevices());
    }, [dispatch]);

    // Log the data to check their structure
    console.log('Total Clicks:', totalClicks);
    console.log('Date-wise Clicks:', dateWiseClicks);
    console.log('Click Devices:', clickDevices);

    // Safely extract the value of totalClicks
    const totalClickValue = totalClicks?.totalClicks || 0;

    return (
      <div className="stats">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="total-clicks-container">
              <div className="total-click">Total Clicks</div>
              <div className="total-clicks-count">{totalClickValue}</div>
            </div>

            <div className="stats-container">
              {/* Date-wise Clicks */}
              <div className="stats-card">
                <h3>Date-wise Clicks</h3>
                {dateWiseClicks?.length > 0 ? (
                  dateWiseClicks.map((item, index) => (
                    <div className="stats-row" key={index}>
                      <span>{new Date(item._id).toLocaleDateString()}</span> {/* Extract and format the date */}
                      <div className="progress-bar">
                      <div className="bar" style={{ width: `${Math.min((item.totalClicks / totalClickValue) * 100, 100)}%` }}></div>

                      </div>
                      <span>{item.totalClicks}</span> {/* Display the clicks */}
                    </div>
                  ))
                ) : (
                  <p>No data available</p>
                )}
              </div>

              {/* Click Devices */}
              <div className="stats-card">
                <h3>Click Devices</h3>
                {clickDevices ? (
                  <>
                    <div className="stats-row">
                      <span>Android</span>
                      <div className="progress-bar">
                        <div className="bar" style={{ width: `${(clickDevices.totalAndroidClicks / totalClickValue) * 100}%` }}></div>
                      </div>
                      <span>{clickDevices.totalAndroidClicks}</span>
                    </div>
                    <div className="stats-row">
                      <span>Desktop</span>
                      <div className="progress-bar">
                        <div className="bar" style={{ width: `${(clickDevices.totalDesktopClicks / totalClickValue) * 100}%` }}></div>
                      </div>
                      <span>{clickDevices.totalDesktopClicks}</span>
                    </div>
                    <div className="stats-row">
                      <span>Tablet</span>
                      <div className="progress-bar">
                        <div className="bar" style={{ width: `${(clickDevices.totalTabletClicks / totalClickValue) * 100}%` }}></div>
                      </div>
                      <span>{clickDevices.totalTabletClicks}</span>
                    </div>
                  </>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  export default NewDash;
















