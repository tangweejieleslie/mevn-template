<template>
    <div>
        <UploadFile />
        <hr>

        <label>User ID:</label>
        <input type="text" v-model.lazy="dataObject.userId" />
        <hr>
        <label>Comments:</label>
        <input type="text" v-model.lazy="dataObject.comments" />
        <hr>

        <button v-on:click="post()">Submit</button>
        <button v-on:click="get()">Get</button>

        <!--  Displays the data retrieved from MongoDB -->
        <ul>
            <li v-for="data in dataFromMongo">
                {{ data }}
            </li>
        </ul>

    </div>
</template>

<script>
const axios = require('axios');
import UploadFile from './Upload.vue';

export default {
    name: "API",
    components: {
        UploadFile
    },
    data(){
        return {
            dataObject: {
                userId: 'default id',
                monstersList: ['empty list', 'of monsters', 'for fun', {id:1, monsterName: 'SampleName'}],
                runesList: [{runeset: "Violent", main: {stat: "HP%", value: 63}}],
                comments: 'testing for fun'
            },
            dataFromMongo: [],
            updateFlag: 0
        }
    },

    methods: {
        post(){
            // console.log("submitting...");

            axios.post('http://localhost:4000/api/post', {
                dataObject: this.dataObject,
            })
            .then(function (response) {
                // console.log(response);
                // console.log("Submitted!");
            })
            .catch(function (error) {
                // console.log(error);
            });
        },
        get(){
            // console.log(this.dataFromMongo);

            axios.get('http://localhost:4000/api/get')
            .then((response) => {
                // console.log(response.data);
                const responseSize = response.data.length;
                let tempArray = [];
                
                for(var i = 0; i < responseSize; i ++) {
                    tempArray.push(response.data[i]);
                }

                localStorage.data = JSON.stringify(tempArray);
                this.dataFromMongo = response.data;
            })
            .catch(function (error) {
                // console.log(error);
            });

            this.updateFlag = 1;
        },
        setData(mongoData){
            // console.log(mongoData);
            this.dataFromMongo = mongoData;
        }
    },
    mounted(){
        this.get();
    }
}
 
</script>

<style scoped>

</style>