const { select, input} = require('@inquirer/prompts')

const metas = []

const registerGoal = async () => {
    const goal = await input({
        message: "Digite a meta:"
    });

    if(goal.length === 0) {
        console.log("A meta não pode ser vazia!");
        return;
    } 

    metas.push({
        value: goal,
        checked: false
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(option) {
            case "cadastrar":
                await registerGoal();
                console.log(metas);
                break;
            case "listar":
                console.log("vamos listar");
                break;
            case "sair":
                return;
        }
    }
}

start()