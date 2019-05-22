<template>
  <div>
    <label>File
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
    </label>
    </br>
    <label>User ID:</label>
    <input type="text" v-model.lazy="dataObject.userId" />
    </br>
    <label>Comments:</label>
    <input type="text" v-model.lazy="dataObject.comments" />
    </br>

    <button v-on:click="post()">Submit</button>
    <button v-on:click="get()">Get</button>

    <ul>
        <li v-for="data in dataFromMongo">
            {{ data }}
        </li>
    </ul>

  </div>
</template>

<script>
const axios = require('axios');

export default {
/*
    Defines the data used by the component
*/
    name: "API",
    data(){
        return {
            
            file: '',
            dataObject: {
                userId: 'default id',
                monstersList: ['empty list', 'of monsters', 'for fun', {id:1, monsterName: 'SampleName'}],
                runesList: [{runeset: "Violent", main: {stat: "HP%", value: 63}}],
                comments: 'testing for fun'
            },
            dataFromMongo: 'nodata',
            updateFlag: 0
        }
    },

    methods: {
        /*
        Submits the file to the server
        */
        post(){
            console.log("submitting...");

            axios.post('http://localhost:4000/api/post', {
                dataObject: this.dataObject,
            })
            .then(function (response) {
                console.log(response);
                console.log("Submitted!");
            })
            .catch(function (error) {
                console.log(error);
            });


        },

        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        get(){
            console.log(this.dataFromMongo);

            axios.get('http://localhost:4000/api/get')
            .then((response) => {
                console.log(response.data);
                const responseSize = response.data.length;
                let tempArray = [];
                
                for(var i = 0; i < responseSize; i ++) {
                    tempArray.push(response.data[i]);
                }

                localStorage.data = JSON.stringify(tempArray);
                this.dataFromMongo = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

            this.updateFlag = 1;
        },
        setData(mongoData){
            console.log(mongoData);
            this.dataFromMongo = mongoData;
        }
    },
    beforeUpdate(){
        console.log("New updates");
    }
}
 
</script>

<style scoped>

</style>
