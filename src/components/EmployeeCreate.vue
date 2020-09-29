<template>
  <div class="row">
    <div class="col-md-8">
      <h3>Add User</h3>
      <form @submit.prevent="onFormSubmit">
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
          <button class="btn btn-primary btn-block">Add User</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
export default {
  name: "EmployeeCreate",
  data: function () {
    return {
      employee: {
        name: "",
        email: "",
        contact: "",
      },
    };
  },
  methods: {
    onFormSubmit: function () {
        db.collection('employees').add(this.employee)
        .then(() => {
            alert('Employee added successfully');
            this.employee.name = ''
            this.employee.email = ''
            this.employee.contact = ''
        })
        .catch(error => {
            console.log("Error:" + error.message);
        })
    }
  },
};
</script>