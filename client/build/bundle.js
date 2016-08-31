/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Flights = __webpack_require__( 1 )
	var Hotels = __webpack_require__( 3 )
	var DisplayFlights = __webpack_require__( 4)
	var HotelView = __webpack_require__( 5 )
	var State = __webpack_require__( 2 )
	var hotelSearch;
	var code;
	
	var Form = __webpack_require__( 6 );
	
	var capitalize = function( string ) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	window.onload = function(){
	
	  state = new State()
	  display( 'People', state.people )
	  dateSetter()
	  var nightslider = document.getElementById( 'nightslider' );
	  var nights = document.getElementById( 'Nights' );
	  display( 'Nights', state.nights )
	
	  nightslider.onchange = function() {
	    state.nights = nightslider.value
	    display('Nights', state.nights)
	  }
	
	  var date = document.getElementById('check_in');
	
	  date.onchange = function(e) {
	    state.departDate = date.value;
	    addDays(state.departDate, state.nights)
	  }
	
	  var slider = document.getElementById( 'slider' );
	  var budget = document.getElementById( 'Budget' );
	  var p = document.createElement( 'p' )
	  state.cost = slider.value
	  console.log( state.cost )
	
	  p.innerHTML = "Budget: " + slider.value
	  budget.appendChild( p )
	
	  slider.onchange = function(e) {
	    state.cost = slider.value
	    display('Budget', state.cost);
	  }
	
	  var peopleSlider = document.getElementById( 'people' )
	  // state.people = peopleSlider.value
	  peopleSlider.onchange = function(e) {
	    state.people = peopleSlider.value
	    display( 'People', state.people )
	  }
	
	  var  flightUrl = "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/EDI/anywhere/anytime/anytime?apiKey=fl247614149467694322747085793437"
	  var flightsRequest = new XMLHttpRequest();
	  flightsRequest.open( "GET", flightUrl );
	  flightsRequest.send( null );
	
	  flightsRequest.onload = function() {
	    var flightResponse = flightsRequest.responseText
	    state.allFlights = JSON.parse( flightResponse )
	    state.flightsearch = new Flights( state.allFlights, state )
	    console.log( state.allFlights )
	  }
	
	  var click = document.getElementById( 'click' )
	  var form = document.getElementById( 'city-form' );
	  var city = document.getElementById( 'city' )
	
	
	  click.onclick = function( event ) {
	    flightClick( city )
	  }
	
	  form.onsubmit = function( event ) {
	    event.preventDefault();
	  }
	}
	
	var display = function(string, item) {
	  var option = document.getElementById( string );
	  // option.style.display = "block"
	  option.innerHTML = ""
	  var p = document.createElement( 'p' )
	  p.innerHTML = string + ": " + item
	  option.appendChild( p )
	}
	
	
	var updateBudget = function() {
	  state.flightcost = parseFloat(state.flightsearch.state.options[0].cost) * state.people
	  state.budget = state.cost - ( state.flightsearch.state.options[0].cost * state.people )
	  console.log( "Budget: ", state.budget )
	}
	
	var removeUberCost = function() {
	  
	  state.uberTotal = ( state.home2airport + state.airport2hotel )
	  state.budget -=  state.uberTotal
	}
	
	var addDays = function(date, days) {
	
	
	  var someDate = new Date( date );
	  var numberOfDaysToAdd = parseInt( days )
	  
	  someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
	
	  var dd = someDate.getDate();
	  var mm = someDate.getMonth() + 1;
	  mm = mm.length > 1 ? mm : '0' + mm;
	  dd = dd > 9 ? dd : '0' + dd;
	
	  var y = someDate.getFullYear();
	
	  var someFormattedDate = y + '-'+ mm + '-'+ dd;
	  state.returnDate = someFormattedDate
	}
	
	var dateSetter = function() {
	  myDate = document.getElementById( 'check_in' )
	  if( new Date() >= myDate )
	    myDate.value += 7
	
	}
	
	var flightClick = function( city ) {
	  state.flightsearch.getCode( capitalize(city.value) )
	  code = state.flightsearch.airport
	
	  var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/" + state.departDate + "/" + state.returnDate + "?apiKey=fl247614149467694322747085793437"
	  var request = new XMLHttpRequest();
	  request.open("GET", url);
	  request.send(null);
	
	    request.onload = function(){
	
	      state.flightsearch.clear()
	      var response = request.responseText
	      var flights = JSON.parse( response )
	      state.flight = flights
	      console.log( state.flight )
	
	      state.flightsearch.getQuote( state.flight )
	
	      state.flightsearch.outboundName( state.flightsearch.state.option1, state.flight )
	
	      state.flightsearch.inboundName( state.flightsearch.state.option1, state.flight )
	
	      state.flightsearch.outboundName( state.flightsearch.state.option2, state.flight )
	
	      state.flightsearch.inboundName( state.flightsearch.state.option2, state.flight )
	
	      state.flightsearch.fillOptions( state.flightsearch.state.option1, state.flightsearch.state.option2 )
	
	
	      updateBudget();
	      hotelClick( city, code )
	      show( 'packages' )
	    } 
	  }
	
	
	var show = function( string ) {
	  var option = document.getElementById( string )
	  option.style.display = "inline-block"
	}
	
	
	var hotelClick = function( city, code ) {
	  var hotelUrl = "http://terminal2.expedia.com/x/mhotels/search?city=" + city.value.toUpperCase() + "&checkInDate=" + state.departDate + "&checkOutDate=" + state.returnDate + "&room1=3&apikey=iuTUoZJL24NJRFeviikGnRutV77LbjDx";
	  var hotelsRequest = new XMLHttpRequest();
	  hotelsRequest.open( "GET", hotelUrl )
	  hotelsRequest.send( null );
	
	
	  hotelsRequest.onload = function() {
	    var hotelResponse = hotelsRequest.responseText;
	    var allHotels = JSON.parse( hotelResponse );
	
	    console.log( state.budget )
	    hotelSearch = new Hotels( allHotels, state.nights, state.budget )
	    hotelSearch.sort();
	    hotelSearch.fixNum();
	    hotelSearch.orderNums();
	    hotelSearch.select();
	
	    state.hotelobject1 = hotelSearch.pickThree[0]
	    state.hotelobject2 = hotelSearch.pickThree[1]
	    state.hotelobject3 = hotelSearch.pickThree[2]
	
	    var getHotelLatLng1 = function(){
	
	      if(hotelSearch.pickThree[0]){
	        state.hotel1Lat = hotelSearch.pickThree[0].latitude
	      }
	      if(hotelSearch.pickThree[0]){
	        state.hotel1Lng = hotelSearch.pickThree[0].longitude
	      }
	    }
	    var getHotelLatLng2 = function(){
	
	      if(hotelSearch.pickThree[1]){
	        state.hotel2Lat = hotelSearch.pickThree[1].latitude
	      }
	      if(hotelSearch.pickThree[1]){
	        state.hotel2Lng = hotelSearch.pickThree[1].longitude
	      }
	    }
	  
	    var getHotelLatLng3 = function(){
	
	      if(hotelSearch.pickThree[2]){
	        state.hotel3Lat = hotelSearch.pickThree[2].latitude
	      }
	      if(hotelSearch.pickThree[2]){
	        state.hotel3Lng = hotelSearch.pickThree[2].longitude
	      }
	    }
	    
	    getHotelLatLng1()
	    getHotelLatLng2()
	    getHotelLatLng3()
	console.log("Hotel LNG 3 ", state.hotel3Lng)
	console.log("Hotel Lat 3 ", state.hotel3Lat)
	    getAirportLatLng(code);
	 
	  }
	}
	
	function getAirportLatLng(code){
	
	  var url = "http://localhost:3000/airports/" + code 
	  var request = new XMLHttpRequest();
	  request.open( "GET", url )
	  request.send( null );
	
	  request.onload = function(){
	    if(request.status === 200){
	      
	      var uber = JSON.parse(request.responseText);
	      state.inLat = uber[0].lat
	      state.inLng = uber[0].lng
	  
	 requestUber1()
	 requestUber2()
	 requestUber3()
	 requestUber4()
	
	    }
	  }
	}
	
	function requestUber1(){
	
	var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.homeLat + "&start_longitude=" + state.homeLng + "&end_latitude=" + state.outLat + "&end_longitude=" + state.outLng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
	var request = new XMLHttpRequest();
	request.open( "GET", url )
	request.send( null );
	
	    request.onload = function(){
	      if(request.status === 200){
	
	    var uber = JSON.parse(request.responseText);
	    state.home2airport = uber.prices[0].high_estimate
	    console.log(state.home2airport1)
	    console.log(uber)
	    }
	  }
	}
	// console.log(state.hotelLat)
	
	function requestUber2(){
	
	
	  var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.inLat + "&start_longitude=" + state.inLng + "&end_latitude=" + state.hotel1Lat + "&end_longitude=" + state.hotel1Lng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
	  var request = new XMLHttpRequest();
	  request.open( "GET", url )
	  request.send( null );
	
	  request.onload = function(){
	    if(request.status === 200){
	      var uber = JSON.parse(request.responseText);
	      state.airport2hotel1 = uber.prices[0].high_estimate
	      console.log(state.airport2hotel)
	      console.log(uber)
	      state.uberTotal1 = (state.airport2hotel1 + state.home2airport)*2
	      console.log(state.uberTotal)
	    
	    }
	  }
	}
	
	function requestUber3(){
	
	
	  var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.inLat + "&start_longitude=" + state.inLng + "&end_latitude=" + state.hotel2Lat + "&end_longitude=" + state.hotel2Lng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
	  var request = new XMLHttpRequest();
	  request.open( "GET", url )
	  request.send( null );
	
	  request.onload = function(){
	    if(request.status === 200){
	      var uber = JSON.parse(request.responseText);
	      state.airport2hotel2 = uber.prices[0].high_estimate
	      
	      
	      state.uberTotal2 = (state.airport2hotel2 + state.home2airport)*2
	      console.log(state.uberTotal1)
	      console.log(state.uberTotal2)
	      console.log(state.uberTotal3)
	
	    }
	  }
	}
	
	
	function requestUber4(){
	
	
	  var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.inLat + "&start_longitude=" + state.inLng + "&end_latitude=" + state.hotel3Lat + "&end_longitude=" + state.hotel3Lng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
	  var request = new XMLHttpRequest();
	  request.open( "GET", url )
	  request.send( null );
	
	  request.onload = function(){
	    if(request.status === 200){
	      var uber = JSON.parse(request.responseText);
	      state.airport2hotel3 = uber.prices[0].high_estimate
	     
	      state.uberTotal3 = (state.airport2hotel3 + state.home2airport)*2
	      
	    }
	
	    
	    var displayFlights1 = new DisplayFlights( state, state.uberTotal1, state.hotelobject1 )
	    displayFlights1.display("p1", "package1_control")
	
	    var displayFlights2 = new DisplayFlights( state, state.uberTotal2, state.hotelobject2 )
	    displayFlights2.display("p2", "package2_control")
	
	    var displayFlights3 = new DisplayFlights( state, state.uberTotal3, state.hotelobject3 )
	    displayFlights3.display("p3", "package3_control")
	
	    chart1()
	    chart2()
	    chart3()
	
	  }
	
	
	}
	
	
	var chart1 = function () {
	
	  var container = document.getElementById( "p1Chart" );
	
	  var chart = new Highcharts.Chart({
	
	    chart: {
	      width: 300,
	      height: 300,
	      type: 'pie',
	      renderTo: container,
	      backgroundColor: "transparent",
	      options3d: {
	          enabled: true,
	          alpha: 45
	      }
	
	    },
	
	    title: {
	      text: "Holiday"
	    },
	
	    plotOptions: {
	        pie: {
	            innerSize: 100,
	            depth: 45
	        }
	    },
	
	    series: [{
	                name: 'Breakdown',
	                colorByPoint: true,
	                data: [{
	                    name: 'Flight',
	                    y: state.flightcost,
	                    sliced: true,
	                    selected: true
	                }, {
	                    name: 'Hotel',
	                    y: parseFloat( state.hotelobject1.lowRate ),
	                    sliced: true,
	                    selected: true
	                }, {
	                    name: 'Über',
	                    y: state.uberTotal1,
	                    sliced: true,
	                    selected: true
	                }]
	            }],
	
	    credits: {
	      enabled: false
	    },
	
	  })
	} 
	
	var chart2 = function () {
	
	  var container = document.getElementById( "p2Chart" );
	
	  var chart = new Highcharts.Chart({
	
	    chart: {
	      width: 300,
	      height: 300,
	      type: 'pie',
	      renderTo: container,
	      backgroundColor: "transparent",
	      options3d: {
	          enabled: true,
	          alpha: 45
	      }
	
	    },
	
	    title: {
	      text: "Holiday"
	    },
	
	    plotOptions: {
	        pie: {
	            innerSize: 100,
	            depth: 45
	        }
	    },
	
	    series: [{
	                name: 'Breakdown',
	                colorByPoint: true,
	                data: [{
	                    name: 'Flight',
	                    y: state.flightcost,
	                    sliced: true,
	                    selected: true
	                }, {
	                    name: 'Hotel',
	                    y: parseFloat( state.hotelobject2.lowRate ),
	                    sliced: true,
	                    selected: true
	                }, {
	                    name: 'Über',
	                    y: state.uberTotal2,
	                    sliced: true,
	                    selected: true
	                }]
	            }],
	
	    credits: {
	      enabled: false
	    },
	
	  })
	} 
	
	var chart3 = function () {
	
	  var container = document.getElementById( "p3Chart" );
	
	  var chart = new Highcharts.Chart({
	
	    chart: {
	      width: 300,
	      height: 300,
	      type: 'pie',
	      renderTo: container,
	      backgroundColor: "transparent",
	      options3d: {
	          enabled: true,
	          alpha: 45
	      }
	
	    },
	
	    title: {
	      text: "Holiday"
	    },
	
	    plotOptions: {
	        pie: {
	            innerSize: 100,
	            depth: 45
	        }
	    },
	
	    series: [{
	                name: 'Breakdown',
	                colorByPoint: true,
	                data: [{
	                    name: 'Flight',
	                    y: state.flightcost,
	                    sliced: true,
	                    selected: true
	                }, {
	                    name: 'Hotel',
	                    y: parseFloat( state.hotelobject3.lowRate ),
	                    sliced: true,
	                    selected: true
	                }, {
	                    name: 'Über',
	                    y: state.uberTotal3,
	                    sliced: true,
	                    selected: true
	                }]
	            }],
	
	    credits: {
	      enabled: false
	    },
	
	  })
	} 
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var State = __webpack_require__(2)
	
	var Flights = function( list, state ) {
	  this.list = list;
	  this.airports = [];
	  this.airport = "";
	  this.state = state;
	}
	
	Flights.prototype = {
	  getCode: function( search ) {
	    console.log( this.list.Places )
	    this.list.Places.forEach( function( place, index ) {
	      if( search === place.Name || search === place.CityName ) {
	        this.airport = place.SkyscannerCode
	      }
	    }.bind( this ))
	  },
	
	  getQuote: function( savedFlight ) {
	    savedFlight.Quotes.forEach( function( flight, index ) {
	      if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
	        this.state.option1 = {
	          cost: flight.MinPrice,
	          outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
	          inboundCarrierId: flight.InboundLeg.CarrierIds[0] 
	
	        }    
	      } else if( flight.Direct === true && flight.OutboundLeg != undefined ) { 
	          this.state.option2.cost += flight.MinPrice
	          this.state.option2.outboundCarrierId = flight.OutboundLeg.CarrierIds[0]
	      } else if( flight.Direct === true && flight.InboundLeg != undefined )  {
	            this.state.option2.cost += flight.MinPrice
	            this.state.option2.inboundCarrierId = flight.InboundLeg.CarrierIds[0]
	        }else{
	          console.log( "not direct buddy")
	        }
	    }.bind( this ))
	  },
	
	  outboundName: function( option, savedFlight ) {
	    savedFlight.Carriers.forEach(function( carrier, index){
	      if(option.outboundCarrierId === carrier.CarrierId){
	       option.outboundCarrier = carrier.Name  }
	    })
	
	  },
	
	  inboundName: function( option, savedFlight ){
	    savedFlight.Carriers.forEach(function( carrier, index){
	      if(option.inboundCarrierId === carrier.CarrierId){
	       option.inboundCarrier = carrier.Name  }
	    })
	  },
	
	  fillOptions: function( option1, option2 ) {
	
	    if( option1.cost != 0 && option1.outboundCarrier != undefined ) {
	     this.state.options.push( option1 )
	     console.log( this.state.options )
	    }
	
	    if( option2.cost != 0 && option2.outboundCarrier != undefined ) {
	     this.state.options.push( option2 )
	     console.log( this.state.options )
	
	    }
	  },
	
	  clear: function() {
	    this.state = new State()
	  }
	
	}
	
	
	module.exports = Flights;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var State = function() {
	   this.options = [];
	   this.option1 = {
	    cost: 0,
	    outboundCarrier: "",
	    inboundCarrier:""
	  };
	   this.option2 = {
	    cost: 0,
	    outboundCarrierId: "",
	    inboundCarrierId: ""
	   };
	   this.outboundCarrier = "";
	   this.inboundCarrier = "";
	   this.sorted = {};
	   this.cost = 200;
	   this.flight = "";
	   this.budget=  0;
	   this.nights = 3;
	   this.people = 2;
	   this.departDate = "";
	   this.returnDate = 0;
	   this.allFlights = {};
	   this.flightcost = 0;
	   this.flightsearch = {};
	   this.homeLat = "55.946831";
	   this.homeLng = "-3.202032";
	   this.outLat = "55.9508";
	   this.outLng = "-3.3615"; 
	   this.inLat = "";
	   this.inLng = "";
	   this.home2airport = 0;
	   this.hotel1Lat = "";
	   this.hotel1Lng = "";
	   this.hotel2Lat = "";
	   this.hotel2Lng = "";
	   this.hotel3Lat = "";
	   this.hotel3Lng = "";
	   this.hotelobject1 = {};
	   this.hotelobject2= {};
	   this.hotelobject3 = {};
	   this.home2airport = 0;
	   this.airport2hotel1 = 0; 
	   this.airport2hotel2 = 0; 
	   this.airport2hotel3 = 0;
	   this.uberTotal1 = 0;
	   this.uberTotal2 = 0;
	   this.uberTotal3 = 0;
	}
	module.exports = State;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var cost;
	
	var Hotels = function( list, nights, budget ) {
	  this.nights = nights;
	  this.budget = budget;
	  this.list = list;
	  this.budgetHotels = [];
	  this.rates = [];
	  this.sortedHotels = [];
	  this.pickThree = [];
	}
	
	Hotels.prototype = {
	  sort: function() {
	    this.list.hotelList.forEach( function( hotel, index ) {
	
	      cost = parseInt(hotel.lowRate) * this.nights * 0.7 + 50;  
	
	      if( this.budget >= cost && this.nights > 1  ) {
	
	        this.budgetHotels.push( hotel )
	
	      } else if ( this.budget >= cost ) {
	        this.budgetHotels.push( hotel )
	      }
	    }.bind( this ))
	  },
	
	  fixNum: function() {
	    this.budgetHotels.forEach( function(hotel, index ) {
	      hotel.rate = parseInt( hotel.lowRate )
	      this.rates.push( hotel.rate )
	    }.bind( this ) )
	    console.log( this.rates )
	  },
	
	  sortNums: function( a, b ) {
	    return a - b
	  },
	
	  orderNums: function() {
	    this.rates.sort( this.sortNums )
	    console.log( this.rates )
	  },
	
	  select: function() {
	    this.budgetHotels.forEach( function( hotel, index ) {
	      var a = this.rates.length - 1
	      var b = this.rates.length - 2
	      var c = this.rates.length - 3
	      if( this.rates[a] === hotel.rate ) {
	        this.pickThree.push( hotel )
	      } else if( this.rates[b] === hotel.rate ) {
	        this.pickThree.push( hotel )
	      } else if( this.rates[c] === hotel.rate ) {
	        this.pickThree.push( hotel )
	      }
	    }.bind( this ))
	    console.log( this.pickThree )
	  },
	}
	
	module.exports = Hotels;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var DisplayFlights = function( state,  uberTotal, hotelObject ) {
	  this.state = state;
	  this.uberTotal = uberTotal;
	  this.hotelObject = hotelObject
	// option 1 = where flight is direct and the inbound cost and outbound cost are covered by one quote 
	// option 2 = where flight is direct and the inbound/ outbound quotes are seperate
	
	}
	
	DisplayFlights.prototype = {
	
	  display: function(string, string2) {
	
	    var flight = document.getElementById( string );
	    var price = document.getElementById( string2 );
	    while (flight.firstChild) {   
	      flight.removeChild(flight.firstChild);
	    }
	
	
	        var cost = document.createElement( 'p' );
	        var outbound = document.createElement( 'p' );
	        var inbound = document.createElement( 'p' );
	        var uber = document.createElement( 'p' );
	        var total = document.createElement( 'p' );
	        var accomodation = document.createElement( 'p' );
	        var accomodationName = document.createElement( 'p' );
	        var packageTotal = document.createElement( 'p' );
	        var showTotal = document.createElement( 'p' );
	
	        console.log(this.state)
	
	        outbound.innerHTML = "Outbound Carrier: " + this.state.flightsearch.state.option1.outboundCarrier 
	        inbound.innerHTML = "Inbound Carrier: " + this.state.flightsearch.state.option1.inboundCarrier 
	        cost.innerHTML = "Cost of flights: £" + this.state.flightcost;
	        uber.innerHTML = "Cost of Uber: £" + this.uberTotal;
	        accomodation.innerHTML = "Accomodation: £" + this.hotelObject.lowRate;
	        accomodationName.innerHTML = "Name: " + this.hotelObject.localizedName;
	        packageTotal.innerHTML = ""
	        packageTotal.innerHTML = "Total: " + (this.state.flightcost + this.uberTotal + parseFloat(this.hotelObject.lowRate)).toFixed(2);
	
	        total.innerHTML = "Total Transport Cost: £" + (this.uberTotal + this.state.flightcost).toFixed(2)
	
	        flight.appendChild( cost )
	        flight.appendChild( outbound )
	        flight.appendChild( inbound )
	        flight.appendChild( uber )
	        flight.appendChild( total )
	        flight.appendChild( accomodationName )
	        flight.appendChild( accomodation )
	        price.appendChild( packageTotal )
	      }
	}
	
	
	module.exports = DisplayFlights;
	


