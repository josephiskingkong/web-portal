import slugify from 'slugify';
import { ITag, Tag } from '../models/tag.model';

export class TagService {
	static async createTag(data: Partial<ITag>) {
		const existingTag = await Tag.findOne({ title: data.title });
		if (existingTag) throw new Error('Tag already exists');

		const slug = slugify(data.title!, { lower: true });

		const tag = new Tag({ ...data, slug });
		return await tag.save();
	}
}
