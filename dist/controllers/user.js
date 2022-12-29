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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({
        users,
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        return res.json(user);
    }
    res.json({
        msg: "Not available data  ",
    });
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { body } = req;
        const userCreated = yield user_1.default.create({
            name: body.name || null,
            email: body.email || null,
        });
        res.json(userCreated);
    }
    catch (error) {
        if (((_a = error === null || error === void 0 ? void 0 : error.errors[0]) === null || _a === void 0 ? void 0 : _a.type) == "unique violation") {
            return res.status(400).json({
                msg: "Email already in use",
            });
        }
        return res.status(500).json({
            msg: "Talk to the admin",
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { id } = req.params;
        const { body } = req;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `User with id ${id} not found.`,
            });
        }
        const userUpdated = yield user.update(body);
        res.json({ userUpdated });
    }
    catch (error) {
        if (((_b = error === null || error === void 0 ? void 0 : error.errors[0]) === null || _b === void 0 ? void 0 : _b.type) == "unique violation") {
            return res.status(400).json({
                msg: "Email already in use",
            });
        }
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id } = req.params;
        const { body } = req;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `User with id ${id} not found.`,
            });
        }
        const userRemoved = yield user.destroy();
        res.json({ userRemoved });
    }
    catch (error) {
        if (((_c = error === null || error === void 0 ? void 0 : error.errors[0]) === null || _c === void 0 ? void 0 : _c.type) == "unique violation") {
            return res.status(400).json({
                msg: "Email already in use",
            });
        }
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map