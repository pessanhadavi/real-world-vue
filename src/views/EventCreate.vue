<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapState(["user", "categories"]),
    // The code above is a simpler form of the below one
    // ({ user: "user", If it is a top level state (no dots), you can use this notation
    // categories: (state) => state.categories,})

    /* If we need to access different parts of our State
      from the same component, it can get verbose and
      repetitive to have multiple computed properties
      each returning this.$store.state.something.
      To simplify things, we can use the mapState helper.
      In this case, the code above replaces the one below.

      computed: {
        userName() {
          return this.$store.state.user.name;
        },
        userID() {
          return this.$store.state.user.id;
        },
      },
    */
  },
};
</script>

<style lang="scss" scoped></style>
