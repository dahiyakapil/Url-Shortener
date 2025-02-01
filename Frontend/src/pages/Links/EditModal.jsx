import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Switch from "react-switch";
import "./EditModal.css";

const EditShortLinkModal = ({
  onClose,
  onSubmit,
  selectedUrl,
  error,
  loading,
}) => {
  const [linkData, setLinkData] = useState({
    originalUrl: "",
    remarks: "",
    expiration: "",
  });

  const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);

  useEffect(() => {
    if (selectedUrl) {
      setLinkData({
        originalUrl: selectedUrl.originalUrl,
        remarks: selectedUrl.remarks,
        expiration: selectedUrl.expiration || "", // Check if expiration exists
      });
      setIsExpirationEnabled(!!selectedUrl.expiration); // Set the expiration status
    }
  }, [selectedUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!linkData.originalUrl) {
      toast.error("Please enter a valid URL");
      return;
    }
    onSubmit(linkData);
  };

  const handleClear = () => {
    setLinkData({
      originalUrl: "",
      remarks: "",
      expiration: "",
    });
  };

  const toggleExpiration = (checked) => {
    setIsExpirationEnabled(checked);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="header">
          <p className="new-link">Edit Link</p>
          <button onClick={onClose} className="modal-close-btn">
            ✕
          </button>
        </div>

        <h2 className="modal-header">
          <div className="destination">
            Destination Url <span className="red-star">*</span>
          </div>
        </h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="url"
            name="originalUrl"
            value={linkData.originalUrl}
            onChange={handleChange}
            placeholder="https://web.whatsapp.com/"
            className="modal-input"
            required
          />
          <h2 className="modal-header">
            <div className="remarks">
              Remarks
              <span className="red-star"> *</span>
            </div>
          </h2>
          <textarea
            name="remarks"
            value={linkData.remarks}
            onChange={handleChange}
            placeholder="Enter remarks"
            className="modal-textarea"
          />

          <div className="expiration-container">
            <label className="expiration-label">
              <p className="link-exp"> Link Expiration</p>
              <Switch
                className="toggal"
                onChange={toggleExpiration}
                checked={isExpirationEnabled}
                offColor="#ccc"
                onColor="#4A70D1"
                offHandleColor="#bbb"
                onHandleColor="#fff"
                height={20}
                width={50}
              />
            </label>
            {isExpirationEnabled && (
              <input
                type="datetime-local"
                name="expiration"
                value={linkData.expiration}
                onChange={handleChange}
                className="modal-input exp-date"
                placeholder="Link Expiration"
              />
            )}
          </div>

          <div className="modal-footer">
            <button onClick={handleClear} className="modal-clear-btn">
              Clear
            </button>

            <button
              type="submit"
              className={`modal-submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShortLinkModal;
