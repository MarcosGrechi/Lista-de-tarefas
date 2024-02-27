// Função para adicionar uma nova tarefa
function addTask() {
    let novaAtividade = document.getElementById("novaAtividade").value.trim();
    if (novaAtividade !== "") {
        let listaAtividades = document.getElementById("listaAtividades");
        let itens = listaAtividades.getElementsByTagName("li");
        let tarefaRepetida = false;

        // Verificar se a tarefa já existe na lista
        for (let i = 0; i < itens.length; i++) {
            let textoItem = itens[i].getElementsByTagName("span")[0].textContent.trim();
            if (textoItem === novaAtividade) {
                tarefaRepetida = true;
                break;
            }
        }

        if (!tarefaRepetida) {
            // Criar um novo item de lista
            let novoItem = document.createElement("li");
            novoItem.classList.add("tarefa"); // Adicionando a classe "tarefa"
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("check");
            checkbox.addEventListener("click", function() {
                checkTask(this);
            });

            let textoAtividade = document.createElement("span");
            textoAtividade.textContent = novaAtividade;
            textoAtividade.classList.add("editable");
            textoAtividade.addEventListener("click", function() {
                if (!checkbox.checked) {
                    this.setAttribute("contenteditable", true);
                    this.focus();
                }
            });
            textoAtividade.addEventListener("blur", function() {
                this.setAttribute("contenteditable", false);
            });

            // Adicionar elementos ao novo item de lista
            novoItem.appendChild(checkbox);
            novoItem.appendChild(textoAtividade);
            let botaoRemover = document.createElement("button");
            botaoRemover.classList.add("delete");
            botaoRemover.innerHTML = "<i class='bx bxs-trash' style='font-size: 24px;'></i>";
            botaoRemover.onclick = function() {
                confirmDeleteTask(this);
            };
            novoItem.appendChild(botaoRemover);
            listaAtividades.appendChild(novoItem);
            document.getElementById("novaAtividade").value = "";

            // Limpar a validação personalizada se a tarefa for adicionada com sucesso
            document.getElementById("novaAtividade").setCustomValidity("");

            atualizarContador(); // Chamada para atualizar o contador após adicionar uma nova tarefa
        } else {
            // Exibir caixa de alerta personalizada se a tarefa já existir na lista
            showAlert("A tarefa já existe na lista!");
        }
    } else {
        // Exibir caixa de alerta personalizada se o campo estiver vazio
        showAlert("Preencha o campo da tarefa!");
    }
}


// Adicionar evento de clique para o botão "Adicionar"
document.getElementById("adicionarAtividade").addEventListener("click", addTask);

// Adicionar evento de pressionar Enter para o campo "Nova Atividade"
document.getElementById("novaAtividade").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Função para editar uma tarefa ao clicar nela
function editTask(element) {
    if (!element.previousElementSibling.checked) {
        element.setAttribute("contenteditable", true);
        element.focus();
    }
}

// Função para excluir uma tarefa
function deleteTask(button) {
    button.parentNode.remove();
    atualizarContador(); // Chamada para atualizar o contador após excluir uma tarefa
}

// Função para marcar/desmarcar uma tarefa como concluída
function checkTask(checkbox) {
    let span = checkbox.nextElementSibling;
    if (checkbox.checked) {
        span.classList.add('concluida');
    } else {
        span.classList.remove('concluida');
    }
}

// Função para confirmar a exclusão de uma tarefa
function confirmDeleteTask(button) {
    const confirmDeleteAlert = document.getElementById("confirmDeleteAlert");
    const confirmDeleteMessage = document.getElementById("confirmDeleteMessage");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");

    confirmDeleteMessage.textContent = "Tem certeza que deseja excluir esta tarefa?";
    confirmDeleteButton.onclick = function() {
        deleteTask(button);
        confirmDeleteAlert.style.display = "none";
    };

    confirmDeleteAlert.style.display = "block";
}

// Função para cancelar a exclusão de uma tarefa
function cancelDelete() {
    const confirmDeleteAlert = document.getElementById("confirmDeleteAlert");
    confirmDeleteAlert.style.display = "none";
}

// Função para confirmar a exclusão de todas as tarefas concluídas
function confirmDeleteCompletedTasks() {
    const confirmDeleteCompletedAlert = document.getElementById("confirmDeleteCompletedAlert");
    const confirmDeleteCompletedButton = document.getElementById("confirmDeleteCompletedButton");

    confirmDeleteCompletedAlert.style.display = "block";

    confirmDeleteCompletedButton.onclick = function() {
        deleteCompletedTasks();
        confirmDeleteCompletedAlert.style.display = "none";
    };

    // Adicionando evento de clique para o botão "Cancelar" no alerta de exclusão de todas as tarefas concluídas
    const cancelDeleteCompletedButton = document.getElementById("confirmDeleteCompletedAlert").getElementsByClassName("confirm-delete-button")[1];
    cancelDeleteCompletedButton.onclick = cancelDeleteCompleted; // Chamando a função cancelDeleteCompleted() quando o botão "Cancelar" é clicado
}

// Função para cancelar a exclusão de todas as tarefas concluídas
function cancelDeleteCompleted() {
    const confirmDeleteCompletedAlert = document.getElementById("confirmDeleteCompletedAlert");
    confirmDeleteCompletedAlert.style.display = "none";
}



// Função para excluir todas as tarefas concluídas
function deleteCompletedTasks() {
    let listaAtividades = document.getElementById("listaAtividades");
    let itens = listaAtividades.getElementsByTagName("li");
    for (let i = itens.length - 1; i >= 0; i--) {
        let checkbox = itens[i].getElementsByClassName("check")[0];
        if (checkbox.checked) {
            itens[i].remove();
        }
    }
    atualizarContador(); // Atualizar o contador após excluir as tarefas concluídas
}

// Adicionar evento de clique para o botão "Apagar Concluídas"
document.getElementById("apagarConcluidas").addEventListener("click", confirmDeleteCompletedTasks);



// Função para exibir alerta personalizado
function showAlert(message) {
    const customAlert = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    
    alertMessage.textContent = message;
    customAlert.style.display = "block";
}

// Função para ocultar alerta personalizado
function hideAlert() {
    const customAlert = document.getElementById("customAlert");
    customAlert.style.display = "none";
}

// Adicionar evento de clique para o botão "Fechar" no alerta personalizado
document.getElementById("closeAlert").addEventListener("click", hideAlert);

// Função para atualizar o contador de tarefas
function atualizarContador() {
    const numeroDeTarefas = document.getElementById("listaAtividades").getElementsByTagName("li").length;
    document.getElementById("contador").textContent = "Número de tarefas: " + numeroDeTarefas;
}

// Selecionar todas as tarefas
document.getElementById("selecionarTodas").addEventListener("click", function() {
    let checkboxes = document.getElementsByClassName("check");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = this.checked;
        checkTask(checkboxes[i]);
    }
});


