<template>
    <b-form v-if="person" @submit.prevent="save">
        <b-form-group id="inputFirstName" label="First Name">
            <b-form-input id="inputfName" v-model="person.FirstName" placeholder="first name"></b-form-input>
        </b-form-group>
        <b-form-group id="inputLastName" label="Last Name">
            <b-form-input id="inputlName" v-model="person.LastName" placeholder="last name"></b-form-input>
        </b-form-group>
        <b-form-group id="inputDoB" label="Date of Birth">
            <b-form-input id="inputdob" type="date" 
                    :value="person.DoB && person.DoB.toISOString().split('T')[0]"
                    v-on:input="update_dob"
                    placeholder="date of birth"></b-form-input>
        </b-form-group>
        <b-form-group id="inputSSN" label="Social Security Number">
            <b-form-input id="inputssn" v-model="person.SSN" placeholder="123-45-6789"></b-form-input>
        </b-form-group>


        <b-form-group id="inputEmail" label="Emails">
            <div v-for="email in person.emails" 
            :key="email.EId"
            :email="email">
                <b-form-input id="v-for-object" type="email" class="emails" v-model="email.EmailAddress" placeholder="Email@example.com"></b-form-input>
            </div>
            <b-button href="#" @click="add_email">Add a new email</b-button>
        </b-form-group>
        <label>Phones</label>
        <b-form inline id="inputPhone">
            <div v-for="phone in person.phones" 
            :key="phone.PId"
            :phone="phone">         
                <b-form-input type="text" class="phones" v-model="phone.CountryCode" placeholder="Country Code"></b-form-input>
                <b-form-input type="text" class="phones" v-model="phone.AreaCode" placeholder="Area Code"></b-form-input>
                <b-form-input type="text" class="phones" v-model="phone.ExchangeCode" placeholder="Exchange Code"></b-form-input>
                <b-form-input type="text" class="phones" v-model="phone.LineNumber" placeholder="Line Number"></b-form-input>
                <b-form-input type="text" class="phones" v-model="phone.Extension" placeholder="Extension"></b-form-input>
            </div>
            <b-button href="#" @click="add_phone">Add a new phone</b-button>
        </b-form>

        <b-form-group id="inputAddress" label="Addresses">
            <div v-for="address in person.addresses" 
            :key="address.AId"
            :address="address">
                <b-form-input type="text" class="address" v-model="address.StreetName" placeholder="Street Name"></b-form-input>
                <b-form-input type="text" class="address" v-model="address.BuildingNumber" placeholder="Building Number"></b-form-input>
                <b-form-input type="text" class="address" v-model="address.ZipCode" placeholder="Zip Code"></b-form-input>
                <b-form-input type="text" class="address" v-model="address.ZipExtension" placeholder="Zip Extension"></b-form-input>
            </div>
            <b-button href="#" @click="add_address">Add a new address</b-button>
        </b-form-group>

        <b-button type="submit" variant="primary">save</b-button>

        <p class="submit_message" v-if="this.save_message">{{ save_message }}</p>
    </b-form>
</template>


<script lang="ts">
import Vue from "vue";
import * as station from "../../../common/src/station";
import * as axios from "axios";
import * as remote_api from "../remote_api"

export default Vue.extend({
    data() {
        return {
            person: undefined as station.Person,
            save_message: ""
        }
    },
    methods: {
        save() {
            var that = this;

            if (this.person.FirstName.length > 30) {
                alert("First name is too long, try again!");
                return;
            }

            if (this.person.LastName.length > 30) {
                alert("Last name is too long, try again!");
                return;
            }

            this.person.SSN = this.person.SSN.replace(/[-A-Za-z]/gi, '')

            if (this.person.SSN.length > 10) {
                alert("SSN is too long!");
                return;
            }
            that.save_message = "";

            remote_api.create_person(this.person).then((response) => {
                that.save_message = "Saved!";
                response.data.DoB = new Date(response.data.DoB);

                // If the person id has changed, we created a new person.
                // We need to switch to the proper URL or refreshes will be wrong.
                let old_id = that.person.PersonId;
                that.person = response.data;

                // Refresh the view as we have new data. it will get latest from the server.
                that.$router.push({name: 'viewPerson', params: { person_id: that.person.PersonId }});
            });
        },

        add_email() {
            var email = new station.Email();
            email.PersonId = this.person.PersonId;
            this.person.emails.push(email);
        },

        add_phone() {
            var phone = new station.PhoneNumber();
            phone.PersonId = this.person.PersonId;
            this.person.phones.push(phone);
        },

        add_address() {
            var address = new station.Address();
            address.PersonId = this.person.PersonId;
            this.person.addresses.push(address);
        },

        update_dob(event) {
            this.person.DoB = new Date(event);
        }
    },
    mounted: function() {
        if (!this.$route.params.person_id) {
            this.person = new station.Person();
        } else {
            let that = this;
            remote_api.get_person(this.$route.params.person_id).then((response) => {
                response.data.DoB = new Date(response.data.DoB);
                that.person = response.data;
            });
        }

    }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
