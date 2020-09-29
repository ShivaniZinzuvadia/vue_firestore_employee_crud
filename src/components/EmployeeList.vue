<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped" v-if="employees.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee,idx) in employees" :key="idx">
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.contact }}</td>
              <td>
                <router-link
                  :to="{ name: 'Edit', params: { id: employee.id } }"
                  class="btn btn-primary mr-1"
                  >Edit
                </router-link>
                <button
                  @click.prevent="deleteUser(employee.id)"
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
      employees: [],
    };
  },
  firestore(){
    return {
      employees: db.collection('employees')
    }
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