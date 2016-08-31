Project Flightr/Dur:Dur

This is a web app which packages an entire trip away for the user based on their budget. The user inputs their budget, the departure date of their trip and the destination. The results returned include  the lowest costing direct return flights, total uber cost for the four journeys the user will be taking (home to departing airport, destination airport to hotel and vice versa) and then finally a choice of three hotels which they can afford from their remaining budget.

Code Example

This example of code solved one of the biggest problems we faced which was returning the full cost of return flights. The Skyscanner API used for the project displayed the price of flights in two formats. Some destinations returned the full return price whereas other destinations returned two seperate prices for the outbound leg and the inbound leg. Our aim was to return one full return price on each search.

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

Motivation

Group project to display understanding of JavaScript and use of the DOM. Each member of the team has an interest in travelling and felt there should be a more efficient and user friendly way of organising short trips away.


Installation

Packages used for this app include:
- webpack
- mongo
- chai
- mocha

Dependencies needed:
- body-parser
- express


API Reference

API's used for this project:

- Skyscanner - http://partners.api.skyscanner.net/apiservices
- Expedia - http://terminal2.expedia.com/x/mhotels/search?
- Uber - https://api.uber.com/v1/estimates/price
- Local API- mongodb://localhost:27017/airportsAPI










