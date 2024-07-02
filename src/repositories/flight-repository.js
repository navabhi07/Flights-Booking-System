const { Sequelize } = require('sequelize');

const CrudRepository=require('./crud-repository');

const { flight, Airplane, Airport } = require('../models');



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
              },
              {
                  model: Airport,
                  required: true,
                  as: 'arrivalAirport',
                  on : {
                      col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                  },
              }
          ]
      });
      return response;
  }
}

module.exports=FlightRepository;