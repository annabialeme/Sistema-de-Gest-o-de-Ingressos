const ingressoModel = require("../models/ingressoModel");

const getAllIngressos = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngresso();
        res.status(200).json(ingressos);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingressos." });
    }
};

const getIngressoById = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Ingresso." });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressoModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") { 
            return res.status(400).json({ message: " Ingresso já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updatedIngresso) { 
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updatedIngresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso." });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const message = await ingressoModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar ingresso." });
    }
};

const venderIngressos = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if(!ingresso) {
            return res.status(404).json({message: "Ingresso não encontrado"})
        }
        if(!req.paramss.id) {
            return res.status(400).json({message: "ID do ingresso não fornecido"})
        }
        if (ingresso.quantidade_disponivel === 0) {
            return res.status(400).json({message: "Ingresso não disponível"})
        }
        ingresso.quantidade_disponivel -= 1
        const updatedIngresso = await ingressoModel.updateIngresso(

            req.params.id,
            ingresso.evento,
            ingresso.local,
            ingresso.data_evento,
            ingresso.categoria,
            ingresso.preco,
            ingresso.quantidade_disponivel,
            
        );
        res.status(200).json({
            message: "Ingresso vendido com sucesso!", 
            ingresso: updatedIngresso})
    } catch (error) {
        console.error("Erro ao vender ingressos:", error)
        res.status(500).json({message: "Erro ao vender ingressos"})
    }
}

module.exports = { getAllIngressos, getIngressoById, createIngresso, updateIngresso, deleteIngresso, venderIngressos };

