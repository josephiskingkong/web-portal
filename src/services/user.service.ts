import { User, IUser } from '../models/user.model';
import bcrypt from 'bcrypt';

export class UserService {
	static async registerUser(data: IUser) {
		const existingUser = await User.findOne({ login: data.login });
		if (existingUser) throw new Error('User already registered');

		const hashedPassword = await bcrypt.hash(data.password, 10);
		const user = new User({ ...data, password: hashedPassword });
		return await user.save();
	}

	static async findUserByLogin(login: string) {
		return await User.findOne({ login });
	}

	static async deleteUser(id: string) {
		return await User.findByIdAndDelete(id);
	}
}
