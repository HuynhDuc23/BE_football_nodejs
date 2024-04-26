import Team from "../models/Team.model.js"
export  const getAllTeam = async (req, res) => {
    try {
      const teams = await Team.find();
      if (!teams) {
        return res.status(404).json({
          message: "Cant not get all teams!",
        });
      }
      return res.status(200).json({
        message: "Success!",
        data: teams,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
  export const getOneTeam = async (req,res) => {
    try {
      const {id} = req.params;
      const team = await Team.findById(id)
      if(!team){
        return res.status(404).json({
          message: " Cannot find Team by Id "+id
        })
      }
      return res.status(200).json({
        message:"Success!",
        data:team
      })
    } catch (error) {
        return res.status(500).json({
          name: error.name,
          message: error.message
        })
    }
  }
  export  const createTeam = async (req, res) => {
      try {
        const {name,nameArena,logo,imgArena,description} = req.body;
        const newTeam = new Team({
            name,
            nameArena,
            logo,
            imgArena,
            description,
        });
        await newTeam.save();
        return res.status(201).json({
            message:'Team created successfully',
            team: newTeam
        });
      } catch (error) {
        return res.status(500).json({message:'Failed create',error:error.message})
      }
    }
  export const updateTeam = async (req,res) => {
    try {
      const {id} = req.params;
      const {name,nameArena,logo,imgArena,description} = req.body
      const team = await Team.findById(id);
      if(name) team.name = name;
      if(nameArena) team.nameArena = nameArena;
      if(logo) team.logo = logo;
      if(imgArena) team.imgArena = imgArena;
      if(description) team.description = description;
      await team.save();
      return res.status(200).json({
        message:'Team updated successfully',
        data:team
      })
    } catch (error) {
      res.status(500).json({
        message:'Failed updated',
        error:error.message
      })
    }
  }