import * as api from "./api/api.js";

const findAll = async () => {
    const empregados = await api.get("/empregados");
    console.log(empregados);
};

window.onload = () => {
    findAll();
};
