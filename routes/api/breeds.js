const express = require('express');
const router = express.Router();
const auth = require('../../tokenHandler/auth');

const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(request, file, cb){
        var dir = './uploads/'+ new Date().toISOString().substring(0,10);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, './uploads/'+ new Date().toISOString().substring(0,10) + '/')
    },
    filename: function(request, file, cb){
        cb(null, file.originalname)
    }
});

const fileFilter = (request, file, cb) => {
    // Save a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg'){
        cb(null, true);
    }
    // Reject a file
    else {
        cb(new Error('Allowed file types are jpeg, jpg and png'), false);
    }
    
    
}

const upload = multer({storage: storage, 
    limits: {
        fileSize: 1025*1024*10
    },
    fileFilter: fileFilter
});


//Breed Model
const Breed = require('../../models/Breed');


// @route GET api/breeds/search
// @desc search breed with name
// @access Private
router.get('/search', auth, (request, response) => {
    console.log('request.query: ' + request.query);
    console.log('request.query.name: ' + request.query.name);
    if(typeof request.query.name != 'undefined'){
        Breed.find({name: request.query.name})
        .then(breed => {
            if(breed.length==0){
                response.status(404).json({ success: false, msg: 'No results found' })
            }
            else{
                response.json(breed)
            }})    
        .catch(error => response.status(500).json({ success: false, msg: error }))
    }
    else {
        response.status(400).json({ success: false, msg: 'Please select valid search criteria' })
    }
    
});

// @route GET api/breeds
// @desc Get all Breeds
// @access Private
router.get('/', auth, (request, response) => {
    
        Breed.find()
        .sort({ date: -1 }) // Sorting in descending order
        .then(breeds => response.json(breeds))
        .catch(error => response.status(500).json({ success: false, msg: error }))

    
});

// @route GET api/breeds/:id
// @desc Get specific Breed for an id
// @access Private
router.get('/:id', auth, (request, response) => {
    Breed.findById(request.params.id)
        .then(breed => {
            if (!breed) {
                response.status(404).json({ success: false })
            }
            else {
                response.json(breed)
            }
        })
        .catch(error => response.status(500).json({ success: false, msg: error }))

});


// @route POST api/breeds
// @desc Create a Cat Breed
// @access Private
router.post('/',upload.single('catBreedImage'),auth, (request, response) => {
    const newBreed = new Breed({
        name: request.body.name,
        description: request.body.description,
        temperament: request.body.temperament,
        origin: request.body.origin,
        createdBy: request.body.createdBy,
        catBreedImgURL: request.file.path
    });

    newBreed.save()
        .then(breed => response.json(breed));
});


// @route DELETE api/breeds/:id
// @desc Delete a Cat Breed
// @access Private
router.delete('/:id', auth, (request, response) => {
    console.log(request.params.id);
    Breed.findById(request.params.id)
        .then(breed => {
            breed.remove()}).then(() => response.json({ success: true }))
        .catch(error => response.status(404).json({ success: false, msg: error }))
});


module.exports = router;