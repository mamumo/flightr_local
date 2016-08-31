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