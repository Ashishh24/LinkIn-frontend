import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { addFeed } from "../utils/feedSlice";
import { addRequest } from "../utils/requestSlice";
import { addRequestSent } from "../utils/requestSentSlice";
import { useEffect, useState } from "react";
import People from "./People";
import Header from "./Header";
import { BASE_URL } from "../utils/url";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const FindPeople = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { searchText } = state;

  const connections = useSelector((store) => store.connections);
  const requests = useSelector((store) => store.requests);
  const feed = useSelector((store) => store.feed);
  const requestsSent = useSelector((store) => store.requestsSent);

  const [filterCon, setFilterCon] = useState([]);
  const [filterFeed, setFilterFeed] = useState([]);
  const [filterReq, setFilterReq] = useState([]);
  const [filterReqSent, setFilterReqSent] = useState([]);

  const fetchData = async () => {
    if (connections && requests && feed && requestsSent) return;
    try {
      const resConnection = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      const resRequest = await axios.get(BASE_URL + "/user/connectionRequest", {
        withCredentials: true,
      });
      const resFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      const resRequestSent = await axios.get(
        BASE_URL + "/profile/connectionRequestSent",
        {
          withCredentials: true,
        }
      );
      dispatch(addConnection(resConnection.data.data));
      dispatch(addRequest(resRequest.data.data));
      dispatch(addFeed(resFeed.data.data));
      dispatch(addRequestSent(resRequestSent.data.data));
    } catch (err) {
      toast.error(
        err.message || err?.response?.data?.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const searchLower = searchText?.toLowerCase() || "";

    setFilterCon(
      connections?.filter((f) =>
        `${f.firstName} ${f.lastName}`.toLowerCase().includes(searchLower)
      )
    );
    setFilterReq(
      requests?.filter((f) =>
        `${f.fromUserID.firstName} ${f.fromUserID.lastName}`
          .toLowerCase()
          .includes(searchLower)
      )
    );
    setFilterFeed(
      feed?.filter((f) =>
        `${f.firstName} ${f.lastName}`.toLowerCase().includes(searchLower)
      )
    );
    setFilterReqSent(
      requestsSent?.filter((f) =>
        `${f.toUserID.firstName} ${f.toUserID.lastName}`
          .toLowerCase()
          .includes(searchLower)
      )
    );
  }, [searchText, connections, requests, feed, requestsSent]);

  return (
    <div>
      <Header />
      <div className="space-y-4">
        {/* Connections → No buttons */}
        {filterCon?.map((p) => (
          <People key={p._id} data={p} type="connection" />
        ))}

        {/* Requests → Accept / Reject */}
        {filterReq?.map((p) => (
          <People
            key={p.fromUserID._id}
            data={p.fromUserID}
            requestId={p._id}
            type="request"
          />
        ))}

        {/* Feed → Connect / Dismiss */}
        {filterFeed?.map((p) => (
          <People key={p._id} data={p} type="feed" />
        ))}

        {/* Requests Sent */}
        {filterReqSent?.map((p) => (
          <People key={p.toUserID._id} data={p.toUserID} type="requestSent" />
        ))}
      </div>
    </div>
  );
};

export default FindPeople;
