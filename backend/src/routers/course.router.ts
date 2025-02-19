import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Course, CourseModel } from "../models/course.model";
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_NOT_FOUND } from "../constants/http_status";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const courses = await CourseModel.find();
    res.send(courses);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const courses = await CourseModel.find({ name: { $regex: searchRegex } });
    res.send(courses);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await CourseModel.findById(req.params.id);
    if (course) {
      res.send(course);
    } else {
      res.status(HTTP_NOT_FOUND).send("Cours non trouvé");
    }
  })
);

// Créer un nouveau cours
router.post(
  "/create",
  asyncHandler(async (req:any, res:any) => {
    const { name, description, price, stars, imageUrl, duration }: Course = req.body;

    // Validation: Vérifier que tous les champs requis sont fournis
    if (!name || !description || !price || !stars || !imageUrl || !duration) {
      return res.status(HTTP_BAD_REQUEST).send("Tous les champs sont obligatoires");
    }

    // Créer un nouveau cours
    const newCourse = new CourseModel({
      name,
      description,
      price,
      stars,
      imageUrl,
      duration,
    });

    // Sauvegarder le cours dans la base de données
    try {
      const savedCourse = await newCourse.save();
      res.status(HTTP_CREATED).json(savedCourse); // Renvoyer le cours créé
    } catch (error) {
      res.status(HTTP_BAD_REQUEST).send("Échec de la création du cours");
    }
  })
);

// Mettre à jour un cours existant
router.put(
  "/update/:id",
  asyncHandler(async (req:any, res:any) => {
    const { id } = req.params;
    const { name, description, price, stars, imageUrl, duration }: Course = req.body;

    // Vérifier que tous les champs requis sont fournis
    if (!name || !description || !price || !stars || !imageUrl || !duration) {
      return res.status(HTTP_BAD_REQUEST).send("Tous les champs sont obligatoires");
    }

    // Mettre à jour le cours dans la base de données
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      { name, description, price, stars, imageUrl, duration },
      { new: true } // Renvoyer le cours mis à jour
    );

    if (updatedCourse) {
      res.send(updatedCourse); // Renvoyer le cours mis à jour
    } else {
      res.status(HTTP_NOT_FOUND).send("Cours non trouvé");
    }
  })
);

// Supprimer un cours
router.delete(
  "/delete/:id",
  asyncHandler(async (req:any, res:any) => {
    const { id } = req.params;

    // Supprimer le cours de la base de données
    const deletedCourse = await CourseModel.findByIdAndDelete(id);

    if (deletedCourse) {
      res.send({ message: "Cours supprimé avec succès", deletedCourse }); // Renvoyer une confirmation
    } else {
      res.status(HTTP_NOT_FOUND).send("Cours non trouvé");
    }
  })
);

export default router;