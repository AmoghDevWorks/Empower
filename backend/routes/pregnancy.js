//email,bloodgroup, height,weight, pregnancyweek

const express = require('express');
 
const Pregnancy = require('../models/pregnancy');

const router = express.Router();

// pregnancy Route
router.post('/pregnancy', async (req, res) => {
    try {
        const { email, bloodgroup,height,weight, pregnancyWeek } = req.body;
        console.log(req.body)
    
        // Validate inputs
        if (!email) {
          return res.status(400).json({ error: 'Email address is required' });
        }
    
         
    
        // Find prgnancy document by email,bloodgroup,height,weight,prenancy week
        let  pregnancy = await Pregnancy.create({ email:email,
            bloodgroup:bloodgroup,
            height:height,
            weight:weight, 
            pregnancyWeek:pregnancyWeek

         });

         if(!pregnancy){
            res.json({
                meassge:"an eror ocuured in pushing prgnancy data"
            })
         }
    
        // Save the updated finance document
        await Pregnancy.save();
    
        res.status(200).json({
          message: 'pregnancy data updated successfully',
          pregnancy,
        });
      } catch (error) {
        console.error('Error updating pregnancy data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
 
});


router.get('/getpregnancy', async(req,res)=>{
 
    const email=req.body;
    const pregnancy=await Pregnancy.findOne({email});
    res.status(200).json({
        bloodgroup:pregnancy.bloodgroup,
        height:pregnancy.height,
        weight:pregnancy.weight, 
        pregnancyWeek:pregnancy.pregnancyWeek
    
    })
    




})



module.exports = router;
