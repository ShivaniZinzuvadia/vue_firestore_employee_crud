<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h3 class="text-center">Update User</h3>
      <form @submit.prevent="onUpdateForm">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="employee.name"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="employee.email"
            required
          />
        </div>

        <div class="form-group">
          <label>Contact</label>
          <input
            type="text"
            class="form-control"
            v-model="employee.contact"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { db } from "../firebase";
export default {
  name: "EmployeeEdit",
  data: function () {
    return {
      employee: {},
      employeeId: this.$route.params.id,
    };
  },
  created() {
    let dbRef = db.collection("employees").doc(this.employeeId);
    dbRef
      .get()
      .then((doc) => {
        this.employee = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm() {
      db.collection("employees")
        .doc(this.employeeId)
        .update(this.employee)
        .then(() => {
          console.log("Employees successfully updated!");
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>