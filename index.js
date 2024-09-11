const { select, input, checkbox} = require('@inquirer/prompts')

const goals = [];


const registerGoal = async () => {
    const goal = await input({
        message: "Digite a meta:"
    });

    if(goal.length === 0) {
        console.log("A meta não pode ser vazia!");
        return;
    } 

    goals.push({
        value: goal,
        checked: false
    })
}

const goalList = async () => {
    const answers = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...goals],
        instructions: false
    })
    
    goals.forEach((g) => {
        g.checked = false;
    })

    if(answers.length === 0) {
        console.log("Nenhuma meta selecionada");
        return;
    }

    answers.forEach((answer) => {
        const goal = goals.find((m) => {
            return m.value === answer
        })
        
        goal.checked = true;
    })

    console.log("Meta(s) concluídas")
}

const finishedGoals = async () => { 

    const finished = goals.filter((goal) => {
        return goal.checked
    })

    if(finished.length === 0) {
        console.log("Não existe metas realizadas! :(")
        return
    }

    await select({
        message: "Metas realizadas " + finished.length,
        choices: [...finished]
    })
}

const openGoals = async () => {

    const open = goals.filter((goal) => {
        return !goal.checked
    })

    if(open.length === 0) {
        console.log("Não existe metas abertas! :)")
        return
    }

    await select({
        message: "Metas abertas " + open.length,
        choices: [...open]
    })
}

const start = async () => {
    while(true) {
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(option) {
            case "cadastrar":
                await registerGoal()
                console.log(goals)
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
            case "sair":
                return
        }
    }
}

start()