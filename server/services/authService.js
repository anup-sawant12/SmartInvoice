import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const testService = () => {
  return {
    success: true,
    message: "Service is working!",
  };
};

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // check if user already registered

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
     id: user.id,
  name: user.name,
  email: user.email,
  };
};

///login user

export const loginUser=async (userData)=>{
  const { email, password } = userData;
  //check if user present

  const user =await prisma.user.findUnique({
    where:{
      email
    }
  })

  if(!user){
    throw new error ("User doesn't exists")
  }

  //compare password
    const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

   if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  //jwt
    const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

   return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }
  


}

//
