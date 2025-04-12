const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

const ingressoModel = require("../models/ingressoModel");

const exportIngressoCSV = async (req, res) => {
    try {
        const ingressos =  await ingressoModel.getAllIngressos();

        res.setHeader("Content-Disposition", "attachment; filename=ingresso.csv");
        res.setHeader("Content-Type", "text-csv");

        const csvStream = format({ headers: true});
        csvStream.pipe(res);

        ingressos.forEach((ingresso) => {
            csvStream.write({
                Id: ingresso.id,
                evento: ingresso.evento,
                local: ingresso.local,
                data_evento: ingresso.data_evento,
                categoria: ingresso.categoria,
                preco: ingresso.preco,
                quantidade_disponivel: ingresso.quantidade_disponivel,
            });
        });
        
        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV"});
    }
};

const exportIngressoPDF = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getAllIngressos();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=ingressos.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

    
        doc.fontSize(20).text("Relatorio de Ingressos", {align: "center"});
        doc.moveDown();

       
        doc.fontSize(12).text("Id | evento | local |  data_evento | categoria | preco | quantidade_disponivel", {underline: true});
        doc.moveDown(0.5);

        
        ingressos.forEach((ingresso) => {
            doc.text(
                `${ingresso.id} | ${ingresso.evento} | ${ingresso.local} | ${ingresso.data_evento} | ${ingresso.categoria} | ${ingresso.preco} | ${ingresso.quantidade_disponivel}`
            );
        });

        doc.end(); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o pdf"}); 
    }
};

module.exports = { exportIngressoCSV, exportIngressoPDF };