/***/ },
/* 5 */
/***/ function(module, exports) {

	var HotelView = function( hotelo, uber, string, nights ) {
	  this.hotelo = hotelo;
	  this.uber = uber;
	  this.string = string;
	  this.nights = nights;
	
	  var hotel = document.getElementById( this.string );
	  console.log( "uber", this.uber )
	
	  hotel.innerHTML = ""  
	    var p = document.createElement( 'p' );
	    if( this.nights > 1 ) {
	      p.innerHTML = "Name: " + this.hotelo.localizedName + " Cost: £" + (this.hotelo.lowRate * this.nights * 0.7 ).toFixed(2) + " Uber Total: " + this.uber
	    } else {
	      p.innerHTML = "Name: " + this.hotelo.localizedName + " Cost: £" + (this.hotelo.lowRate ).toFixed(2) + " Uber Total: " + this.uber
	    }
	
	    hotel.appendChild( p )
	}
	
	module.exports = HotelView;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var Form = function() {
	}
	
	Form.prototype = {
	
	
	  submit: function(e){
	    console.log( "HIYA" )
	    
	
	   var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
	   var fname = document.form.Name.value
	    lname = document.form.LastName.value
	    femail = document.form.Email.value
	    freemail = document.form.enterEmail.value
	    fpassword = document.form.Password.value
	    freepassword = document.form.enterPassword.value
	     
	   if( fname === "" )
	     {
	       document.form.Name.focus() ;
	    document.getElementById("errorBox").innerHTML = "enter the first name";
	       return false;
	     }
	   if( lname === "" )
	     {
	       document.form.LastName.focus() ;
	     document.getElementById("errorBox").innerHTML = "enter the last name";
	       return false;
	     }
	      
	     if (femail === "" )
	   {
	    document.form.Email.focus();
	    document.getElementById("errorBox").innerHTML = "enter the email";
	    return false;
	    }else if(!emailRegex.test(femail)){
	    document.form.Email.focus();
	    document.getElementById("errorBox").innerHTML = "enter the valid email";
	    return false;
	    }
	     
	     if (freemail === "" )
	   {
	    document.form.enterEmail.focus();
	    document.getElementById("errorBox").innerHTML = "Re-enter the email";
	    return false;
	    }else if(!emailRegex.test(freemail)){
	    document.form.enterEmail.focus();
	    document.getElementById("errorBox").innerHTML = "Re-enter the valid email";
	    return false;
	    }
	     
	    if(freemail !=  femail){
	     document.form.enterEmail.focus();
	     document.getElementById("errorBox").innerHTML = "emails are not matching, re-enter again";
	     return false;
	     }
	     
	     
	   if(fpassword === "")
	    {
	     document.form.Password.focus();
	     document.getElementById("errorBox").innerHTML = "enter the password";
	     return false;
	    }
	
	    if(freepassword === "")
	     {
	      document.form.Password.focus();
	      document.getElementById("errorBox").innerHTML = "enter the password";
	      return false;
	     }
	     
	    if(freepassword !=  fepassword){
	     document.form.enterEmail.focus();
	     document.getElementById("errorBox").innerHTML = "passwords are not matching, re-enter again";
	     return false;
	     } 
	
	    if(fname != '' && lname != '' && femail != '' && freemail != '' && fpassword != '' && fmonth != '' && fday != '' && fyear != ''){
	     document.getElementById("errorBox").innerHTML = "form submitted successfully";
	     }
	
	     var input = document.getElementsByName( 'name' )
	     var name = input.value
	     console.log( "I Am Posting")
	
	     var request = XMLHttpRequest();
	     request.open( 'POST', '/users' );
	     request.setRequestHeader("Content-Type", "application/json")
	        request.onload = function() {
	          if( request.status === 200 ) {
	          }
	  }
	  request.send( JSON.stringify( { name: name } ) )
	} 
	}
	module.exports = Form;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map