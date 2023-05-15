let opentabs = document.querySelector('.opentabs');
let a = document.querySelectorAll('.url');
let urls = [];
a.forEach(function(each){
urls.push(each.href);
})
let index = 0;
opentabs.addEventListener('click',function(){
urls.forEach(function(url){
  if(index==0){
    window.open(url,'_blank');
  }else{
  window.setTimeout(function(){window.open(url,'_blank');},500);
  }
  index++;
});

})


let allurl = document.querySelectorAll('.allurl');

allurl.forEach(function(each){

each.addEventListener('click',(event)=>{

  const clickedElement = event.target;
const clickedText = clickedElement.innerText.trim();
const isSpan = clickedElement.nodeName === 'SPAN';
if(!isSpan) return;

 // Create a new popup element
 const popup = document.createElement('div');
popup.classList.add('popup');
popup.textContent = 'Copied!';

// Position the popup relative to the mouse click
popup.style.top = `${event.pageY}px`;
popup.style.left = `${event.pageX}px`;

  // Append the popup to the document body
  document.body.appendChild(popup);

window.setTimeout(function(){
popup.remove();
},800);
  let TempText = document.createElement("input");
TempText.value = each.innerHTML;
document.body.appendChild(TempText);
TempText.select();

document.execCommand("copy");
document.body.removeChild(TempText);

})

})

let searchinput = document.querySelector('.searchinput');
searchinput.addEventListener('input',function(event){
const inputValue = event.target.value;
if (inputValue && inputValue.match(/^\s*\w+/)) {

let cards = document.querySelectorAll('.card');
let input = inputValue.toLowerCase().replace(/\s+/g, '');

cards.forEach(function(each){
if(each.classList.contains('mainmenu')){
return;
}
let title= each.querySelector('.card-title');
let url = each.querySelector('.card-text');


if(title.innerHTML.toLowerCase().includes(input) || url.innerHTML.toLowerCase().includes(input)){
each.style.display = 'block';

}else{
each.style.display = 'none';
}


})

} else{
   
let cards = document.querySelectorAll('.card');
cards.forEach(function(each){

if(each.classList.contains('mainmenu')){
    return;
    }
    each.style.display = 'block';
});


} 
})

let extension = document.querySelector('body');

extension.addEventListener('mouseover',function(e){

if(e.target.classList.contains('extension')){
e.target.src='filledextension.svg'
}

})
extension.addEventListener('mouseout',function(e){

if(e.target.classList.contains('extension')){
e.target.src='extension.svg'
}

})
extension.addEventListener('click',function(e){

if(e.target.classList.contains('extension')){
window.open('/getextension','_blank');
e.stopPropagation();
}

})
let gradientText = document.querySelector('.gradient-text');

window.addEventListener('mousemove', function(event) {
var x = event.clientX;
var y = event.clientY;
var screenWidth = window.innerWidth;
var topRange = 70; // set the range for the top of the screen in pixels
var heightRange = 7 * 16; // set the range for the height in pixels (2em)
var widthRange = 15 * 16; // set the range for the width in pixels (5em)

if (y <= topRange && x >= (screenWidth/2 - widthRange/2) && x <= (screenWidth/2 + widthRange/2) && y >= topRange - heightRange) {

gradientText.classList.remove('gradient-text');
gradientText.classList.add('gradient-text1');



} else {
gradientText.classList.add('gradient-text');
gradientText.classList.remove('gradient-text1');
}
});

window.addEventListener('click', function(event) {
var x = event.clientX;
var y = event.clientY;
var screenWidth = window.innerWidth;
var topRange = 70; // set the range for the top of the screen in pixels
var heightRange = 7 * 16; // set the range for the height in pixels (2em)
var widthRange = 15 * 16; // set the range for the width in pixels (5em)

if (y <= topRange && x >= (screenWidth/2 - widthRange/2) && x <= (screenWidth/2 + widthRange/2) && y >= topRange - heightRange) {
gradientText.classList.remove('gradient-text');
gradientText.classList.add('gradient-text1');
window.setTimeout(function(){
window.open('/',"_self");
},100)
}
});
let extension1 = document.querySelector('.extension');
window.addEventListener('mousemove', function(event) {
var x = event.clientX;
var y = event.clientY;
var screenWidth = window.innerWidth;
var topRange = 50; // set the range for the top of the screen in pixels

var widthRange = 2.5 * 16; // set the range for the width in pixels (5em)

if (y <= topRange && x >= (screenWidth - widthRange))  {



extension1.src='filledextension.svg'

} else {
extension1.src='extension.svg'

}
});

const popup = document.createElement('div');
window.addEventListener('mouseover', function(event) {
var x = event.clientX;
var y = event.clientY;
var screenWidth = window.innerWidth;
var topRange = 70; // set the range for the top of the screen in pixels

var widthRange = 3 * 16; // set the range for the width in pixels (5em)

if (y <= topRange && x >= (screenWidth - widthRange))  {


popup.classList.add('popup');
popup.textContent = 'Get Extension';

// Position the popup relative to the mouse click
popup.style.top = `${event.pageY+10}px`;
popup.style.left = `${event.pageX-70}px`;

  // Append the popup to the document body
  document.body.appendChild(popup);


} else {
popup.remove();

}
});


window.addEventListener('click', function(event) {
var x = event.clientX;
var y = event.clientY;
var screenWidth = window.innerWidth;
var topRange = 50; // set the range for the top of the screen in pixels

var widthRange = 2.5 * 16; // set the range for the width in pixels (5em)

if (y <= topRange && x >= (screenWidth - widthRange))  {
window.setTimeout(function(){
window.open('/getextension','_blank');
},200)

} 

});
let dropmenu = document.querySelector('.dropmenu');
let dropmenu1 = document.querySelector('.mainmenu');
dropmenu.addEventListener('click',function(){
if (dropmenu1.classList.contains("hide")) {
dropmenu1.classList.remove("hide");
dropmenu1.classList.add("show");
} else {
dropmenu1.classList.remove("show");
dropmenu1.classList.add("hide");
}

})