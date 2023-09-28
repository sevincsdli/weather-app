<template>
  <video autoplay loop muted :key="video" controls class="object-cover video">
    <source :src="video" />
  </video>

  <div class="content p-4">
    <div class="">
      <div class="">
        <div class="flex justify-between">
          <div class="buttons flex xs:flex-col gap-2">
            <button
              class="xl:text-sm italic text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 w-36 h-12 rounded-md"
              @click="showPop()"
            >
              ADD CITY
            </button>
            <button
              class="xl:text-sm italic text-slate-100 bg-lime-600 hover:bg-lime-700 px-6 rounded-md py-1 h-12"
              @click="addLocation()"
            >
              ADD LOCATION
            </button>
          </div>

          <div
            class="date text-[1.3rem] mt-2 xs:mt-0 xs:ml-12 xs:text-[0.97rem]"
          >
            <em>{{ date }},</em>
            <em class="ml-2">{{ time }}</em>
          </div>
        </div>

        <div
          v-if="show"
          class="mt-8 w-[30vw] h-[34vh] rounded-sm popup bg-black bg-opacity-10 flex flex-col"
        >
          <i
            class="fa-solid fa-xmark text-2xl text-red-600 hover:text-red-800 text-write self-end mr-2"
            @click="closePop()"
          ></i>

          <form
            action=""
            novalidate
            @submit.prevent="addCity()"
            class="flex flex-col p-4 gap-4"
          >
            <label for="city" class="text-center  text-2xl text-black"
              >Do you want add a city?</label
            >
            <input
              type="text"
              v-model="city"
              class="text-black focus:outline-none border border-slate-700 px-2 py-[0.45rem] bg-white"
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
          </form>
          <em class="text-center text-red-600 text-xl mb-2">{{ error }}</em>
          <em class="text-center text-lime-600 text-xl mb-2">{{ info }}</em>
        </div>
        <strong
          v-if="err"
          class="text-center text-red-600 text-2xl p-2 noCity"
          >{{ err }}</strong
        >

        <div class="dropdown mx-auto italic xl:w-[16rem] mt-8">
          <div
            class="option flex justify-between gap-2"
            @click="toggleDropdown"
          >
            {{ selectedCity }}
            <i class="fas fa-chevron-down"></i>
          </div>
          <ul v-show="isOpen" class="options">
            <li
              v-for="(option, index) in options"
              :key="index"
              @click="selectCity(option)"
              class="border-b-2"
            >
              {{ option }}
              <i
                class="fas fa-trash delete-icon"
                @click="deleteCity(index)"
              ></i>
            </li>
          </ul>
        </div>
        <div class="">
          <h2
            class="italic text-right text-5xl xl:text-3xl relative top-36 uppercase"
          >
            {{ option || coords }}
          </h2>
          <h1 class="italic text-right text-5xl xl:text-3xl relative top-40">
            {{ temp || 0 }} °C
          </h1>
          <h1 class="text-right text-4xl italic mt-48 xl:text-3xl">
            {{ main }}
          </h1>
        </div>

        <div class="flex gap-2 mt-8 xl:flex-wrap xs:flex-wrap">
          <section class="" v-for="(items, i) in list.slice(0, 10)" :key="i">
            <div
              class="bg-[rgba(255,255,255,0.2)] px-8 pt-2 py-12 rounded-md text-center"
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
      video: require("@/assets/cloudy.mp4"),
      cloudy: require("@/assets/cloudy.mp4"),
      rainy: require("@/assets/rainy.mp4"),
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
      coords: "",
      selectedCity: "Select a city...",
    };
  },
  created() {
    this.getTime();
    setInterval(this.getTime, 1000);
    const weatherData = localStorage.getItem("weatherData");

    if (weatherData) {
      const parsedWeatherData = JSON.parse(weatherData);

      this.icon = parsedWeatherData.icon;
      this.temp_max = parsedWeatherData.temp_max;
      this.img = parsedWeatherData.img;
      this.main = parsedWeatherData.main;
      this.list = parsedWeatherData.list;
      this.temp = parsedWeatherData.temp;
      this.coords = parsedWeatherData.coords;

      if (this.main == "Clouds" || this.main.includes("Clouds")) {
        this.video = this.cloudy;
      } else if (this.main == "Clear" || this.main.includes("Clear")) {
        this.video = this.clear;
      } else if (this.main == "Rain" || this.main.includes("Rain")) {
        this.video = this.rainy;
      }
    }
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
  computed: {
    date() {
      const currentDate = new Date();
      const options = { month: "long", day: "numeric" };
      return currentDate.toLocaleDateString("en-US", options);
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectCity(option) {
      this.selectedCity = option;
      this.isOpen = false;
      this.coords = "";
      this.option = "";
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${option}&appid=${this.key}&units=metric`
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

    deleteCity(index) {
      this.isOpen = true;
      const deletedCity = this.options[index];

      this.selectedCity = "Select a city...";
      this.options.splice(index, 1);
      const storedOptions = JSON.parse(localStorage.getItem("options"));
      const updatedOptions = storedOptions.filter(
        (city) => city !== deletedCity
      );
      localStorage.setItem("options", JSON.stringify(updatedOptions));
    },

    getTime() {
      const today = new Date();
      const hour = today.getHours();
      const minute = today.getMinutes();
      let second = today.getSeconds();

      second = second < 10 ? "0" + second : second;

      const time = hour + ":" + minute + ":" + second;

      this.time = time;
    },

    addCity() {
      console.log("added");
      this.deleteInfo = "";
      this.option = "";
      this.coords = "";
      if (this.city == "") {
        this.error = "Please,enter city name...";
      } else if (this.city) {
        const word = this.city.trim().split(" ")[0];
        if (word.length > 0 && !this.options.includes(word)) {
          this.options.push(word);
        }

        localStorage.setItem("options", JSON.stringify(this.options));
        localStorage.setItem("lastWeather", JSON.stringify(this.option));

        this.error = " ";

        this.info = "City added";

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.key}&units=metric`
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
      }
    },
    showPop() {
      this.show = !this.show;
    },
    closePop() {
      this.show = false;
    },
    getMonthName(date) {
      const options = { month: "long" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    addLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
      } else {
        console.log("oBrowser does not support");
      }
    },
    onSuccess(position) {
      const { latitude, longitude } = position.coords;
      const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.key}`;
      console.log(api);
      fetch(api)
        .then((response) => response.json())
        .then((info) => {
          console.log(info);
          this.icon = info.list[0].weather[0].icon;
          this.temp_max = info.list[0].main.temp_max;
          this.img = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
          this.main = info.list[0].weather[0].main;

          console.log(this.main);
          this.list = info.list;
          this.temp = info.list[0].main.temp;
          this.coords = info.city.name;
          const weatherData = {
            icon: this.icon,
            temp_max: this.temp_max,
            img: this.img,
            main: this.main,
            list: this.list,
            temp: this.temp,
            coords: this.coords,
          };

          localStorage.setItem("weatherData", JSON.stringify(weatherData));
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
        });
    },
    onError() {
      console.log("error");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;1,100;1,200;1,300&display=swap");

.video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #f1f1f1;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
}

.popup {
  position: fixed;
  top: 20vh;
  left: 34vw;
}

.form {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.dropdown {
  position: relative;
  width: 400px;
}

.option {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option i {
  margin-left: 10px;
}

.options {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.options li {
  padding: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.options li:hover {
  background-color: rgb(143, 143, 140);
}
.delete-icon {
  color: red;
  cursor: pointer;
}
.noCity {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
