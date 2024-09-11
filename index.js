const { select, input, checkbox} = require('@inquirer/prompts')

let goals = [];

let message = "Bem-vindo ao App de Metas"

const registerGoal = async () => {
    const goal = await input({
        message: "Digite a meta:"
    });

    if(goal.length === 0) {
        message = "A meta não pode ser vazia!";
        return;
    } 

    goals.push({
        value: goal,
        checked: false
    })

    message = "Meta cadastrada com sucesso!"
}

const goalList = async () => {
    if(goals.length === 0){
        message = "Nenhuma meta criada!"
        return
    }

    const answers = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...goals],
        instructions: false
    })
    
    goals.forEach((g) => {
        g.checked = false;
    })

    if(answers.length === 0) {
        message ="Nenhuma meta selecionada";
        return;
    }

    answers.forEach((answer) => {
        const goal = goals.find((m) => {
            return m.value === answer
        })
        
        goal.checked = true;
    })

    message = "Meta(s) marcadas como concluída(s)"
}

const finishedGoals = async () => { 

    const finished = goals.filter((goal) => {
        return goal.checked
    })

    if(finished.length === 0) {
        message ="Não existe metas realizadas! :("
        return
    }

    await select({
        message: "Metas realizadas: " + finished.length,
        choices: [...finished]
    })
}

const openGoals = async () => {

    const open = goals.filter((goal) => {
        return !goal.checked
    })

    if(open.length === 0) {
        message = "Não existe metas abertas! :)"
        return
    }

    await select({
        message: "Metas abertas: " + open.length,
        choices: [...open]
    })
}

const deleteGoals = async () => {
    if(goals.length === 0){
        message = "Nenhuma meta criada!"
        return
    }
    
    const metasDesmarcadas = goals.map((goal) => {
        return { value: goal.value, checked: false}
    })

    const willDeleteItem = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(willDeleteItem.length === 0) {
        message = "Nenhum item para deletar!"
    }

    willDeleteItem.forEach((item) => {
        goals = goals.filter((goal) => {
            return goal.value != item
        })
    })
}

const showMessage = () => {
    console.clear()

    if(message != "") {
        console.log(message)
        console.log("")
        message = ""
    }
}

const start = async () => {
    while(true) {
        showMessage()
        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(option) {
            case "cadastrar":
                await registerGoal()
                break
            case "listar":
                await goalList()
                break
            case "realizadas":
                await finishedGoals()
                break
            case "abertas":
                await openGoals()
                break
            case "deletar":
                await deleteGoals()
                break
            case "sair":
                return
        }
    }
}

start()