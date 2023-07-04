const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config();
const cheerio = require('cheerio');
const Tab = require('./models/tabs');

app.disable('x-powered-by');

mongoose.set("strictQuery",false);
mongoose.connect(process.env.MONGO_URI,{dbName:'tabs'})
.then(()=>{console.log('connected to db')})
.catch((err)=>{console.log('err')});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.get('/', async(req, res) => {


let allTabs = await Tab.find({}).sort({pin:-1,createdAt:-1});

let modtabs = allTabs.map(tab => {  
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  
  const date = new Date(`${tab.createdAt}`).toLocaleString('en-US', options);

 
let parts = date.split(',');
let [month,day] = parts[0].split(' ');
let year = parts[1].trim();
let time = parts[2].trim();


 
  localDate = `${day} ${month} ${time}`;
  let newtab = {
    title:tab.title,
    url:tab.url,
    icon:tab.icon,
    createdAt:localDate,
    id:tab._id,
    pin:tab.pin
  }
  return newtab;
 })




 res.render('home',{tabs:modtabs});


});

app.post('/urls',async(req, res) => {
 
    if (Object.keys(req.body).length === 0) {
        res.status(400).json('error');
      } else {
        
      
        let urls = req.body.urls;
   
let errors = 0;
        const promises = urls.map(async(url) => {
          // code to fetch page details and save to database
       
         
          let baseUrl;
        if (url && url.trim() !== "") {
      const hasHttp = url.includes('http://');
  const hasHttps = url.includes('https://');
  
  if (!hasHttp && !hasHttps) {
   url = 'http://' + url;
  } 
     try{   const parsedUrl = new URL(url);
        
            baseUrl = parsedUrl.origin;
     }catch(error){
      return
     }
          } else {
            baseUrl = url;
          }
     
    
         
          await fetch(`${baseUrl}`)
          .then((result)=>{
             return result.text()
          })
          .then(async(html) => {
                const $ = cheerio.load(html);
              
             let title,description;
             await fetch(`${url}`)
                .then((result)=>{
                   return result.text()
                })
                .then(html1 => {
                  const $1 = cheerio.load(html1);
                 
                   title = $1('meta[property="og:title"]').attr('content') || $1('title').text() || $1('meta[name="title"]').attr('content')
                  description = $1('meta[name="description"]').attr('content') || $1('meta[property="og:description"]').attr('content') || $1('meta[name="twitter:description"]').attr('content') || '';
               console.log(title);
                if(title.trim().length<=20){
title = title + ' - ' + `<small>${description.slice(0,100)}</small>`;
                }
                }).catch(error => {
                  title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content')
                  description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || $('meta[name="twitter:description"]').attr('content') || '';
              
                })
            
                   if(!title){
                title = description;

              }
              if(!description){

                title = url ;
              }



              
               let icon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href')
               if(icon){ 
                
               if(icon.startsWith('/')){
                
                icon = `${baseUrl}${icon}`
           
              }
            }else{
              
          await fetch(`${baseUrl}/favicon.ico`).then((result)=>{
            
if(result.status===200 || result.status===403  ){
  icon = `${baseUrl}/favicon.ico`
  
}else{
  icon = `/no-favicon.png`
 
}
          }).catch(error => {
            icon = `/no-favicon.png`
          })
              
            }
 let tab = new Tab({title:title,url:url,icon:icon});
await tab.save();


          }).catch(error => {
           
              errors++;
              
          })


        });




        

       
        
        Promise.allSettled(promises)
          .then(() => {
          
            if(errors>=urls.length/2){
              res.status(500).json('error');
            }else{
            res.json('success')}
          }
            )
          .catch((error) => res.status(500).json(error));

      }
});

app.get('/remove/:id', async(req, res) => {
  
  let id = req.params.id;
  let tab = await Tab.findByIdAndDelete(id);
  res.redirect('/');

});
app.get('/pin/:id', async(req, res) => {
    let id = req.params.id;
    let tab = await Tab.findById(id);
    tab.pin = !tab.pin;
    tab.save();
    res.redirect('/');
});
app.get('/removeall', async(req, res) => {

await Tab.deleteMany();
res.redirect('/')
});
app.post('/add', async(req, res) => {

  let { urls } = req.body;

let allurls = urls.split(' ');
fetch('https://tabs.aquafusion.in/urls', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({urls:allurls})
})
  .then(response => response.json())
  .then(data => {
    res.redirect('/');
  })
  .catch(error => {
   
    res.status(500).send('Failed to add urls');
  });

});

app.get('/getextension', async(req, res) => {
  res.render('extension');
});
app.listen(9004, () => {
console.log('Server started!');
});
