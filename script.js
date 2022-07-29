function findLocation(){

    if (!navigator.geolocation) {
        showStatus('error', 'Lokasyon bulma izni vermeniz gerekmektedir')
        
    }

    function position(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
    
        console.log(lat,lng)

        showStatus('success', 'Konumunuz bulunmuştur!')
        getWeather(lat,lng)
 
     
        

    }

    function showError(error) {
        switch(error.code) {
    

    case error.PERMISSION_DENIED:
                showStatus('error', 'Hata: Konum bulma hizmetine izin verilmemiştir');
                break;
    case error.POSITION_UNAVAILABLE:
                showStatus('error', 'Hata: Konum bilgisine erişilemiyor');
                break;
    case error.TIMEOUT:
                showStatus('error', 'Hata: Sunucu zaman aşımı ağ bağlantınızı kontrol edip tekrar deneyin');
                break;
    case error.UNKNOWN_ERROR:
                showStatus('error', 'Hata: Bilinmeyen hata');
                break;
    }
    }
    navigator.geolocation.getCurrentPosition(position,showError)   

}

async function getWeather(lat,lng){
    let latt = lat
    let lngg = lng
    try {
        const url = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${lngg}&exclude=minutely,hourly&appid=0c67f6d764d64e4cc60b689d609fa852&&lang=tr&units=metric`)
        if (!url.ok)
            throw new Error("Hava Durumu alınamadı")
        const data = await url.json();  
        
        const url2 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latt}&lon=${lngg}&appid=0c67f6d764d64e4cc60b689d609fa852`)
        if (!url2.ok) 
            throw new Error("Hava Durumu alınamadı")
        const data2 = await url2.json();

        rapor(data,data2)


    }
    catch (error) {
        throw new Error("Bilinmeyen hata")
    }
}




function daycalculate(number) {
    let day = new Date()
    let days = day.getDay()
    total= days + number
    var gunler= ["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"];

    if (total >= 7) {
        return gunler[total - 7]
    }
    else{
        return gunler[total]
    }
}
function monthcalculate(number) {
    let month = ["Ocak","Şubak", "Mart" ,"Nisan" ,"Mayıs", "Haziran","Temmuz","Ağustos","Eylül" ,"Ekim" ,"Kasım" ,"Aralık"]
    let day = new Date()
    day.setDate(day.getDate()+number)
    return month[day.getMonth()]
}



function rapor(data,data2) {
    console.log(data)

    let day = new Date()
    let days1 = new Date(day)
    let days2 = new Date(day)
    let days3 = new Date(day)
    let days4 = new Date(day)

    days1.setDate(days1.getDate()+1)
    days2.setDate(days2.getDate()+2)
    days3.setDate(days3.getDate()+3)
    days4.setDate(days4.getDate()+4)

    
    
    
    let day1 ={
        dayC: data.daily[0].temp.day,
        eveC: data.daily[0].temp.eve,
        weather: data.daily[0].weather[0].description,
        humidity: data.daily[0].humidity,
        wind:data.daily[0].wind_speed,
        time: daycalculate(0),
        day: day.getDate(),
        month: monthcalculate(0),
        year: day.getFullYear(0)
    }

    
    let day2 ={
        dayC: data.daily[1].temp.day,
        nightC: data.daily[1].temp.night,
        weather: data.daily[1].weather[0].description,
        humidity: data.daily[1].humidity,
        wind:data.daily[1].wind_speed,
        time: daycalculate(1),
        day:days1.getDate(),
        month: monthcalculate(1),
        year: day.getFullYear()
    }
    let day3 ={
        dayC: data.daily[2].temp.day,
        nightC: data.daily[2].temp.night,
        weather: data.daily[2].weather[0].description,
        humidity: data.daily[2].humidity,
        wind:data.daily[2].wind_speed,
        time: daycalculate(2),
        day:days2.getDate(),
        month: monthcalculate(2),
        year: day.getFullYear()
    }
    
    let day4 ={
        dayC: data.daily[3].temp.day,
        nightC: data.daily[3].temp.night,
        weather: data.daily[3].weather[0].description,
        humidity: data.daily[3].humidity,
        wind:data.daily[3].wind_speed,
        time: daycalculate(3),
        day:days3.getDate(),
        month: monthcalculate(3),
        year: day.getFullYear()
    }
    let day5 ={
        dayC: data.daily[4].temp.day,
        nightC: data.daily[4].temp.night,
        weather: data.daily[4].weather[0].description,
        humidity: data.daily[4].humidity,
        wind:data.daily[4].wind_speed,
        time: daycalculate(4),
        day:days4.getDate(),
        month: monthcalculate(4),
        year: day.getFullYear()
    }

    console.log(day4.day)
    function render() {        
        document.querySelector("#box1").innerHTML = "";
       
        let html = `                   
                <div class="box">
                <h1>${day1.day} ${day1.month} ${day1.year}</h1>
                <h2>${day1.time}</h2>
                <p class="icon"><span class="material-symbols-outlined">
                    explore
                    </span>${data2[0].name}</p>
                </div>
                <div class="box">
                    <img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png">
                    <p class="celcius">${day1.dayC.toFixed(0)}°C</p>
                    <p class="status">${day1.weather}</p>
                </div>
        `
        
        let html1 = `

                <span>
                    <p class="b_value">Nem</p>
                    <p class="b_key">${day1.humidity}%</p>
                </span>
                <span>
                    <p class="b_value"> Rüzgar</p>
                    <p class="b_key">${day1.wind.toFixed(1)}km/h</p>
                </span>
        `
        
        let html2 = `
                <div class="card">
                <span><img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png"></span>
                <div class="border">${day2.time}</div>
                <div class="card_deg">${day2.dayC.toFixed(1)}°C</div>
                <div class="card_deg">${day2.nightC.toFixed(1)}°C</div>
            </div>
            <div class="card">
            <span><img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png"></span>
                <div class="border">${day3.time}</div>
                <div class="card_deg">${day3.dayC.toFixed(1)}°C</div>
                <div class="card_deg">${day3.nightC.toFixed(1)}°C</div>
            </div>
            <div class="card">
            <span><img src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png"></span>
                <div class="border">${day4.time}</div>
                <div class="card_deg">${day4.dayC.toFixed(1)}°C</div>
                <div class="card_deg">${day4.nightC.toFixed(1)}°C</div>
            </div>
            <div class="card">
            <span><img src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png"></span>
                <div class="border">${day5.time}</div>
                <div class="card_deg">${day5.dayC.toFixed(1)}°C</div>
                <div class="card_deg">${day5.nightC.toFixed(1)}°C</div>
            </div>
        
        `
        document.querySelector("#box1").innerHTML = html;
        document.querySelector("#keyval").innerHTML = html1;  
        document.querySelector("#card_container").innerHTML = html2;     
    }
    render()
    
}


function showStatus(statustype,message) {

    if (statustype === 'error') {
        swal({
            icon: "error",
            title: message
          });
        
    }else if(statustype === 'success'){
        swal({
            icon: "success",
            title: message
          });
    }
    
}    


findLocation()
