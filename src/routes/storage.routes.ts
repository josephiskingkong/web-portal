import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from '../controllers/storage.controller';

const router = Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = uuidv4();
		const extArray = file.mimetype.split('/');
		const extension = extArray[extArray.length - 1];
		cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
	},
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res, next) => {
	uploadImage(req, res, next).catch(next);
});

export default router;
