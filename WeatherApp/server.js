const express =require('express');
const request =require('request');
const fetch =require('node-fetch');
const path =require('path');

var app=express();

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  var weather={
    city: null,
    temp: null,
    date: null,
    conditions: null,
    icon: null 
  }
  var weather_data={weather:weather};

  res.render('index', weather_data); 
});


app.post('/', async (req, res) => {
    const city = req.body.city;
    const data = 'https://www.metaweather.com/api/location/search/?query='+city;
    
    request(data,function(error, response, body){
      jdata=JSON.parse(body);
      const id = jdata[0].woeid;
      const url_api  = 'https://www.metaweather.com/api/location/'+id+'/';

      fetch(url_api)
      .then(res => res.json())
        .then(data => {
          var weather={
            city: data.title,
            temp: Math.round(data.consolidated_weather[0].the_temp),
            date:  data.consolidated_weather[0].applicable_date,
            conditions: data.consolidated_weather[0].weather_state_name,
            icon: data.consolidated_weather[0].weather_state_abbr ,

            temp1: Math.round(data.consolidated_weather[1].the_temp),
            date1:  data.consolidated_weather[1].applicable_date,
            conditions1: data.consolidated_weather[1].weather_state_name,
            icon1: data.consolidated_weather[1].weather_state_abbr,

            temp2: Math.round(data.consolidated_weather[2].the_temp),
            date2:  data.consolidated_weather[2].applicable_date,
            conditions2: data.consolidated_weather[2].weather_state_name,
            icon2: data.consolidated_weather[2].weather_state_abbr,

            temp3: Math.round(data.consolidated_weather[3].the_temp),
            date3:  data.consolidated_weather[3].applicable_date,
            conditions3: data.consolidated_weather[3].weather_state_name,
            icon3: data.consolidated_weather[3].weather_state_abbr 

          }
          var weather_data={weather:weather};
        
          res.render('index',weather_data);
          
        })
    
    });
      
  });


app.listen(8000);

	
	