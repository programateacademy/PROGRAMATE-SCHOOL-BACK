const personServices = require("../services/PersonServices");
const Person = require("../models/personsModel");
const bcrypt = require("bcrypt");
const Announcement = require('../models/announcementsModel');

//function to delete the announcement
async function deleteAnnouncement(req, res) {
  const { nameAnnouncement } = req.params; 
  try {
    const nameAnnouncement = await Announcement.findById({where: {id: Announcement._id}});
    if (!nameAnnouncement) {
      return res.status(404).json({ message: 'Call not found' }); 
    }
    await nameAnnouncement.destroy(); 
    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the call' }); 
  }
};
  
module.exports = {deleteAnnouncement};