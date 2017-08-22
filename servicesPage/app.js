var restify = require('restify');  
var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

let people = [];
let currentId = 0;

var currentDate = new Date()
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

var day = currentDate.getDate();
var year = currentDate.getFullYear();
var hours = currentDate.getHours() < 12 ? currentDate.getHours() - 12 : currentDate.getHours();
var minutes = currentDate.getMinutes();
var ampm = hours >= 12 ? 'PM' : 'AM';
var time = (hours + ":" + minutes + " " + ampm);
var date = (monthNames[currentDate.getMonth()] + " " + day + " " + time +" (" + year + ")");



function Person() {
  currentId++;
	this.id = currentId;
  this.createdDate = date;
};

function getPeople(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // These headers comply with CORS and allow us to serve our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

 //find the appropriate data
    res.send(people);
}

function getPerson(req, res, next){
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var person = people.filter(function(person){
    return person.id == req.params.id;
  });
  res.send(person);
}

function postPeople(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.log(req.body);
  
  var person = new Person();
  person.firstname = req.body.firstname; 
  person.lastname = req.body.lastname;
  console.log(person);
  people.push(person);
	res.send(person);
}

function putPeople(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //Make new person
  var person = new Person();
  let id = req.params.id;
  let exists = false;
  console.log(id);
  //See if this person exists
  for (let i = 0; i < people.length; i++){
    if(people[i].id == id){
      person = people[i];
      person.firstname = req.body.firstname; 
      person.lastname = req.body.lastname;
      people[i] = person;
      exists = true;
      break;
    }
  }
  if(! exists){
    person.firstname = req.body.firstname; 
    person.lastname = req.body.lastname; //save the new message to the collection
    person.id = parseInt(id);
    people.push(person);
  }
  console.log(person);
  res.send(person);
}

function delPerson( req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  let id = parseInt(req.params.id);
  for(let i = 0; i < people.length; i++){
    if(people[i].id == id){
      people.splice(i,1);
    };
  };
  console.log(people);
  res.end()
}
// Set up our routes and start the server
server.get('/people', getPeople);
server.get('/people/:id', getPerson);
server.post('/people', postPeople);
server.put('/people/:id', putPeople);
server.del('/people/:id', delPerson);


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});