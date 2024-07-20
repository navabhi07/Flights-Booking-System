const { Sequelize } = require('sequelize');

const CrudRepository=require('./crud-repository');
const db = require('../models');
const { flight, Airplane, Airport,City } = require('../models');

//const { addRowLockOnFlights } = require('./queries');


class FlightRepository extends CrudRepository{
   constructor(){
    super(flight);
   }

   //custom repo
   async getAllFlights(filter,sort) {
      const response = await flight.findAll({
          where: filter,
          order: sort,
          include: [
              {
                  model: Airplane,
                  required: true,
                  as: 'airplaneDetail'
              },
              {
                  model: Airport,
                  required: true,
                  as: 'departureAirport',
                  on : {
                      col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                  },
                  include: {
                    model: City,
                    required: true
                }
              },
              {
                  model: Airport,
                  required: true,
                  as: 'arrivalAirport',
                  on : {
                      col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                  },
                  include: {
                    model: City,
                    required: true
                }
              }
          ]
      });
      return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(`SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`);
    const flighty = await flight.findByPk(flightId);
    if(parseInt(dec)) {
        await flighty.decrement('totalSeats', {by: seats});
    } else {
        await flighty.increment('totalSeats', {by: seats});
    }
    return flighty;
}



  
}



module.exports=FlightRepository;