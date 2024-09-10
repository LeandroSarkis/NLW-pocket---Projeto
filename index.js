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

    if(answers.length === 0) {
        console.log("Nenhuma meta selecionada");
        return;
    }

    goals.forEach((g) => {
        g.checked = false;
    })

    answers.forEach((answer) => {
        const goal = goals.find((m) => {
            return m.value === answer
        })
        
        goal.checked = true;
    })

    console.log("Meta(s) concluídas")
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(option) {
            case "cadastrar":
                await registerGoal();
                console.log(goals);
                break;
            case "listar":
                await goalList()
                break;
            case "sair":
                return;
        }
    }
}

start()