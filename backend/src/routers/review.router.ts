import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ReviewModel } from "../models/review.model"; 
import { HTTP_BAD_REQUEST, HTTP_CREATED } from "../constants/http_status";
import { UserModel } from "../models/user.model"; 
import authMiddleware from "../middlewares/auth.mid"; // Import the authentication middleware

const router = Router();

// Ajouter un avis
router.post(
  "/add",authMiddleware,
  asyncHandler(async (req: any, res: any) => {
    const { rating, comment } = req.body;

    // Validation des données
    if (rating === undefined || comment === undefined) {
      return res.status(HTTP_BAD_REQUEST).json({ message: "Tous les champs sont obligatoires." });
    }

    // Récupérer l'ID de l'utilisateur connecté
    const userId = req.user.id;

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(HTTP_BAD_REQUEST).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier si l'utilisateur a déjà laissé un avis
    const existingReview = await ReviewModel.findOne({ userId });
    if (existingReview) {
      return res.status(HTTP_BAD_REQUEST).json({ message: "Vous avez déjà laissé un avis." });
    }

    // Créer un nouvel avis
    const newReview = new ReviewModel({
      userId,
      rating,
      comment: comment.trim(), // Trim the comment to avoid leading/trailing spaces
    });

    await newReview.save();

    // Réponse réussie
    res.status(HTTP_CREATED).json({ message: "Avis ajouté avec succès", review: newReview });
  })
);

// Récupérer tous les avis
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    // Récupérer les avis avec les informations de l'utilisateur (nom uniquement)
    const reviews = await ReviewModel.find().populate("userId", "name");

    res.status(200).json(reviews);
  })
);

export default router;
