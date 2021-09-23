import axios from "axios";

const apiClient = axios.create({
  // Single axios instance for our entire app
  baseURL: "http://localhost:3000/", // Base URL for all calls to use
  withCredentials: false,
  headers: {
    // For authentication and configuration to comunicate to our server
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page); // Get request calling events
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
};
