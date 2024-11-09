import express from "express";
import { certificate, deleteCertificate, getAllCertificates } from "../controllers/cetificateController.js";

const router = express();
router.get("/", getAllCertificates);
router.post("/post", certificate);
router.delete("/delete/:certificateId", deleteCertificate);

export default router;
