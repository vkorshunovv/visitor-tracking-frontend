import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addVisitor } from "../features/VisitorSlice";
import { RootState } from "../store";

const socket = io("django-url");

const VisitorTracking = () => {
  const dispatch = useDispatch();
  const visitors = useSelector((state: RootState) => state.visitor.visitors);

  useEffect(() => {
    socket.on("visitor_data", (visitorData) => {
      dispatch(addVisitor(visitorData));
    });

    return () => {
      socket.off("visitor_data");
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Visitor Tracking</h1>
      <ul>
        {visitors.map((visitor, index) => (
          <li key={index}>{`${visitor.ip} - ${visitor.userAgent} - ${new Date(
            visitor.timestamp
          ).toLocaleString()}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default VisitorTracking;
