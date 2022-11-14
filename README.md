# action-get-last-tag

## Descrição
Esta action procura a versão mais recente lançada e verifica se ela atende aos seguintes padrões

- v1.0.0.1
- v1.0.0
- 1.0.0.1
- 1.0.0

## Contexto de negócio 
Essa action será utilizada para auxiliar para ampliar a esteira de CI

## Squad
[SRE](https://github.com/orgs/madeiramadeirabr/teams/squad-sre)

## Exemplo

```yml
uses: madeiramadeirabr/action-get-last-tag@0.1.0
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```