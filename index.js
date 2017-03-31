const express = require('express');
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
	destination : (request, file, callback) => {
		callback(null, './uploads');
	},
	filename: (request, file, callback) => {
		console.log("file" , file);
		callback(null, file.originalname)
	}
});
const upload = multer({ storage: storage })

const port = 8000;
app.use(express.static(__dirname));


app.post('/avatar', (request, response) => {
	upload.single('avatar')(request, response, (err) => { // 'avatar' MUST match <input type="file" name="avatar" />
		if (err) {
			console.log('Error Occured', err);
			response.send(err);
			return;
		}
		console.log(request.file);
		response.end('Your avatar Uploaded');
		console.log('avatar Uploaded');
	})
});

app.post('/photos', (request, response) => {
	upload.array('photos')(request, response, (err) => { // 'photos' MUST match <input type="file" name="photos" />
		if (err) {
			console.log('Error Occured', err);
			response.send(err);
			return;
		}
		console.log(request.file);
		response.end('Your photos Uploaded');
		console.log('photos Uploaded');
	})
});

app.listen(port, () => {
	console.log("App listening on port "+port)
});