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
          "https://rr3---sn-51xguxaxjvh-btqe.googlevideo.com/videoplayback?expire=1688491812&ei=xAKkZIveArq5sfIP6YyJmAU&ip=154.16.105.52&id=o-ALZ-QeCU2a3NPN1pzgqfjDaLFxVIkA3bQa0Dt61sOJZP&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&bui=AYlvQAvvoCogMnUh9imNG6Lmp7jk4FP9mb8Z5TxI50TgtvIETOCLnMOMf9CZDEM3zbn43ZFSDnHUxtSAiHP-QpB9ngqr__sg&spc=Ul2Sq_F8K41zUPZ722BUJgWb2pJt7jaUdqv-tw1uRg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=_S0UKI9xmzJaVskRMzYKffAO&gir=yes&clen=7291998&dur=47.066&lmt=1457873114250502&keepalive=yes&fexp=24007246&c=WEB&n=jmAOs80kw7eMiw&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMgTrB-OUFn5A5qiRpf86Z1H904U_yowZHsiO1wm1HWeAiEAtaQHPFnd27b1fpOT4RuaX2cowL-GhoaoUs1CGFrTUh0%3D&redirect_counter=1&rm=sn-q4fell7z&req_id=47307d52703a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=_k&mip=109.235.193.178&mm=31&mn=sn-51xguxaxjvh-btqe&ms=au&mt=1688469892&mv=m&mvi=3&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIhAKxfgln1882S26wNEnvdump8RnMUbMXS8xy0IpdcW4eXAiBZPrDS_w5Xqcq-2pohwQhn459Q0OP00oL5NWzlOOrPeg%3D%3D",
        clear:
          "https://rr1---sn-51xguxaxjvh-btqe.googlevideo.com/videoplayback?expire=1688491882&ei=CQOkZNSEPM-ZsfIPpdy7mAo&ip=191.96.106.63&id=o-AMOADGrXPlggzIZUtJF5hfh5vOpZLiaTdKCpxpNeE5Cm&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&spc=Ul2SqxVorrwsTtUHbNUTZg9RMvXQ8eJSpknPZ_uy6A&vprv=1&svpuc=1&mime=video%2Fmp4&ns=u35IMZWtbb2vD5GnE0fOYJUO&gir=yes&clen=35630289&otfp=1&dur=176.166&lmt=1642836898825834&keepalive=yes&fexp=24007246,24350017&beids=24350017&c=WEB&txp=6216224&n=DqZZ722owG2kqQ&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cotfp%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAI55WQyCOAZr3DDKYnI7_IVH4VVNv7PkZXeOBKLXyDg3AiEA-DGgqqyPB490ZA_XRmTUv5JngZ_Q-PuGrAazpJzh1rE%3D&redirect_counter=1&rm=sn-a5myk7z&req_id=7bb627b2d2fba3ee&cms_redirect=yes&ipbypass=yes&mh=BA&mip=109.235.193.178&mm=31&mn=sn-51xguxaxjvh-btqe&ms=au&mt=1688469892&mv=m&mvi=1&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRgIhAIO5lDFlmDapQ3v6xCm8cpEzXQHOQAjcPjdbNJLq5WV6AiEAtdDoAcnGsvkNyNvmYjbg_glniOvHeTTO21MHcGbGZCs%3D",
        cloudy:
          "https://rr3---sn-51xguxaxjvh-btqe.googlevideo.com/videoplayback?expire=1688491812&ei=xAKkZIveArq5sfIP6YyJmAU&ip=154.16.105.52&id=o-ALZ-QeCU2a3NPN1pzgqfjDaLFxVIkA3bQa0Dt61sOJZP&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&bui=AYlvQAvvoCogMnUh9imNG6Lmp7jk4FP9mb8Z5TxI50TgtvIETOCLnMOMf9CZDEM3zbn43ZFSDnHUxtSAiHP-QpB9ngqr__sg&spc=Ul2Sq_F8K41zUPZ722BUJgWb2pJt7jaUdqv-tw1uRg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=_S0UKI9xmzJaVskRMzYKffAO&gir=yes&clen=7291998&dur=47.066&lmt=1457873114250502&keepalive=yes&fexp=24007246&c=WEB&n=jmAOs80kw7eMiw&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMgTrB-OUFn5A5qiRpf86Z1H904U_yowZHsiO1wm1HWeAiEAtaQHPFnd27b1fpOT4RuaX2cowL-GhoaoUs1CGFrTUh0%3D&redirect_counter=1&rm=sn-q4fell7z&req_id=47307d52703a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=_k&mip=109.235.193.178&mm=31&mn=sn-51xguxaxjvh-btqe&ms=au&mt=1688469892&mv=m&mvi=3&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIhAKxfgln1882S26wNEnvdump8RnMUbMXS8xy0IpdcW4eXAiBZPrDS_w5Xqcq-2pohwQhn459Q0OP00oL5NWzlOOrPeg%3D%3D",
        rainy:
          "https://rr2---sn-51xguxaxjvh-btqe.googlevideo.com/videoplayback?expire=1688490488&ei=mP2jZM3SDouvlu8P27iRyA0&ip=191.96.227.38&id=o-APIQczowbddKLhWRgoYRByKs2wPMbauWTfWhcjFX2ZA2&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&spc=Ul2Sq_2IARkc5wWpC5dan53vJ5NgrFFqNE8CJOmfNA&vprv=1&svpuc=1&mime=video%2Fmp4&ns=GtbS6AYhkPI93il-sitDUyUO&gir=yes&clen=1656574578&dur=28813.781&lmt=1649348727207734&keepalive=yes&fexp=24007246,24350017&beids=24350017&c=WEB&txp=4535434&n=R6Xyr78IcD-QZQ&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAIz5iiwtM6SyShqHc3bEYi01TEKUeGeoNjzTDLcohSRKAiALP4Mb1qyW7v68usJ2i6Q3OEyxrPNgLTkJOVArsF6cPQ%3D%3D&redirect_counter=1&rm=sn-p5qe7776&req_id=5f7378486073a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=qH&mip=109.235.193.178&mm=31&mn=sn-51xguxaxjvh-btqe&ms=au&mt=1688470132&mv=m&mvi=2&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIgCEQPQb0rZ3ewhKqoFv_u0lKhKSB1ZSUuWTi8i8AWujMCIQDD74l7YD31a3RaJ4UyGoP5lAx2CwUQYyzMloT5tH4joA%3D%3D",
        snow: "https://rr5---sn-5hne6nz6.googlevideo.com/videoplayback?expire=1688405050&ei=2q-iZJ6XBqaA1PIPp_iXYA&ip=91.90.124.27&id=o-AGPki-5A2vy3wx8lAXulpGUL4G-WMEScUXXUcIJ5M5GW&itag=135&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313&source=youtube&requiressl=yes&spc=Ul2Sq40RuSVe-Fsk7K3-aDtWHaVYWdjtvQ9I8HmF7w&vprv=1&svpuc=1&mime=video%2Fmp4&ns=NSgfFR3tR4zc_v4L6FSz5DcO&gir=yes&clen=1116288639&dur=13244.099&lmt=1673673985400342&keepalive=yes&fexp=24007246,24350017,24362685,51000024&beids=24350017&c=WEB&txp=143C434&n=LwIlGbauSxaVJw&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgNbWGX5VFDcydJIFK4nSHZeChnJ7nOOOmLUIzMeWOVn0CIHdIV-gcbUNIaI51LaJx_eM9Y8U66yRKP2DaRv5kMvno&redirect_counter=1&cm2rm=sn-q0cel7l&req_id=4b89590ed01ba3ee&cms_redirect=yes&cmsv=e&mh=GD&mip=109.235.193.178&mm=34&mn=sn-5hne6nz6&ms=ltu&mt=1688383081&mv=D&mvi=5&pl=0&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAPf2oy1eg9Jlfl1JTmKF3G3RVq4_1KsAzbURsunM3k2hAiAh8UWozpiWvXGn5p-3yt0mcbWVLmHA_Xl3MMQ-rvAKRA%3D%3D",
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
      // const weather = JSON.parse(localStorage.getItem('weather'));
      // if (weather) {
      //   this.coords = JSON.parse(weather);
      // }
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
  