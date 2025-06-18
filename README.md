# 💧 Simulador de Bombas Hidráulicas

Este projeto foi desenvolvido por mim como parte da disciplina de Engenharia, ministrada pelo professor **Wilson Alano**, no curso de Engenharia da Computação da **Universidade do Sul de Santa Catarina (Unisul)**.

A proposta é criar um **simulador interativo de bombas centrífugas** que permita visualizar e analisar os principais parâmetros operacionais, como:

- Altura manométrica
- Eficiência da bomba
- Potência hidráulica e potência no eixo
- Cavitação: NPSHa (disponível) e NPSHr (requerido)

---

## 📚 Objetivos do Projeto

A ideia do projeto é reforçar o entendimento dos conceitos hidráulicos de forma prática e visual. Com ele, foi possível:

- Compreender melhor como a vazão influencia diretamente nos parâmetros da bomba.
- Aplicar fórmulas técnicas em um ambiente digital e interativo.
- Integrar conhecimentos de engenharia com programação e visualização de dados.

---

## ⚙️ Funcionalidades

- Geração da **curva de Altura Manométrica** em função da vazão.
- Exibição da **curva de Eficiência**, baseada na vazão ótima da bomba.
- Cálculo da **Potência Hidráulica** e da **Potência no Eixo**, com conversão para CV.
- Exibição **NPSHa e NPSHr**, destacando a zona segura de operação.

---

## 🧠 Fórmulas Aplicadas

- `H(Q) = H0 - k * Q²` – Altura Manométrica
- `η(Q) = ηmax * exp(-((Q - Qopt)/(largura * Qopt))²)` – Eficiência
- `Ph = ρ * g * Q * H` – Potência Hidráulica
- `NPSHa = Patm - Pv + hs - hfs` – NPSHa (disponível)
- `NPSHr(Q) = a * Q² + b * Q + c` – NPSHr (modelo genérico da bomba)

---

## 🧰 Tecnologias Utilizadas

- **TypeScript**
- **Vite**
- **ReCharts**

---

## 🏫 Instituição

**Universidade do Sul de Santa Catarina – Unisul**  
Curso de Engenharia da Computação  
Professor orientador: **Wilson Alano**

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/sweetftw/hidro.git
cd hidro
```
2. Instale as dependências:

```bash
npm install
```
3. Rode o app localmente
```bash
npm run dev
```

## ✍️ Considerações Finais
Esse projeto me ajudou bastante a consolidar os conceitos de hidráulica e também a melhorar minhas habilidades em desenvolvimento de interfaces interativas. Além disso, foi uma ótima oportunidade de integrar teoria e prática de forma visual e funcional
