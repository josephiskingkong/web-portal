import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export async function uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		if (!req.file) {
			res.status(400).json({ error: 'File not uploaded' });
			return;
		}

		const inputPath = req.file.path;
		const outputPath = path.join(path.dirname(inputPath), 'upload_' + req.file.filename);
		const watermarkPath = path.join(__dirname, '../config/watermark.png');

		if (!fs.existsSync(watermarkPath)) {
			res.status(500).json({ error: 'No watermark found' });
			return;
		}

		const metadata = await sharp(inputPath).metadata();

		const newWidth = Math.round(metadata.width ? metadata.width * 0.5 : 800);

		await sharp(inputPath)
			.resize({ width: newWidth })
			.composite([{ input: watermarkPath, gravity: 'southwest' }])
			.toFile(outputPath);

		fs.unlinkSync(inputPath);

		res.json({
			filename: path.basename(outputPath),
			path: outputPath,
		});
	} catch (error) {
		console.error('Error while processing image:', error);
		next(error);
	}
}
