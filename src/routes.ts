import { Router } from "express";
import { ensureAutheticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";


const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()


router.post("/users", createUserController.handle)
router.post("/login",authenticateUserController.handle )

router.get("/courses", ensureAutheticated, (request, response) =>{
  return response.json([
    {id: 1, name: "nodeJS"},
    {id: 2, name: "ReactJS"},
    {id: 3, name: "React Native"},
    {id: 4, name: "CSS"},
    {id: 5, name: "HTML"}
  ])
})


export {router}

