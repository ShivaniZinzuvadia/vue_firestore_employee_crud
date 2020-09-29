<template>
    <div class="signup">
        <h3>Create a new account</h3>    
        <input type="email" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="signup">Signup</button><br>
        <p>or go back to <router-link to='/login'>login</router-link></p>
    </div>    
</template>

<script>
import {auth} from '../firebase'
export default {
    name: 'SignUp',
    data: function(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signup(){
            auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$router.replace('home')
            }) 
            .catch(error => {
                alert("Error:" + error.message);
            })
        }
    }
}
</script>

<style scoped>
.sign-up {
    margin-top: 40px;
     text-align: center;
  }
  input {
    margin: 10px 0;
    width: 30%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>