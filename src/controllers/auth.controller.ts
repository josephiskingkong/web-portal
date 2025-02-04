import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env';

export const register = async (req: Request, res: Response) => {
	try {
		const user = await UserService.registerUser(req.body);
		res.status(201).json({ message: 'User created', user });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, password } = req.body;

    const user = await UserService.findUserByLogin(login);
    if (!user) {
      res.status(404).json({ error: "Пользователь не найден" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Неверный пароль" });
      return;
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userWithoutPassword = {...user.toObject(), password: undefined};
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
    res.status(500).json({ error: errorMessage });
  }
};
