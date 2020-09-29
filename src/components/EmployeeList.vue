<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped" v-if="users.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.key">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.contact }}</td>
              <td>
                <router-link
                  :to="{ name: 'Edit', params: { id: user.key } }"
                  class="btn btn-primary mr-1"
                  >Edit
                </router-link>
                <button
                  @click.prevent="deleteUser(user.key)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <h4 v-else class="text-center">No data found</h4>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "../firebase";

export default {
  name: "EmployeeList",
  data: function () {
    return {
      users: [],
    };
  },
  created() {
    db.collection("employees").onSnapshot((snapshotChange) => {
      this.users = [];
      snapshotChange.forEach((doc) => {
        this.users.push({
          key: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          contact: doc.data().contact,
        });
      });
    });
  },
  methods: {
    deleteUser(id) {
      if (window.confirm("Are you sure?")) {
        db.collection("employees")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>