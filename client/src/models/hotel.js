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