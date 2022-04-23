const express= require('express');
const mongoose= require('mongoose');


const Music= require('../models/musicModel.js');

const router= express.Router();



const getAllMusic = async (req, res) => {
    try {
        const music= await Music.find();
        
        res.status(200).json(music);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

const getMusicByCategory = async (req,res) => {
    const category = req.params.category;

    try {
        const musicByCat = await Music.find({category: category});

        res.status(200).json(musicByCat);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}

const getMusicByGenre = async (req,res) => {
    const genre = req.params.genre;
   console.log(genre);
    try {
        const musicByGenre = await Music.find({genre: genre});

        res.status(200).json(musicByGenre);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}


const getMusicByID = async (req,res) => {
    const _id = req.params._id;

    try {
        const musicByID = await Music.findOne({_id: _id});

        res.status(200).json(musicByID);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}

const addMusic =  async (req, res) => {
    console.log(req.body);

    const newMusic = new Music({
        name:req.body.name,
        category:req.body.category,
        artist:req.body.artist,
        genre:req.body.genre,
        mp3file: req.file.filename,
        created_on:req.body.created_on

    })
    try {
        await newMusic.save();

        res.status(201).json(newMusic);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

}

const updateMusicByID = async (req, res) => {
    const _id= req.params._id;
    try{
        await Music.findOneAndUpdate({
            _id: _id,
        },
        {   
            name:req.body.name,
            category:req.body.category,
            artist:req.body.artist,
            genre:req.body.genre
            
        }
        )
        res.status(202).json({_id: _id});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
    
}

const deleteMusicByID = async (req, res) => {
    const _id= req.params._id;

    try {
        await Music.findOneAndRemove({_id: _id});
        res.status(203).json({_id:_id});

    }catch(error) {
        res.status(402).json({message: error.message});
    }
}

module.exports.addMusic= addMusic;
module.exports.getAllMusic= getAllMusic;
module.exports.getMusicByCategory= getMusicByCategory;
module.exports.getMusicByGenre= getMusicByGenre;
module.exports.getMusicByID= getMusicByID;
module.exports.updateMusicByID= updateMusicByID;
module.exports.deleteMusicByID= deleteMusicByID;