import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import bcryptjs from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

interface UserBody {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOneBy({ id: parseInt(id) });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const signup = async (
  req: Request<unknown, unknown, UserBody>,
  res: Response
) => {
  const { username, fullname, password, email } = req.body;
  const user = await new User();
  user.username = username;
  user.fullname = fullname;
  user.password = await bcryptjs.hash(password, 12)
  user.email = email;
  await user.save();
  return res.json(user);
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        return res.status(400).send({
            message: 'Invalid Credentials'
        })
    }

    if (!await bcryptjs.compare(password, user.password)) {
        return res.status(400).send({
            message: 'Invalid Credentials'
        })
    }

    const accessToken = sign({
        id: user.id
    }, "access_secret", {expiresIn: 60 * 60});

    const refreshToken = sign({id: user.id
    }, "refresh_secret", {expiresIn: 24 * 60 * 60 })

    res
    .status(200)
    .send({  access_token: accessToken, refresh_token: refreshToken, message: "Successfully logged in", })
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOneBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ message: "Not user found" });

    await User.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await User.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};