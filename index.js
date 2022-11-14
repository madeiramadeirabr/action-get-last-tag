const { Octokit } = require("@octokit/core")
const core = require('@actions/core');
const github = require('@actions/github')
const githubToken = core.getInput('github-token')
const octokit = new Octokit({ auth: githubToken})

async function run(){
    if(githubToken){
        findTag()
    }else{
        core.setFailed('O github-token parameter é obrigatório!')
    }
}

async function findTag(){
    let param = {
        owner: github.context.payload.repository.owner.name,
        repo: github.context.payload.repository.name
    }
    await octokit.request('GET /repos/{owner}/{repo}/git/refs/tags', param).then((res)=>{
        if(res.status == 200){
            let last_tag = res.data.pop().ref.split('/').pop()
            console.log('A última tag lançada é', last_tag)
            if(!validateTag(last_tag)){
                core.setFailed(`A tag ${last_tag} não é uma tag válida `)
            }else{
                console.log(last_tag)
                core.setOutput("version", last_tag)
            }            
        }else{
            core.setFailed("Nenhuma tag foi definida para seu projeto. Defina uma tag e execute a ação novamente!")
        }
    }).catch(()=>{
        console.log('Erro ao executar a ação, verifique os parâmetros passados ​​e tente novamente')
    })
}

function validateTag(tag){
    let defaulTag = tag.match('([v0-9|0-9]+).([0-9]+).([0-9]+).([0-9]+)')
    
    if(defaulTag){
        return tag
    }
    
    defaulTag = tag.match('([v0-9|0-9]+).([0-9]+).([0-9]+)')
    if(defaulTag){
        return tag
    }
    
    return false
}


run()