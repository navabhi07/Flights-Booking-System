const CrudRepository=require('./crud-repository');

const {flight}=require('../models');



class FlightRepository extends CrudRepository{
   constructor(){
    super(flight);
   }

   //custom repo
   async getAllFlights(filter, sort) {
      const response = await flight.findAll({
          where: filter,
          order: sort
      });
      return response;
  }
}

module.exports=FlightRepository;