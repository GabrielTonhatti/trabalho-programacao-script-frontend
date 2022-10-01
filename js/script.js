import * as api from "./api/api.js";

const tableBody = document.querySelector(".table-body");
const formCadastrar = document.querySelector("#form-cadastrar");
const formAtualizar = document.querySelector("#botao-atualizar");
const buttonsModalDelete = document.querySelector(".botoes");

const criarLinhasTabela = (empregado) => {
    const salario = empregado.salario
        ? parseFloat(empregado.salario).toFixed(2)
        : 0.0;
    return `
                <tr>
                    <td>${empregado?.id}</td>
                    <td>${empregado?.nome}</td>
                    <td>${empregado?.funcao}</td>
                    <td>R$ ${salario?.toString().replace(".", ",")}</td>
                    <td class="text-center"> 
                        <i role="button" class='bi bi-pencil text-warning me-3 botao-atualizar' data-bs-toggle="modal" data-bs-target="#modal-atualizar"></i>
                        <i role="button" class='bi bi-trash text-danger botao-excluir' data-bs-toggle="modal" data-bs-target="#modal-excluir"></i> 
                    </td> 
                </tr>
            `;
};

const adicionarEventos = () => {
    const tableLine = document.querySelectorAll(".table-body > tr");

    tableLine.forEach((tr) => {
        const id = tr.querySelector("td:nth-child(1)").innerText;
        const nome = tr.querySelector("td:nth-child(2)").innerText;
        const funcao = tr.querySelector("td:nth-child(3)").innerText;
        const salario = tr.querySelector("td:nth-child(4)").innerText;
        const buttonUpdate = tr.querySelector(
            "td:nth-child(5) > i:nth-child(1)"
        );
        const buttonDelete = tr.querySelector(
            "td:nth-child(5) > i:nth-child(2)"
        );

        buttonUpdate.addEventListener("click", () => {
            const nomeModal = document.querySelector("#nome-atualizar");
            const funcaoModal = document.querySelector("#funcao-atualizar");
            const salarioModal = document.querySelector("#salario-atualizar");

            nomeModal.value = nome;
            funcaoModal.value = funcao;
            salarioModal.value = salario.replace("R$ ", "").replace(",", ".");

            // const empregado = {
            //     nome,
            //     funcao,
            //     salario: Number(salarioModal.value),
            // };

            // document
            //     .querySelector("#botao-atualizar")
            //     .addEventListener("click", (event) => {
            //         update(event, id, empregado);
            //     });
        });

        buttonDelete.addEventListener("click", () => {
            buttonsModalDelete.innerHTML = `
                <button class="btn btn-danger" type="button" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-warning" id="excluir-${id}" type="submit">Excluir</button>
            `;

            document
                .querySelector(`#excluir-${id}`)
                .addEventListener("click", () => {
                    deleteById(id);
                });
        });
    });
};

const preencherTabela = (empregados) => {
    const body = empregados.map(criarLinhasTabela);
    tableBody.innerHTML = body.join("");
    adicionarEventos();
};

const findAll = async () => {
    const { data } = await api.findEmpregados();
    preencherTabela(data);
};

const save = async (event) => {
    try {
        const nome = document.querySelector("#nome").value;
        const funcao = document.querySelector("#funcao").value;
        const salario = Number(document.querySelector("#salario").value);

        const empregado = {
            nome,
            funcao,
            salario,
        };

        if (!formCadastrar.checkValidity() && salario == 0) {
            event.preventDefault();
            event.stopPropagation();

            formCadastrar.classList.add("was-validated");
        } else {
            await api.save(empregado);
            await findAll();
        }
    } catch (error) {
        console.log("error", error);
    }
};

const update = async (event) => {
    try {
        const id = document.querySelector("#id-atualizar").value;
        const nome = document.querySelector("#nome-atualizar").value;
        const funcao = document.querySelector("#funcao-atualizar").value;
        const salario = Number(
            document.querySelector("#salario-atualizar").value
        );

        const empregado = {
            nome,
            funcao,
            salario,
        };

        console.log("event", event);
        console.log("empregado", empregado);
        if (!formAtualizar.checkValidity() && salario == 0) {
            event.preventDefault();
            event.stopPropagation();

            formCadastrar.classList.add("was-validated");
        } else {
            await api.update(id, empregado);
            await findAll();
        }
    } catch (error) {
        console.log("error", error);
    }
};

const deleteById = async (id) => {
    try {
        console.log("deleteById", id);
        await api.deleteById(id);
        await findAll();
    } catch (error) {
        console.log("error", error);
    }
};

formCadastrar.addEventListener("submit", save);
formAtualizar.addEventListener("click", update);
findAll();
