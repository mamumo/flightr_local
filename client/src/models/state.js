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