import { Response, Request } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({
    users,
  });
};
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (user) {
    return res.json(user);
  }
  res.json({
    msg: "Not available data  ",
  });
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const userCreated = await User.create({
      name: body.name || null,
      email: body.email || null,
    });

    res.json(userCreated);
  } catch (error: any) {
    if (error?.errors[0]?.type == "unique violation") {
      return res.status(400).json({
        msg: "Email already in use",
      });
    }
    return res.status(500).json({
      msg: "Talk to the admin",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        msg: `User with id ${id} not found.`,
      });
    }
    const userUpdated = await user.update(body);
    res.json({ userUpdated });
  } catch (error: any) {
    if (error?.errors[0]?.type == "unique violation") {
      return res.status(400).json({
        msg: "Email already in use",
      });
    }
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const deleteUser =async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        msg: `User with id ${id} not found.`,
      });
    }
    const userRemoved = await user.destroy();
    res.json({ userRemoved });
  } catch (error: any) {
    if (error?.errors[0]?.type == "unique violation") {
      return res.status(400).json({
        msg: "Email already in use",
      });
    }
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
