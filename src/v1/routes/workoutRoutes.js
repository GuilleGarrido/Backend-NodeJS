const express = require("express");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");//new
const apicache = require("apicache");//new

const router = express.Router();//nos permite decir cuando la ruta es de tipo get o cuando post o cuando delete...
const cache = apicache.middleware;

router.get("/", workoutController.getAllWorkouts);
/**
 * Nos cachea la ultima petición durante 1 minuto=>entiende que en 1 minuto no va a cambiar el registro 
 * de la BD es decir no habrá un nuevo workout y asi tarda menos en cargar la petición si se repite....
 */
// router.get("/", cache("1 minutes"), workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);//cuando tiene : significa que va parametrizable

router.get("/:workoutId/records", recordController.getRecordForWorkout);//new

router.post("/", workoutController.createNewWorkout);//Enviamos información en un formulario habitualmente

router.patch("/:workoutId", workoutController.updateOneWorkout);//modificar

router.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;




// const express = require("express");
// const workoutController = require("../../controllers/workoutController");
// const recordController = require("../../controllers/recordController");

// const router = express.Router();

// /**
//  * @openapi
//  * /api/v1/workouts:
//  *   get:
//  *     tags:
//  *       - Workouts
//  *     parameters:
//  *       - in: query
//  *         name: mode
//  *         schema:
//  *           type: string
//  *         description: The mode of a workout
//  *     responses:
//  *       200:
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: OK
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: "#/components/schemas/Workout"
//  *       5XX:
//  *         description: FAILED
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: FAILED
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     error:
//  *                       type: string
//  *                       example: "Some error message"
//  */
// router
//   .get("/", workoutController.getAllWorkouts)
//   .get("/:workoutId", workoutController.getOneWorkout)
//   .get("/:workoutId/records", recordController.getRecordForWorkout)
//   .post("/", workoutController.createNewWorkout)
//   .patch("/:workoutId", workoutController.updateOneWorkout)
//   .delete("/:workoutId", workoutController.deleteOneWorkout);

// module.exports = router;