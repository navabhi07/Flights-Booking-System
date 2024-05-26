// middleware/validateCreateAirplane.js
const { StatusCodes } = require('http-status-codes');
const { Airplane } = require('../models'); // Import your Airplane model
const{ErrorResponse}=require('../utils/common');

const validateCreateRequest = async (req, res, next) => {
    try {
        const { modelNumber } = req.body;

        //Check if the modelNumber already exists in the database
        const existingAirplane = await Airplane.findOne({ where: { modelNumber:modelNumber } });
        if (existingAirplane) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    message: 'Airplane with the provided model number already exists',
                    data: {},
                    success: false
                })
            }
        

        // If the modelNumber is unique, proceed with other validations
        const { capacity } = req.body;
        if (!modelNumber || !capacity || typeof modelNumber !== 'string' || /^\d+$/.test(modelNumber)||isNaN(capacity) || parseInt(capacity) < 1) {
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
        }

        next();
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error in validation middleware:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

module.exports =
{
    validateCreateRequest,
}


