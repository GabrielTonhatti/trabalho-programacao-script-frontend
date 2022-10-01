import { axiosPrivate } from "./axiosConfig.js";

export default function findEmpregados() {
    return axiosPrivate.get("/empregados");
}
