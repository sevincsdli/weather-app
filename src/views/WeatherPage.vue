<template>
    <video
      autoplay
      loop
      muted
      :key="video"
      controls
      class="w-screen h-screen object-cover opacity-40 video"
    >
      <source :src="video" />
  
    </video>
  
    <div class="content p-4">
      <div class=""> 
        <!-- //w-full -->
        <div class="">
          <button
            class="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-sm w-36 h-12"
            @click="showPop()"
          >
            ADD CITY
          </button>
  <button class="text-white bg-lime-600 hover:bg-lime-700 px-4 py-1 rounded-sm h-12 ml-4" @click="addLocation()">
    ADD LOCATION
  </button>
          <em class="text-right text-[1.3rem] fixed  left-[68vw]">{{ time }}</em>
  <div class="form-section">
    
  </div>
          <div
            v-if="show"
            class="w-[30vw] h-[20vw] rounded-sm popup bg-[rgba(0,0,0,0.4)]"
          >
            <i
              class="fa fa-window-close text-2xl text-slate-600 relative ml-96"
              aria-hidden="true"
              @click="showPop()"
            ></i>
       
            <form
              action=""
              novalidate
              @submit.prevent="addCity()"
              class="flex flex-col p-4 gap-2 "
            >
              <label for="city" class="text-center mt-8 text-2xl text-slate-500"
                >Do you want add a city?</label
              >
              <input
                type="text"
                v-model="city"
                class="border border-slate-300 px-2 py-[0.5rem] text-white bg-[rgba(255,255,255,0.3)]"
                name="city"
                id="city"
                placeholder="Please, enter city ..."
                @keyup.enter="addCity()"
              />
              
              <input
                type="submit"
                value="ADD"
                class="text-white bg-blue-600 hover:bg-blue-700 px-4 py-[0.4rem] rounded-md mt-2"
              />
              <em class="text-center text-red-600">{{ error }}</em>
            </form>
          </div>
          <strong
            v-if="err"
            class="text-center text-red-700 text-2xl relative top-28 left-36 bg-[rgba(0,0,0,0.2)] p-2"
            >{{ err }}</strong
          >
          <div class="form">
            <form action="" class="">
            <div class="select">
              <select
                id="city"
                name="city"
                v-model="option"
                @click="Addoption()"
                class="flex justify-between gap-8 font-sans fa select pl-1 focus:border-none border text-black rounded-sm border-slate-50 bg-transparent py-1"
              >
                <option
                  value="add"
                  class="bg-transparent font-sans"
                  selected
                  disabled
                >
                  Add city, firstly
                </option>
  
                <option
                  v-for="option in options"
                  :key="option"
                  :value="option"
                  class="bg-transparent fa-solid fa-trash flex justify-between font-sans gap-8"
                >
                  {{ option }}
                  <p class="text-red-600">&#xf1f8;</p>
                </option>
              </select>
                <!-- <i class="fa fa-trash" aria-hidden="true"></i> -->
            </div>
          </form>
          <!-- <div
            @click="deleteCity1()"
            class="text-xl text-center text-white bg-red-600 p-2 rounded-lg w-36 cursor-pointer hover:bg-red-700 "
          >
            Delete All
          </div>
          <em class="text-white text-center text-xl">{{ deleteInfo }}</em> -->
  
        
  </div>
   
         
          <h2 class="italic text-right text-5xl relative top-36 uppercase">
            {{ option || coords }}
          </h2>
          <h1 class="italic text-right text-5xl relative top-40">{{ temp || 0}} °C</h1>
          <h1 class="text-right text-4xl italic mt-48">{{ main }}</h1>
  
          <div class="flex gap-2 fixed bottom-2 pr-4">
            <section class="" v-for="(items, i) in list.slice(0, 10)" :key="i">
              <div
                class="bg-[rgba(255,255,255,0.2)]  px-8  pt-2 py-12 rounded-md text-center"
              >
                <p class="pt-2">
                  {{
                    items.dt_txt.split("")[11] +
                    items.dt_txt.split("")[12] +
                    items.dt_txt.split("")[13] +
                    items.dt_txt.split("")[14] +
                    items.dt_txt.split("")[15]
                  }}
                </p>
                <img :src="img" alt="" />
      
                <p>{{ items.main.temp }}°C</p>
              </div>
            </section>
          </div>
        </div>
      </div>
     
        
    </div>
  </template>
  <script>
  
  export default {
  
    components: {},
    data() {
      return {
        src: '<source src="https://www.youtube.com/watch?v=mPZkdNFkNps" type="video/mp4">',
        rainyImg: "http://openweathermap.org/img/wn/02n@2x.png",
        video:
        require('@/assets/cloudy.mp4'),    
        cloudy: 
        require('@/assets/cloudy.mp4'), 
        rainy:
        require('@/assets/rainy.mp4'),   
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        key: "54fcdf109530d16f2925a1bb33440287",
        hourlyKey: "f0dfd8925a09c12a7dbd7ac578a56eee",
        city: "",
        icon: "",
        img: "",
        list: [],
        temp_max: "",
        show: false,
        error: "",
        cityValue: "",
        options: [],
        info: "",
        option: "",
        err: "",
        hourlyForecasts: "",
        forecast: "",
        main: "",
        temp: "",
        weather: "",
        deleteInfo: "",
        time: "",
        coords:''
      };
    },
    created() {
      setInterval(this.getTime, 1000);
    },
    mounted() {
      const optionsFromLocalStorage = localStorage.getItem("options");
  
      if (optionsFromLocalStorage) {
        this.options = JSON.parse(optionsFromLocalStorage);
      }
      const lastWeatherInfo = localStorage.getItem("lastWeather");
      if (lastWeatherInfo) {
        this.option = JSON.parse(lastWeatherInfo);
      }

    },
    methods: {
      getTime() {
        const today = new Date();
        const hour = today.getHours();
        const minute = today.getMinutes();
        const second = today.getSeconds();
        const time = hour + ":" + minute + ":" + second;
  
        this.time = time;
      },
      deleteCity1() {
        this.deleteInfo = "";
        console.log("clicked");
        this.options = [];
        this.deleteInfo = "All cities have been deleted!";
        localStorage.removeItem("options");
      },
      Addoption() {
        console.log("clicked");
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.option}&appid=${this.key}&units=metric`
        )
          .then((response) => {
            return response.json();
          })
          .then((info) => {
            console.log(info);
            this.deleteInfo = "";
            this.err = "";
            this.list = "";
            this.icon = info.list[0].weather[0].icon;
            this.temp_max = info.list[0].main.temp_max;
            this.img = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
            this.main = info.list[0].weather[0].main;
  
            console.log(this.main);
            this.list = info.list;
            this.temp = info.list[0].main.temp;
  
            if (this.main == "Clouds" || this.main.includes("Clouds")) {
              this.video = this.cloudy;
            } else if (this.main == "Clear" || this.main.includes("Clear")) {
              this.video = this.clear;
            } else if (this.main == "Rain" || this.main.includes("Rain")) {
              this.video = this.rainy;
            }
          })
          .catch((err) => {
            console.log(err);
            this.err = "Please, enter correct city name";
          });
  
  
      },
      addCity() {
        console.log("added");
        this.deleteInfo = "";
        if (this.city == "") {
          this.error = "Please,enter city name...";
        } else if (this.city) {
          const word = this.city.trim().split(" ")[0];
          if (word.length > 0 && !this.options.includes(word)) {
            this.options.push(word);
          }
  
          localStorage.setItem("options", JSON.stringify(this.options));
          localStorage.setItem("lastWeather", JSON.stringify(this.option));
  
          this.city = "";
          this.error = " ";
  
          this.info = "City added";
        }
      },
      showPop() {
        this.show = !this.show;
      },
      getMonthName(date) {
        const options = { month: "long" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
      },
      addLocation() {
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError)
      }else{
          console.log("oBrowser does not support")
      }
      },
      onSuccess(position) {
        const {latitude, longitude} = position.coords;
      const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.key}`;
        console.log(api)
        fetch(api).then(response => response.json()).then(info => {
          console.log(info)
          this.icon = info.list[0].weather[0].icon;
          this.temp_max = info.list[0].main.temp_max;
          this.img = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
          this.main = info.list[0].weather[0].main;
  
          console.log(this.main);
          this.list = info.list;
          this.temp = info.list[0].main.temp;
          this.coords=info.city.name
          if (this.main == "Clouds" || this.main.includes("Clouds")) {
            this.video = this.cloudy;
          } else if (this.main == "Clear" || this.main.includes("Clear")) {
            this.video = this.clear;
          } else if (this.main == "Rain" || this.main.includes("Rain")) {
            this.video = this.rainy;
          }
  
        }).catch((err) => {
          console.log(err)
         
  
  })
  
      },
      onError() {
        console.log('error')
      }
    },
  };
  </script>
  
  <style>
  
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;1,100;1,200;1,300&display=swap');
  .video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
  }
  
  .content {
    position: fixed;
    color: #f1f1f1;
    width: 100%;
    height: 100vh;
  }
  .select {
    width: 18rem;
    font-family: sans-serif;
    background: transparent;
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .select *{
    background-color:transparent!important;
  
    color:rgba(95, 95, 95, 0.836);
    font-family: 'Poppins', sans-serif;
  }
  /* .select option{
    background: transparent;
  } */
  .popup {
    position: fixed;
    top: 20vh;
    left: 34vw;
  }
  
  .select option {
    background: rgba(100, 100, 100, 0.3);
  }
  .form{
  display: flex;
  gap:1rem;
  justify-content: center;
  align-items: center;
  
  }
  /* form {
    pointer-events: auto;
  } */
  /* option:nth-child(1){
  background-color:red;
  color:red
  } */
  </style>
  