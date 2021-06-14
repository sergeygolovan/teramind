import { memoryStorage } from "multer";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const multerOptions: MulterOptions = {
    // Максимальный размер файла
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    
    // Storage properties
    storage: memoryStorage()
};