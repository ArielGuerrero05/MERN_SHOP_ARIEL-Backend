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
const product_1 = require("../models/product");
const productsRouter = express_1.default.Router();
productsRouter.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productList = yield product_1.Product.find();
    if (!productList) {
        res.status(500).json({
            success: false
        });
    }
    res.send(productList);
}));
productsRouter.post(`/`, (req, res) => {
    const product = new product_1.Product({
        name: req.body.name,
        image: req.body.image
    });
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct);
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    });
});
exports.default = productsRouter;