
# HUB UNO — Patch (Reconhecimento de Treino + Usuário + Arquétipo)

Este pacote aplica **hotfixes** para os problemas relatados:

- O modelo não reconhecia o **usuário**.
- O modelo ignorava o **treinamento DXT**.
- A resposta não refletia o **arquétipo ativo**.
- Caminho quebrado para `Assets/ui_sounds.js` e ausência de `icons/star.svg`.

## O que foi corrigido

1. **Injeção robusta de System/Training (PowerAI)**
   - `sendAIMessage` agora passa a usar `window.PowerAI.chat`, que injeta:
     - Identidade: nome do assistente (Dual), **arquétipo primário** e **secundário (opcional)**.
     - **Nome do usuário** (quando disponível).
     - **Treinamento DXT** salvo no *Brain* (`dual.openrouter.training`).
   - Decodificação do DXT foi reescrita para UTF‑8 (evita caracteres corrompidos).

2. **Migração de chaves antigas → canônicas**
   - Se existir somente `dual.name`, `infodose:sk`, `infodose:model` ou `infodose:training`, elas são copiadas para:
     - `infodose:userName`
     - `dual.keys.openrouter`
     - `dual.openrouter.model`
     - `dual.openrouter.training`

3. **getUserName() mais tolerante**
   - Busca primeiro `infodose:userName`, depois `dual.name` (retrocompatibilidade).

4. **Assets garantidos**
   - `Assets/ui_sounds.js` incluído (caminho esperado pelo HTML).
   - `icons/star.svg` adicionado para o favorito dos apps.

## Como usar

1. Abra `index_with_sounds_overlay.html` (ou renomeie para `index.html` se preferir).
2. Na aba **Brain**:
   - Informe seu **Nome** e clique **Salvar**.
   - Cole sua **chave OpenRouter**.
   - Escolha um **modelo** (ex.: `meta-llama/llama-4-scout:free`).
   - (Opcional) Envie um arquivo de **Treinamento** no campo correspondente.
3. Na Home, selecione o **Arquétipo** (combo acima do círculo).  
   - Opcional: defina o **Arquétipo Secundário** no painel que o overlay adiciona ao Brain.
4. Fale ou digite: a resposta virá com a identidade correta e com o DXT aplicado.

## Estrutura do ZIP

```
/index_with_sounds_overlay.html
/hub_appcfg.js              ← versão corrigida
/uno_voice_prompt_overlay.js
/Assets/ui_sounds.js
/icons/star.svg
/README.md
```

> Observação: as páginas dos arquétipos (`archetypes/*.html`) não estão aqui. Se você já tem essa pasta no seu projeto, mantenha-a.
