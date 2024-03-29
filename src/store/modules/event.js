import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3,
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  createEvent({ commit, dispatch, rootState }, event) {
    console.log("User creating Event is " + rootState.user.user.name);
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "sucess",
          message: "Your event has been created",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem creating your event: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEvent(id) // Here the return ensure API promise gets returned, so then() will work on router config.
        .then((response) => {
          commit("SET_EVENT", response.data);
          return response.data;
        });
    }
  },
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
