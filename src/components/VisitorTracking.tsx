import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisitors } from "../features/visitors/visitorSlice";
import { RootState, AppDispatch } from "../store";

const VisitorTracking: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { visitors, loading, error } = useSelector(
    (state: RootState) => state.visitors
  );

  useEffect(() => {
    dispatch(fetchVisitors());

    const intervalId = setInterval(() => {
      dispatch(fetchVisitors());
    }, 30000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <h1>Visitor Tracking</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {visitors.map((visitor) => (
          <li key={visitor.id}>
            <strong>IP:</strong> {visitor.ip} <br />
            <strong>User Agent:</strong> {visitor.userAgent} <br />
            <strong>Timestamp:</strong>{" "}
            {new Date(visitor.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitorTracking;
