import { testService,registerUser, loginUser } from "../services/authService.js";

export const test = (req, res) => {
  const result = testService();

  return res.status(200).json(result);
};

export const register = async (req, res) => {
 
  try {
    const user = await registerUser(req.body);

    

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//login

export const login=async (req,res)=>{
  try{

    const result=await loginUser(req.body);
     return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  }catch(error){
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}