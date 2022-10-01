import { axiosPrivate } from "./axiosConfig.js";

export async function findEmpregados() {
    return await axiosPrivate.get("/empregados");
}

export async function save(data) {
    console.log("save", data);
    return await axiosPrivate.post("/empregados", data, {
        "Content-Type": "application/json",
    });
}

export async function update(id, data) {
    console.log("update", data);
    return await axiosPrivate.put(`/empregados/${id}`, data);
}

export async function deleteById(id) {
    await axiosPrivate.delete(`/empregados/${id}`);
}
