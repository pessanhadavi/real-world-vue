<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import axios from "axios";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
    axios
      .get("http://localhost:3000/events")
      .then((response) => {
        this.events = response.data;
      })
      .catch((error) => {
        console.log("there was an error:" + error.response);
      });
  },
};
</script>
