"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_model_1 = require("./interface/user.model");
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    "http://localhost:3000",
    "https://wb-codebase.vercel.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "DELETE", "UPDATE"],
}));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/users/userInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId !== "" || undefined || null) {
        const response = yield user_model_1.User.create(req.body);
        console.log(req.body);
        res.send({ response });
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default
                .connect(process.env.DB_URL)
                .then(() => console.log("MongoDB connected."));
            app.listen(5000, () => {
                console.log(`app is running at 5000`);
            });
        }
        catch (e) {
            console.log(`Error : `, e);
        }
    });
}
main();
exports.default = app;
