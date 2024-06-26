const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");


const cityRepository=new CityRepository();
const AppError=require('../utils/errors/app-error');

async function CreateCity(data){
    try{
          const city=await cityRepository.create(data);
          return city;
    }catch(error){
       // console.log(error);==>'SequelizeUniqueConstraintError'
        if(error.name=='SequelizeValidationError'||error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError (explanation,StatusCodes.BAD_REQUEST);
         }
    }
    throw new AppError('Cannot create a new City Object',StatusCodes.INTERNAL_SERVER_ERROR)

}




module.exports={
  CreateCity,
  
}